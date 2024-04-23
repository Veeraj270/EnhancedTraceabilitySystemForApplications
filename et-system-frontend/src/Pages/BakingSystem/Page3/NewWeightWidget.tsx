import React, {ChangeEvent, useState} from "react"
import { FaArrowRight } from "react-icons/fa6";
import Input2 from "./NewWeightWidget/Input2";
import Input1 from "./NewWeightWidget/Input1";

interface PropTypes{
    selectedProductLabel: string | null,
    searchUsedItems: (input: string) => boolean,
    updateEntry: (input: number) => void
}

const NewWeightWidget = (props : PropTypes) => {
    //Destructor props
    const selectedProductLabel = props.selectedProductLabel;

    //Refs
    const input1Ref = React.useRef<HTMLInputElement>(null);
    const input2Ref = React.useRef<HTMLInputElement>(null);

    //Render
    return (
        <div className={'BSP3-widget-1'}>
            <p>Step 1:</p>
            <Input1
                searchUsedItems={props.searchUsedItems}
                input1Ref={input1Ref}
                input2Ref={input2Ref}
            />
            <p><b>Selected: &nbsp;</b> {selectedProductLabel ? selectedProductLabel : ""}</p>
            <p>Step 2:</p>
            <Input2
                input2Ref={input2Ref}
                updateEntry={props.updateEntry}
            />
        </div>
    )
}

export default NewWeightWidget