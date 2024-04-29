import {
    useReactTable,
    getCoreRowModel,
    flexRender, HeaderGroup,
} from '@tanstack/react-table';
import { useEffect, useMemo, useState } from "react";
import {Link} from "react-router-dom";
import OrderDeliveriesModal from "./OrderDeliveriesModal";
import {Table1Row} from "./COPInterfaces";
import React from 'react';

interface PropTypes {
    table1Data: Table1Row[]
    viewOrder: (orderID : number) => void
    genIngredientOrder: (orderID: number) => void
}

const CustomerOrdersTable = (props : PropTypes) => {
    //Column definitions
    const columns = useMemo(() => [
        {
            header: "Client",
            accessorKey: "client",
            size: 20
        },
        {
            header: "Date",
            accessorKey: "date",
            size: 20
        },
        {
            header: "Due Date",
            accessorKey: "dueData",
            size: 20
        },
        {
            header: "",
            accessorKey: "view",
            size: 20
        },
        {
            header: "",
            accessorKey: "gen",
            size: 20
        }

    ], [])


    //Click handlers
    const handleViewClick = (event: React.MouseEvent, row: any) => {
        const original = row.original as Table1Row;
        props.viewOrder(original.id);
    }

    const handleGenClick = (event: React.MouseEvent, row: any) => {
        const original = row.original as Table1Row;
        props.genIngredientOrder(original.id);
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
                            <td className={'COP-td'}>{row.original.client}</td>
                            <td className={'COP-td'}>{row.original.date}</td>
                            <td className={'COP-td'}>{row.original.dueDate}</td>
                            <td className={'COP-td'}>
                                <button
                                    onClick={(event) => {handleViewClick(event, row)}}
                                    className={'COP-button-2'}
                                ><b>View</b></button>
                            </td>
                            <td className={'COP-td'}>
                                <button
                                    onClick={(event) => {handleGenClick(event, row)}}
                                    className={'COP-button-2'}
                                ><b>Gen Ingredient Order</b></button>
                            </td>
                        </tr>)
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CustomerOrdersTable;