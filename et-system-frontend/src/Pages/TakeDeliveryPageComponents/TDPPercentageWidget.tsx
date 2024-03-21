import {CircularProgressbar} from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';

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