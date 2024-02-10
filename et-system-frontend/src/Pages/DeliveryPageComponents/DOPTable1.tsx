import React, {useState, useMemo} from "react";
import "./DPStylesheet.css"
import Item from "../TakeDeliveryPageComponents/Interfaces/DeliveryItem";
import {flexRender, getCoreRowModel,  useReactTable} from "@tanstack/react-table";


const DOPTable1 = () => {
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
        <div className={'DOP-T-1-grid'}>

            <div className={"DOP-T-1-search-container"}>
                <label>Search scheduled deliveries</label>
                <input placeholder={"Search... "}/>
            </div>

            <div className={'DOP-T-1-table-headers-div'}>
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
            <div className={'DOP-T-1-table-content-div'}>
                <table>
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

export default DOPTable1