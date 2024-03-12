import {buildStyles, CircularProgressbar} from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import {useEffect, useState} from "react";

// @ts-ignore
const TDPPercentageWidget = ({ percentage_, fraction_ }) => {
    return (
        <div className={"TDP-percentage-widget"}>
            <p>Expected Items</p>
            <CircularProgressbar
                value={percentage_}
                text={fraction_}
            />
        </div>
    )
}

export default TDPPercentageWidget;