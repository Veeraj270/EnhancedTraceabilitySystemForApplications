import React from "react";

interface Props{

}

const SubmitDeliveryButton : React.FC<Props> = () => {
    return(
        <div className={'bar-code-entry'}>
            <button>SUBMIT DELIVERY</button>
        </div>
    )
}

export default SubmitDeliveryButton;
