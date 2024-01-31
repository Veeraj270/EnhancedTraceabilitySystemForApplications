import {
    getCoreRowModel,
    flexRender,
    useReactTable,
} from '@tanstack/react-table'

import React, {useEffect, useMemo, useState} from "react";
import Item from "./Interfaces/Item";



interface Props{
    data: Item[]
}
const Table : React.FC<Props> = ( props: Props ) => {

    //Define Columns
    const columns= useMemo(()=> [
        {
            header: 'Label',
            accessorKey : 'label'
        },
        {
            header: 'Barcode',
            accessorKey : 'barcode'
        }
    ],[])

    let data: Item[] = props.data

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

export default Table;