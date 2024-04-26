import React, {useEffect, useMemo, useState} from "react";
import {flexRender, getCoreRowModel, HeaderGroup, useReactTable} from "@tanstack/react-table";
import {UsedProduct} from "../BakingSystemInterfaces";

interface PropTypes{
    scannedProducts: UsedProduct[]
}

interface TableRow{
    productID: number,
    productLabel: string,
    weight: number
}

const ScannedProductsTable = (props : PropTypes) => {
    //Destructure props
    const scannedProducts = props.scannedProducts;

    //State variables
    const[tableData, setTableData] = useState<TableRow[]>([])

    //Column definitions
    const columns = useMemo(() => [
        {
            header: "Product ID",
            accessorKey: "productID",
            size: 20
        },
        {
            header: "Label",
            accessorKey: "productLabel",
            size: 20
        },
        {
            header: "Amount Used",
            accessorKey: "weight",
            size: 30
        }
    ], [])

    useEffect(() => {
        const newTableData = scannedProducts.map((UP: UsedProduct) : TableRow => (
            {
                productID: UP.product.id,
                productLabel: UP.product.label ? UP.product.label : "No label",
                weight: UP.weightUsed
            }
        ))
        setTableData(newTableData)
    }, [scannedProducts])


    //Table definition
    const table = useReactTable({
        data: tableData,
        columns: columns,
        getCoreRowModel: getCoreRowModel()
    })

    //For table column formatting
    const getTemplateColumns = (headerGroup : HeaderGroup<TableRow>): string => {
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
                            style={{gridTemplateColumns: templateColumnStyle}}
                        >
                            {headerGroup.headers.map(header =>
                                <th key={header.id}
                                    className={'BSP1-th'}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>)}
                        </tr>
                    ))}
                </table>
            </div>
            <div className={'BSP1-FP-table-1-rows-div'}>
                <table>
                    <tbody>
                    {table.getCoreRowModel().rows.map(row =>
                        (<tr key={row.id}
                             className={'BSP1-tr'}
                             style={{gridTemplateColumns: templateColumnStyle}}
                            >
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id}
                                        className={'BSP1-td'}
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )

}

export default ScannedProductsTable