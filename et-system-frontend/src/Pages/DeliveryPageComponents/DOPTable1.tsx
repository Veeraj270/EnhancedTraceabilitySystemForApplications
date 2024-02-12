import React, {useState, useMemo, useEffect} from "react";
import "./DPStylesheet.css"
import {flexRender, getCoreRowModel,  useReactTable} from "@tanstack/react-table";
import {PlannedDelivery} from "../Interfaces/PlannedDelivery";


// @ts-ignore
const DOPTable1 = ( {setSelected, selected, rawData} ) => {
    const empty: any[] = []
    const [tableData, setTableData] = useState(empty)
    const [filteredTableData, setFilteredTableData] = useState(empty)
    const [searchInput, setSearchInput] = useState("")

    const generateTableData = async (data: any[]) => {
        try{
            const regex = /[0-9]{4}-[0-9]{2}-[0-9]{2}/;
            let formattedTableData: any[] = []; //Should remove any later
            data.map((plannedDelivery: PlannedDelivery) => {
                //Extract Date via regex
                const dateDue : string | undefined = plannedDelivery.deliveryTime.match(regex)?.at(0)
                formattedTableData.push({
                    id: plannedDelivery.id,
                    name: plannedDelivery.name,
                    dateDue: dateDue ? dateDue : "error",
                    type: plannedDelivery.deliveryInterval == "P0D" ? "One-of" : "Recurring",
                    status: "Unknown", //Placeholder
                });
            })

            setTableData(formattedTableData)
            setFilteredTableData(formattedTableData)
        } catch (error){
            console.log("Error with generateTableData(): ", error);
        }
    }

    //If searchInput changes, update filteredTableData
    useEffect(() => {
        if (searchInput.length > 0){
            setFilteredTableData(tableData.filter((row) => {
                return row.name.match(searchInput)
            }))
        } else{
            setFilteredTableData(tableData)
        }
        }, [searchInput]);

    //Initially generate table data upon component render
    useEffect(() => {
        //Don't know why .rawScheduledData is required - FIX LATER
        if (rawData.length > 0){
            generateTableData(rawData).then();
        }
        console.log(rawData);
    }, [rawData]);

    //Column Definitions
    const columns = useMemo(() => [
        {
            header: 'ID',
            accessorKey: 'id'
        },
        {
            header: 'Name',
            accessorKey: 'name'
        },
        {
            header: 'Date Due',
            accessorKey: 'dateDue'
        },
        {
            header: 'Type',
            accessorKey: 'type'
        },
        {
            header: 'Status',
            accessorKey: 'status'
        }], [])

    //Instantiates the tanstack table
    const table = useReactTable({
        data: filteredTableData,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
    })

    //Implements selectable rows
    const handleClick = (event: React.MouseEvent, id : number) => {
        if (id !== undefined){
            setSelected(id)
            console.log("Selected Delivery: " + id);
        }
        else{
            console.log("Empty row clicked");
        }
    }

    //For search bar input field
    const handleChange = (event : any) => {
        event.preventDefault();
        setSearchInput(event.target.value)
    }

    //Render
    return (
        <div className={'DOP-T-grid'}>

            <div className={"DOP-T-search-container"}>
                <label>Search scheduled deliveries</label>
                <input placeholder={"Search... "} onChange={handleChange} value={searchInput}/>
            </div>

            <div className={'DOP-T-headers-div'}>
                <table>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => <th key={header.id}>
                            {flexRender(header.column.columnDef.header, header.getContext())}
                        </th>)}
                    </tr>
                ))}
            </table>
            </div>
            <div className={'DOP-T-content-div'}>
                <table>
                <tbody>
                {table.getRowModel().rows.map(row => (<tr
                    key={row.id}
                    onClick={(event) => {handleClick(event, row.original.id)}}
                    className={(row.original.id === selected) ? 'DOP-selected-row' : ''}>
                    {row.getVisibleCells().map(cell => (
                        <td>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                    ))}
                </tr>))
                }
                </tbody>
            </table>
            </div>
        </div>
    )
}

export default DOPTable1