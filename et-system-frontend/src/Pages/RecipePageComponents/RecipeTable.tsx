import React, {ChangeEvent, useEffect, useMemo, useState} from "react";
import {getCoreRowModel, useReactTable} from "@tanstack/react-table";
import "../AddRecipePageComponents/ARPStylesheet.css"

const RecipeTable = ({setSelectedRow, selectedRow, rawData, dataType}) => {

    const tableClassName = dataType === 'recipe' ? 'RPTable-grid' : 'ARPTable-grid'

    const [tableData, setTableData] = useState([])
    const [filteredTableData, setFilteredTableData] = useState([])
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
        const recipesTableData = data.map((dataElement) => (
            {
                id: dataElement.id,
                label: dataElement.label
            }
        ));
        return recipesTableData
    }

    const handleChange = (event : ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setSearchInput(event.target.value)
    }

    const handleClick = (event: React.MouseEvent, id : number) => {
        if (id !== undefined){
            setSelectedRow(id)
            console.log("Selected" +  dataType + ": " + id);
        }
        else{
            console.log("Empty row clicked");
        }
    }

    useEffect(() => {
        if (searchInput.length > 0){
            setFilteredTableData(tableData.filter((row) => {
                return row.label.match(searchInput)
                    || row.id.toString().match(searchInput)
            }))
        } else{
            setFilteredTableData(tableData)
        }
    }, [searchInput]);

    useEffect(() => {
        // Have to check if the data is undefined, because there can be no data passed
        if(rawData !== undefined){
            if(rawData.length > 0) {
                generateTableData(rawData).then(recipesTableData => {
                    setTableData(recipesTableData)
                    setFilteredTableData(recipesTableData)
                })
            }
        }
        console.log(rawData);
    }, [rawData]);

    const table = useReactTable({
        data: filteredTableData,
        columns: columns,
        getCoreRowModel: getCoreRowModel()
    })

    return <div className={tableClassName}>
        <div className={"RPTable-search-container"}>
            <label>Select an item</label>
            <input placeholder={"Search " + dataType + "... "} onChange={handleChange} value={searchInput}/>
        </div>
        <div className={"RPTable-content-div"}>
            <table>
                <tbody>
                {table.getRowModel().rows.map(row => (<tr
                    key={row.id}
                    onClick={(event) => {handleClick(event, row.original.id)}}
                    className={(row.original.id === selectedRow) ? 'RP-selected-row' : 'RP-unselected-row'}>
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