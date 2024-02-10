import './DeliveryPageComponents/DPStylesheet.css'
import DPSearchBar from "./DeliveryPageComponents/DPSearchBar";
import DPTable from "./DeliveryPageComponents/DPTable";
import AuthorNewDeliveryButton from "./DeliveryPageComponents/AuthorNewDeliveryButton";
import ButtonPanel from "./DeliveryPageComponents/ButtonPanel";
import SummaryPanel from "./DeliveryPageComponents/SummaryPanel"
import DPTable2 from './DeliveryPageComponents/DPTable2';
import DOPSummaryPanel from './DeliveryPageComponents/DOPSummaryPanel';
import DOPButtonPanel from './DeliveryPageComponents/DOPButtonPanel';
import DOPSummaryPanel2 from './DeliveryPageComponents/DOPSummaryPanel2';
import DOPButtonPanel2 from './DeliveryPageComponents/DOPButtonPanel2';


const DeliveriesPage = () => {
    // @ts-ignore
    return (
        <div className='deliveries-overview-page'>
            <h1>Deliveries Overview</h1>
            <div className={'DOP-upper'}></div>
            <div className={'DOP-grid-container'}>
                <div className={'dop-grid-column'}>
                    <DPSearchBar/>
                    <DPTable/>
                </div>
                <div className={'dop-grid-column'}>
                    <DOPSummaryPanel/>
                    <DOPButtonPanel/>
                </div>
                <div className={'dop-grid-column'}>
                    <DPSearchBar/>
                    <DPTable/>
                </div>
                <div className={'dop-grid-column'}>
                    <DOPSummaryPanel2/>
                    <DOPButtonPanel2/>
                </div>

            </div>
        </div>
    )
}

export default DeliveriesPage