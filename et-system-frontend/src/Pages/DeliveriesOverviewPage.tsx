import './DeliveryPageComponents/DPStylesheet.css'
import DOPTable2 from './DeliveryPageComponents/DOPTable2';
import DOPSummaryPanel1 from './DeliveryPageComponents/DOPSummaryPanel1';
import DOPButtonPanel from './DeliveryPageComponents/DOPButtonPanel';
import DOPSummaryPanel2 from './DeliveryPageComponents/DOPSummaryPanel2';
import DOPButtonPanel2 from './DeliveryPageComponents/DOPButtonPanel2';
import DOPTable1 from "./DeliveryPageComponents/DOPTable1";


const DeliveriesOverviewPage = () => {
    return (
        <div className='deliveries-overview-page'>
            <h1 className={'DOP-title'}>Deliveries Overview</h1>
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
                <div className={'DOP-grid-column'}>
                    <DOPSummaryPanel1/>
                    <DOPButtonPanel/>
                </div>
                <div className={'DOP-grid-column'}>
                    <DOPTable2/>
                </div>
                <div className={'DOP-grid-column'}>
                    <DOPSummaryPanel2/>
                    <DOPButtonPanel2/>
                </div>

            </div>
        </div>
    )
}

export default DeliveriesOverviewPage