import React, {useMemo, useState} from "react";
import Item from "../TakeDeliveryPageComponents/Interfaces/Item";
import {ColumnSizingState, flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";


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
            accessorKey: 'label',
            size: 100
        },
        {
            header: 'Barcode',
            accessorKey: 'barcode',
            size: 100
        },
        {
            header: 'Quantity',
            accessorKey: 'quantity',
            size: 100
        },
        {
            header: 'Weight',
            accessorKey: 'individual-weight',
            size: 100
        },
        {
            header: 'Total Weight',
            accessorKey: 'total-weight',
            size: 100
        }
        ], [])

    const table = useReactTable({
        data: tableData ,
        columns: columns ,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className={"dp-table-2-region"}>
            <table>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id} className={"dp-table-2-tr"}>
                        {headerGroup.headers.map(header => <th key={header.id} style={{ width: header.column.columnDef.size}}>
                            {flexRender(header.column.columnDef.header, header.getContext())}
                        </th>)}
                    </tr>
                ))}
            </table>

            <div className={"dp-table-2-rows-div"}><table>
                <tbody>
                {table.getRowModel().rows.map(row => (<tr key={row.id}>
                    {row.getAllCells().map(cell => (
                        <td style={{width : cell.column.columnDef.size}}>
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

export default DPTable2