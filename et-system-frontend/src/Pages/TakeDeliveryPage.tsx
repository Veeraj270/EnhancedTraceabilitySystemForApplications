import './TakeDeliveryPageComponents/TDPStyleSheet.css'
import {useEffect, useState} from "react";
import MetaDataWindow from "./TakeDeliveryPageComponents/MetaDataWindow";
import DeliveryName from "./TakeDeliveryPageComponents/DeliveryName";
import BarCodeEntry from "./TakeDeliveryPageComponents/BarCodeEntry";
import SubmitDeliveryButton from "./TakeDeliveryPageComponents/SubmitDeliveryButton";
import Table from "./TakeDeliveryPageComponents/Table";
import DeliveryItem from "./TakeDeliveryPageComponents/Interfaces/DeliveryItem";
import Metadata from "./TakeDeliveryPageComponents/Interfaces/Metadata";
import metadata from "./TakeDeliveryPageComponents/Interfaces/Metadata";

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
    const deliveryId = 1;

    useEffect(() => {
        fetchDeliveryData(deliveryId).then((data: Delivery) => {
            console.log(data)
            setExpectedTData(data.items)
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

    //Debugging
    useEffect(() => {
        console.log(expectedTData)
    }, [expectedTData]);


    const fetchDeliveryData = async (deliveryId: number) : Promise<Delivery> => {
        try {
            const response = await fetch(`http://localhost:8080/api/deliveries/fetch-planned-by-id/${deliveryId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error occurred as a result of fetch-planned-by-id", error);
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
        const item : DeliveryItem = {
            name: productLabel,
            gtin: barcode,
        }

        //Search expectedTData for barcode
        if (expectedTData.some(item => item.gtin === barcode)){
            //Remove from expectedTData
            setExpectedTData(expectedTData.filter((item: DeliveryItem) => (item.gtin !== barcode)));
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
                    <DeliveryName text={metaData.name}/>
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
