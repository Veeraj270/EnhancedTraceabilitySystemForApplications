import './DeliveryPageComponents/DPStylesheet.css'
import DOPTable2 from './DeliveryPageComponents/DOPTable2';
import DOPSummaryPanel1 from './DeliveryPageComponents/DOPSummaryPanel1';
import DOPButtonPanel from './DeliveryPageComponents/DOPButtonPanel';
import DOPSummaryPanel2 from './DeliveryPageComponents/DOPSummaryPanel2';
import DOPButtonPanel2 from './DeliveryPageComponents/DOPButtonPanel2';
import DOPTable1 from "./DeliveryPageComponents/DOPTable1";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";


const DeliveriesOverviewPage = () => {
    const empty: any[] = []
    //STATE VARIABLES
    const [selectedPDelivery, setSelectedPDelivery] = useState(-1)
    const [selectedRDelivery, setSelectedRDelivery] = useState(-1)

    //Storing raw data at top level since it's required by both the table ReactFCs and the summary panel ReactFCs
    const [rawScheduledData, setRawScheduledData] = useState(empty)
    const [rawRecordedData, setRawRecordedData] = useState(empty)

    //PanelProps
    const [panelOneProps, setPanelOneProps] = useState({})
    const [panelTwoProps, setPanelTwoProps] = useState({})

    const navigate = useNavigate()

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

    //Extracting Data for Summary Panel 1
    useEffect(() => {
        let panelProps = {}
        if (selectedPDelivery != -1){
            const selected = rawScheduledData.filter((row)=> row.id == selectedPDelivery).at(0)
            //Extract information
            panelProps = {
                name: selected.name,
                dateDue: selected.deliveryTime.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/)?.at(0),
                description: selected.description,
                suppliers: ""
            }
            console.log(panelProps);
        }
        setPanelOneProps(panelProps)
    }, [selectedPDelivery]);

    //Extracting Data for Summary Panel 2
    useEffect(() => {
        let panelProps = {}
        if (selectedRDelivery != -1){
            const selected = rawRecordedData.filter((row)=> row.id == selectedRDelivery).at(0)
            console.log(selected);
            //Extract information
            panelProps = {
                name: (selected.plan.name + " [Record]"),
                dateDelivered: selected.startTime.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/)?.at(0),
                startTime: selected.startTime.match(/[0-9]{2}:[0-9]{2}:[0-9]{2}/).at(0),
                endTime: selected.endTime.match(/[0-9]{2}:[0-9]{2}:[0-9]{2}/).at(0),
                expectedItemCount: selected.plan.items.length,
                actualItemCount: selected.recorded.length,
                suppliers: ""
            }
            console.log(panelProps);
            setPanelTwoProps(panelProps);
        }
    }, [selectedRDelivery]);

    //Button Functionality
    //Called by "PROCESS" button click handler
    const processDelivery = () => {
        navigate('take-delivery', {state: {selectedPDelivery}})
    }

    //Called by "EDIT" button click handler
    const editDelivery = () => {
        console.log("editDelivery()");
    }

    //Called by "CANCEL" button click handler
    const cancelDelivery = () => {
        console.log("cancelDelivery()");
    }

    const showDetails = () => {
        console.log("showDetails()");
    }

    //EVENT HANDLERS
    //Schedule New Delivery Button
    const handleClick1 = (event: React.MouseEvent) => {
        console.log("SCHEDULE NEW DELIVERY button clicked")
    }

    //Approved Suppliers Dashboard Button
    const handleClick2 = (event: React.MouseEvent) => {
        console.log("APPROVED SUPPLIERS DASHBOARD button clicked")
    }

    return (
        <div className='deliveries-overview-page'>
            <h1 className={'DOP-title'}>Deliveries Overview</h1>
            <div className={'DOP-upper'}>
                <button onClick={handleClick1}>SCHEDULE NEW DELIVERY</button>
                <button onClick={handleClick2}>APPROVED SUPPLIERS DASHBOARD</button>
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
                                rawData={rawScheduledData}/>
                </div>
                <div className={'DOP-grid-column'}>
                    <DOPSummaryPanel1 props={panelOneProps}/>
                    <DOPButtonPanel edit={editDelivery} cancel={cancelDelivery} process={processDelivery}/>
                </div>
                <div className={'DOP-grid-column'}>
                    <DOPTable2  setSelected={setSelectedRDelivery}
                                selected={selectedRDelivery}
                                rawData={rawRecordedData}/>
                </div>
                <div className={'DOP-grid-column'}>
                    <DOPSummaryPanel2 props={panelTwoProps}/>
                    <DOPButtonPanel2 details={showDetails}/>
                </div>

            </div>
        </div>
    )
}

export default DeliveriesOverviewPage