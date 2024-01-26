import {
    getCoreRowModel,
    flexRender,
    useReactTable,
    Column,
    createColumnHelper,
    getPaginationRowModel, getSortedRowModel
} from '@tanstack/react-table'
import {useEffect, useMemo, useState} from "react";

function TanTable(){

    //This is our createTable function
    /*Here table is the core table object that contains the table state and APIs
    *
    * Two options are required: columns & data
    *
    * 'data' is an array of object that will be turned ito the rows of your table
    * each object in the array represent a row of data
    * */

    /**/


    //Update for TanStack v8
    const columns = [
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
    ]

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
    })



    const table = useReactTable({
        data ,
        columns ,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })


    //Render table
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
            </table>
        </div>
    )

}

export default TanTable