import {flexRender, getCoreRowModel, HeaderGroup, useReactTable} from "@tanstack/react-table";
import React, {useEffect, useMemo, useState} from "react";
import { CiCircleAlert } from "react-icons/ci";
import {Table1Row} from "../CustomerOrdersPageComponents/COPInterfaces";

// @ts-ignore
const TDPPopUpTable = ({header , data, iconColor}) => {
    //State variables
    const [tableData, setTableData] = useState(data)

    const columns= useMemo(()=> [
        {
            header: header,
            accessorKey : 'text',
            size: 100,
        },
    ],[header])

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
        <div className={"TDP-T-popup-grid"}>
            <div className={"TDP-T-headers-div"}>
                <table>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}
                            className={'TDP-tr'}
                            style={{gridTemplateColumns: templateColumnStyle}}
                        >
                            {headerGroup.headers.map(header => <th key={header.id} className={'TDP-th'}>
                                {flexRender(header.column.columnDef.header, header.getContext())}
                            </th>)}
                        </tr>
                    ))}
                </table>
            </div>
            <div className={"TDP-T-content-div"}>
                <table>
                    <tbody>
                    {table.getRowModel().rows.map(row => (<tr key={row.id} className={'TDP-tr'} style={{gridTemplateColumns: templateColumnStyle}}>
                        {row.getVisibleCells().map(cell => (
                            <td className={'TDP-td'}>
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