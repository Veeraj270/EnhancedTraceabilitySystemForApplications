import React, {useEffect, useMemo, useState} from "react";
import {IngredientQuantity} from "../Interfaces/IngredientQuantity";
import {flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import '../ProductPageComponents/TanStackTable/Table.css'
import './RPStylesheet.css'


const IngredientQuantitiesTable = ({ingredientQuantities}) => {

    const [tableData, setTableData] = useState([])

    const columns = useMemo(() => [
        {
            header: "Ingredient",
            accessorKey: "ingredient"
        },
        {
            header: "Quantity",
            accessorKey: "quantity"
        }
    ], [])

    const generateTableData = async (data: any[]) => {
        const tempTableData = data.map((ingredientQuantity: IngredientQuantity) => ({
                ingredient: ingredientQuantity.ingredient,
                quantity: ingredientQuantity.quantity
        }))
        console.log(tempTableData)
        return tempTableData
    }

    const table = useReactTable({
        data: tableData,
        columns: columns,
        getCoreRowModel: getCoreRowModel()
    })

    useEffect(() => {
        if(ingredientQuantities.length > 0){
            generateTableData(ingredientQuantities)
                .then(tempTableData => {
                    setTableData(tempTableData)})
                .catch(error => console.error("Error generating table data", error));
        }
        console.log(ingredientQuantities)
    }, [ingredientQuantities])

    return (
        <div>
            <div className={'RP-table-content-div'}>
                <table>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => <th key={header.id}>
                                {flexRender(header.column.columnDef.header, header.getContext())}
                            </th>)}
                        </tr>
                    ))}
                    <tbody>
                    {table.getCoreRowModel().rows.map(row => (<tr
                            key={row.id}>
                            <td style={{width: '50%'}}>{row.original.ingredient}</td>
                            <td style={{width: '50%'}}>{row.original.quantity}</td>
                        </tr>))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default IngredientQuantitiesTable