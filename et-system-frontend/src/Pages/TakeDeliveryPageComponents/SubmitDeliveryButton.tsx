import React from "react";

interface Props{

}

const SubmitDeliveryButton : React.FC<Props> = () => {
    return(
        <div>
            <button className={'submit-delivery-button'}>SUBMIT DELIVERY</button>
        </div>
    )
}

export default SubmitDeliveryButton;
