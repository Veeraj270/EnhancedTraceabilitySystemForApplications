import React, {useEffect} from "react";
import SearchBar from "./SearchBar";

interface PropTypes{
    setGraphData: any;
}

const DetailsWidget = ( props : PropTypes) => {
    const [detailsData, setDetailsData] = React.useState<any | null>(null);
    const [label, setLabel] = React.useState<string>("");
    const [allergens, setAllergens] = React.useState<string[]>([]);

    useEffect(() => {
        if (detailsData){
            setLabel(detailsData.label);
            if (detailsData.allergens.length > 0){
                setAllergens(detailsData.allergens.join(', '));
            }
        }
    }, [detailsData]);

    return (
        <div className={"TP-details-widget"}>
            <SearchBar
                setGraphData={props.setGraphData}
                setDetailsData={setDetailsData}
            />
            <div className={"TP-details-widget-inner"}>
                <div className={"TP-details-widget-inner-details"}>
                    <p><b>Label: &nbsp;</b>{label}</p>
                    <p><b>Allergens: &nbsp;</b>{allergens}</p>
                </div>
                <div className={"TP-details-widget-buttons"}>
                    <button className={"TP-produce-report-button"}>Produce Report</button>
                </div>
            </div>
        </div>
    )
}

export default DetailsWidget;