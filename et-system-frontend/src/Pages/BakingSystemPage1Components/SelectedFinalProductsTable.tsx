import {flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import React, {useEffect, useMemo, useState} from "react";
import {OrderedFinalProduct} from "../Interfaces/OrderedFinalProduct";

const SelectedFinalProductsTable = ({selectedData, setSelectedData, nonSelectedData, setNonSelectedData}) => {

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

    const updateNonSelectedData = (rowData: any) => {
        const indexOfElement = nonSelectedData.findIndex(x => x.key === rowData.key)
        // If the item is already in the other table it increases the quantity
        if(!indexOfElement){
            const newNonSelectedData = nonSelectedData.map(x => {
                if(x.key === rowData.key){
                    return {...x, quantity: x.quantity + 1}
                }else{
                    return x
                }
            })
            setNonSelectedData(newNonSelectedData)
        } else{
            // Otherwise it just adds the item to the table
            const newNonSelectedData = nonSelectedData.concat({...rowData, quantity: 1})
            setNonSelectedData(newNonSelectedData)
        }
    }

    const handleClickMinus = (event: MouseEvent, row: HTMLTableRowElement) => {
        const rowData = row.original
        // If the quantity is 1, the row should be removed after clicking the button
        if(rowData.quantity === 1){
            // Filtering out the row that should be removed
            const newSelectedData = selectedData.filter(x => x.key !== rowData.key)
            setSelectedData(newSelectedData)
            // Adding the row to the data of the other table
            updateNonSelectedData(rowData)
        }else{
            // This changes the quantity if the final product that is subtracted
            // from the selected final products
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

    const table = useReactTable({
        data: selectedData,
        columns: columns,
        getCoreRowModel: getCoreRowModel()
    }, [selectedData])

    return(
        <div className={'FPTable-grid'}>
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
        </div>
    )
}

export default SelectedFinalProductsTable