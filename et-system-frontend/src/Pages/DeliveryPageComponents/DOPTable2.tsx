import React, {useState, useMemo, useEffect} from "react";
import "./DPStylesheet.css"
import Item from "../Interfaces/DeliveryItem";
import {flexRender, getCoreRowModel,  useReactTable} from "@tanstack/react-table";


// @ts-ignore
const DOPTable2 = ( {setSelected, selected, rawData} ) => {
    const empty: any[] = []
    const [tableData, setTableData] = useState(empty)
    const [searchInput, setSearchInput] = useState("")
    const [filteredTableData, setFilteredTableData] = useState(empty)

    const generateTableData = async () => {
        try {
            const regex = /[0-9]{4}-[0-9]{2}-[0-9]{2}/;
            let formattedTableData: any[] = [];
            rawData.map((recordedDelivery: any) => {
                //Extract date via regex
                const recordedDate : string | undefined = recordedDelivery.endTime.match(regex)?.at(0)
                formattedTableData.push({
                    id: recordedDelivery.id,
                    name: (recordedDelivery.plan.name + " [Record]"),
                    recordDate: recordedDate
                });
            });

            //Convert to displayable data
            setTableData(formattedTableData);
            setFilteredTableData(formattedTableData);

        } catch (error){
            console.log("Error with generateTableData(): ", error)
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
        if (rawData.length > 0){
            generateTableData().then()
        }
        console.log(rawData)
    }, [rawData]);

    //Column Definitions
    const columns = useMemo(() => [
        {
            header: 'ID',
            accessorKey: 'id',
            maxSize: 10,
            size: 10,
            minSize: 10,

        },
        {
            header: "Name",
            accessorKey: 'name',
            maxSize: 45,
            size: 45,
            minSize: 45,
        },
        {
            header: 'Delivery Date',
            accessorKey: 'recordDate',
            maxSize: 45,
            size: 45,
            minSize: 45,
        },
    ], [])

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
                <label>Search Past Deliveries</label>
                <input placeholder={"Search... "} onChange={handleChange} value={searchInput}/>
            </div>

            <div className={'DOP-T-headers-div'}>
                <table>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => <th key={header.id} style = {{width: `${header.column.getSize()}%`, textAlign: "center"}}>
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
                        onClick={(event: React.MouseEvent) => {handleClick(event, row.original.id)}}
                        className={(row.original.id === selected) ? 'DOP-selected-row' : ''}>
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
    )
}

export default DOPTable2