import React, {useState, useMemo, useEffect} from "react";
import "./DPStylesheet.css"
import Item from "../Interfaces/DeliveryItem";
import {flexRender, getCoreRowModel,  useReactTable} from "@tanstack/react-table";


const DOPTable2 = () => {
    const mockData = Array(40).fill(
        {
            "delivery-identifier": "",
            "date-due": "",
        }
    )
    const [tableData, setTableData] = useState<Item[]>(mockData)


    //Used by generateTableData()
    const fetchRecorded = async () => {
        const response = await fetch ('http://localhost:8080/api/deliveries/fetch-recorded')
        if (!response.ok){
            throw new Error("response from fetch-planned request was not ok")
        }
        return await response.json()
    }

    const generateTableData = async () => {
        try {
            const rawData = await fetchRecorded()
            console.log(rawData)

            //Extract Date via regex
            const regex = /[0-9]{4}-[0-9]{2}-[0-9]{2}/;

            let formattedTableData: any[] = []
            rawData.map((recordedDelivery: any) => {
                const recordedDate : string | undefined = recordedDelivery.endTime.match(regex)?.at(0)
                formattedTableData.push({
                    id: recordedDelivery.id,
                    name: (recordedDelivery.plan.name + "-Record"),
                    recordDate: recordedDate
                })
            })

            //Convert to displayable data
            setTableData(formattedTableData);

        } catch (error){
            console.log("Error with generateTableData(): ", error)
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
            header: "name",
            accessorKey: 'name',
        },
        {
            header: 'Delivery Date',
            accessorKey: 'recordDate'
        },
    ], [])

    const table = useReactTable({
        data: tableData,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className={'DOP-T-grid'}>

            <div className={"DOP-T-search-container"}>
                <label>Search Past Deliveries</label>
                <input placeholder={"Search... "}/>
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

export default DOPTable2