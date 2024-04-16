import {flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import React, {useMemo} from "react";
import {OrderedFinalProduct} from "../Interfaces/OrderedFinalProduct";

// @ts-ignore
const SelectedFinalProductsTable = ({selectedData, setSelectedData, nonSelectedData, setNonSelectedData, searchData, setSearchData}) => {

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

    const updateNonSelectedData = (rowData: any, data: OrderedFinalProduct[], setData) => {
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
    }

    const handleClickMinus = (event: MouseEvent, row: HTMLTableRowElement) => {
        const rowData = row.original
        // If the quantity is 1, the row should be removed after clicking the button
        if(rowData.quantity === 1){
            // Filtering out the row that should be removed
            const newSelectedData = selectedData.filter(x => x.key !== rowData.key)
            setSelectedData(newSelectedData)
            // Adding the row to the data of the other table
            updateNonSelectedData(rowData, nonSelectedData, setNonSelectedData)
            updateNonSelectedData(rowData, searchData, setSearchData)
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
            updateNonSelectedData(rowData, nonSelectedData, setNonSelectedData)
            updateNonSelectedData(rowData, searchData, setSearchData)
        }
    }

    const table = useReactTable({
        data: selectedData,
        columns: columns,
        getCoreRowModel: getCoreRowModel()
    }, [selectedData])

    return(
        <div style={{height: "435px"}}className={'FPTable-grid'}>
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