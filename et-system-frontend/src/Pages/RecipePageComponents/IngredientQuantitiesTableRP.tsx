import React, {useMemo} from "react";
import {flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import '../ProductPageComponents/TanStackTable/Table.css'
import '../RecipePageComponents/RPStylesheet.css'

const IngredientQuantitiesTableARP = ({ingredientQuantities}) => {

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
                    id={row.id}>
                    <td style={{width: '50%'}}>{row.original.ingredientType.name}</td>
                    <td style={{width: '50%'}}>{row.original.quantity}</td>
                </tr>))}
                </tbody>
            </table>
        </div>
    )
}

export default IngredientQuantitiesTableARP