import {ChangeEvent, useEffect, useMemo, useState} from "react";
import {flexRender, getCoreRowModel, HeaderGroup, useReactTable, Row} from "@tanstack/react-table";
import React from "react";
import '../Page3/BSP3StyleSheet.css'

import {FPData} from "../BakingSystemInterfaces";
import {tab} from "@testing-library/user-event/dist/tab";

interface PropTypes{
    table1Data: FPData[]
    setTable1Data: (data: FPData[]) => void
    equalsFPData: (fp1: FPData, fp2: FPData) => boolean
    updateTable2Data: (row: FPData) => void
}

const FinalProductsTable = (props: PropTypes) => {
    //Destructure props
    const table1Data = props.table1Data;
    const setTable1Data = props.setTable1Data;
    const equalsFPData = props.equalsFPData;
    const updateTable2Data = props.updateTable2Data;

    //State variables
    const [searchInput, setSearchInput] = useState("");
    const [filteredTable1Data, setFilteredTable1Data] = useState<FPData[]>([]);

    //Use Effects
    useEffect(() => {
        setFilteredTable1Data(table1Data.filter((row: FPData) =>{
            return row.finalProductLabel.match(searchInput)}));
    }, [setTable1Data, table1Data, searchInput]);

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


    const handleChange = (event : ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setSearchInput(event.target.value)
    }

    const handleClickPlus = (event: React.MouseEvent, input: any) => {
        const originalRow: FPData = input.original as FPData;
        let newTable1Data: FPData[] = [];
        // If the amount is 1, the row should be removed after clicking the button
        if(originalRow.amount === 1){
            newTable1Data = table1Data.filter((row) => !equalsFPData(row, originalRow));
        } else {
            // If the amount is more than 1, the amount should be decreased by 1
            newTable1Data = table1Data.map((row: FPData) => {
                if(equalsFPData(row, originalRow)){
                    return {...row, amount: row.amount - 1};
                }else{
                    return row;
                }
            })
        }
        setTable1Data(newTable1Data);
        updateTable2Data(originalRow);
    }

    //Table definition
    const table = useReactTable({
        data: filteredTable1Data,
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

    return (
        <div className={'BSP1-FP-table-1-grid'}>
            <div className={'BSP1-upper-wrapper'}>
                <div className={"BSP1-FP-table-1-search-div"}>
                    <input placeholder={"Search..."} onChange={handleChange} value={searchInput}/>
                </div>
                <div className={'BSP1-FP-table-1-header-div'}>
                    <table>
                        <thead>
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
                        </thead>
                    </table>
                </div>
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
                                <button className={'BSP1-table-button'} onClick={(event) => {handleClickPlus(event, row)}}><b>+</b></button>
                            </td>
                        </tr>)
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    )

}

export default  FinalProductsTable