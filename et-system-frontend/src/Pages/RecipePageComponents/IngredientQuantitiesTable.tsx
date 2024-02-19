import React, {useEffect, useMemo, useState} from "react";
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
        const tempTableData = data.map((ingredientQuantity: IngredientQuantity) => ({
                ingredient: ingredientQuantity.ingredient.label,
                quantity: ingredientQuantity.quantity
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
        <div className={"table"}>
            <div>

            </div>
            <div>
                <table>
                    <tbody>
                    {table.getRowModel().rows.map(row => (<tr
                            key={row.id}>
                            <td style={{width: '80%'}}>{row.original.ingredient}</td>
                            <td style={{width: '20%', textAlign: 'center'}}>{row.original.quantity}</td>
                        </tr>))}
                    </tbody>

                </table>
            </div>
        </div>
    )
}

export default IngredientQuantitiesTable