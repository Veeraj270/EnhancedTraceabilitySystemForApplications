import React from "react";
import MetaData from "./Interfaces/MetaData";

interface Props{
    data: MetaData
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