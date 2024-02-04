import React, {useMemo, useState} from "react";
import Item from "../TakeDeliveryPageComponents/Interfaces/Item";
import {flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";


const DPTable2 = () => {
    const mockData: Item[] = Array(40).fill(
        {
            "label": "",
            "barcode": "",
            "quantity": "",
            "individual-weight": "",
            "total-weight": "",
        }
    )

    const [tableData, setTableData] = useState<Item[]>(mockData)

    const columns = useMemo(() => [
        {
            header: 'Label',
            accessorKey: 'label'
        },
        {
            header: 'Barcode',
            accessorKey: 'barcode'
        },
        {
            header: 'Quantity',
            accessorKey: 'quantity'
        },
        {
            header: 'Weight',
            accessorKey: 'individual-weight',
        },
        {
            header: 'Total Weight',
            accessorKey: 'total-weight',
        }
        ], [])

    const table = useReactTable({
        data: tableData ,
        columns: columns ,
        getCoreRowModel: getCoreRowModel(),
    })

    return(
        <div className={"dp-table-2-region"}>
            <table>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id} className={"dp-table-2-tr"}>
                        {headerGroup.headers.map(header => <th key={header.id}>
                            {flexRender(header.column.columnDef.header, header.getContext())}
                        </th>)}
                    </tr>
                ))}
            </table>

            <div className={"dp-table-2-rows-div"}><table>
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

    return (
        <div className={"dp-table-2-div"}></div>
    )
}

export default DPTable2