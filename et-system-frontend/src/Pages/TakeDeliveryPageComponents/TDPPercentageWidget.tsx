import {buildStyles, CircularProgressbar} from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import {useEffect, useState} from "react";

// @ts-ignore
const TDPPercentageWidget = ({ percentage, fraction }) => {
    return (
        <div className={"TDP-percentage-widget"}>
            <p>Expected Items</p>
            <CircularProgressbar
                value={percentage}
                text={fraction}
            />
        </div>
    )
}

export default TDPPercentageWidget;