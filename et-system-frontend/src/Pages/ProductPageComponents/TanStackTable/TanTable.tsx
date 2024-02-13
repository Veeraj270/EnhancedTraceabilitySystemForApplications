import {
    getCoreRowModel,
    flexRender,
    useReactTable,
} from '@tanstack/react-table'
import {useEffect, useMemo, useState} from "react";
import './Table.css'
import {Link} from "react-router-dom";

const TanTable = () => {
    //Hooks should be called at the top level in the body of a function component
    const [ data , setData ] = useState([])

    //Update for TanStack v8
    const columns = useMemo( () => [
        {
            header: 'Id',
            accessorKey: 'id',
            cell: ({ getValue }: {value : any}) => {
                const value = getValue();
                return <Link to={`/edit-product/${value}`}>{value}</Link>;
            },
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


    //"Do not call Hooks inside functions passed to useMemo, useReducer or useEffect"
    const fetchData = async () : Promise<void> => {
        try {
            const res = await fetch("http://localhost:8080/api/products/fetch-products")
            console.log("Fetch request!!")
            if (!res.ok){
                throw new Error("fetch-products response was not ok")
            }
            const products = await res.json();
            setData(products)
            console.log(products)
        }
        catch(error){
            console.log("Error occurred within fetchData(): ", error)
        }
    }

    useEffect(() => {
        fetchData().then()
    }, []) //Empty dependency array therefore runs at least once when component mounts

    //Here table is the core table object that contains the table state and APIs
    //This is the bare minimum for table initialisation
    const table = useReactTable({
        data ,
        columns ,
        getCoreRowModel: getCoreRowModel(),
    })


    //Rendering of table
    return (
        <div>
            {data.length > 0 ?
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
                :
                <p>no data available</p>
            }
        </div>
    )
}

export default TanTable