import {useEffect, useMemo, useState} from "react";
import {flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";

const IngredientsTable = () => {

    const [ data , setData ] = useState([])

    const columns = useMemo( () => [
        {
            header: 'Id',
            accessorKey: 'id',
        },
        {
            header: 'Ingredient',
            accessorKey: 'label'
        },
        {
            header: 'Allergen',
            accessorKey: 'allergen'
        }
    ], [])

    type Ingredient = {
        id: number;
        label: string;
        allergen: boolean;
    }


    //"Do not call Hooks inside functions passed to useMemo, useReducer or useEffect"
    const fetchData = async () : Promise<void> => {
            const res = await fetch("http://localhost:8080/api/recipes/fetch-ingredients")
            console.log("Fetch-ingredients request")
            if (!res.ok){
                throw new Error("Error running fetch-ingredient")
            }
            const products = await res.json();
            setData(products)
            console.log(products)
    }

    const table = useReactTable({
        data ,
        columns ,
        getCoreRowModel: getCoreRowModel(),
    })


    //Rendering of table
    return (
        <div className={'tan-table'}>
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

export default IngredientsTable