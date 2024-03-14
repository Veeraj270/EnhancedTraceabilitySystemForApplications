import {
    getCoreRowModel,
    flexRender,
    useReactTable,
} from '@tanstack/react-table'

import React, {useEffect, useMemo, useState} from "react";
import Product from "../../Interfaces/Product";

interface propType{
    setSelected: (n : any) => void;
    selected: any;
    fetchRawData: () => any;
}

const PDPTable = ( props: propType ) => {
    const emptyData: tableRow[] = [];
    const [ tableData , setTableData ] = useState(emptyData)

    //Data type for table row
    type tableRow = {
        id: string
        gtin: string
        label: string
        ingredientType: string
        quantity: string
        rawData: Product
    }

    //REACT HOOKS
    //fetch all products upon initial render
    useEffect(() => {
        fetchRawData().then((rawData) => {
                let formattedRows  = formatRows(rawData);
                setTableData(formattedRows)
            }
        )
    }, [])

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

    //Fetch all products from the product repo
    const fetchRawData = async () => {
        const res = await fetch("http://localhost:8080/api/products/fetch-products")
        if (!res.ok){
            throw new Error("fetch-products response was not ok")
        }
        return await res.json();
    }

    //Format the raw JSON into displayable content - store reference to the original raw JSON
    const formatRows = ( rawData: any ): tableRow[] => {
        let rows : tableRow[] = [];

        rawData.forEach((product: any) => {
            let newRow = {
                id: product.id,
                gtin: product.gtin,
                label: product.label,
                ingredientType: product.ingredientType ? product.ingredientType.name : "",
                quantity: `${product.currentQuantity}/${product.maxQuantity}`,
                rawData: product
            }
            rows.push(newRow);
        })

        return rows;
    }

    //Implements selectable rows
    const handleClick = (event: React.MouseEvent, product: Product) => {
        props.setSelected(product);
    }

    //Tanstack table definition
    const table = useReactTable({
        data: tableData,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
    })

    //Rendering of table
    return (
        <div className={'PDP-table'}>
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
                    {table.getRowModel().rows.map(row => (<tr
                        key={row.id}
                        className={(props.selected && row.original.id == props.selected.id.toString()) ? "PDP-selected-row" : "PDP-row"}
                        onClick={(e) => {handleClick(e, row.original.rawData)}}
                    >
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