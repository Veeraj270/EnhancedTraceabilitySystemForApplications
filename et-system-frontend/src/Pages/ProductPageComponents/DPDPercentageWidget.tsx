import {CircularProgressbar} from "react-circular-progressbar";

interface propType{
    percentage: number;
    fraction: string;
}

const DPDPercentageWidget = ( props: propType) => {
    return(
        <div className={"PDP-percentage-widget"}>
            <p>Quantity</p>
            <CircularProgressbar
                value={props.percentage}
                text={props.fraction}
            />
        </div>
    )
}

export default DPDPercentageWidget;