import React, {useMemo} from "react";
import {flexRender, getCoreRowModel, HeaderGroup, useReactTable} from "@tanstack/react-table";
import '../RecipePageComponents/RPStylesheet.css'
import {FPData, IngredientQuantity} from "../BakingSystem/BakingSystemInterfaces";



interface PropTypes{
    ingredientTotals: IngredientQuantity[]
}

const IngredientQuantitiesTableRP = ( props: PropTypes) => {
    //Destructure props
    const ingredientTotals = props.ingredientTotals;
    console.log("IngredientTotals: ", props.ingredientTotals)
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

    //For table column formatting
    const getTemplateColumns = (headerGroup : HeaderGroup<FPData>): string => {
        let output  = "";
        headerGroup.headers.forEach(header => {
            output += `${header.column.getSize()}fr `
        })
        return output;
    }

    const templateColumnStyle = getTemplateColumns(table.getHeaderGroups()[0]);

    //Render Table
    return (
            <div className={'BSP1-FP-table-2-grid'}>
                <div className={'BSP1-FP-table-1-header-div'}>
                    <table>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}
                                className={'BSP1-tr'}
                                style={{gridTemplateColumns: templateColumnStyle}}
                            >
                                {headerGroup.headers.map(header =>
                                    <th key={header.id}
                                        className={'BSP1-th'}>
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>)}
                            </tr>
                        ))}
                    </table>
                </div>
                <div className={'BSP1-FP-table-1-rows-div'}>
                    <table>
                        <tbody>
                            {table.getCoreRowModel().rows.map(row =>
                                (<tr key={row.id}
                                     className={'BSP1-tr'}
                                     style={{gridTemplateColumns: templateColumnStyle}}
                                    >
                                        {row.getVisibleCells().map(cell => (
                                            <td key={cell.id}
                                                className={'BSP1-td'}
                                            >
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        ))}
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
    )
}

export default IngredientQuantitiesTableRP