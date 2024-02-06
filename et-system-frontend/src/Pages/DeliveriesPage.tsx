import './DeliveryPageComponents/DPStylesheet.css'
import DPSearchBar from "./DeliveryPageComponents/DPSearchBar";
import DPTable from "./DeliveryPageComponents/DPTable";
import AuthorNewDeliveryButton from "./DeliveryPageComponents/AuthorNewDeliveryButton";
import ButtonPanel from "./DeliveryPageComponents/ButtonPanel";
import SummaryPanel from "./DeliveryPageComponents/SummaryPanel"
import DPTable2 from './DeliveryPageComponents/DPTable2';


const DeliveriesPage = () => {
    // @ts-ignore
    return (
        <div className='deliveries-page'>
            <h1>Deliveries</h1>
            <div className={'dp-region'}>
                <div className={"dp-region1"}>
                    <DPSearchBar/>
                    <DPTable/>
                </div>
                <div className={"dp-region2"}>
                    <div className={"dp-summary-buttons-div"}>
                        <SummaryPanel/>
                        <ButtonPanel/>
                        <AuthorNewDeliveryButton/>
                    </div>
                    <DPTable2/>
                </div>

            </div>
        </div>
    )
}

export default DeliveriesPage