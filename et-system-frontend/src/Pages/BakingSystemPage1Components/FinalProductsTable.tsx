import {ChangeEvent, useEffect, useMemo, useState} from "react";
import {flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import React from "react";

const FinalProductsTable = ({rawData, setRawData}) => {

    const [tableData, setTableData] = useState([]);
    const [searchInput, setSearchInput] = useState("")
    const [selectedData, setSelectedData] = useState([])

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
        data.forEach(x => console.log(x))
        const tableData = data.map((productAndOrder) => (
            {
                customerOrder: productAndOrder.customerOrder.id,
                finalProduct: productAndOrder.finalProduct.label,
                quantity: productAndOrder.quantity
            }
        ))
        console.log(tableData)
        return tableData
    }

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
                generateTableData(rawData).then(finalProductsTableData => {
                        setTableData(finalProductsTableData)
                    }).catch(error => console.error("Error generating table data:", error))
        }
    }, [rawData])

    const handleClickPlus = (event: MouseEvent, row: HTMLTableRowElement) => {
        const rowData = row.original
        if(rowData.quantity === 1){
            const newData = rawData.filter(x => x.customerOrder.id !== rowData.customerOrder
            || x.finalProduct.label !== rowData.finalProduct)
            setTableData(newData)
        }else{
            const newData = rawData.map(item => {
                console.log(item.customerOrder.id + " " + rowData.customerOrder)
                if (item.customerOrder.id === rowData.customerOrder
                    && item.finalProduct.label === rowData.finalProduct) {
                    return { ...item, quantity: item.quantity - 1 };
                    console.log("changed")
                }
                return item;
            });
            setRawData(newData)
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