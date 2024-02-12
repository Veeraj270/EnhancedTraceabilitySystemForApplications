import React, {useState, useMemo, useEffect} from "react";
import "./DPStylesheet.css"
import {flexRender, getCoreRowModel,  useReactTable} from "@tanstack/react-table";
import {PlannedDelivery} from "../Interfaces/PlannedDelivery";


const DOPTable1 = () => {
    const empty: any[] = []
    const [tableData, setTableData] = useState(empty)
    const [filteredTableData, setFilteredTableData] = useState(empty)
    const [selectedDeliveryID, setSelectedDeliveryID] = useState(-1)
    const [searchInput, setSearchInput] = useState("")

    //Used by generateTableData()
    const fetchScheduled = async () => {
        const response = await fetch('http://localhost:8080/api/deliveries/fetch-planned')
        if (!response.ok){
            throw new Error("response from fetch-planned request was not ok")
        }
        return await response.json()
    }

    const tableRowNum = 14;

    const generateTableData = async () => {
        try{
            const rawData = await fetchScheduled();
            console.log(rawData);

            //Extract Date via regex
            const regex = /[0-9]{4}-[0-9]{2}-[0-9]{2}/;
            console.log("Date Due: ", rawData[0].deliveryTime.match(regex).at(0));

            let formattedTableData: any[] = []; //Should remove any later
            rawData.map((plannedDelivery: PlannedDelivery) => {
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

    useEffect(() => {
        if (searchInput.length > 0){
            setFilteredTableData(tableData.filter((row) => {
                return row.name.match(searchInput)
            }))
        } else{
            setFilteredTableData(tableData)
        }
        }, [searchInput]);

    useEffect(() => {
        generateTableData().then()
    }, []);


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

    const table = useReactTable({
        data: filteredTableData,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
    })

    const handleClick = (event: React.MouseEvent, id : number) => {
        if (id !== undefined){
            setSelectedDeliveryID(id)
            console.log("Selected Delivery: " + id);
        }
        else{
            console.log("Empty row clicked");
        }
    }

    const handleChange = (event : any) => {
        event.preventDefault();
        setSearchInput(event.target.value)
    }

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
                    className={(row.original.id === selectedDeliveryID) ? 'DOP-selected-row' : ''}>
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