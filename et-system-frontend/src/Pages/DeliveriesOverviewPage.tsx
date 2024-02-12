import './DeliveryPageComponents/DPStylesheet.css'
import DOPTable2 from './DeliveryPageComponents/DOPTable2';
import DOPSummaryPanel1 from './DeliveryPageComponents/DOPSummaryPanel1';
import DOPButtonPanel from './DeliveryPageComponents/DOPButtonPanel';
import DOPSummaryPanel2 from './DeliveryPageComponents/DOPSummaryPanel2';
import DOPButtonPanel2 from './DeliveryPageComponents/DOPButtonPanel2';
import DOPTable1 from "./DeliveryPageComponents/DOPTable1";
import {useEffect, useState} from "react";


const DeliveriesOverviewPage = () => {
    const empty: any[] = []
    const [selectedPDelivery, setSelectedPDelivery] = useState(-1)
    const [selectedRDelivery, setSelectedRDelivery] = useState(-1)

    //Storing raw data at top level since it's required by both the table ReactFCs and the summary panel ReactFCs
    const [rawScheduledData, setRawScheduledData] = useState(empty)
    const [rawRecordedData, setRawRecordedData] = useState(empty)

    //Fetch Functions
    const fetchScheduled = async () => {
        const response = await fetch('http://localhost:8080/api/deliveries/fetch-planned');
        if (!response.ok){
            throw new Error("response from fetch-planned request was not ok");
        }
        return await response.json();
    }

    const fetchRecorded = async () => {
        const response = await fetch ('http://localhost:8080/api/deliveries/fetch-recorded');
        if (!response.ok){
            throw new Error("response from fetch-planned request was not ok");
        }
        return await response.json();
    }

    //Upon initial page render fetch raw data for scheduled and recorded deliveries
    useEffect(() => {
        try{
            fetchScheduled().then((rawData) => {setRawScheduledData(rawData)});
            fetchRecorded().then((rawData) => {setRawRecordedData(rawData)});
        }catch(error){
            console.log("Error occurred during initial fetching of raw data: " + error)
        }
    }, []);

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
                    <DOPTable1  setSelected={setSelectedPDelivery}
                                selected={selectedPDelivery}
                                rawData={{rawScheduledData}}/>
                </div>
                <div className={'DOP-grid-column'}>
                    <DOPSummaryPanel1/>
                    <DOPButtonPanel/>
                </div>
                <div className={'DOP-grid-column'}>
                    <DOPTable2  setSelected={setSelectedRDelivery}
                                selected={selectedRDelivery}
                                rawData={rawRecordedData}/>
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