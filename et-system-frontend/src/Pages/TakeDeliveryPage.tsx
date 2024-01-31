import './TakeDeliveryPageComponents/TDPStyleSheet.css'
import {useState} from "react";



const TakeDelivery = () => {
    //State variables
    const [deliveryName, setDeliveryName ] = useState("Delivery Name")


    return (
        <div className='take-delivery-page'>
            <h1>Take Delivery</h1>
            <div className={'content'}>
                <div className={'section1'}>
                    <h3 className={'delivery-name'}>{deliveryName}</h3>
                    <div className={'meta-data'}></div>
                    <div className={'bar-code-entry'}></div>
                    <p>Section 1</p>
                </div>
                <div className={'section2'}>
                    <p>Section 2</p>
                </div>
            </div>

        </div>
    )
}

export default TakeDelivery