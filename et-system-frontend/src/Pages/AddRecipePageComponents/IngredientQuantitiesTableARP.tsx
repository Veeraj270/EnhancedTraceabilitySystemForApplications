import React, {useMemo} from "react";
import {flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import '../AddRecipePageComponents/ARPStylesheet.css'

const IngredientQuantitiesTableARP = ({ingredientQuantities, recipe, setRecipe}) => {

    const columns = useMemo(() => [
        {
            header: "Ingredient",
            accessorKey: "ingredientType"
        },
        {
            header: "Quantity",
            accessorKey: "quantity"
        },
        {
            header: "",
            accessorKey: "delete"
        }
    ], [ingredientQuantities])

    const table = useReactTable({
        data: ingredientQuantities,
        columns: columns,
        getCoreRowModel: getCoreRowModel()
    })

    // Getting the id of the row that's clicked and removing that element.
    // Not sure if this is the best way but it works for now
    const deleteFromTable = (event) => {
        console.log(event.target.parentNode.getAttribute('id'))
        const newIngredientQuantities = [...recipe.ingredientQuantities]
            newIngredientQuantities.splice(event.target.parentNode.getAttribute('id'), 1)
        console.log(newIngredientQuantities)
        setRecipe({...recipe, ingredientQuantities: newIngredientQuantities})
    }

    return (
        <div className={'table-container'}>
                <table className={'IGTable'}>
                    <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => <th key={header.id}>
                                {flexRender(header.column.columnDef.header, header.getContext())}
                            </th>)}
                        </tr>
                    ))}
                    </thead>
                    <tbody>
                    {table.getCoreRowModel().rows.map(row => (<tr
                            id={row.id}>
                            <td style={{width: '55%'}}>{row.original.ingredientType.name}</td>
                            <td style={{width: '35%'}}>{row.original.quantity}</td>
                            <td style={{width: '10%'}} onClick={deleteFromTable}>X</td>
                        </tr>))}
                    </tbody>
                </table>
        </div>
    )
}

export default IngredientQuantitiesTableARP