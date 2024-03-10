import {flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import React, {useEffect, useMemo, useState} from "react";

// @ts-ignore
const TDPPopUpTable = ({header , data}) => {

    const [tableData, setTableData] = useState(data)

    const columns= useMemo(()=> [
        {
            header: header,
            accessorKey : 'text',
        },
    ],[])

    useEffect(() => {
        setTableData(toText(collapseData(data)));
    }, [data]);


    const collapseData = (data: any): any => {
        let collapsedData: any[] = []
        data.map((item: any) => {
            let foundRow = collapsedData.find((row) => row.gtin === item.gtin)
            if (foundRow){
                foundRow.quantity ++;
            }
            else {
                collapsedData.push(
                    {
                        quantity: 1,
                        label: item.label,
                        gtin: item.gtin,
                    });
            }
        })
        console.log(collapsedData);
        return collapsedData;
    }

    const toText = (data: any) => {
        let output: any[] = [];
        data.forEach((row: any) => output.push( {text: `${row.quantity} x ${row.label}`}));
        console.log(output);
        return output;
    }

    const table = useReactTable({
        data: tableData ,
        columns: columns ,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className={"TDP-pop-up-table"}>
            <div className={"TDP-pop-up-table-header-div"}>
                <table>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id} >
                            {headerGroup.headers.map(header => <th key={header.id}>
                                {flexRender(header.column.columnDef.header, header.getContext())}
                            </th>)}
                        </tr>
                    ))}
                </table>
            </div>
            <div className={"TDP-pop-up-table-content-div"}>
                <table>
                    <tbody>
                    {table.getRowModel().rows.map(row => (<tr key={row.id}>
                        {row.getVisibleCells().map(cell => (
                            <td>
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

export default TDPPopUpTable;