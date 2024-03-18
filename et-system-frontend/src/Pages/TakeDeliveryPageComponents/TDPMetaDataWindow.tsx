import React from "react";
import type Metadata from "./Interfaces/Metadata";

const TDPMetaDataWindow : React.FC<Metadata> = ({name, supplier, description, startTime} ) => {
    return (
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

export default TDPMetaDataWindow