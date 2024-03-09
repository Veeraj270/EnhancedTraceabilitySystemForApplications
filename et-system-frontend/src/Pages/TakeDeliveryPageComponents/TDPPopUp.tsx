import {useEffect, useState} from "react";
import {Button} from "reactstrap";
import TDPPopUpTable from "./TDPPopUpTable";

// @ts-ignore
const TDPPopUp = ( {state, missingItems, unexpectedItems} ) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(state);
    }, [state]);



    return (
        visible ? (
            <div className={"TDP-pop-up"}>
                <div className={"TDP-pop-up-inner"}>
                    <div className={"TDP-pop-up-upper"}>
                        <div className={"TDP-percentage-widget"}></div>
                        <div className={"TDP-meta-data-widget"}></div>
                        <button className={"TDP-cancel-button"}>Cancel</button>
                    </div>
                    <div className={"TDP-pop-up-middle"}>
                        <TDPPopUpTable header={"Missing Items"} data={missingItems}/>
                        <TDPPopUpTable header={"Unexpected Items"} data={unexpectedItems}/>
                    </div>
                    <div className={"TDP-pop-up-lower"}>
                        <button className={"TDP-confirm-button"}>Confirm Delivery</button>
                    </div>

                </div>
            </div>
        ) : (<div></div>)
    );
}

export default TDPPopUp;