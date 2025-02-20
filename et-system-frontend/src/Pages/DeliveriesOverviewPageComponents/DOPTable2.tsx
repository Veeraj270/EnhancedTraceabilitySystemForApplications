import React, {useState, useMemo, useEffect} from "react";
import "./DOPStylesheet.css"
import {flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";


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
                const recordedDate : string | undefined = recordedDelivery.endTime.match(regex)?.at(0).replaceAll("-","/");
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
    }, [rawData]);

    //Column Definitions
    const columns = useMemo(() => [
        {
            header: 'ID',
            accessorKey: 'id',
            size: 10,
        },
        {
            header: "Name",
            accessorKey: 'name',
            size: 45,
        },
        {
            header: 'Delivery Date',
            accessorKey: 'recordDate',
            size: 45,
        },
    ], [])

    //Instantiates the tanstack table
    const table = useReactTable({
        data: filteredTableData,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
    })

    //For table column formatting
    const getTemplateColumns = (headerGroup : any): string => {
        let output  = "";
        headerGroup.headers.forEach((header : any)  => {
            output += `${header.column.getSize()}fr `
        })
        return output;
    }

    const templateColumnStyle = getTemplateColumns(table.getHeaderGroups()[0]);

    //Implements selectable rows
    const handleClick = (event: React.MouseEvent, id : number) => {
        if (id !== undefined){
            setSelected(id)
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
                <label>Search past deliveries</label>
                <input placeholder={"Search... "} onChange={handleChange} value={searchInput}/>
            </div>
            <div className={'DOP-T-headers-div'}>
                <table>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}
                            className={'DOP-tr'}
                            style={{gridTemplateColumns: getTemplateColumns(headerGroup)}}

                        >
                            {headerGroup.headers.map(header => <th key={header.id} className={'DOP-th'}>
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
                        className={(row.original.id === selected) ? 'DOP-tr-selected' : 'DOP-tr'}
                        style={{gridTemplateColumns: templateColumnStyle}}
                    >
                        {row.getVisibleCells().map(cell => (
                            <td className={'DOP-td'}>
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