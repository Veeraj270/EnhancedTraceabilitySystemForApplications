import React from "react";
import {useEffect, useState} from "react";


// @ts-ignore
const TDPMetaDataWidget = ( {startTime, visible, totalWeight} )=> {
    //Strings for display
    const [timeElapsedText, setTimeElapsedText] = useState("");
    const [startTimeText, setStartTimeText] = useState("");

    //For calculation
    const [timeElapsed_Seconds, setTimeElapsed_Seconds] = useState(0);

    //Triggered when the pop-up is toggled to visible
    useEffect(() => {
        if(visible){
            //Convert startTime to text
            setStartTimeText(startTime.toISOString().match(/[0-9]{2}:[0-9]{2}:[0-9]{2}/)?.at(0));
            const now = new Date();
            setTimeElapsed_Seconds(Math.trunc((now.getTime() - startTime.getTime())/1000)) //Divided by 1000 since getTime() returns milliseconds
            const interval = setInterval(() => {
                setTimeElapsed_Seconds((timeElapsed_Seconds) => timeElapsed_Seconds + 1);
            }, 1000) //Repeats every 1000 milliseconds

            return () => clearInterval(interval);
        }
        }, [visible]);

    const updateTime = (seconds: number): void => {
        //Convert to hours, minutes, seconds
        let hours = Math.trunc(seconds/3600);
        let minutes = Math.trunc((seconds - (hours * 3600))/60);
        seconds = seconds -  (hours * 3600 + minutes * 60);

        //Build up 24 hour time string
        let text = ((hours < 10) ? "0" + hours : hours) + ":"
            + ((minutes < 10) ?  "0" + minutes : minutes) + ":"
            + ((seconds < 10) ?  "0" + seconds : seconds);

        setTimeElapsedText(text);
    }

    //Every second update the state variables for time
    useEffect(() => {
        updateTime(timeElapsed_Seconds);
    }, [timeElapsed_Seconds]);

    //Render
    return (
        <div className={"TDP-meta-data-widget"}>
            <p><b>Start Time: &nbsp;</b>{startTimeText}</p>
            <p><b>Time Elapsed: &nbsp;</b>  {timeElapsedText}</p>
            <p><b>Total Weight (Scanned): &nbsp;</b> {totalWeight + "kg"}</p>
        </div>
    )
}

export default TDPMetaDataWidget;