import {flexRender, getCoreRowModel, HeaderGroup, useReactTable} from "@tanstack/react-table";
import React, {useEffect, useMemo, useState} from "react";

import FPData from "../BakingSystemInterfaces";

interface PropTypes{
    table2Data: FPData[],
    setTable2Data: (data: FPData[]) => void
    equalsFPData: (fp1: FPData, fp2: FPData) => boolean
    updateTable1Data: (row: FPData) => void
}

const SelectedFinalProductsTable = ( props : PropTypes) => {
    //Destructure props
    const table2Data = props.table2Data;
    const setTable2Data = props.setTable2Data;
    const updateTable1Data = props.updateTable1Data;
    const equalsFPData = props.equalsFPData;

    //Column definitions
    const columns = useMemo(() => [
        {
            header: "Product Label",
            accessorKey: "finalProductLabel",
            size: 60
        },
        {
            header: "Quantity",
            accessorKey: "amount",
            size: 15
        },
        {
            header: "Order ID",
            accessorKey: "associatedCustomerOrderID",
            size: 15
        },
        {
            header: "",
            accessorKey: "actions",
            size: 10
        }

    ], [])

    /*const updateNonSelectedData = (rowData: any, data: OrderedFinalProduct[], setData: any) => {
        const indexOfElement = data.findIndex(x => x.key === rowData.key)

        // If the item is already in the other table it increases the quantity
        if(indexOfElement !== -1){
            const newData = data.map(x => {
                if(x.key === rowData.key){
                    return {...x, quantity: x.quantity + 1}
                }else{
                    return x
                }
            })
            setData(newData)
        } else{
            // Otherwise it just adds the item to the table
            const newData = data.concat({...rowData, quantity: 1})
            setData(newData)
        }
    }*/

    //Handle click event for the minus button
    const handleClickMinus = (event: React.MouseEvent, input: any) => {
        const originalRow: FPData = input.original as FPData;

        // If the amount is 1, the row should be removed after clicking the button
        if(originalRow.amount === 1){
            // Filtering out the row that should be removed
            const newTable2Data = table2Data.filter(row  => !equalsFPData(row, originalRow))
            setTable2Data(newTable2Data)

        } else {
            // If the amount is more than 1, the amount should be decreased by 1
            const newTable2Data: FPData[] = table2Data.map(row => {
                if (equalsFPData(row, originalRow)){
                    return {...row, amount: row.amount - 1};
                } else {
                    return row;
                }
            })
            setTable2Data(newTable2Data)
        }

        updateTable1Data(originalRow);
    }

    const table = useReactTable({
        data: table2Data,
        columns: columns,
        getCoreRowModel: getCoreRowModel()
    })

    //For table column formatting
    const getTemplateColumns = (headerGroup : HeaderGroup<FPData>): string => {
        let output  = "";
        headerGroup.headers.forEach(header => {
            output += `${header.column.getSize()}fr `
        })
        return output;
    }

    const templateColumnStyle = getTemplateColumns(table.getHeaderGroups()[0]);

    //Render the table
    return(
        <div className={'BSP1-FP-table-2-grid'}>
            <div className={'BSP1-FP-table-1-header-div'}>
                <table>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}
                            className={'BSP1-tr'}
                            style={{gridTemplateColumns: getTemplateColumns(headerGroup)}}
                        >
                            {headerGroup.headers.map(header =>
                                <th
                                    className={'BSP1-th'}
                                    key={header.id}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            )
                            }
                        </tr>
                    ))}
                </table>
            </div>
            <div className={"BSP1-FP-table-1-rows-div"}>
                <table>
                    <tbody>
                    {table.getCoreRowModel().rows.map(row => (
                        <tr key={row.id}
                            className={'BSP1-tr'}
                            style={{gridTemplateColumns: templateColumnStyle}}
                        >
                            <td className={'BSP1-td'}>{row.original.finalProductLabel}</td>
                            <td className={'BSP1-td'}>{row.original.amount}</td>
                            <td className={'BSP1-td'}>{row.original.associatedCustomerOrderID}</td>
                            <td className={'BSP1-td'}>
                                <button onClick={(event) => {handleClickMinus(event, row)}}><b>-</b></button>
                            </td>
                        </tr>)
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default SelectedFinalProductsTable