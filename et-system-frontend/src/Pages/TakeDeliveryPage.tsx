import './TakeDeliveryPageComponents/TDPStyleSheet.css'
import {useState} from "react";
import MetaDataWindow from "./TakeDeliveryPageComponents/MetaDataWindow";
import DeliveryName from "./TakeDeliveryPageComponents/DeliveryName";
import BarCodeEntry from "./TakeDeliveryPageComponents/BarCodeEntry";
import SubmitDeliveryButton from "./TakeDeliveryPageComponents/SubmitDeliveryButton";
import Table from "./TakeDeliveryPageComponents/Table";
import Item from "./TakeDeliveryPageComponents/Interfaces/Item";

interface MetaData{
    deliveryName: string;
    supplier: string;
    expectedDeliveryDate: number;
}


const TakeDelivery = () => {
    //Default Meta Data - Likely needs removing later
    const defaultMetaData: MetaData = {
        deliveryName: "Delivery Name",
        supplier: "Default",
        expectedDeliveryDate: 0,
    }

    //Default table data such that each table renders with 20 empty rows
    const defaultTableData: Item[] = Array(20).fill(
        {
            label: "",
            barcode: "",
        }
    )


    //State variables
    const [ metaData, setMetaData ] = useState(defaultMetaData);
    const [ expectedTData, setExpectedTData] = useState(defaultTableData);
    const [ scannedTData, setScannedTData] = useState(defaultTableData);
    const [ unexpectedTData, setUnexpectedTData] = useState(defaultTableData);

    //Fetch methods

    /*
        Need to implement logic for all tables always having at least 20 rows:
            When a real row is added, remove an empty row.
            When a real row is removed, if there's now less than 20 rows, add empty row to end of array
     */

    //Submit barcode method
    const submitBarcode = (input: string) => {
        console.log("submitBarcode(): " + input);
        //Validate that it's a valid barcode

        //Get label associated with barcode - request to back-end??


        //Update table with product
        const newData = [{
            barcode: input,
            label: "N/A"
        } ,...scannedTData]
        setScannedTData(newData);
    }

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
                        <Table data={expectedTData.reverse()}/>
                    </div>

                    <div className={'table-container'}>
                        <h3 className={'table-title'}>Scanned Items</h3>
                        <Table data={scannedTData.reverse()}/>
                    </div>

                    <div className={'table-container'}>
                        <h3 className={'table-title'}>Unexpected Items</h3>
                        <Table data={unexpectedTData.reverse()}/>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default TakeDelivery
