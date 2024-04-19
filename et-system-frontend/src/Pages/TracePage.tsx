import React, {useState} from 'react';
import './TracePageComponents/TPStyleSheet.css'
import NodeLinkGraph from "./TracePageComponents/NodeLinkGraph";
import DetailsWidget from "./TracePageComponents/DetailsWidget";
import EventsWidget from "./TracePageComponents/EventsWidget";

const TracePage = () => {
    //State variables
    const [ selectedProductID, setSelectedProductID ] = useState<number | null>(1);
    const [ graphData, setGraphData ] = useState<any | null>(null);

    //Render
    return (
        <div className={"trace-page-container"}>
            <h1>Traceability</h1>
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