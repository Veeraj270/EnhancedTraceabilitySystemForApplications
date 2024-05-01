import React, {useMemo, useState} from "react";
import {Table1Row, Table3Row} from "./ContractsInterfaces";
import {flexRender, getCoreRowModel, HeaderGroup, useReactTable} from "@tanstack/react-table";
import {Contract} from "./ContractsInterfaces";

interface PropTypes{
    table3Data: Table3Row[],
    makeOrder: (contract : Contract, date : String) => Promise<void>
}

const DatesTable = (props : PropTypes) => {

    const [tableData, setTableData] = useState<Table3Row[]>(props.table3Data);

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
        props.makeOrder(original.contract, original.date);

        setTableData(data => data.filter(dataRow => dataRow !== original));
    }

    //Table definition
    const table = useReactTable({
        data: tableData,
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