import React from "react"
import Input2 from "./NewWeightWidget/Input2";
import Input1 from "./NewWeightWidget/Input1";
import { GiWeight } from "react-icons/gi";

interface PropTypes{
    selectedProductLabel: string | null,
    searchUsedItems: (input: string) => boolean,
    updateEntry: (input: number) => boolean
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
            <div className={'BSP3-icon-wrapper'}>
                <GiWeight
                    size={50}
                />
            </div>
            <p>Step 1:</p>
            <Input1
                searchUsedItems={props.searchUsedItems}
                input1Ref={input1Ref}
                input2Ref={input2Ref}
            />
            <p><b>Selected: &nbsp;</b> {selectedProductLabel ? selectedProductLabel : ""}</p>
            <p>Step 2:</p>
            <Input2
                input1Ref={input1Ref}
                input2Ref={input2Ref}
                updateEntry={props.updateEntry}
            />
        </div>
    )
}

export default NewWeightWidget