import React from "react";
import Metadata from "./Interfaces/Metadata";

interface Props{
    data: Metadata
}

/*Note: Could streamline use of props in the future*/

const MetaDataWindow : React.FC<Props> = ( props: Props) => {
    return(
        <div className={'meta-data'}>
            <p>Supplier: {props.data.supplier ? props.data.supplier : "Unknown"} </p>
            <p>Expected Delivery Time: {props.data.deliveryTime ? props.data.deliveryTime: "Unknown"}</p>
            <p>Description: {props.data.description ? props.data.description : "Unknown"}</p>
        </div>
    )
}

export default MetaDataWindow