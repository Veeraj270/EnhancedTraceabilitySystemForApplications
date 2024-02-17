import React, {ChangeEvent, useMemo, useState} from "react";
import {flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {Recipe} from "../Interfaces/Recipe";

const RecipeTable = () => {

    const [tableData, setTableData] = useState([])
    const [searchInput, setSearchInput] = useState("")

    const columns = useMemo(() => [
        {
            header: 'ID',
            accessorKey: 'id'
        },
        {
            header: 'Name',
            accessorKey: 'name'
        }
    ], [])

    const generateTableData = async (data: any[]) => {
        let tableData: any[] = [];
        data.map((recipe: Recipe) => {
            tableData.push({
                id: recipe.id,
                label: recipe.label
            })
            setTableData(tableData)
        })
    }

    const handleChange = (event : ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setSearchInput(event.target.value)
    }

    const table = useReactTable({
        data: tableData,
        columns: columns,
        getCoreRowModel: getCoreRowModel()
    })

    return <div className={"RPTable-grid"}>
        <div className={"RPTable-search-container"}>
            <label>Search recipes</label>
            <input placeholder={"Search... "} onChange={handleChange} value={searchInput}/>
        </div>

        <div className={"RPTable-content-div"}>
            <table>
                <tbody>

                        {/*{table.columns.map(column => (*/}
                        {/*    <th key={column.id} style={{ width: `${column.column.getSize()}%`, textAlign: "center" }}>*/}
                        {/*        {flexRender(column.columnDef.header, column.getHeaderProps())}*/}
                        {/*    </th>*/}
                        {/*))}*/}
                </tbody>
            </table>
        </div>
    </div>
}

export default RecipeTable