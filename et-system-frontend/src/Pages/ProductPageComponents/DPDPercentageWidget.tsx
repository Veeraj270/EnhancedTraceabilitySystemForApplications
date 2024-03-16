import {CircularProgressbar} from "react-circular-progressbar";

interface propType{
    percentage: number;
    fraction: string;
}

const DPDPercentageWidget = ( props: propType) => {
    return(
        <div className={"PDP-percentage-widget"}>
            <p>Quantity</p>
            <div className={"PDP-progress-bar-wrapper"}>
                <CircularProgressbar
                    value={props.percentage}
                    text={props.fraction}
                />
            </div>
        </div>
    )
}

export default DPDPercentageWidget;