import './TakeDeliveryPageComponents/TDPStyleSheet.css'
import {useState} from "react";
import MetaDataWindow from "./TakeDeliveryPageComponents/MetaDataWindow";
import DeliveryName from "./TakeDeliveryPageComponents/DeliveryName";
import BarCodeEntry from "./TakeDeliveryPageComponents/BarCodeEntry";
import SubmitDeliveryButton from "./TakeDeliveryPageComponents/SubmitDeliveryButton";

interface MetaData{
    deliveryName: string;
    supplier: string;
    expectedDeliveryDate: number;

}


const TakeDelivery = () => {
    //Default Meta Data - Likely needs removing later
    const defaultMetaData: MetaData = {
        deliveryName: "DeliveryName",
        supplier: "Default",
        expectedDeliveryDate: 1200,

    }

    //State variables
    const [metaData, setMetaData ] = useState(defaultMetaData)


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
                    <p>Section 2</p>
                </div>
            </div>

        </div>
    )
}

export default TakeDelivery