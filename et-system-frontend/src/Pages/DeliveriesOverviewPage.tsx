import './DeliveriesOverviewPageComponents/DOPStylesheet.css'
import DOPTable2 from './DeliveriesOverviewPageComponents/DOPTable2';
import DOPSummaryPanel1 from './DeliveriesOverviewPageComponents/DOPSummaryPanel1';
import DOPButtonPanel from './DeliveriesOverviewPageComponents/DOPButtonPanel';
import DOPSummaryPanel2 from './DeliveriesOverviewPageComponents/DOPSummaryPanel2';
import DOPButtonPanel2 from './DeliveriesOverviewPageComponents/DOPButtonPanel2';
import DOPTable1 from "./DeliveriesOverviewPageComponents/DOPTable1";
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
        const response = await fetch('/api/deliveries/fetch-unprocessed-planned');
        if (!response.ok){
            throw new Error("response from fetch-planned request was not ok");
        }
        return await response.json();
    }

    const fetchRecorded = async () => {
        const response = await fetch('/api/deliveries/fetch-recorded');
        if (!response.ok){
            throw new Error("response from fetch-planned request was not ok");
        }
        return await response.json();
    }

    //Upon initial page render fetch raw data for scheduled and recorded deliveries
    useEffect(() => {
        fetchScheduled().then((rawData) => {setRawScheduledData(rawData)}).catch((err) => {console.log("error within fetchScheduled" + err)});
        fetchRecorded().then((rawData) => {setRawRecordedData(rawData)}).catch((err) => {console.log("error within fetchRecorded" + err)});
    }, []);

    //Extracting Data for Summary Panel 1
    useEffect(() => {
        let panelProps = {}
        if (selectedPDelivery != -1){
            const selected = rawScheduledData.filter((row)=> row.id == selectedPDelivery).at(0)
            //Extract information
            panelProps = {
                name: selected.name,
                dateDue: selected.deliveryTime.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/)?.at(0).replaceAll("-","/"),
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
                dateDelivered: selected.startTime.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/)?.at(0).replaceAll("-","/"),
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
        if (selectedPDelivery != -1){
            navigate('/take-delivery', {state: {selectedPDelivery}})
        }
    }

    //Called by "EDIT" button click handler
    const editDelivery = () => {
        console.log("editDelivery()");
    }

    //Called by "CANCEL" button click handler
    const cancelDelivery = () => {
        fetch(`/api/deliveries/delete-planned-delivery/${selectedPDelivery}`,{
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then((res) => {
            if (!res.ok){
                throw new Error("response from delete-planned-delivery was not ok")
            }
            fetchScheduled().then((rawData) => {setRawScheduledData(rawData)});
        }).catch((error) => console.log(error))
    }

    return (
        <div className='page-container'>
            <h1>Deliveries Overview</h1>
            <div className={'DOP-page-content'}>
                <div className={'DOP-grid-column'}>
                    <DOPTable1  setSelected={setSelectedPDelivery}
                                selected={selectedPDelivery}
                                rawData={rawScheduledData}/>
                </div>
                <div className={'DOP-grid-column-2'}>
                    <DOPSummaryPanel1 props={panelOneProps}/>
                    <DOPButtonPanel edit={editDelivery} cancel={cancelDelivery} process={processDelivery}/>
                </div>
                <div className={'DOP-grid-column'}>
                    <DOPTable2  setSelected={setSelectedRDelivery}
                                selected={selectedRDelivery}
                                rawData={rawRecordedData}/>
                </div>
                <div className={'DOP-grid-column-4'}>
                    <DOPSummaryPanel2 props={panelTwoProps}/>
                    <DOPButtonPanel2/>
                </div>
            </div>
        </div>
    )
}

export default DeliveriesOverviewPage