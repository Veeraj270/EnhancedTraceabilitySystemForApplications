import React, {useMemo} from "react";
import {flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import '../RecipePageComponents/RPStylesheet.css'
import {IngredientQuantity} from "../BakingSystem/BakingSystemInterfaces";



interface PropTypes{
    ingredientTotals: IngredientQuantity[]
}

const IngredientQuantitiesTableRP = ( props: PropTypes) => {
    //Destructure props
    const ingredientTotals = props.ingredientTotals;

    //Column definition
    const columns = useMemo(() => [
        {
            header: "Ingredient",
            accessorKey: "ingredientName",
            size: 50
        },
        {
            header: "Quantity",
            accessorKey: "quantity",
            size: 50
        }
    ], [])

    //Table definition
    const table = useReactTable({
        data: ingredientTotals,
        columns: columns,
        getCoreRowModel: getCoreRowModel()
    })

    //Render Table
    return (
            <div className={'RPTable-container'}>
                <table className={'IGTableRP'}>
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => <th key={header.id} style = {{width: `${header.column.getSize()}%`}}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>)}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getCoreRowModel().rows.map(row => (<tr
                            key={row.id}>
                            <td style={{width: '50%'}}>{row.original.ingredientName}</td>
                            <td style={{width: '50%'}}>{row.original.quantity}</td>
                        </tr>))}
                    </tbody>
                </table>
            </div>
    )
}

export default IngredientQuantitiesTableRP