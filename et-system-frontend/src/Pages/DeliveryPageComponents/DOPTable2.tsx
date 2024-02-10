import React, {useState, useMemo} from "react";
import "./DPStylesheet.css"
import Item from "../TakeDeliveryPageComponents/Interfaces/DeliveryItem";
import {flexRender, getCoreRowModel,  useReactTable} from "@tanstack/react-table";


const DOPTable2 = () => {
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
            header: 'Delivery Date',
            accessorKey: 'date-due'
        },
    ], [])

    const table = useReactTable({
        data: tableData,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className={'DOP-T-grid'}>

            <div className={"DOP-T-search-container"}>
                <label>Search Past Deliveries</label>
                <input placeholder={"Search... "}/>
            </div>

            <div className={'DOP-T-table-headers-div'}>
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
            <div className={'DOP-T-table-content-div'}>
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

export default DOPTable2