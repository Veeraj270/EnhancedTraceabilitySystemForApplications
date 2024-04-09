import React, {useState} from 'react';
import './TracePageComponentsNew/TPStyleSheet.css'
import NodeLinkGraph from "./TracePageComponentsNew/NodeLinkGraph";
import DetailsWidget from "./TracePageComponentsNew/DetailsWidget";
import EventHistoryWidget from "./TracePageComponentsNew/EventHistoryWidget";
import EventDetailsWidget from "./TracePageComponentsNew/EventDetailsWidget";
import EventsWidget from "./TracePageComponentsNew/EventsWidget";


const TracePage = () => {
    //State Variables
    //const [ productID, setProductID ] = useState<number | null>(290);

    const [ selectedProductID, setSelectedProductID ] = useState<number | null>(1);

    const [ graphData, setGraphData ] = useState<any | null>(null);

    return (
        <div className={"trace-page-container"}>
            <h1>Trace Page</h1>
            <div className={"TP-content"}>
                <div className={"TP-content-col1"}>
                    <NodeLinkGraph
                        graphData={graphData}
                        setSelectedProductID={setSelectedProductID}
                    />
                </div>
                <div className={"TP-content-col2"}>
                    <DetailsWidget
                        setGraphData={setGraphData}
                    />
                    <EventsWidget
                        selectedProductID={selectedProductID}
                    />
                </div>
            </div>
        </div>
    )
}

export default TracePage;