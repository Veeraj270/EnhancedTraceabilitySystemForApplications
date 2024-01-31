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
        expectedDeliveryDate: 1200,

    }

    const defaultTableData: Item[] = []


    //State variables
    const [metaData, setMetaData ] = useState(defaultMetaData)
    const [expectedTableData, setExpectedTableData] = useState(defaultTableData)
    const [scannedTableData, setScannedTableData] = useState(defaultTableData)
    const [unexpectedTableData, setUnexpectedTableData] = useState(defaultTableData)



    return (
        <div className='take-delivery-page'>
            <h1>Take Delivery</h1>
            <div className={'content'}>
                <div className={'section1'}>
                    <DeliveryName text={metaData.deliveryName}/>
                    <MetaDataWindow data={metaData}/>
                    <BarCodeEntry/>
                    <SubmitDeliveryButton/>
                </div>
                <div className={'section2'}>
                    <div className={'table-container'}>
                        <h3>Expected</h3>
                        <Table data={expectedTableData}/>
                    </div>
                    <div className={'table-container'}>
                        <h3>Scanned</h3>
                        <Table data={scannedTableData}/>
                    </div>
                    <div className={'table-container'}>
                        <h3>Unexpected</h3>
                        <Table data={unexpectedTableData}/>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default TakeDelivery
