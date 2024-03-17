import React, {ChangeEvent, useEffect, useMemo, useState} from "react";
import {getCoreRowModel, useReactTable} from "@tanstack/react-table";
import "../AddRecipePageComponents/ARPStylesheet.css"


// @ts-ignore
const RecipeTable = ({setSelectedRow, selectedRow, rawData}) => {

    const [tableData, setTableData] = useState<any[]>([])
    const [filteredTableData, setFilteredTableData] = useState<any[]>([])
    const [searchInput, setSearchInput] = useState("")

    const columns = useMemo(() => [
        {
            header: 'Name',
            accessorKey: 'name'
        }
    ], [])

    const handleChange = (event : ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setSearchInput(event.target.value)
        event.stopPropagation();
    }

    // This handles selecting a row
    const handleClick = (event: React.MouseEvent, id : number) => {
        if (id !== undefined){
            setSelectedRow(id)
        }
    }

    // Searches for the ingredients in data
    useEffect(() => {
        if (searchInput.length > 0){
            setFilteredTableData(tableData.filter((row) => {
                return row.name.match(RegExp(searchInput, 'i'))
            }))
        } else{
            // if there is no searching show all the tableData
            setFilteredTableData(tableData)
        }
    }, [searchInput]);

    useEffect(() => {
        if(rawData !== undefined){
            if(rawData.length > 0) {
                    setTableData(rawData)
                    setFilteredTableData(rawData)
            }
        }
    }, [rawData]);

    const table = useReactTable({
        data: filteredTableData,
        columns: columns,
        getCoreRowModel: getCoreRowModel()
    })

    return <div className={'ARPTable-grid'}>
        <div className={"RPTable-search-container"}>
            <label>Select an ingredient</label>
            <input placeholder={"Search..."} onChange={handleChange} value={searchInput}/>
        </div>
        <div className={"ARPTable-content-div"}>
            <table>
                <tbody>
                {table.getRowModel().rows.map(row => (<tr
                    key={row.id}
                    onClick={(event) => {handleClick(event, row.original.id)}}
                    className={(row.original.id === selectedRow) ? 'RP-selected-row' : 'RP-unselected-row'}>
                    <td style={{paddingLeft: '20px'}}>{row.original.name}</td>
                </tr>))
                }
                </tbody>
            </table>
        </div>
    </div>
}

export default RecipeTable