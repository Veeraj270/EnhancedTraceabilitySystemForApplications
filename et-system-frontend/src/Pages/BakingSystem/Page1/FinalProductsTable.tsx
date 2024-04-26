import {ChangeEvent, useEffect, useMemo, useState} from "react";
import {flexRender, getCoreRowModel, HeaderGroup, useReactTable, Row} from "@tanstack/react-table";
import React from "react";
import {OrderedFinalProduct} from "../../Interfaces/OrderedFinalProduct";
import '../Page3/BSP3StyleSheet.css'

import FPData from "../BakingSystemInterfaces";

interface PropTypes{
    table1Data: FPData[],
    setTable1Data: (data: FPData[]) => void
    //selectedData: any
    //setSelectedData: any
    //searchData: any
    //setSearchData: any
}

const FinalProductsTable = (props: PropTypes) => {
    //Destructure props

    //State variables
    const [searchInput, setSearchInput] = useState("");
    //const [unselectedFinalProducts, setUnselectedFinalProducts] = useState<Page1Table1Row[]>([]);
    const [table1Data, setTable1Data] = useState<FPData[]>([])

    //UseEffects
    useEffect(() => {
        setTable1Data(props.table1Data);
    }, [props.table1Data]);


    useEffect(() => {

    }, []);

    const columns = useMemo(() => [
        {
            header: "Product Label",
            accessorKey: "finalProductLabel",
            size: 60
        },
        {
            header: "Quantity",
            accessorKey: "amount",
            size: 15
        },
        {
            header: "Order ID",
            accessorKey: "associatedCustomerOrderID",
            size: 15
        },
        {
            header: "",
            accessorKey: "actions",
            size: 10
        }

    ], [])


    const handleChange = (event : ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setSearchInput(event.target.value)
    }

   /* useEffect(() => {
        if (searchInput.length > 0){
            setSearchData(rawData.filter((row: OrderedFinalProduct) => {
                // Searching matches the label of the final product or the order id
                return row.finalProduct.match(RegExp(searchInput, 'i'))
                || row.customerOrder.toString().match(searchInput)
            }))
        } else{
            setSearchData(rawData)
        }
    }, [searchInput]);*/

   /* const updateSelectedData = (rowData : any) => {
        const indexOfElement = selectedData.findIndex((x: OrderedFinalProduct) => x.key === rowData.key)
        // If the item is already in the other table it increases the quantity
        if(indexOfElement !== -1){
            const newSelectedData = selectedData.map((x: OrderedFinalProduct) => {
                if(x.key === rowData.key){
                    return {...x, quantity: x.quantity + 1}
                }else{
                    return x
                }
            })
            setSelectedData(newSelectedData)
        } else{
            // Otherwise it just adds the item to the table
            if(selectedData.length === 0) {
                const newSelectedData = selectedData.concat({...rowData, quantity: 1})
                setSelectedData(newSelectedData)
            } else {
                alert("Select one type of product at a time")
            }
        }
    }

    const handleClickPlus = (event: React.MouseEvent<HTMLButtonElement>, targetRow: Page1Table1Row) => {
        // If the quantity is 1, the row should be removed after clicking the button
        if(targetRow.quantity === 1){
            const newTableData = rawData.filter((row: Page1Table1Row) => row.finalProductId !== targetRow.finalProductId)
            setRawData(newTableData)

            //Add the finalProduct to the
            updateSelectedData(targetRow) //
        } else {
            // This changes the quantity if the final product that is added
            // to the selected final products
            const newData = rawData.map((x: OrderedFinalProduct) => {
                if(x.key === rowData.key){
                    return {...x, quantity: x.quantity - 1}
                }else{
                    return x
                }
            })
            setRawData(newData)
            
            // The same goes for the searched data
            const newSearchData = searchData.map((x: OrderedFinalProduct) => {
                if(x.key === rowData.key){
                    return {...x, quantity: x.quantity - 1}
                }else{
                    return x
                }
            })
            setSearchData(newSearchData)
            updateSelectedData(rowData)
        }
    }*/

    //Will need changing for searching to work again
    const table = useReactTable({
        data: table1Data,
        columns: columns,
        getCoreRowModel: getCoreRowModel()
    })

    //For table column formatting
    const getTemplateColumns = (headerGroup : HeaderGroup<FPData>): string => {
        let output  = "";
        headerGroup.headers.forEach(header => {
            output += `${header.column.getSize()}fr `
        })
        return output;
    }

    const templateColumnStyle = getTemplateColumns(table.getHeaderGroups()[0]);

    return (
        <div className={'BSP1-FP-table-1-grid'}>
            <div className={"BSP1-FP-table-1-search-div"}>
                <input placeholder={"Search..."} onChange={handleChange} value={searchInput}/>
            </div>
            <div className={'BSP1-FP-table-1-header-div'}>
                <table>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}
                            className={'BSP1-tr'}
                            style={{gridTemplateColumns: getTemplateColumns(headerGroup)}}
                        >
                            {headerGroup.headers.map(header =>
                                <th
                                    className={'BSP1-th'}
                                    key={header.id}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            )
                            }
                        </tr>
                    ))}
                </table>
            </div>
            <div className={"BSP1-FP-table-1-rows-div"}>
                <table>
                    <tbody>
                    {table.getCoreRowModel().rows.map(row => (
                        <tr key={row.id}
                           className={'BSP1-tr'}
                           style={{gridTemplateColumns: templateColumnStyle}}
                        >
                            <td className={'BSP1-td'}>{row.original.finalProductLabel}</td>
                            <td className={'BSP1-td'}>{row.original.amount}</td>
                            <td className={'BSP1-td'}>{row.original.associatedCustomerOrderID}</td>
                            <td className={'BSP1-td'}>
                                <button onClick={(event) => {handleClickPlus(event, row.original)}}><b>+</b></button>
                            </td>
                        </tr>)
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    )

}

export default  FinalProductsTable