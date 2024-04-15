import {ChangeEvent, useEffect, useMemo, useState} from "react";
import {flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import React from "react";

const FinalProductsTable = ({rawData, setRawData, selectedData, setSelectedData}) => {

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

    const updateSelectedData = (rowData : any) => {
        const indexOfElement = selectedData.findIndex(x => x.key === rowData.key)
        // If the item is already in the other table it increases the quantity
        if(indexOfElement !== -1){
            const newSelectedData = selectedData.map(x => {
                if(x.key === rowData.key){
                    return {...x, quantity: x.quantity + 1}
                }else{
                    return x
                }
            })
            setSelectedData(newSelectedData)
            console.log("Run if: ")
        } else{
            // Otherwise it just adds the item to the table
            const newSelectedData = selectedData.concat({...rowData, quantity: 1})
            setSelectedData(newSelectedData)
            console.log("Run else: ")
        }
    }

    const handleClickPlus = (event: MouseEvent, row: HTMLTableRowElement) => {
        const rowData = row.original
        // If the quantity is 1, the row should be removed after clicking the button
        if(rowData.quantity === 1){
            // By filtering out the row that should be removed
            const newTableData = rawData.filter(x => x.key !== rowData.key)
            console.log("When quantity is 1: " + rawData.at(0).key)
            setRawData(newTableData)
            // Adding the row to the data of the other table
            updateSelectedData(rowData)
        }else{
            // This changes the quantity if the final product that is added
            // to the selected final products
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
    }

    const table = useReactTable({
        data: rawData,
        columns: columns,
        getCoreRowModel: getCoreRowModel()
    }, [rawData])

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