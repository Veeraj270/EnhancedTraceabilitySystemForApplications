import React, {useEffect, useState} from "react";
import CustomerOrdersTable from "./CustomerOrdersPageComponents/CustomerOrdersTable";
import './CustomerOrdersPageComponents/COPStyleSheet.css'
import {Table1Row, Table2Row, Table3Row} from "./CustomerOrdersPageComponents/COPInterfaces";
import ViewOrderTable from "./CustomerOrdersPageComponents/ViewOrderTable";
import ViewIngredientOrderTable from "./CustomerOrdersPageComponents/ViewIngredientOrderTable";



const CustomerOrdersPage = () => {
    //State variables
    const [rawOrderData, setRawOrderData] = useState<any[]>([]);
    const [table1Data, setTable1Data] = useState<Table1Row[]>([])
    const [table2Data, setTable2Data] = useState<Table2Row[]>([])
    const [table3Data, setTable3Data] = useState<Table3Row[]>([])
    const [renderTable, setRenderTable] = useState<number>(1);

    //UseEffects
    //Fetch customer orders upon initial render
    useEffect(() => {
        fetchOrders().then((data: any) => {
            setRawOrderData(data);
            setTable1Data(formatOrders(data));
        }).catch((err) => {console.error("Error fetching customer orders: " + err)});
    }, []);

    //Fetches raw customer orders data
    const fetchOrders = async (): Promise<void> => {
        const response = await fetch('/api/customerorders/fetch');
        if (!response.ok) {
            throw new Error("Fetch customerOrders request was not ok");
        }
        return await response.json();
    }

    const fetchGeneratedOrder = async (order: any) => {
        const response = await fetch('/api/auto-order/auto-gen-orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(order),
        });
        if (!response.ok) {
            throw new Error('AutoOrderAPI Gen call was not okay')
        }
        return await response.json();
    }

    const cancelOrder = async () => {
        const response = await fetch('/api/auto-order/auto-gen-orders/cancel', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if(!response.ok) {
            throw new Error('AutoGen cancel call was not okay');
        }
    }

    const confirmOrder = async () => {
        const response = await fetch('/api/auto-order/auto-gen-orders/confirm', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if(!response.ok) {
            throw new Error('AutoGen confirm call was not ok');
        }
    }

    //Formats raw data into table1Row format
    const formatOrders = (rawData: any): Table1Row[] => {
        return rawData.map((row: any) => {
            return {
                id: row.id,
                client: row.client,
                date: convertTimestamp(row.date),
                dueDate: convertTimestamp(row.deliveryDate),
            }
        })
    }

    const viewOrder = (orderID : number) => {
        //Format the finalProduct data
        const index = rawOrderData.findIndex((row) => row.id === orderID);
        const fPList = rawOrderData[index].finalProducts;

        //Update table2Data
        if (fPList){
            setTable2Data(formatFinalProducts(fPList));
        } else {
            setTable2Data([]);
        }

        //Set renderTable to 2
        setRenderTable(2);
    }

    const handleCancel = () => {
        cancelOrder().then().catch((err) => {console.error("Error cancelling order: " + err)});

        //Set renderTable to 1
        setRenderTable(1);

        //Clear order data
        setTable3Data([]);
    }

    const handleConfirm = () => {
        confirmOrder().then().catch((err) => {console.error("Error confirming order: " + err)});

        //Set renderTable to 1
        setRenderTable(1);

        //Clear order data
        setTable3Data([]);

        alert("The delivery has been scheduled");
    }


    const genIngredientOrder = (orderID : number) => {
        const index = rawOrderData.findIndex((row) => row.id === orderID);
        const order = rawOrderData[index];
        //Fetch the generated order & update table3Data
        fetchGeneratedOrder(order)
            .then((data : any) => {
                //Update table3Data with formatted order
                setTable3Data(formatIngredientOrder(data[0].items));
                //Set renderTable to 3
                setRenderTable(3);
            })
            .catch((err) => {console.error("Error fetching generated order: " + err)});

        //Set renderTable to 3
        setRenderTable(3);
    }

    const formatIngredientOrder = (order: any): Table3Row[] => {
        let temp : Table3Row[] = [];
        console.log("order: ", order);
        order.forEach((row: any) => {
            let index = temp.findIndex((x) => x.gtin === row.gtin);
            if (index === -1){
                temp.push({
                    id: row.id,
                    gtin: row.gtin,
                    label: row.label,
                    quantity: 1
                })
            } else {
                temp[index].quantity += 1;
            }
        });

        console.log("temp: ", temp);

        return temp;
    }
    const formatFinalProducts = (fPList : any[]): Table2Row[] => {
        //Aggregate the final products
        let temp : Table2Row[] = [];
        fPList.forEach((row: any) => {
            let index = temp.findIndex((x) => x.id === row.id);
            if (index === -1){
                temp.push({
                    id: row.id,
                    label: row.label,
                    quantity: 1
                })
            } else {
                temp[index].quantity += 1;
            }
        })

        return temp;
    }

    //Convert the raw timestamp to a more readable format
    const convertTimestamp = (timestamp: string): string => {
        const date = new Date(timestamp);
        return date.toDateString();
    }

    //Determines which table to render in the second section
    const renderSection2 = () => {
        switch (renderTable) {
            case 1:
                return (
                    <div>

                    </div>
                )
            case 2:
                return (
                    <div className={'COP-OI-column'}>
                        <div className={'COP-header-div'}>
                            <h2>Ordered Items</h2>
                        </div>
                        <ViewOrderTable
                            table2Data={table2Data}
                        />
                    </div>
                )
            case 3:
                return (
                    <div className={'COP-IO-column'}>
                        <div className={'COP-header-div'}>
                            <h2>Suggested Ingredient Order</h2>
                        </div>
                        <ViewIngredientOrderTable
                            table3Data={table3Data}
                        />
                        <div className={'COP-IO-button-div'}>
                            <button className={'COP-button'} onClick={handleConfirm}>Confirm</button>
                            <button className={'COP-button'} onClick={handleCancel}>Cancel</button>
                        </div>
                    </div>
                )
        }
    }

    //Render the page
    return (
        <div className={'page-container'}>
            <h1>Customer Orders</h1>
            <div className={'COP-page-content'}>
                <div className={'COP-column-1'}>
                    <CustomerOrdersTable
                        viewOrder={viewOrder}
                        table1Data={table1Data}
                        genIngredientOrder={genIngredientOrder}
                    />
                </div>
                <div className={'COP-column-2'}>
                    {renderSection2()}
                </div>
            </div>
        </div>
    )
}

export default CustomerOrdersPage