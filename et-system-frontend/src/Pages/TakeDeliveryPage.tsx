import './TakeDeliveryPageComponents/TDPStyleSheet.css'
import {useEffect, useState} from "react";

import MetaDataWindow from "./TakeDeliveryPageComponents/MetaDataWindow";
import DeliveryName from "./TakeDeliveryPageComponents/DeliveryName";
import BarCodeEntry from "./TakeDeliveryPageComponents/BarCodeEntry";
import SubmitDeliveryButton from "./TakeDeliveryPageComponents/SubmitDeliveryButton";
import TDPTable from "./TakeDeliveryPageComponents/TDPTable";
import DeliveryItem from "./Interfaces/DeliveryItem";
import Metadata from "./TakeDeliveryPageComponents/Interfaces/Metadata";
import {json} from "react-router-dom";
import {useLocation} from "react-router-dom"


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

    //Navigation
    const location = useLocation();
    const { selectedPDelivery } = location.state || {};
    const id = selectedPDelivery;

    //State variables
    const [metaData, setMetaData] = useState(emptyMetaData);
    const [expectedTData, setExpectedTData] = useState(emptyData);
    const [scannedTData, setScannedTData] = useState(emptyData);
    const [unexpectedTData, setUnexpectedTData] = useState(emptyData);
    const [plannedDelivery, setPlannedDelivery] = useState({});

    const [deliveryId, setDeliveryId] = useState(id)
    const [startTime, setStartTime] = useState((new Date()).toISOString())

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
                supplier: "N/A", //Placeholder
                startTime: startTime.match(/[0-9]{2}:[0-9]{2}:[0-9]{2}/).at(0),
                description: data.description,
            }
            setMetaData(newMetaData)
        })
    }, []);

    const fetchDeliveryData = async (deliveryId: number) : Promise<Delivery> => {
        try {
            const response = await fetch(`http://localhost:8080/api/deliveries/fetch-planned-by-id/${deliveryId}`);
            if (!response.ok) {
                throw new Error('fetch-planned-by-id response was not ok');
            }
            const data = await response.json();
            setPlannedDelivery(data);
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
        if  (barcode === ""){
            return;
        }

        //Check if barcode is in expectedTData
        for (let i = 0; i < expectedTData.length; i ++){
            if (expectedTData[i].gtin == barcode){
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
                const deliveryItem: DeliveryItem = {label: "", gtin: ""}
                //Shallow copy the items
                Object.assign(deliveryItem, scannedTData[i])
                setUnexpectedTData([deliveryItem,...unexpectedTData])
                return;
            }
        }

        //If barcode isn't within expectedTData or scannedTData, query back-end API for label
        const label = await fetchLabel(barcode)
        const deliveryItem = {label: label, gtin: barcode}
        setUnexpectedTData([deliveryItem,...unexpectedTData])
        return;
    }

    //Used by submitBarcode()
    const fetchLabel = async (barcode: string) => {
        const response = await fetch(`http://localhost:8080/api/lookup/barcode/lookup-by-gtin/${barcode}`);
        if (!response.ok){
            console.log("Error: api/lookup/barcode/lookup-by-gtin was not ok");
            return "Error";
        }
        else {
            const resJSON = await response.json();
            if (resJSON.valid == false || resJSON.name == ""){
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

        const date = new Date()
        const recordedDelivery = {
            plan: plannedDelivery,
            startTime: startTime.match(/[0-9]{2}:[0-9]{2}:[0-9]{2}/),
            endTime: (new Date()).toISOString(),
            recorded: recordedProducts,
        }

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

            //Mark planned delivery status as processed
            response = await fetch(`http://localhost:8080/api/deliveries/set-planned-as-complete/${deliveryId}`)
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

    // @ts-ignore
    return (
        <div className='take-delivery-page'>
            <h1 className={'TDP-title'}>Process Delivery</h1>
            <div className={'TDP-grid-container'}>
                <div className={'TDP-grid-column'}>
                    <MetaDataWindow {...metaData}/>
                    <BarCodeEntry submit={submitBarcode}/>
                    <SubmitDeliveryButton submit={submitDelivery}/>
                </div>
                <div className={'TDP-grid-column'}>
                    <TDPTable data={expectedTData.reverse()} rowsPerPage={rowsPerPage} title={"Expected Items"}/>
                </div>
                <div className={'TDP-grid-column'}>
                    <TDPTable data={scannedTData.reverse()} rowsPerPage={rowsPerPage} title={"Scanned Items"}/>
                </div>
                <div className={'TDP-grid-column'}>
                    <TDPTable data={unexpectedTData.reverse()} rowsPerPage={rowsPerPage} title={"Unexpected Items"}/>
                </div>
            </div>

        </div>
    )
}

export default TakeDelivery
