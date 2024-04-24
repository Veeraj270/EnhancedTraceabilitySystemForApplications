import {ChangeEvent, useEffect, useMemo, useState} from "react";
import {flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import React from "react";
import {OrderedFinalProduct} from "../Interfaces/OrderedFinalProduct";

// @ts-ignore
const FinalProductsTable = ({rawData, setRawData, selectedData, setSelectedData, searchData, setSearchData}) => {

    const [searchInput, setSearchInput] = useState("")

    const columns = useMemo(() => [
        {
            header: "Product",
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
            setSearchData(rawData.filter((row: OrderedFinalProduct) => {
                // Searching matches the label of the final product or the order id
                return row.finalProduct.match(RegExp(searchInput, 'i'))
                || row.customerOrder.toString().match(searchInput)
            }))
        } else{
            setSearchData(rawData)
        }
    }, [searchInput]);

    const updateSelectedData = (rowData : any) => {
        const indexOfElement = selectedData.findIndex((x: OrderedFinalProduct) => x.key === rowData.key)
        // If the item is already in the other table it increases the quantity
        if(indexOfElement !== -1){
            const newSelectedData = selectedData.map((x: OrderedFinalProduct) => {
                if(x.key === rowData.key){
                    return {...x, quantity: x.quantity + 1}
                }else{
                    return x
                }
            })
            setSelectedData(newSelectedData)
        } else{
            // Otherwise it just adds the item to the table
            if(selectedData.length === 0) {
                const newSelectedData = selectedData.concat({...rowData, quantity: 1})
                setSelectedData(newSelectedData)
            } else {
                alert("Select one type of product at a time")
            }
        }
    }

    const handleClickPlus = (event: MouseEvent, row: HTMLTableRowElement) => {
        const rowData = row.original
        // If the quantity is 1, the row should be removed after clicking the button
        if(rowData.quantity === 1){
            // By filtering out the row that should be removed
            const newTableData = rawData.filter((x: OrderedFinalProduct) => x.key !== rowData.key)
            setRawData(newTableData)
            const newSearchData = rawData.filter((x: OrderedFinalProduct) => x.key !== rowData.key)
            setSearchData(newSearchData)
            // Adding the row to the data of the other table
            updateSelectedData(rowData)
        }else{
            // This changes the quantity if the final product that is added
            // to the selected final products
            const newData = rawData.map((x: OrderedFinalProduct) => {
                if(x.key === rowData.key){
                    return {...x, quantity: x.quantity - 1}
                }else{
                    return x
                }
            })
            setRawData(newData)
            // The same goes for the searched data
            const newSearchData = searchData.map((x: OrderedFinalProduct) => {
                if(x.key === rowData.key){
                    return {...x, quantity: x.quantity - 1}
                }else{
                    return x
                }
            })
            setSearchData(newSearchData)
            updateSelectedData(rowData)
        }
    }

    const table = useReactTable({
        data: searchData,
        columns: columns,
        getCoreRowModel: getCoreRowModel()
    })

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