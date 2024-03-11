import {useEffect, useState} from "react";
import {Button} from "reactstrap";
import TDPPopUpTable from "./TDPPopUpTable";
import TDPPercentageWidget from "./TDPPercentageWidget";
import TDPMetaDataWidget from "./TDPMetaDataWidget";

// @ts-ignore
const TDPPopUp = ( {state, missingItems, unexpectedItems, scannedItems, cancel, confirm, startTime} ) => {
    const [visible, setVisible] = useState(false);
    const [percentage, setPercentage] = useState(0);
    const [fraction, setFraction] = useState("");

    useEffect(() => {
        setVisible(state);
    }, [state]);

    useEffect(() => {
        if (scannedItems && unexpectedItems && scannedItems){
            setPercentage((scannedItems.length / (missingItems.length + scannedItems.length)) * 100);
            setFraction(`${scannedItems.length} / ${scannedItems.length + missingItems.length}`)
        }
    }, [missingItems, scannedItems]);

    return (
        visible ? (
            <div className={"TDP-pop-up"}>
                <div className={"TDP-pop-up-inner"}>
                    <div className={"TDP-pop-up-upper"}>
                        <TDPPercentageWidget percentage_={percentage} fraction_={fraction}/>
                        <TDPMetaDataWidget
                            startTime={startTime}
                            visible={visible}
                        />
                        <button className={"TDP-cancel-button"} onClick={cancel}>Cancel</button>
                    </div>
                    <div className={"TDP-pop-up-middle"}>
                        <TDPPopUpTable header={"Missing Items"} data={missingItems}/>
                        <TDPPopUpTable header={"Unexpected Items"} data={unexpectedItems}/>
                    </div>
                    <div className={"TDP-pop-up-lower"}>
                        <button className={"TDP-confirm-button"} onClick={confirm}>Confirm Delivery</button>
                    </div>

                </div>
            </div>
        ) : (<div></div>)
    );
}

export default TDPPopUp;