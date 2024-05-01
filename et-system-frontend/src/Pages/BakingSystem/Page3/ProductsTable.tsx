import React, {useMemo} from "react"
import {flexRender, getCoreRowModel, HeaderGroup, useReactTable} from "@tanstack/react-table";

interface TableRow{
    id: number,
    label: string,
    quantityUsed: number
}

interface PropTypes{
    products: TableRow[]
    selectedProductId: number | null //id of the selected used item
}

const ProductsTable = (props : PropTypes) => {
    //Destructure props
    const products = props.products;
    const selectedProductId = props.selectedProductId;

    //Define Columns
    const columns = useMemo(() =>[
        {
            header: 'ID',
            accessorKey: 'id',
            size: 20,
        },
        {
            header: 'Label',
            accessorKey: 'label',
            size: 60,
        },
        {
            header: 'Quantity Used',
            accessorKey: 'quantityUsed',
            size: 30,
        }
    ],[])

    const table = useReactTable({
        data: products,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
    })

    const getTemplateColumns = (headerGroup : HeaderGroup<TableRow>): string => {
        let output  = "";
        headerGroup.headers.forEach(header => {
            output += `${header.column.getSize()}fr `
        })
        return output;
    }

    const templateColumnStyle = getTemplateColumns(table.getHeaderGroups()[0]);

    return (
        <div className={'BSP3-products-table-grid'}>
            <div className={'BSP3-upper-wrapper'}>
                <div className={'BSP3-table-title'}>
                    <p>Used Items</p>
                </div>
                <div className={'BSP3-products-table-headers'}>
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
            </div>
            <div className={'BSP3-products-table-rows'}>
                <table>
                    <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}
                            className={row.original.id !== selectedProductId ? 'BSP3-tr' : 'BSP3-tr-selected'}
                            style={{gridTemplateColumns: templateColumnStyle}}
                        >
                        {row.getVisibleCells().map(cell => (
                            <td className={'BSP3-td'}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>))
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ProductsTable
