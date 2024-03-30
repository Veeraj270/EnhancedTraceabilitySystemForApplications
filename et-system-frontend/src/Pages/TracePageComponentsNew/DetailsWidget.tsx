import React from "react";
import SearchBar from "./SearchBar";

interface PropTypes{
    setGraphData: any;
}

const DetailsWidget = ( props : PropTypes) => {

    return (
        <div className={"TP-details-widget"}>
            <SearchBar
                setGraphData={props.setGraphData}
            />
            <div className={"TP-details-widget-inner"}>
                <div className={"TP-details-widget-inner-details"}>
                    <p><b>Label: &nbsp;</b></p>
                    <p><b>Allergens: &nbsp;</b></p>
                </div>
                <div className={"TP-details-widget-buttons"}>
                    <button>Produce Report</button>
                </div>
            </div>
        </div>
    )
}

export default DetailsWidget;