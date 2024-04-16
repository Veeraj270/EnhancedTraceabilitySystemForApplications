import React, {useState} from "react";

interface PropTypes {
    label: string | null;
}

const LabelWidget = (props : PropTypes) => {
    return (
        <div className={"TP-label-div"}>
            <p className={"TP-label"}>{props.label}</p>
        </div>
    )
}

export default LabelWidget