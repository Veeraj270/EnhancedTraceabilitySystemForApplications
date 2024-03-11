import {flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import React, {useEffect, useMemo, useState} from "react";
import { CiCircleAlert } from "react-icons/ci";
import { IoIosAlert } from "react-icons/io";
import {CircularProgressbar} from "react-circular-progressbar";

// @ts-ignore
const TDPPopUpTable = ({header , data, iconColor}) => {
    //State variables
    const [tableData, setTableData] = useState(data)

    const columns= useMemo(()=> [
        {
            header: header,
            accessorKey : 'text',
        },
    ],[])

    //Update table whenever table data changes
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
        return collapsedData;
    }


    const toText = (data: any) => {
        let output: any[] = [];
        data.forEach((row: any) => output.push( {text: `${row.quantity} x ${row.label}`}));
        return output;
    }

    //Define table
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
                    <tbody className={"TDP-pop-up-table-tbody"}>
                    {table.getRowModel().rows.map(row => (<tr key={row.id}>
                        {row.getVisibleCells().map(cell => (
                            <td>
                                <p>{flexRender(cell.column.columnDef.cell, cell.getContext())}</p>
                                <p className={"TDP-symbol"}><CiCircleAlert style={{fill: iconColor, stroke: iconColor, strokeWidth: 1}}/></p>
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