import React, {useState, useMemo, useEffect} from "react";
import "./DPStylesheet.css"
import Item from "../Interfaces/DeliveryItem";
import {flexRender, getCoreRowModel,  useReactTable} from "@tanstack/react-table";
import {PlannedDelivery} from "../Interfaces/PlannedDelivery";


const DOPTable1 = () => {
    const mockData = Array(40).fill(
        {
            "id": "",
            "dateDue": "",
            "type": "",
            "status": ""
        }
    )
    const [tableData, setTableData] = useState<Item[]>(mockData)

    //Used by generateTableData()
    const fetchScheduled = async () => {
        const response = await fetch('http://localhost:8080/api/deliveries/fetch-planned')
        if (!response.ok){
            throw new Error("response from fetch-planned request was not ok")
        }
        const responseJSON = await response.json()
        return responseJSON
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
                    dateDue: dateDue ? dateDue : "error",
                    type: plannedDelivery.deliveryInterval ? "Recurring" : "One-Of",
                    status: "Unknown", //Placeholder
                });
            })

            //Populate table with additional empty rows
            if (formattedTableData.length < tableRowNum){
                formattedTableData = [...formattedTableData, ...Array(tableRowNum - formattedTableData.length).fill({
                    id: "",
                    dateDue: "",
                    type: "",
                    status: "", //Placeholder
                })]
            }
            setTableData(formattedTableData)
        } catch (error){
            console.log("Error with generateTableData(): ", error);
        }
    }

    useEffect(() => {
        generateTableData().then()
    }, []);

    const columns = useMemo(() => [
        {
            header: 'ID',
            accessorKey: 'id'
        },
        {
            header: 'DATE DUE',
            accessorKey: 'dateDue'
        },
        {
            header: 'TYPE',
            accessorKey: 'type'
        },
        {
            header: 'STATUS',
            accessorKey: 'status'
        }], [])

    const table = useReactTable({
        data: tableData,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className={'DOP-T-grid'}>

            <div className={"DOP-T-search-container"}>
                <label>Search scheduled deliveries</label>
                <input placeholder={"Search... "}/>
            </div>

            <div className={'DOP-T-table-headers-div'}>
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
            <div className={'DOP-T-table-content-div'}>
                <table>
                <tbody>
                {table.getRowModel().rows.map(row => (<tr key={row.id}>
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