import React, {useEffect, useMemo, useState} from "react";
import {flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {UsedProduct} from "../Interfaces/UsedProduct";

const ScannedProductsTable = ({scannedProducts}) => {

    const[tableData, setTableData] = useState([])

    const columns = useMemo(() => [
        {
            header: "Product ID",
            accessorKey: "productID",
            size: 20
        },
        {
            header: "Ingredient",
            accessorKey: "ingredientType",
            size: 20
        },
        {
            header: "Weighted quantity",
            accessorKey: "weight",
            size: 30
        }
    ], [])

    const generateTableData = async (data: UsedProduct[]) => {
        const newTableData = data.map((dataElement: UsedProduct) => (
            {
                productID: dataElement.product.id,
                ingredientType: dataElement.product.ingredientType.name,
                weight: dataElement.weight
            }
        ))
        return newTableData
    }

    useEffect(() => {
        generateTableData(scannedProducts).then(newTableData => {
            setTableData(newTableData)
        })
    })

    const table = useReactTable({
        data: tableData,
        columns: columns,
        getCoreRowModel: getCoreRowModel()
    })

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
                        </tr>)
                    )
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )

}

export default ScannedProductsTable