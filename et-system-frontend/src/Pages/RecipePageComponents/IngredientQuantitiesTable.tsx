import React, {useMemo} from "react";
import {flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import '../ProductPageComponents/TanStackTable/Table.css'
import './RPStylesheet.css'

const IngredientQuantitiesTable = ({ingredientQuantities, recipe, setRecipe}) => {

    const columns = useMemo(() => [
        {
            header: "Ingredient",
            accessorKey: "ingredient type"
        },
        {
            header: "Quantity",
            accessorKey: "quantity"
        },
        {
            header: "",
            accessorKey: "delete"
        }
    ], [])

    const table = useReactTable({
        data: ingredientQuantities,
        columns: columns,
        getCoreRowModel: getCoreRowModel()
    })

    const deleteFromTable = (event) => {
        setRecipe({...recipe, ingredientQuantities: []})
    }

    return (
        <div>
                <table className={'IGTable'}>
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
                            <td style={{width: '55%'}}>{row.original.ingredientType.name}</td>
                            <td style={{width: '35%'}}>{row.original.quantity}</td>
                            <td style={{width: '10%'}} onClick={deleteFromTable}>X</td>
                        </tr>))}
                    </tbody>
                </table>
        </div>
    )
}

export default IngredientQuantitiesTable