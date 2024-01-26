import {
    getCoreRowModel,
    flexRender,
    useReactTable,
    getPaginationRowModel,
    getSortedRowModel,

} from '@tanstack/react-table'
import {useEffect, useMemo, useState} from "react";
import './Table.css'

function TanTable(){
    //Update for TanStack v8
    const columns = useMemo( () => [
        {
            header: 'Id',
            accessorKey: 'id'
        },
        {
            header: 'Product',
            accessorKey: 'label'
        },
        {
            header: 'Current Quantity',
            accessorKey: 'currentQuantity'
        },
        {
            header: 'Max Quantity',
            accessorKey: 'maxQuantity'
        },
        {
            header: 'Intermediaries',
            accessorKey: 'intermediariesId'
        },
    ], [])

    type Product = {
        id: number;
        label: string;
        maxQuantity: number;
        currentQuantity: number;
        intermediariesID: number[];
    }

    const [ data , setData ] = useState([])

    const fetchData = async () : Promise<void> => {
        try {
            const res = await fetch("http://localhost:8080/api/products/fetch-products")
            if (!res.ok){
                throw new Error("fetch-products response was not ok")
            }
            const products = await res.json();
            setData(products);
        }
        catch(error){
            console.log("Error occurred within fetchData(): ", error)
        }
    }

    useEffect(() => {
        fetchData().then()
    }, [])

    //Here table is the core table object that contains the table state and APIs
    const table = useReactTable({
        data ,
        columns ,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })


    //Rendering of table
    return (
        <div>
            <table>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => <th key={header.id}>
                            {flexRender(header.column.columnDef.header, header.getContext())}
                        </th>)}
                    </tr>
                ))}
                <tbody>
                {table.getRowModel().rows.map(row => (<tr key={row.id}>
                    {row.getVisibleCells().map(cell => (
                        <td>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                    ))}
                </tr>))}
                </tbody>
            </table>
        </div>
    )

}

export default TanTable