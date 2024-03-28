import React, {useState} from 'react';
import './TracePageComponentsNew/TPStyleSheet.css'
import NodeLinkGraph from "./TracePageComponentsNew/NodeLinkGraph";
import DetailsWidget from "./TracePageComponentsNew/DetailsWidget";

const TracePage = () => {
    //State Variables
    const [ productID, setProductID ] = useState<number | null>(290);

    return (
        <div className={"trace-page-container"}>
            <h1>Trace Page</h1>
            <div className={"TP-content"}>
                <div className={"TP-content-col1"}>
                    <NodeLinkGraph
                        productID={productID}
                    />
                </div>
                <div className={"TP-content-col2"}>
                    <DetailsWidget/>
                    <div className={"TP-event-history-widget"}>Event History Widget</div>
                    <div className={"TP-event-details-widget"}>Event Details Widget</div>
                </div>
            </div>
        </div>
    )
}

export default TracePage;