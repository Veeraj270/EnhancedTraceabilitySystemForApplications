import React from "react";
import Metadata from "./Interfaces/Metadata";



/*Note: Could streamline use of props in the future*/

// @ts-ignore
const MetaDataWindow : React.FC = ( {name, supplier, description, startTime} ) => {
    return(
        <div className={'TDP-MD-grid'}>
            <h3>{name}</h3>
            <div className={'TDP-MD-item'}>
                <p><b>Supplier: {supplier}</b> </p>
            </div>
            <div className={'TDP-MD-item'}>
                <p><b>Delivery Start Time: {startTime}</b></p>
            </div>
            <div className={'TDP-MD-item'}>
                <p><b>Description:</b> {description} </p>
            </div>
        </div>
    )
}

export default MetaDataWindow