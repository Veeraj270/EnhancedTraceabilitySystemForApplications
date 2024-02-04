import './DeliveryPageComponents/DPStylesheet.css'
import DPSearchBar from "./DeliveryPageComponents/DPSearchBar";
import DPTable from "./DeliveryPageComponents/DPTable";


const TakeDelivery = () => {
    return (
        <div className='deliveries-page'>
            <h1>Deliveries</h1>
            <div className={'dp-region'}>
                <div className={"dp-region1"}>
                    <DPSearchBar/>
                    <DPTable/>
                </div>
                <div className={"dp-region2"}>

                </div>

            </div>
        </div>
    )
}

export default TakeDelivery
