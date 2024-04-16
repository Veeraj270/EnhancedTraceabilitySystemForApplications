import React, {useState} from 'react';
import './TracePageComponents/TPStyleSheet.css'
import NodeLinkGraph from "./TracePageComponents/NodeLinkGraph";
import DetailsWidget from "./TracePageComponents/DetailsWidget";
import EventHistoryWidget from "./TracePageComponents/EventHistoryWidget";
import EventDetailsWidget from "./TracePageComponents/EventDetailsWidget";
import EventsWidget from "./TracePageComponents/EventsWidget";
import LabelWidget from "./TracePageComponents/LabelWidget";


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