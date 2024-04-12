import {flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import React, {useEffect, useMemo, useState} from "react";
import {OrderedFinalProduct} from "../Interfaces/OrderedFinalProduct";

const SelectedFinalProductsTable = ({selectedData, setSelectedData, nonSelectedData, setNonSelectedData}) => {

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

    const handleClickMinus = (event: MouseEvent, row: HTMLTableRowElement) => {
        const rowData = row.original
        // If the quantity is 1, the row should be removed after clicking the button
        if(rowData.quantity === 1){
            // By filtering out the row that should be removed
            const newTableData = selectedData.filter(x => x.key !== rowData.key)
            setTableData(newTableData)
            // Adding the row to the data of the other table
            updateNonSelectedData(rowData)
        }else{
            const newData = selectedData.map(x => {
                if(x.key === rowData.key){
                    return {...x, quantity: x.quantity - 1}
                }else{
                    return x
                }
            })
            setSelectedData(newData)
            updateNonSelectedData(rowData)
        }
        console.log(row.id);
    }

    useEffect(() => {
        if (selectedData !== undefined) {
            setTableData(selectedData)
        }
        console.log("Selected table data: " + tableData)
    }, [selectedData])

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
                        <button onClick={(event) => {handleClickMinus(event, row)}}><b>-</b></button>&nbsp;
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