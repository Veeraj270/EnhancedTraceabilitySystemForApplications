import React, {ChangeEvent, useEffect, useMemo, useState} from "react";
import {getCoreRowModel, useReactTable} from "@tanstack/react-table";
import "../AddRecipePageComponents/ARPStylesheet.css"

// @ts-ignore
const RecipeTable = ({setSelectedRow, selectedRow, rawData}) => {

    const [tableData, setTableData] = useState([])
    const [filteredTableData, setFilteredTableData] = useState([])
    const [searchInput, setSearchInput] = useState("")

    const columns = useMemo(() => [
        {
            header: 'ID',
            accessorKey: 'id',
            size: 20
        },
        {
            header: 'Label',
            accessorKey: 'label',
            size: 80
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
        }
    }

    useEffect(() => {
        if (searchInput.length > 0){
            setFilteredTableData(tableData.filter((row) => {
                return row.label.match(RegExp(searchInput, 'i'))
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
    }, [rawData]);

    const table = useReactTable({
        data: filteredTableData,
        columns: columns,
        getCoreRowModel: getCoreRowModel()
    })

    //For table column formatting
    const getTemplateColumns = (headerGroup : HeaderGroup<Table1Row>): string => {
        let output  = "";
        headerGroup.headers.forEach(header  => {
            output += `${header.column.getSize()}fr `
        })
        return output;
    }

    const templateColumnStyle = getTemplateColumns(table.getHeaderGroups()[0]);

    return <div className={'RPTable-grid'}>
        <div className={"RPTable-search-container"}>
            <label>Select a recipe</label>
            <input placeholder={"Search..."} onChange={handleChange} value={searchInput}/>
        </div>
        <div className={"RPTable-content-div"}>
            <table>
                <tbody>
                {table.getRowModel().rows.map((row: any) => (<tr
                    key={row.id}
                    onClick={(event) => {handleClick(event, row.original.id)}}
                    className={(row.original.id === selectedRow) ? 'RP-tr-selected' : 'RP-tr'}
                    style={{gridTemplateColumns: templateColumnStyle}}

                >
                    <td className={'RP-td'}>{row.original.id}</td>
                    <td className={'RP-td'}>{row.original.label}</td>
                </tr>))
                }
                </tbody>
            </table>
        </div>
    </div>
}

export default RecipeTable