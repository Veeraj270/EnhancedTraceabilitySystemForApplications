import React, {useMemo} from "react";
import {flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import '../RecipePageComponents/RPStylesheet.css'

const IngredientQuantitiesTableRP = ({ingredientQuantities}) => {

    const columns = useMemo(() => [
        {
            header: "Ingredient",
            accessorKey: "ingredientType"
        },
        {
            header: "Quantity",
            accessorKey: "quantity"
        }
    ], [ingredientQuantities])

    const table = useReactTable({
        data: ingredientQuantities,
        columns: columns,
        getCoreRowModel: getCoreRowModel()
    })

    return (
            <div className={'RPTable-container'}>
                <table className={'IGTableRP'}>
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
                            key={row.id}>
                            <td style={{width: '50%'}}>{row.original.ingredientType.name}</td>
                            <td style={{width: '50%'}}>{row.original.quantity}</td>
                        </tr>))}
                    </tbody>
                </table>
            </div>
    )
}

export default IngredientQuantitiesTableRP