import './TakeDeliveryPageComponents/TDPStyleSheet.css'
import {useEffect, useState} from "react";
import MetaDataWindow from "./TakeDeliveryPageComponents/MetaDataWindow";
import DeliveryName from "./TakeDeliveryPageComponents/DeliveryName";
import BarCodeEntry from "./TakeDeliveryPageComponents/BarCodeEntry";
import SubmitDeliveryButton from "./TakeDeliveryPageComponents/SubmitDeliveryButton";
import Table from "./TakeDeliveryPageComponents/Table";
import Item from "./TakeDeliveryPageComponents/Interfaces/Item";
import Metadata from "./TakeDeliveryPageComponents/Interfaces/Metadata";

const TakeDelivery = () => {
    //Default metadata - Likely needs removing later
    const defaultMetadata: Metadata = {
        deliveryName: "Delivery Name",
        supplier: "Default",
        expectedDeliveryDate: 0,
    }

    //Constants
    const rowsPerPage = 16;
    const emptyData: Item[] = [];

    //State variables
    const [metaData, setMetaData] = useState(defaultMetadata);
    const [expectedTData, setExpectedTData] = useState(emptyData);
    const [scannedTData, setScannedTData] = useState(emptyData);
    const [unexpectedTData, setUnexpectedTData] = useState(emptyData);

    const [deliveryData, setDeliveryData] = useState();


    //Temporary planned-delivery id
    const deliveryId = 1;


    useEffect(() => {
        //Upon initial rendering of the page, we request the planned deliveries data by id
        fetchDeliveryData()
    }, []);

    const fetchDeliveryData = async () => {
        try{
            const res = await fetch(`http://localhost:8080/api/deliveries/fetch-planned-by-id/${deliveryId}`)
            //const res = await fetch(`http://localhost:8080/api/deliveries/fetch-planned`)
            if (!res.ok){
                throw new Error("fetch-planned-by-id was not ok")
            }
            const deliveryData = await res.json();
            console.log(deliveryData)
        }catch (error){
            console.log("Error occurred within fetchDeliveryData(): ", error)
        }
    }

    //Fetch product data
    const fetchProductLabel = async (barcode: string) => {
        const labelKeys = ['generic_name', 'product_name', 'name', 'title', 'label'];
        const res = await fetch(`https://world.openfoodfacts.org/api/v2/product/${barcode}.json`)
        if (!res.ok){
            throw new Error(`openfoodfacts.org API query with barcode: ${barcode} response was not ok`)
        }
        let resJSON = await res.json();

        //Try each labelKey
        for (const key of labelKeys){
            if(resJSON.product && resJSON.product[key]){
                return resJSON.product[key];
            }
        }
        return "Unknown"
    }

    //Triggered by pressing button to right of input field or by pressing enter on input field
    const submitBarcode = async (barcode: string) => {
        let productLabel = "Unknown";
        try {
            productLabel = await fetchProductLabel(barcode);
        } catch(error){
            console.log("Error occurred within fetchProductLabel(): " + error);
        }
        const item : Item = {
            barcode: barcode,
            label: productLabel,
        }

        //Search expectedTData for barcode
        if (expectedTData.some(item => item.barcode === barcode)){
            //Remove from expectedTData
            setExpectedTData(expectedTData.filter((item: Item) => (item.barcode !== barcode)));
            //Add to expectedTData
            setScannedTData((prevState) => [item, ...prevState])
        }
        else {
            //Item is unexpected
            setUnexpectedTData((prevState) => [item, ...prevState]);
        }
    }

    //Triggered by pressing submit delivery button
    const submitDelivery = () => {
        console.log("submitDelivery()");
    }

    return (
        <div className='take-delivery-page'>
            <h1>Take Delivery</h1>
            <div className={'content'}>
                <div className={'section1'}>
                    <DeliveryName text={metaData.deliveryName}/>
                    <MetaDataWindow data={metaData}/>
                    <BarCodeEntry submit={submitBarcode}/>
                    <SubmitDeliveryButton submit={submitDelivery}/>
                </div>
                <div className={'section2'}>
                    <div className={'table-container'}>
                        <h3 className={'table-title'}>Expected Items</h3>
                        <Table data={expectedTData.reverse()} rowsPerPage={rowsPerPage}/>
                    </div>

                    <div className={'table-container'}>
                        <h3 className={'table-title'}>Scanned Items</h3>
                        <Table data={scannedTData.reverse()} rowsPerPage={rowsPerPage}/>
                    </div>

                    <div className={'table-container'}>
                        <h3 className={'table-title'}>Unexpected Items</h3>
                        <Table data={unexpectedTData.reverse()} rowsPerPage={rowsPerPage}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TakeDelivery
