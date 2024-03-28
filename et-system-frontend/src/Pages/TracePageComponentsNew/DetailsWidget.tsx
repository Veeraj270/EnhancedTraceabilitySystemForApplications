import React from "react";
import SearchBar from "./SearchBar";

const DetailsWidget = () => {

    return (
        <div className={"TP-details-widget"}>
            <SearchBar/>
            <div className={"TP-details-widget-inner"}>
                <div className={"TP-details-widget-inner-details"}>
                    <p><b>Label: &nbsp;</b></p>
                    <p>Date of Creation: &nbsp;</p>
                    <p>Allergens: &nbsp;</p>
                </div>
                <div className={"TP-details-widget-buttons"}>
                    <button>Produce Report</button>
                </div>
            </div>
        </div>
    )
}

export default DetailsWidget;