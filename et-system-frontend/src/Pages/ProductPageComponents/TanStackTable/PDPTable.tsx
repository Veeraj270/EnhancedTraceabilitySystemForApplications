import {
    getCoreRowModel,
    flexRender,
    useReactTable,
} from '@tanstack/react-table'
import {useEffect, useMemo, useState} from "react";
import {Link, useFetchers} from "react-router-dom";
import * as string_decoder from "string_decoder";

const PDPTable = () => {
    //Hooks should be called at the top level in the body of a function component
    const emptyData: tableRow[] = [];
    const [ tableData , setTableData ] = useState(emptyData)

    //Data type for table row
    type tableRow = {
        id: string
        gtin: string
        label: string
        ingredientType: string
        quantity: string
    }

    //Column definition
    const columns = useMemo( () => [
        {
            header: 'Id',
            accessorKey: 'id',
        },
        {
            header: 'GTIN',
            accessorKey: 'gtin'
        },
        {
            header: 'Label',
            accessorKey: 'label'
        },
        {
            header:'Ingredient Type',
            accessorKey: 'ingredientType'

        },
        {
            header: 'Quantity',
            accessorKey: 'quantity'
        },
    ], [])

    const fetchRawData = async () => {
        const res = await fetch("http://localhost:8080/api/products/fetch-products")
        if (!res.ok){
            throw new Error("fetch-products response was not ok")
        }
        return await res.json();
    }


    const formatRows = ( rawData: any ): tableRow[] => {
        console.log(rawData);

        let rows : tableRow[] = [];

        rawData.forEach((product: any) => {
            let newRow = {
                id: product.id,
                gtin: product.gtin,
                label: product.label,
                ingredientType: product.ingredientType ? product.ingredientType.name : "",
                quantity: `${product.currentQuantity}/${product.maxQuantity}`
            }

            rows.push(newRow);
        })

        return rows;
    }

    useEffect(() => {
        fetchRawData().then((rawData) => {
                let formattedRows  = formatRows(rawData);
                setTableData(formattedRows)
            }
        )
    }, [])

    //Here table is the core table object that contains the table state and APIs
    //This is the bare minimum for table initialisation
    const table = useReactTable({
        data: tableData,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
    })

    //Rendering of table
    return (
        <div className={'tan-table'}>
            {tableData ?
                <table className={'table-style'}>
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
                    </tr>))}
                    </tbody>
                </table>
                :
                <p>no data available</p>
            }
        </div>
    )
}

export default PDPTable