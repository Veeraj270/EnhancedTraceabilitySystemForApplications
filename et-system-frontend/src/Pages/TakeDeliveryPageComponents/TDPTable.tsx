import {
    getCoreRowModel,
    flexRender,
    useReactTable,
} from '@tanstack/react-table'

import React, {useEffect, useMemo, useState} from "react";
import Item from "../Interfaces/DeliveryItem";

interface Props{
    data: any
    title: string
}

const TDPTable : React.FC<Props> = (props: Props ) => {
    //Define Columns
    const columns= useMemo(()=> [
        {
            header: 'Label',
            accessorKey : 'label',
            maxSize: 50,
            size: 50,
            minSize: 50,
        },
        {
            header: 'GTIN',
            accessorKey : 'gtin',
            maxSize: 50,
            size: 50,
            minSize: 50,
        }
    ],[])

    const [tableData, setTableData] = useState(props.data)

    //Runs whenever props changes - triggers a re-render
    useEffect(() => {
        setTableData([...props.data])
    }, [props.data]);

    const table = useReactTable({
        data: tableData ,
        columns: columns ,
        getCoreRowModel: getCoreRowModel(),
    })

    //Rendering of tables
    return (
        <div>
            <div className={'TDP-T-grid'}>
                <div className={'TDP-T-title-div'}>
                    <h3 className={'TDP-T-title'}>{props.title}</h3>
                </div>
                <div className={'TDP-T-headers-div'}>
                    <table>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id} >
                                {headerGroup.headers.map(header => <th key={header.id}  style = {{width: `${header.column.getSize()}%`, textAlign: "left"}}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>)}
                            </tr>
                        ))}
                    </table>
                </div>
                <div className={'TDP-T-content-div'}>
                    <table>
                        <tbody>
                        {table.getRowModel().rows.map(row => (<tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td style = {{width: `${cell.column.getSize()}%`,textAlign:"left"}}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>))
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default TDPTable;