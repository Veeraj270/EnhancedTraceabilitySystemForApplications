import {useEffect, useMemo, useState} from "react";
import {IngredientQuantity} from "../Interfaces/IngredientQuantity";
import {flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";


const IngredientQuantitiesTable = (ingredientQuantities) => {

    const [tableData, setTableData] = useState([])

    const columns = useMemo(() => [
        {
            header: "Ingredient",
            accessoreKey: "ingredient"
        },
        {
            header: "Quantity",
            accessoreKey: "quantity"
        }
    ], [])

    const generateTableData = async (data: any[]) => {
        const tempTableData = data.map((ingredientQuanity: IngredientQuantity) => ({
                ingredient: ingredientQuanity.ingredient.label,
                quantity: ingredientQuanity.quantity
        }))
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
                .then(tempTableData => {setTableData(tempTableData)})
                .catch("Error generating table data");
        }
        console.log(ingredientQuantities)
    }, [ingredientQuantities])

    return (
        <div className={"tan-table"}>
            <div>

            </div>
            <div>
                <table>
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
            </div>
        </div>
    )
}

export default IngredientQuantitiesTable