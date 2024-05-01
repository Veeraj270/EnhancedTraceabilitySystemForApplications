import React, {useEffect, useState} from "react";
import './ContractsPageComponents/ContractsStyleSheet.css'
import './ContractsPageComponents/ContractsInterfaces';
import ContractsTable from "./ContractsPageComponents/ContractsTable";
import GeneratedCustomerOrdersTable from "./ContractsPageComponents/GeneratedCustomerOrdersTable";
import DatesTable from "./ContractsPageComponents/DatesTable";
import {Contract, CustomerOrder, Table1Row, Table2Row, Table3Row} from "./ContractsPageComponents/ContractsInterfaces";



const ContractsPage = () => {
    //State variables
    const [rawContractData, setRawContractData] = useState<any[]>([]);
    const [table1Data, setTable1Data] = useState<Table1Row[]>([])
    const [table2Data, setTable2Data] = useState<Table2Row[]>([])
    const [table3Data, setTable3Data] = useState<Table3Row[]>([])

    const [renderTable, setRenderTable] = useState<number>(1);

    //Debugging
    useEffect(() => {
        console.log("rawContractData:", rawContractData);
    }, [rawContractData]);

    useEffect(() => {
        console.log("table1Data:", table1Data);
    }, [table1Data]);

    useEffect(() => {
        console.log("table2Data:", table2Data);
    }, [table2Data]);

    useEffect(() => {
        console.log("table3Data:", table2Data);
    }, [table3Data]);
    //End-debugging

    //UseEffects
    //Fetch contracts upon initial render
    useEffect(() => {
        fetchContracts().then((data) => {
            setRawContractData(data);
            setTable1Data(formatContracts(data));
        }).catch((err) => {console.error("Error fetching contracts: " + err)});
    }, []);

    const addCustomerOrder = async (customerOrder : CustomerOrder): Promise<void> => {
        console.log(JSON.stringify(customerOrder));
        try {
            const response = await fetch('/api/customerorders/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(customerOrder),
            });
            if (!response.ok) throw new Error('Failed to add customer order');
            console.log('Order added');
        } catch (error) {
            console.error('Failed to add customer order:', error);
        }
    }

    const addContract = async (contract : Contract): Promise<void> => {
        console.log(JSON.stringify(contract));
        try {
            const response = await fetch('/api/contracts/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contract),
            });
            if (!response.ok) throw new Error('Failed update contract');
            console.log('Contract updated');
        } catch (error) {
            console.error(error);
        }
    }


    const removeDateAndAddOrder = async (contract : Contract, date : String) => {
        const updatedDates = contract.dates.filter(d => convertTimestamp(d) !== date);


        const customerOrder: CustomerOrder = {
            id: 0,
            client: contract.client,
            date: new Date().toISOString(),
            deliveryDate: new Date(date).toISOString(),
            finalProducts: contract.finalProducts
        };

        const contractWithoutDate : Contract = {
            id: contract.id,
            client: contract.client,
            duration: contract.duration,
            frequency: contract.frequency,
            finalProducts: contract.finalProducts,
            dates: updatedDates
        };

        await addCustomerOrder(customerOrder)
        await addContract(contractWithoutDate)


    };

    //Fetches raw contracts data
    const fetchContracts = async (): Promise<void> => {
        const response = await fetch('/api/contracts/fetch');
        if (!response.ok) {
            throw new Error("Fetch contracts request was not ok");
        }
        return   await response.json();
    }

    //Formats raw data into table1Row format
    const formatContracts = (rawData: any): Table1Row[] => {
        return rawData.map((row: any) => {
            return {
                id: row.id,
                client: row.client,
                duration: row.duration,
                frequency: row.frequency,
            }
        })
    }

    const genDates = (contractID : number) => {
        const index = rawContractData.findIndex((row) => row.id === contractID);
        const contract = rawContractData[index];
        setTable3Data(formatDates(contract))
        setRenderTable(3)
    }

    const genFinalProducts = (contractID : number) => {
        const index = rawContractData.findIndex((row) => row.id === contractID);
        const contract = rawContractData[index];
        setTable2Data(formatFinalProducts(contract.finalProducts));
        setRenderTable(2);
    }

    const formatFinalProducts = (fPList : any[]): Table2Row[] => {
        let temp : Table2Row[] = [];
        fPList.forEach((row: any) => {
                temp.push({
                    id: row.id,
                    label: row.label,
                    quantity: row.quantity
                })
        })

        return temp;
    }

    const formatDates = (contract : Contract): Table3Row[] => {
        let temp : Table3Row[] = [];
        contract.dates.forEach((date: any) => {

            temp.push({
                contract: contract,
                date: convertTimestamp(date)
                }

            )
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
                    <div className={'Contracts-IO-column'}>
                        <div className={'Contracts-header-div'}>
                            <h2>Products Ordered</h2>
                        </div>
                        <GeneratedCustomerOrdersTable
                            table2Data={table2Data}
                        />
                    </div>
                )
            case 3:
                return (
                    <div className={'Contracts-IO-column'}>
                        <div className={'Contracts-header-div'}>
                            <h2>Dates</h2>
                        </div>
                        <DatesTable
                            table3Data={table3Data}
                            makeOrder={removeDateAndAddOrder}
                        />
                    </div>
                )
        }
    }

    //Render the page
    return (
        <div className={'page-container'}>
            <h1>Contracts</h1>
            <div className={'Contracts-page-content'}>
                <div className={'Contracts-column-1'}>
                    <ContractsTable
                        table1Data={table1Data}
                        showOrder={genFinalProducts}
                        genDates={genDates}
                    />
                </div>
                <div className={'Contracts-column-2'}>
                    {renderSection2()}
                </div>
            </div>
        </div>
    )
}

export default ContractsPage