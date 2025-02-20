import './TakeDeliveryPageComponents/TDPStyleSheet.css'
import {useEffect, useState} from "react";

import TDPMetaDataWindow from "./TakeDeliveryPageComponents/TDPMetaDataWindow";
import TDPBarCodeEntry from "./TakeDeliveryPageComponents/TDPBarCodeEntry";
import TDPSubmitDeliveryButton from "./TakeDeliveryPageComponents/TDPSubmitDeliveryButton";
import TDPTable from "./TakeDeliveryPageComponents/TDPTable";
import Metadata from "./TakeDeliveryPageComponents/Interfaces/Metadata";
import {useLocation} from "react-router-dom"
import TDPPopUp from "./TakeDeliveryPageComponents/TDPPopUp";
import React from 'react';

const TakeDelivery = () => {
    interface Delivery {
        name: string,
        deliveryInterval: string,
        deliveryTime: string,
        description: string,
        id: number,
        items: any[]
    }

    //Constants
    const emptyData: any[] = []
    const emptyMetadata: Metadata = {
        name: "",
        supplier: "",
        description: "",
        startTime: "",}

    //Navigation
    const location = useLocation();
    const { selectedPDelivery } = location.state || {};

    const deliveryId = selectedPDelivery;

    //State variables
    const [metadata, setMetadata] = useState(emptyMetadata);
    const [expectedTData, setExpectedTData] = useState(emptyData);
    const [scannedTData, setScannedTData] = useState(emptyData);
    const [unexpectedTData, setUnexpectedTData] = useState(emptyData);
    const [plannedDelivery, setPlannedDelivery] = useState({});
    const [startTime, setStartTime] = useState(new Date());
    const [popUpVisible, setPopUpVisible] = useState(false);

    //Triggered upon initial render of the page
    useEffect(() => {
        fetchDeliveryData(deliveryId).then((data: Delivery) => {
            setPlannedDelivery(data);
            const time = startTime.toISOString().match(/[0-9]{2}:[0-9]{2}:[0-9]{2}/)?.at(0)
            const newMetadata : Metadata  =  {
                name: data.name,
                supplier: "N/A", //Placeholder
                description: data.description,
                startTime: time ? time : "N/A",
            }
            setMetadata(newMetadata)
            fetchExpectedItemsData(data.items).then((expectedItems: any[]) => {
                    setExpectedTData(expectedItems);
                }
            )
        }).catch((err) => console.log(err))
    }, []);

    const fetchExpectedItemsData = async (items: any[]): Promise<any[]> => {
        const promises = items.map(async (item: any) => {
            try {
                const productData = await fetchProductData(item.gtin);
                delete productData.id;
                return productData;
            } catch (err) {
                console.log(err);
            }
        })
        return await Promise.all(promises);
    }

    const fetchDeliveryData = async (deliveryId: number) : Promise<Delivery> => {
        const response = await fetch(`/api/deliveries/fetch-planned-by-id/${deliveryId}`);
        if (!response.ok) {
            throw new Error('fetch-planned-by-id response was not ok');
        }
        return response.json();
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
                const newExpectedTData = expectedTData.slice();
                newExpectedTData.splice(i,1);
                setExpectedTData(newExpectedTData);
                return;
            }
        }

        //Check if it's in scannedTData
        for (let i = 0; i < scannedTData.length; i ++){
            if (scannedTData[i].gtin == barcode){
                const deliveryItem: any = {}
                Object.assign(deliveryItem, scannedTData[i])
                setUnexpectedTData([deliveryItem,...unexpectedTData])
                return;
            }
        }

        //If barcode isn't within expectedTData or scannedTData, query back-end API for productData
        const productData = {}
        try{
            const productData = await fetchProductData(barcode);
            setUnexpectedTData([productData,...unexpectedTData]);
            return;
        }
        catch (err){
            console.log(err);
        }
    }

    //Used by submitBarcode()
    const fetchProductData = async (barcode: string) => {
        const response = await fetch(`/api/lookup/barcode/lookup-by-gtin/${barcode}`);
        if (!response.ok){
            throw new Error("Error: api/lookup/barcode/lookup-by-gtin was not ok");
        }
        else {
            return await response.json();
        }
    }

    const onClick_SubmitDelivery = () => {
        setPopUpVisible(true);
    }

    const onClick_CancelSubmission = () => {
        setPopUpVisible(false);

    }

    const onClick_ConfirmSubmit = () => {
        submitDelivery().then().catch((error) => {
            console.log("Error occurred within submitDelivery() method:" + error)
        });
    }

    //Triggered by pressing submit delivery button
    const submitDelivery = async () => {
        //Create a record of the delivery and push it to the database via POST
        const recordedProducts: any[] =  [...structuredClone(scannedTData), ...structuredClone(unexpectedTData)];

        const recordedDelivery = {
            plan: plannedDelivery,
            startTime: startTime,
            endTime: (new Date()).toISOString(),
            recorded: recordedProducts,
        }

        console.log(recordedDelivery);
        let response = await fetch(`/api/deliveries/add-recorded-with-products`,{
            method: "POST",
            body: JSON.stringify(recordedDelivery),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        if (!response.ok){
            throw new Error("Error occurred as a result of api/deliveries/add-recorded-with-products POST request")
        }

        //Mark planned delivery status as processed
        response = await fetch(`/api/deliveries/set-planned-as-complete/${deliveryId}`,{
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        if (!response.ok){
            throw new Error("Error occurred as a result of api/deliveries/set-planned-status/")
        }

        //Take user back to the deliveries-overview page
        window.location.href = '/deliveries'
    }

    //Render
    return (
        <div className= 'page-container'>
            <div>
                <TDPPopUp state={popUpVisible}
                          missingItems={expectedTData}
                          scannedItems={scannedTData}
                          unexpectedItems={unexpectedTData}
                          cancel={onClick_CancelSubmission}
                          confirm={onClick_ConfirmSubmit}
                          startTime={startTime}
                />
                <h1>Process Delivery</h1>
            </div>
            <div className={'TDP-grid-container'}>
                <div className={'TDP-grid-column'}>
                    <TDPMetaDataWindow {...metadata}/>
                    <TDPBarCodeEntry submit={submitBarcode}/>
                    <TDPSubmitDeliveryButton submit={onClick_SubmitDelivery}/>
                </div>
                <div className={'TDP-grid-column'}>
                    <TDPTable data={expectedTData.reverse()} title={"Expected Items"}/>
                </div>
                <div className={'TDP-grid-column'}>
                    <TDPTable data={scannedTData.reverse()} title={"Scanned Items"}/>
                </div>
                <div className={'TDP-grid-column'}>
                    <TDPTable data={unexpectedTData.reverse()} title={"Unexpected Items"}/>
                </div>
            </div>
        </div>
    )
}

export default TakeDelivery
