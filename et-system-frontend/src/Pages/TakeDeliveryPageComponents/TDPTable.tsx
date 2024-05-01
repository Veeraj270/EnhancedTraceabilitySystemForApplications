import {
    getCoreRowModel,
    flexRender,
    useReactTable, HeaderGroup,
} from '@tanstack/react-table'

import React, {useEffect, useMemo, useState} from "react";
import Item from "../Interfaces/DeliveryItem";
import {Table1Row} from "../CustomerOrdersPageComponents/COPInterfaces";

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
            size: 50,
        },
        {
            header: 'GTIN',
            accessorKey : 'gtin',
            size: 50,
        }
    ],[])

    const [tableData, setTableData] = useState(props.data)

    //Runs whenever props changes - triggers a re-render
    useEffect(() => {
        setTableData([...props.data])
    }, [props.data]);

    //Table definition
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

    //Rendering of tables
    return (
        <div className={'TDP-T-grid'}>
            <div className={'TDP-T-title-div'}>
                <h3 className={'TDP-T-title'}>{props.title}</h3>
            </div>
            <div className={'TDP-T-headers-div'}>
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
            <div className={'TDP-T-content-div'}>
                <table>
                    <tbody>
                    {table.getRowModel().rows.map(row => (<tr key={row.id} className={'TDP-tr'} style={{gridTemplateColumns: templateColumnStyle}}>
                        {row.getVisibleCells().map(cell => (
                            <td className={'TDP-td'}>
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

export default TDPTable;