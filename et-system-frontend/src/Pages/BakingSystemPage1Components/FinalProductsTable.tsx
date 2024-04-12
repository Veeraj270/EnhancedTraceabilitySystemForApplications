import {ChangeEvent, useEffect, useMemo, useState} from "react";
import {flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import React from "react";
import {OrderedFinalProduct} from "../Interfaces/OrderedFinalProduct";

const FinalProductsTable = ({rawData, setRawData, selectedData, setSelectedData}) => {

    const [tableData, setTableData] = useState<OrderedFinalProduct[]>([]);
    const [searchInput, setSearchInput] = useState("")

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

    const handleChange = (event : ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setSearchInput(event.target.value)
    }

    useEffect(() => {
        if (searchInput.length > 0){
        } else{
        }
    }, [searchInput]);

    useEffect(() => {
        if (rawData !== undefined) {
            setTableData(rawData)
        }
        console.log("Table data: " + rawData)
    }, [rawData])

    const updateSelectedData = (rowData : any) => {
        const indexOfElement = selectedData.findIndex(x => x.key === rowData.key)
        if(!indexOfElement){
            const newSelectedData = selectedData.map(x => {
                if(x.key === rowData.key){
                    return {...x, quantity: x.quantity + 1}
                }else{
                    return x
                }
            })
            setSelectedData(newSelectedData)
        } else{
            const newSelectedData = selectedData.concat({...rowData, quantity: 1})
            setSelectedData(newSelectedData)
        }
    }

    const handleClickPlus = (event: MouseEvent, row: HTMLTableRowElement) => {
        const rowData = row.original
        // If the quantity is 1, the row should be removed after clicking the button
        if(rowData.quantity === 1){
            // By filtering out the row that should be removed
            const newTableData = rawData.filter(x => x.key !== rowData.key)
            setTableData(newTableData)
            // Adding the row to the data of the other table
            updateSelectedData(rowData)
        }else{
            const newData = rawData.map(x => {
                if(x.key === rowData.key){
                    return {...x, quantity: x.quantity - 1}
                }else{
                    return x
                }
            })
            setRawData(newData)
            updateSelectedData(rowData)
        }
        console.log(row.id);
    }

    const table = useReactTable({
        data: tableData,
        columns: columns,
        getCoreRowModel: getCoreRowModel()
    }, [tableData])

    return (
        <div className={'FPTable-grid'}>
        <div className={"FPTable-search-container"}>
            <input placeholder={"Search..."} onChange={handleChange} value={searchInput}/>
        </div>
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
        </div>
    )

}

export default  FinalProductsTable