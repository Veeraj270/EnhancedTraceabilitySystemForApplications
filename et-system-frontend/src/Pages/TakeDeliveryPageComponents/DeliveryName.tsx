import React from "react";

interface Props{
    text: string
}

const DeliveryName : React.FC<Props> = ( { text} ) => {
    return(
        <h3 className={'delivery-name'}>{text}</h3>
    )
}

export default DeliveryName;