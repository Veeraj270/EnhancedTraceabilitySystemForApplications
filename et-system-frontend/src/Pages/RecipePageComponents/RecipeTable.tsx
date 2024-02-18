import React, {ChangeEvent, useEffect, useMemo, useState} from "react";
import {flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {Recipe} from "../Interfaces/Recipe";

const RecipeTable = ({rawData}) => {

    const [tableData, setTableData] = useState([])
    const [searchInput, setSearchInput] = useState("")

    const columns = useMemo(() => [
        {
            header: 'ID',
            accessorKey: 'id'
        },
        {
            header: 'Name',
            accessorKey: 'label'
        }
    ], [])

    // const generateTableData = async (data: any[]) => {
    //     let recipesTableData: any[] = [];
    //     data.map((recipe: Recipe) => {
    //         recipesTableData.push({
    //             id: recipe.id,
    //             label: recipe.label
    //         });
    //     })
    //     setTableData(recipesTableData)
    // }

    const handleChange = (event : ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setSearchInput(event.target.value)
    }

    useEffect(() => {
        // Have to check if the data is undefined, because there can be no data passed
        if(rawData !== undefined){
            if(rawData.length > 0) {
                setTableData(rawData)
            }
        }
        console.log(rawData);
    }, [rawData]);

    const table = useReactTable({
        data: tableData,
        columns: columns,
        getCoreRowModel: getCoreRowModel()
    })

    return <div className={"RPTable-grid"}>
        <div className={"RPTable-search-container"}>
            <input placeholder={"Search recipes... "} onChange={handleChange} value={searchInput}/>
        </div>

        <div className={"RPTable-content-div"}>
            <table>
                <tbody>
                {table.getRowModel().rows.map(row => (<tr
                    key={row.id}
                    className={'RP-unselected-row'}>
                    {row.getVisibleCells().map(cell => (
                        <td style = {{width: `${cell.column.getSize()}%`,textAlign:"center"}}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                    ))}
                </tr>))
                }
                </tbody>
            </table>
        </div>
    </div>
}

export default RecipeTable