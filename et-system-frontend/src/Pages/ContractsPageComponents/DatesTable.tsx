import React, {useMemo} from "react";
import {Table1Row, Table3Row} from "./COPInterfaces";
import {flexRender, getCoreRowModel, HeaderGroup, useReactTable} from "@tanstack/react-table";
import {Contract} from "./ContractsInterfaces";

interface PropTypes{
    table3Data: Table3Row[],
    order: (contract : Contract, date : String) => Promise<void>
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

    const handleOrderClick = (event: React.MouseEvent, row: any) => {
        const original = row.original as Table3Row;
        props.order(original.contract, original.date);

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
                            <td className={'Contract-td'}>{row.original.date}</td>
                            <td className={'Contracts-td'}>
                                <button
                                    onClick={(event) => handleOrderClick(event, row)}
                                    className={'Contracts-button-2'}
                                ><b>Order</b></button>
                            </td>
                        </tr>)
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default DatesTable;