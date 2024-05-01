import {
    useReactTable,
    getCoreRowModel,
    flexRender, HeaderGroup,
} from '@tanstack/react-table';
import { useEffect, useMemo, useState } from "react";
import React from 'react';
import {Table1Row} from "./ContractsInterfaces";

interface PropTypes {
    table1Data: Table1Row[]
    genOrder: (orderID: number) => void
}

const ContractsTable = (props : PropTypes) => {
    //Column definitions
    const columns = useMemo(() => [
        {
            header: "Client",
            accessorKey: "client",
            size: 20
        },
        {
            header: "Duration",
            accessorKey: "duration",
            size: 20
        },
        {
            header: "Frequency",
            accessorKey: "frequency",
            size: 20
        },
        {
            header: "",
            accessorKey: "gen",
            size: 20
        }

    ], [])


    //Click handlers

    const handleGenClick = (event: React.MouseEvent, row: any) => {
        const original = row.original as Table1Row;
        props.genOrder(original.id);
    }

    //Table definition
    const table = useReactTable({
        data: props.table1Data,
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

    //Render the table
    return (
        <div className={'Contracts-table-grid'}>
            <div className={'Contracts-table-header-div'}>
                <table>
                    <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}
                            className={'Contracts-tr'}
                            style={{gridTemplateColumns: getTemplateColumns(headerGroup)}}
                        >
                            {headerGroup.headers.map(header =>
                                <th
                                    className={'Contracts-th'}
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
            <div className={'Contracts-table-rows-div'}>
                <table>
                    <tbody>
                    {table.getCoreRowModel().rows.map(row => (
                        <tr key={row.id}
                            className={'Contracts-tr'}
                            style={{gridTemplateColumns: templateColumnStyle}}
                        >
                            <td className={'Contracts-td'}>{row.original.client}</td>
                            <td className={'Contracts-td'}>{row.original.duration}</td>
                            <td className={'Contracts-td'}>{row.original.frequency}</td>
                            <td className={'Contracts-td'}>
                                <button
                                    onClick={(event) => {handleGenClick(event, row)}}
                                    className={'Contracts-button-2'}
                                ><b>See Dates</b></button>
                            </td>
                        </tr>)
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ContractsTable;