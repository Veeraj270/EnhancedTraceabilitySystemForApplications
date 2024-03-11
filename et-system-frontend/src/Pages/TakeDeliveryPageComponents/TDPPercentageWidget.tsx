import {buildStyles, CircularProgressbar} from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import {useEffect, useState} from "react";

// @ts-ignore
const TDPPercentageWidget = ({ percentage_, fraction_ }) => {
    //State variables
    const [ percentage, setPercentage ] = useState(0);
    const [ fraction, setFraction ] = useState("");

    //Update the widget whenever relevant data changes
    useEffect(() => {
        setPercentage(percentage_);
        setFraction(fraction_);
    }, [percentage_, fraction_]);

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