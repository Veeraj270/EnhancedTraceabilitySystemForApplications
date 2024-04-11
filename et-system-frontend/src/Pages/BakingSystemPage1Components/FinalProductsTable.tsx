import {useEffect, useMemo, useState} from "react";
import {flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import React from "react";

const FinalProductsTable = ({rawData}) => {

    const [tableData, setTableData] = useState();

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
            accessorKey: "associatedOrder"
        },
        {
            header: "Add or Delete",
            accessorKey: "addOrDelete"
        }
    ], [])

    const generateTableData = async (data: any) => {
        data.forEach(x => console.log(x))
        const tableData = data.map((productAndOrder) => (
            {
                associatedOrder: productAndOrder.first.client ,
                finalProduct: productAndOrder.second.label,
                quantity: productAndOrder.second.quantity
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

    useEffect(() => {
    }, [tableData, rawData]);

    const table = useReactTable({
        data: tableData,
        columns: columns,
        getCoreRowModel: getCoreRowModel()
    })

    return (
        <div>
            <table>
                <thead>

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