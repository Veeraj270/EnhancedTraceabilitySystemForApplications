import React from "react";

interface Props{
    submit:() =>  void;
}

const TDPSubmitDeliveryButton : React.FC<Props> = ({submit} ) => {
    const handleClick = () => {
        try{
            submit()
        } catch (err){
            console.log("Error within submit(): " + err)
        }
    }
    return(
        <div>
            <button className={'TDP-submit-delivery-button'} onClick={handleClick}>SUBMIT DELIVERY</button>
        </div>
    )
}

export default TDPSubmitDeliveryButton;
