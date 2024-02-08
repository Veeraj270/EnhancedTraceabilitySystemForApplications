import './TakeDeliveryPageComponents/TDPStyleSheet.css'
import {useEffect, useState} from "react";

import MetaDataWindow from "./TakeDeliveryPageComponents/MetaDataWindow";
import DeliveryName from "./TakeDeliveryPageComponents/DeliveryName";
import BarCodeEntry from "./TakeDeliveryPageComponents/BarCodeEntry";
import SubmitDeliveryButton from "./TakeDeliveryPageComponents/SubmitDeliveryButton";
import Table from "./TakeDeliveryPageComponents/Table";
import DeliveryItem from "./TakeDeliveryPageComponents/Interfaces/DeliveryItem";
import Metadata from "./TakeDeliveryPageComponents/Interfaces/Metadata";
import {json} from "react-router-dom";


const TakeDelivery = () => {
    interface Delivery {
        name: string,
        deliveryInterval: string,
        deliveryTime: string,
        description: string,
        id: number,
        items: DeliveryItem[]
    }


    //Constants
    const rowsPerPage = 16;
    const emptyData: DeliveryItem[] = []
    const emptyMetaData: Metadata = {
        name: "",
        deliveryInterval: "",
        deliveryTime: "",
        description: "",
    }

    //State variables
    const [metaData, setMetaData] = useState(emptyMetaData);
    const [expectedTData, setExpectedTData] = useState(emptyData);
    const [scannedTData, setScannedTData] = useState(emptyData);
    const [unexpectedTData, setUnexpectedTData] = useState(emptyData);

    //Temporary planned-delivery id
    const id = 1;
    const [deliveryId, setDeliveryId] = useState(id)
    const [startTime, setStartTime] = useState(Date.now())

    //Triggered upon initial render of the page
    useEffect(() => {
        fetchDeliveryData(deliveryId).then((data: Delivery) => {
            //Remove the id from each item
            let expectedItems: DeliveryItem[] = [];
            data.items.map((item) => {
                expectedItems.push({
                    label: item.label,
                    gtin: item.gtin,
                })
            })

            setExpectedTData(expectedItems)
            const newMetaData : Metadata  =  {
                name: data.name,
                deliveryInterval: data.deliveryInterval,
                deliveryTime: data.deliveryTime,
                description: data.description,
            }
            setMetaData(newMetaData)
            console.log(metaData)
        })

    }, []);

    const fetchDeliveryData = async (deliveryId: number) : Promise<Delivery> => {
        try {
            const response = await fetch(`http://localhost:8080/api/deliveries/fetch-planned-by-id/${deliveryId}`);
            if (!response.ok) {
                throw new Error('fetch-planned-by-id response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error: ", error);
            return {
                name: "error",
                deliveryInterval: "error",
                deliveryTime: "error",
                description: "error",
                id: -1,
                items: []
            };
        }
    }


    //Triggered by pressing button to right of input field or by pressing enter on input field
    const submitBarcode = async (barcode: string) => {
        //Check if barcode is in expectedTData
        for (let i = 0; i < expectedTData.length; i ++){
            if (expectedTData[i].gtin == barcode){
                console.log("barcode found in expectedTData")
                setScannedTData([expectedTData[i],...scannedTData]);
                //Create shallow copy
                const newExpectedTData = expectedTData.slice()
                //Remove item
                newExpectedTData.splice(i,1)
                //Update expectedTData array
                setExpectedTData(newExpectedTData)
                return;
            }
        }

        //Check if it's in scannedTData
        for (let i = 0; i < scannedTData.length; i ++){
            if (scannedTData[i].gtin == barcode){
                console.log("barcode found in expectedTData")
                const deliveryItem: DeliveryItem = {label: "", gtin: ""}
                //Shallow copy the items
                Object.assign(deliveryItem, scannedTData[i])
                setUnexpectedTData([deliveryItem,...unexpectedTData])
                return;
            }
        }

        //If barcode isn't within expectedTData or scannedTData, query back-end API for label
        const label = await fetchLabel(barcode).
        const deliveryItem = {label: label, gtin: barcode}
        setUnexpectedTData([deliveryItem,...unexpectedTData])
        return;
    }

    const fetchLabel = async (barcode: string) => {
        const response = await fetch(`http://localhost:8080/api/lookup/barcode/lookup-by-gtin/${barcode}`);
        if (!response.ok){
            console.log("Error: api/lookup/barcode/lookup-by-gtin was not ok");
            return "Error";
        }
        else {
            const resJSON = await response.json();
            if (resJSON.valid == false){
                return "Unknown";
            }
            else {
                return resJSON.name;
            }
        }
    }

    //Triggered by pressing submit delivery button
    const submitDelivery = async () => {
        //Create a record of the delivery and push it to the database via POST
        const recordedProducts: DeliveryItem[] =  [...structuredClone(scannedTData), ...structuredClone(unexpectedTData)];
        console.log(recordedProducts);
        const recordedDelivery = {
            plannedDeliveryId: deliveryId,
            startTime: startTime,
            endTime: Date.now(),
            recorded: recordedProducts,
        }
        console.log(recordedDelivery)
        console.log(JSON.stringify(recordedDelivery))

        try{
            let response = await fetch(`http://localhost:8080/api/deliveries/add-recorded-with-products`,{
                method: "POST",
                body: JSON.stringify(recordedDelivery),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            if (!response.ok){
                throw new Error("Error occurred as a result of api/deliveries/add-recorded POST request")
            }

            console.log(response)

            //Mark planned delivery status as processed
            response = await fetch(`http://localhost:8080/api/deliveries/set-planned-status/${deliveryId}`,{
                method: "POST",
                body: JSON.stringify({
                    status: true
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            if (!response.ok){
                throw new Error("Error occurred as a result of api/deliveries/set-planned-status/")
            }

        } catch (error){
            console.log("Error")
            //Render an error message
        }

        //Take user back to the deliveries-overview page
        window.location.href = '/deliveries'
    }

    return (
        <div className='take-delivery-page'>
            <h1>Take Delivery</h1>
            <div className={'content'}>
                <div className={'section1'}>
                    <DeliveryName text={metaData.name ? metaData.name : "Unknown"}/>
                    <MetaDataWindow data={metaData}/>
                    <BarCodeEntry submit={submitBarcode}/>
                    <SubmitDeliveryButton submit={submitDelivery}/>
                </div>
                <div className={'section2'}>
                    <div className={'table-container'}>
                        <h3 className={'td-table-title'}>Expected Items</h3>
                        <Table data={expectedTData.reverse()} rowsPerPage={rowsPerPage}/>
                    </div>

                    <div className={'table-container'}>
                        <h3 className={'td-table-title'}>Scanned Items</h3>
                        <Table data={scannedTData.reverse()} rowsPerPage={rowsPerPage}/>
                    </div>

                    <div className={'table-container'}>
                        <h3 className={'td-table-title'}>Unexpected Items</h3>
                        <Table data={unexpectedTData.reverse()} rowsPerPage={rowsPerPage}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TakeDelivery
