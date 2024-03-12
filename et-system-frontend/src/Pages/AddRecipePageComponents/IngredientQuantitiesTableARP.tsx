import React, {useMemo} from "react";
import {flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import '../AddRecipePageComponents/ARPStylesheet.css'

const IngredientQuantitiesTableARP = ({ingredientQuantities, recipe, setRecipe, ingredientsData, setIngredientsData}) => {

    const columns = useMemo(() => [
        {
            header: "Ingredient",
            accessorKey: "ingredientType",
            size: 55
        },
        {
            header: "Quantity",
            accessorKey: "quantity",
            size: 35
        },
        {
            header: "",
            accessorKey: "delete",
            size: 10
        }
    ], [ingredientQuantities])

    const table = useReactTable({
        data: ingredientQuantities,
        columns: columns,
        getCoreRowModel: getCoreRowModel()
    })

    // Getting the id of the row that's clicked and removing that element.
    // Not sure if this is the best way, but it works for now
    const deleteFromTable = (event: any) => {
        console.log(event.target.parentNode.parentNode.getAttribute('id'))
        const deletedRowID = event.target.parentNode.parentNode.getAttribute('id')
        setIngredientsData([...ingredientsData, ingredientQuantities[deletedRowID].ingredientType].sort((a, b) => a.name.localeCompare(b.name)))
        const newIngredientQuantities = [...recipe.ingredientQuantities]
            newIngredientQuantities.splice(deletedRowID, 1)
        console.log(newIngredientQuantities)
        setRecipe({...recipe, ingredientQuantities: newIngredientQuantities})
    }

    return (
        <div className={'table-container'}>
            <table className={'IGTable'}>
                <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => <th key={header.id} style = {{width: `${header.column.getSize()}%`, textAlign: "center"}}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>)}
                            </tr>
                        ))}
                </thead>
                <tbody>
                        {table.getCoreRowModel().rows.map(row => (<tr
                                id={row.id}>
                                <td style={{width: '60%'}}>{row.original.ingredientType.name}</td>
                                <td style={{width: '40%'}}>{row.original.quantity}</td>
                                <td onClick={deleteFromTable}><button className={'delete-button'}>X</button></td>
                            </tr>))}
                </tbody>
            </table>
        </div>
    )
}

export default IngredientQuantitiesTableARP