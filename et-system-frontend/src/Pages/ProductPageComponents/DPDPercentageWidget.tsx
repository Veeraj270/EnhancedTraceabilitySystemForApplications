import React from "react";
import {buildStyles, CircularProgressbar} from "react-circular-progressbar";

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
                    strokeWidth={6}
                    styles={buildStyles({
                            pathColor: "#FFA500",
                            textColor: "#284B63",
                            strokeLinecap: 'butt'
                    }
                    )}
                />
            </div>
        </div>
    )
}

export default DPDPercentageWidget;