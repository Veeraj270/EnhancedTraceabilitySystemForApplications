import {flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import React, {useEffect, useMemo, useState} from "react";
import {OrderedFinalProduct} from "../Interfaces/OrderedFinalProduct";

const SelectedFinalProductsTable = ({rawData, setRawData}) => {

    const [tableData, setTableData] = useState<OrderedFinalProduct[]>([])

    const columns = useMemo(() => [
        {
            header: "Final product",
            accessorKey: "finalProduct",
            size: 40
        },
        {
            header: "Quantity",
            accessorKey: "quantity",
            size: 20
        },
        {
            header: "Associated order",
            accessorKey: "customerOrder",
            size: 20
        }
    ], [])

    const generateTableData = async (data: any) => {
        const tableData = data.map((productAndOrder) => (
            {
                key: productAndOrder.key,
                customerOrder: productAndOrder.customerOrder,
                finalProduct: productAndOrder.finalProduct,
                quantity: productAndOrder.quantity
            }
        ))
        return tableData
    }

    const handleClickPlus = () => {

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

    return(
    <div className={"FPTable-content-div"}>
        <table>
            <thead>
            {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id} >
                    {headerGroup.headers.map(header => <th
                        key={header.id} style={{width: `${header.column.getSize()}%`, textAlign: "center"}}>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>)
                    }
                    <th></th>
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
                    <td style={{textAlign:"center"}}>
                        <button onClick={(event) => {handleClickPlus(event, row)}}><b>+</b></button>&nbsp;
                    </td>
                </tr>)
            )
            }
            </tbody>
        </table>
    </div>
    )
}

export default SelectedFinalProductsTable