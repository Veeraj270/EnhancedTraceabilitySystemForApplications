import './DeliveryPageComponents/DPStylesheet.css'
import DPSearchBar from "./DeliveryPageComponents/DPSearchBar";
import DOPTableOld from "./DeliveryPageComponents/DOPTable-old";
import AuthorNewDeliveryButton from "./DeliveryPageComponents/AuthorNewDeliveryButton";
import ButtonPanel from "./DeliveryPageComponents/ButtonPanel";
import SummaryPanel from "./DeliveryPageComponents/SummaryPanel"
import DOPTable2 from './DeliveryPageComponents/DOPTable2';
import DOPSummaryPanel from './DeliveryPageComponents/DOPSummaryPanel';
import DOPButtonPanel from './DeliveryPageComponents/DOPButtonPanel';
import DOPSummaryPanel2 from './DeliveryPageComponents/DOPSummaryPanel2';
import DOPButtonPanel2 from './DeliveryPageComponents/DOPButtonPanel2';
import DOPTable1 from "./DeliveryPageComponents/DOPTable1";


const DeliveriesOverviewPage = () => {
    return (
        <div className='deliveries-overview-page'>
            <h1>Deliveries Overview</h1>
            <div className={'DOP-upper'}>
                <button>SCHEDULE NEW DELIVERY</button>
                <button>APPROVED SUPPLIERS DASHBOARD</button>
                <div>
                    <p>Deliveries Due Today:</p>
                    <p>Deliveries Processed Today:</p>
                    <p>Processed Delivery Total:</p>
                </div>
            </div>
            <div className={'DOP-grid-container'}>
                <div className={'dop-grid-column'}>
                    <DOPTable1/>
                </div>
                <div className={'dop-grid-column'}>
                    <DOPSummaryPanel/>
                    <DOPButtonPanel/>
                </div>
                <div className={'dop-grid-column'}>
                    <DPSearchBar/>
                    <DOPTable2/>
                </div>
                <div className={'dop-grid-column'}>
                    <DOPSummaryPanel2/>
                    <DOPButtonPanel2/>
                </div>

            </div>
        </div>
    )
}

export default DeliveriesOverviewPage