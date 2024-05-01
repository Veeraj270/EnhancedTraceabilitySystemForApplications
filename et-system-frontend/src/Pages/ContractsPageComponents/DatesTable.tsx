import React, {useMemo} from "react";
import {Table1Row, Table3Row} from "./COPInterfaces";
import {flexRender, getCoreRowModel, HeaderGroup, useReactTable} from "@tanstack/react-table";

interface PropTypes{
    table3Data: Table3Row[],
}

const DatesTable = (props : PropTypes) => {
    const columns = useMemo(() => [
        {
            header: "Date",
            accessorKey: "date",
            size: 20
        },
        {
            header: "",
            accessorKey: "order",
            size: 20
        },

    ], [])

    const handleGenClick = (event: React.MouseEvent, row: any) => {
        const original = row.original as Table1Row;
        //props.orderDates();
    }

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
        <div className={'Contract-table-grid'}>
            <div className={'Contract-table-header-div'}>
                <table>
                    <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}
                            className={'Contract-tr'}
                            style={{gridTemplateColumns: getTemplateColumns(headerGroup)}}
                        >
                            {headerGroup.headers.map(header =>
                                <th
                                    className={'Contract-th'}
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
            <div className={'Contract-table-rows-div'}>
                <table>
                    <tbody>
                    {table.getCoreRowModel().rows.map(row => (
                        <tr key={row.id}
                            className={'Contract-tr'}
                            style={{gridTemplateColumns: templateColumnStyle}}
                        >
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id}
                                    className={'Contract-td'}
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

export default DatesTable;