import React, {useMemo} from "react"
import {flexRender, getCoreRowModel, HeaderGroup, useReactTable} from "@tanstack/react-table";

interface TableRow{
    id: number,
    label: string,
    oldWeight: number
    newWeight: number
}

interface PropTypes{
    products: TableRow[]
}

const UpdatedProductsTable = (props : PropTypes) => {
    //Destructure props
    const products = props.products

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
            header: 'Old Weight',
            accessorKey: 'oldWeight',
            size: 10,
        },
        {
            header: 'New Weight',
            accessorKey: 'newWeight',
            size: 10,
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
            <div className={'BSP3-table-title'}>
                <p>Used Items</p>
            </div>
            <div className={'BSP3-products-table-headers'}>
                <table>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}
                            className={'BSP3-tr'}
                            style={{gridTemplateColumns: getTemplateColumns(headerGroup)}}
                        >
                            {headerGroup.headers.map(header =>
                                <th
                                    className={'BSP3-th'}
                                    key={header.id}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            )
                            }
                        </tr>
                    ))}
                </table>
            </div>
            <div className={'BSP3-products-table-rows'}>
                <table>
                    <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}
                            className={'BSP3-tr'}
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

export default UpdatedProductsTable