import React, {ChangeEvent, useState} from "react";
import {GiWeight} from "react-icons/gi";


interface PropTypes{
    handleSubmit: (productID: number, weight: number) => void
}

const UseProductWidget = (props : PropTypes) => {
    //Destructure props
    const handleSubmit = props.handleSubmit;

    //State variables
    const [productID, setProductID] = useState<string>()
    const [weight, setWeight] = useState<string>()

    //Refs
    const input1Ref = React.useRef<HTMLInputElement>(null);
    const input2Ref = React.useRef<HTMLInputElement>(null);

    //Input change handlers
    const handleChangeProductID = (event: ChangeEvent<HTMLInputElement>) => {
        setProductID(event.target.value)
    }

    const handleChangeWeight = (event: ChangeEvent<HTMLInputElement>) => {
        setWeight(event.target.value)
    }

    const handleKeyPress1 = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && input2Ref.current){
            input2Ref.current.focus();
        }
    }

    const isValidWeight = (weight: string) : boolean => {
        const re =/^\d+(\.\d+)?$/
        return re.test(weight);
    }

    const isValidInt = (productID: string) => {
        const re = /^\d+$/;
        return re.test(productID);
    }

    const handleKeyPress2 = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter'){
            if (weight && productID){
                if (!isValidWeight(weight) && input2Ref.current){
                    input2Ref.current.focus();
                    alert("Invalid weight entered");
                    return;
                }
                let w = parseFloat(weight);
                if (!isValidInt(productID) && input1Ref.current){
                    input1Ref.current.focus();
                    alert("Invalid product ID entered");
                    return;
                }
                let p = parseInt(productID);
                handleSubmit(p, w);

            }
        }
    }

    //Render table
    return (
        <div className={'BSP2-widget-1'}>
            <div className={'BSP2-widget-col'}>
                <p><b>Scan Product ID</b></p>
                <div className={'BSP2-widget-input-wrapper'}>
                    <input ref={input1Ref} onChange={handleChangeProductID} onKeyDown={handleKeyPress1} value={productID}></input>
                </div>
            </div>
            <div className={'BSP2-widget-col'}>
                <p><b>Enter Weight</b></p>
                <div className={'BSP2-widget-input-wrapper'}>
                    <input ref={input2Ref} onChange={handleChangeWeight} onKeyDown={handleKeyPress2} value={weight}></input>
                </div>
            </div>
        </div>
    )
}

export default UseProductWidget;