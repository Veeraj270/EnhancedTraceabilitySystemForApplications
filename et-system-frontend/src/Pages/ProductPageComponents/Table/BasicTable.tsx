import { useMemo } from 'react';
import { useTable }  from 'react-table';
import { useEffect, useState } from 'react'

import  Columns  from './Columns.js';
import './Table.css'

const BasicTable = () => {
    //Stops data from being recreated on every render
    //Memoize data
    const columns = useMemo(() => Columns, [])
    const [ data, setData ] = useState([])


    //Needs work
    useEffect(() => {
        const fetchData = async () : Promise<void> => {
            const res = await fetch("http://localhost:8080/api/products/fetch-products");
            const data = await res.json();

            console.log(data)

            setData(data);
        }

        fetchData()
    }, []); //Empty dependency array therefore runs at least once when component mounts


    //Create table instance
    const tableInstance = useTable({
        columns: columns,
        data: data
    })

    const { getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance


    return (
        <table {...getTableProps()}>
            <thead>
                {headerGroups && headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {
                        headerGroup.headers.map(column => (
                            <th{...column.getHeaderProps()}> {column.render('Header')}</th>
                        ))
                    }
                </tr>
                ))}
            </thead>

            <tbody {...getTableBodyProps()}>
                {rows && rows.map(row => {
                        prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {
                                        row.cells.map((cell) => {
                                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        })
                                    }
                                </tr>
                            )
                    })
                }
            </tbody>
        </table>
    )
}

export default BasicTable