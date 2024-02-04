import {
    getCoreRowModel,
    flexRender,
    useReactTable, getPaginationRowModel, Row,
} from '@tanstack/react-table'

import React, {useEffect, useMemo, useState} from "react";
import Item from "./Interfaces/Item";
import tanTable from "../ProductPageComponents/TanStackTable/TanTable";
import {tab} from "@testing-library/user-event/dist/tab";



interface Props{
    data: Item[]
    rowsPerPage: number
}

const Table : React.FC<Props> = ( props: Props ) => {
    //Define Columns
    const columns= useMemo(()=> [
        {
            header: 'Label',
            accessorKey : 'label'
        },
        {
            header: 'Barcode',
            accessorKey : 'barcode'
        }
    ],[])

    const [tableData, setTableData] = useState<Item[]>(props.data)

    useEffect(() => {
        table.setPageSize(props.rowsPerPage)
        if (props.data.length % props.rowsPerPage > 0 || props.data.length === 0){
            const emptyRows: Item[] = Array(props.rowsPerPage - (props.data.length % props.rowsPerPage)).fill(
                {
                    label: "",
                    barcode: "",
                })
            setTableData([...props.data, ...emptyRows])
        }
    }, [props.data]);

    const table = useReactTable({
        data: tableData ,
        columns: columns ,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })


    const prevPage = () => {
        table.previousPage()
    }

    const nextPage = () => {
        table.nextPage()
    }

    //Rendering of table
    return (
        <div>
            <div>
                {tableData.length > 0 ?
                    <table>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => <th key={header.id}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>)}
                            </tr>
                        ))}
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

                    :
                    <p>no data available</p>
                }
            </div>
            <button className={'table-button'} onClick={prevPage}>Prev</button>
            <button className={'table-button'} onClick={nextPage}>Next</button>
        </div>
    )
}

export default Table;