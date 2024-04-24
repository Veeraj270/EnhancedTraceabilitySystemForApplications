import React, {useMemo} from "react";
import {flexRender, getCoreRowModel, Header, HeaderGroup, RowModel, useReactTable} from "@tanstack/react-table";
import '../AddRecipePageComponents/ARPStylesheet.css'

// @ts-ignore
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
    const deleteFromTable = (event: React.MouseEvent<HTMLButtonElement>) => {
        //Get index of the IQ within the ingredientQuantities array
        const target = event.target as HTMLElement
        let deleteRowId = target.getAttribute("data-id");

        if (deleteRowId){
            let iType = ingredientQuantities[deleteRowId].ingredientType;

            //Re-add iType to IngredientType table
            setIngredientsData([...ingredientsData, iType].sort((a, b) => a.name.localeCompare(b.name)))

            //Remove IngredientQuantity from the recipe and thus the table
            const newIngredientQuantities = ingredientQuantities.filter((IQ: any) : boolean => IQ.ingredientType.id != iType.id);

            setRecipe({...recipe,
                ingredientQuantities: newIngredientQuantities
            })
        }
        else {
            console.log("Error within deleteFromTable(): deleteRowId is undefined")
        }
    }

    return (
        <div className={'table-container'}>
            <table className={'IGTable'}>
                <thead>
                        {table.getHeaderGroups().map((headerGroup: HeaderGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header: Header) => <th key={header.id} style = {{width: `${header.column.getSize()}%`, textAlign: "center"}}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>)}
                            </tr>
                        ))}
                </thead>
                <tbody>
                        {table.getCoreRowModel().rows.map((row: RowModel) => (<tr
                                id={row.id}>
                                <td style={{width: '55%'}}>{row.original.ingredientType.name}</td>
                                <td style={{width: '35%'}}>{row.original.quantity}</td>
                                <td style={{width: '10%'}} ><button className={'delete-button'} onClick={deleteFromTable} data-id={row.id}>X</button></td>
                            </tr>))}
                </tbody>
            </table>
        </div>
    )
}

export default IngredientQuantitiesTableARP