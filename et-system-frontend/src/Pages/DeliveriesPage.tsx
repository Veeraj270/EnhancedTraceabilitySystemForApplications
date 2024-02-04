import './DeliveryPageComponents/DPStylesheet.css'
import DPSearchBar from "./DeliveryPageComponents/DPSearchBar";
import DPTable from "./DeliveryPageComponents/DPTable";
import AuthorNewDeliveryButton from "./DeliveryPageComponents/AuthorNewDeliveryButton";
import ButtonPanel from "./DeliveryPageComponents/ButtonPanel";
import SummaryPanel from "./DeliveryPageComponents/SummaryPanel"


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
                    <div className={"dp-table-div-2"}>table</div>
                </div>

            </div>
        </div>
    )
}

export default DeliveriesPage
