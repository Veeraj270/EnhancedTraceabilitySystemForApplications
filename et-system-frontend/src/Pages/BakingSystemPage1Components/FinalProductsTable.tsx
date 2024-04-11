import {useEffect, useMemo, useState} from "react";
import {flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import React from "react";

const FinalProductsTable = ({rawData}) => {

    const [tableData, setTableData] = useState([]);

    const columns = useMemo(() => [
        {
            header: "Final product",
            accessorKey: "finalProduct",
        },
        {
            header: "Quantity",
            accessorKey: "quantity"
        },
        {
            header: "Associated order",
            accessorKey: "customerOrder"
        },
        {
            header: " ",
            accessorKey: "addOrDelete"
        }
    ], [])

    const generateTableData = async (data: any) => {
        data.forEach(x => console.log(x))
        const tableData = data.map((productAndOrder) => (
            {
                customerOrder: productAndOrder.customerOrder.id,
                finalProduct: productAndOrder.finalProduct.label,
                quantity: productAndOrder.quantity
            }
        ))
        console.log(tableData)
        return tableData
    }

    useEffect(() => {
        if (rawData !== undefined) {
                generateTableData(rawData).then(finalProductsTableData => {
                        setTableData(finalProductsTableData)
                    }).catch(error => console.error("Error generating table data:", error))
        }
    }, [rawData])

    const table = useReactTable({
        data: tableData,
        columns: columns,
        getCoreRowModel: getCoreRowModel()
    }, [tableData])

    return (
        <div>
            <table>
                <thead>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id} >
                        {headerGroup.headers.map(header => <th
                            key={header.id} style={{width: `${header.column.getSize()}%`, textAlign: "center"}}>
                            {flexRender(header.column.columnDef.header, header.getContext())}
                        </th>)
                        }
                    </tr>
                ))}
                </thead>
                <tbody>
                {table.getCoreRowModel().rows.map(row => (<tr
                        key={row.id}>
                        {row.getVisibleCells().map(cell => (
                            <td style={{width: `${cell.column.getSize()}%`,textAlign:"center"}}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>)
                )
                }
                </tbody>
            </table>
        </div>
    )

}

export default  FinalProductsTable