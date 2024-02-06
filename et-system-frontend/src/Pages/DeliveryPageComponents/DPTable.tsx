import React, {useState, useMemo} from "react";
import "./DPStylesheet.css"
import Item from "../TakeDeliveryPageComponents/Interfaces/DeliveryItem";
import {flexRender, getCoreRowModel,  useReactTable} from "@tanstack/react-table";


const DPTable = () => {
    const mockData = Array(40).fill(
        {
            "delivery-identifier": "",
            "date-due": "",
        }
    )
    const [tableData, setTableData] = useState<Item[]>(mockData)

    const columns = useMemo(() => [
        {
            header: 'Delivery Identifier',
            accessorKey: 'delivery-identifier'
        },
        {
            header: 'Date Due',
            accessorKey: 'date-due'
        },
        {
            header: 'Status',
            accessorKey: 'status'
        }
        ], [])

    const table = useReactTable({
        data: tableData,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className={"dp-table-1-div"}>
            <table>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id} className={"dp-table-1-th"}>
                        {headerGroup.headers.map(header => <th key={header.id}>
                            {flexRender(header.column.columnDef.header, header.getContext())}
                        </th>)}
                    </tr>
                ))}
            </table>

            <div className={"dp-table-1-rows-div"}><table>
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
                </table>
            </div>
        </div>
    )
}

export default DPTable