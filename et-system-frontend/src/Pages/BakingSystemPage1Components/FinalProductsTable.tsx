import {useEffect, useMemo, useState} from "react";
import {flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import React from "react";
import {OrderedFinalProduct} from "../Interfaces/OrderedFinalProduct";

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

    const generateTableData = async (data: Map<any, number>) => {
        console.log("data: " + Array.from(data))
        const tableData = Array.from(data).map((key, value) => (
            {
                associatedOrder: key.at(0).first.client,
                finalProduct: key.at(0).second.label,
                quantity: value
            }
        ))
        console.log(tableData)
        return tableData
    }

    useEffect(() => {
        if (rawData !== undefined) {
            if (rawData.size > 0) {
                generateTableData(rawData).then(finalProductsTableData => {
                        setTableData(finalProductsTableData)
                    console.log(tableData)
                    }
                )
            }
        }
    }, [rawData])

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
                {/*{table.getCoreRowModel().rows.map(row => (<tr*/}
                {/*        key={row.id}>*/}
                {/*        {row.getVisibleCells().map(cell => (*/}
                {/*            <td style={{width: `${cell.column.getSize()}%`,textAlign:"center"}}>*/}
                {/*                {flexRender(cell.column.columnDef.cell, cell.getContext())}*/}
                {/*            </td>*/}
                {/*        ))}*/}
                {/*    </tr>)*/}
                {/*)*/}
                {/*}*/}
                </tbody>
            </table>
        </div>
    )

}

export default  FinalProductsTable