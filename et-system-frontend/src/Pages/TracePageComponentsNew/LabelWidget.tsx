import React, {useState} from "react";

interface PropTypes {
    label: string;
    isVisible: boolean;
}

const LabelWidget = (props : PropTypes) => {

    return (
        <div className={"TP-label-div"}>
            <p>{props.label}</p>
        </div>
    )
}

export default LabelWidget