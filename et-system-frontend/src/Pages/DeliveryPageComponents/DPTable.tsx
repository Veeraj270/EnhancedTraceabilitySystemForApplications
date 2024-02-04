import React, {useState, useMemo} from "react";
import Item from "../TakeDeliveryPageComponents/Interfaces/Item";
import {flexRender, getCoreRowModel,  useReactTable} from "@tanstack/react-table";


const DPTable = () => {
    const [tableData, setTableData] = useState<Item[]>([])

    const columns = useMemo(() => [
        {
            header: 'Delivery Identifier',
            accessorKey: 'delivery-identifier'
        },
        {
            header: 'Date Due',
            accessorKey: 'data-due'
        }
        ], [])

    const table = useReactTable({
        data: tableData ,
        columns: columns ,
        getCoreRowModel: getCoreRowModel(),
    })

    return(
        <div className={"dp-table-region"}>
            <table>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id} className={"dp-table-tr"}>
                        {headerGroup.headers.map(header => <th key={header.id}>
                            {flexRender(header.column.columnDef.header, header.getContext())}
                        </th>)}
                    </tr>
                ))}
                <div>
                    <tbody>
                    {table.getRowModel().rows.map(row => (<tr key={row.id}>
                        {row.getVisibleCells().map(cell => (
                            <td>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>))
                    }
                    </tbody>
                </div>

            </table>
        </div>
    )
}

export default DPTable