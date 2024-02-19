import React, {ChangeEvent, useEffect, useMemo, useState} from "react";
import {getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {Recipe} from "../Interfaces/Recipe";

const RecipeTable = ({selected, rawData}) => {

    const [tableData, setTableData] = useState([])
    const [searchInput, setSearchInput] = useState("")

    const columns = useMemo(() => [
        {
            header: 'ID',
            accessorKey: 'id'
        },
        {
            header: 'Label',
            accessorKey: 'label'
        }
    ], [])

    const generateTableData = async (data: any[]) => {
        let recipesTableData: any[] = [];
        data.map((recipe: Recipe) => {
            recipesTableData.push({
                id: recipe.id,
                label: recipe.label
            });
        })
        setTableData(recipesTableData)
    }

    const handleChange = (event : ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setSearchInput(event.target.value)
    }

    useEffect(() => {
        // Have to check if the data is undefined, because there can be no data passed
        if(rawData !== undefined){
            if(rawData.length > 0) {
                generateTableData(rawData).then()
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
                    key={row.original.id}
                    className={'RP-unselected-row'}>
                    <td style={{width: '10%', textAlign: 'center'}}>{row.original.id}</td>
                    <td style={{width: '90%'}}>{row.original.label}</td>
                </tr>))
                }
                </tbody>
            </table>
        </div>
    </div>
}

export default RecipeTable