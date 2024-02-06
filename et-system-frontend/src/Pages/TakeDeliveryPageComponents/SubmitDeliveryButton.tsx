import React from "react";

interface Props{
    submit:() =>  void;
}

const SubmitDeliveryButton : React.FC<Props> = ( {submit} ) => {
    const handleClick = () => {
        submit()
    }
    return(
        <div>
            <button className={'submit-delivery-button'} onClick={handleClick}>SUBMIT DELIVERY</button>
        </div>
    )
}

export default SubmitDeliveryButton;
