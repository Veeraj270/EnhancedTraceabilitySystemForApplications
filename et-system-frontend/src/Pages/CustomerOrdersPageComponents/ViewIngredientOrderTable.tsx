import React, {useMemo} from "react";
import {Table1Row, Table3Row} from "./COPInterfaces";
import {flexRender, getCoreRowModel, HeaderGroup, useReactTable} from "@tanstack/react-table";

interface PropTypes{
    table3Data: Table3Row[]
}

const ViewIngredientOrderTable = (props : PropTypes) => {
    const columns = useMemo(() => [
        {
            header: "Label",
            accessorKey: "label",
            size: 20
        },
        {
            header: "quantity",
            accessorKey: "quantity",
            size: 20
        },
        {
            header: "GTIN",
            accessorKey: "gtin",
            size: 20
        },

    ], [])

    //Table definition
    const table = useReactTable({
        data: props.table3Data,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
    });

    //For table column formatting
    const getTemplateColumns = (headerGroup : HeaderGroup<Table1Row>): string => {
        let output  = "";
        headerGroup.headers.forEach(header  => {
            output += `${header.column.getSize()}fr `
        })
        return output;
    }

    const templateColumnStyle = getTemplateColumns(table.getHeaderGroups()[0]);

    //Render table
    return (
        <div className={'COP-table-grid'}>
            <div className={'COP-table-header-div'}>
                <table>
                    <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}
                            className={'COP-tr'}
                            style={{gridTemplateColumns: getTemplateColumns(headerGroup)}}
                        >
                            {headerGroup.headers.map(header =>
                                <th
                                    className={'COP-th'}
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
            <div className={'COP-table-rows-div'}>
                <table>
                    <tbody>
                    {table.getCoreRowModel().rows.map(row => (
                        <tr key={row.id}
                            className={'COP-tr'}
                            style={{gridTemplateColumns: templateColumnStyle}}
                        >
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id}
                                    className={'COP-td'}
                                >
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>)
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ViewIngredientOrderTable;