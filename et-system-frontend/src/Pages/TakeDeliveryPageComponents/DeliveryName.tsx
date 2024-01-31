import React from "react";

interface Props{
    text: string
}

const DeliveryName : React.FC<Props> = ( { text} ) => {
    return(
        <div className={'d-name-container'}>
            <h3 className={'delivery-name'}>{text}</h3>
        </div>
    )
}

export default DeliveryName;