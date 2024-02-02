import React from "react";
import Metadata from "./Interfaces/Metadata";

interface Props{
    data: Metadata
}

/*Note: Could streamline use of props in the future*/

const MetaDataWindow : React.FC<Props> = ( props: Props) => {
    return(
        <div className={'meta-data'}>
            <p>Supplier: {props.data.supplier}</p>
            <p>Expected Delivery Date: {props.data.expectedDeliveryDate}</p>
            <p>Place Holder</p>
            <p>Place Holder</p>
            <p>Place Holder</p>
        </div>
    )
}

export default MetaDataWindow