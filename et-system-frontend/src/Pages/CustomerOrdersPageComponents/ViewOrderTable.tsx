import React, {useMemo} from "react";
import {Table1Row, Table2Row} from "./COPInterfaces";
import {flexRender, getCoreRowModel, HeaderGroup, useReactTable} from "@tanstack/react-table";

interface propTypes {
    table2Data : Table2Row[],
}

const ViewOrderTable = (props : propTypes) => {

    //Column definitions
    const columns = useMemo(() => [
        {
            header: "Product Label",
            accessorKey: "label",
            size: 70
        },
        {
            header: "Quantity",
            accessorKey: "quantity",
            size: 30
        },
    ], [])

    const table = useReactTable({
        data: props.table2Data,
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

export default ViewOrderTable;