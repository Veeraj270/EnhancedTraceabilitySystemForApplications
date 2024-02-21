import {useEffect, useState} from "react";

// @ts-ignore
const TDPPopUp = ( {state} ) => {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        setVisible(state);
    }, [state]);
    return (
        visible ? (
            <div className={"TDP-pop-up"}>
                <div className={"TDP-pop-up-inner"}>
                    <p>Are you sure you wish to submit?</p>
                    <div className={"TDP-pop-up-button-div"}>
                        <button className={"b1"} id={'TDPPopUpYesButton'}>Yes</button>
                        <button className={"b2"} id={'TDPPopUpGoBackButton'}>Go Back</button>
                    </div>
                </div>
            </div>
        ) : (<div></div>)
    );
}

export default TDPPopUp;