
import {useEffect, useState} from "react";


// @ts-ignore
const TDPMetaDataWidget = ( {startTime, visible} )=> {
    //Strings for display
    const [timeElapsedText, setTimeElapsedText] = useState("");
    const [currentTimeText, setCurrentTimeText] = useState("");
    const [startTimeText, setStartTimeText] = useState("");


    //For calculation
    const [timeElapsed_Seconds, setTimeElapsed_Seconds] = useState(0);
    const [visibleTime, setVisibleTime] = useState(new Date()); //Stores the time at which the pop-up became visible
    const [currentTime, setCurrentTime] = useState(new Date());

    //Triggered when the pop-up is toggled to visible
    useEffect(() => {
        //Convert startTime to text
        setStartTimeText(startTime.toISOString().match(/[0-9]{2}:[0-9]{2}:[0-9]{2}/)?.at(0));

        const now = new Date();
        if (visible === true){
            setVisibleTime(now);
        }
        let seconds = Math.trunc((now.getTime() - startTime.getTime())/1000); //Divided by 1000 since getTime() returns milliseconds
        console.log("seconds: " + seconds);
        setTimeElapsed_Seconds(seconds);

        const interval = setInterval(() => {
            setTimeElapsed_Seconds((timeElapsed_Seconds) => timeElapsed_Seconds + 1);
        }, 1000) //Repeats every 1000 milliseconds

        return () => clearInterval(interval);

        }, [visible]);

    const updateTime = (seconds: number) => {
        //Convert to hours, minutes, seconds
        let hours = Math.trunc(seconds/3600);
        let minutes = Math.trunc((seconds - (hours * 3600))/60);
        seconds = seconds -  (hours * 3600 + minutes * 60);

        //Build up 24 hour time
        let text = ((hours < 10) ? "0" + hours : hours) + ":"
            + ((minutes < 10) ?  "0" + minutes : minutes) + ":"
            + ((seconds < 10) ?  "0" + seconds : seconds);

        setTimeElapsedText(text);


    }

    useEffect(() => {
        updateTime(timeElapsed_Seconds);
    }, [timeElapsed_Seconds]);


    return (
        <div className={"TDP-meta-data-widget"}>
            <p><b>Start Time:</b> {startTimeText}</p>
            <p><b>Time Elapsed Seconds</b> {timeElapsedText}</p>
        </div>
    )
}

export default TDPMetaDataWidget;