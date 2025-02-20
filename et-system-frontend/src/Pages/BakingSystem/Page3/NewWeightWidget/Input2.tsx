import {FaArrowRight} from "react-icons/fa6";
import React, {ChangeEvent, useState} from "react";

interface PropTypes{
    input1Ref: React.RefObject<HTMLInputElement>,
    input2Ref: React.RefObject<HTMLInputElement>,
    updateEntry: (weight: number) => boolean
}

const Input2 = (props : PropTypes) => {
    //Destructor props
    const input1Ref = props.input1Ref;
    const input2Ref = props.input2Ref;
    const updateEntry = props.updateEntry;

    //State variables
    const [input, setInput] = useState("");

    //Methods
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    }

    const isValidWeight = (weight: string) : boolean => {
        const re =/^\d+(\.\d+)?$/
        return re.test(weight);
    }

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter'){
            buttonClicked();
        }
    }

    const buttonClicked = () => {
        if (!isValidWeight(input)){
            alert("Invalid weight entered");
        }
        let weight = parseFloat(input);
        if (updateEntry(weight)){
            input1Ref.current?.focus();
        }
    }

    //Render
    return (
        <div className={'BSP3-input-wrapper'}>
            <input
                ref={input2Ref}
                value={input}
                placeholder={'Enter new weight'}
                onChange={handleChange}
                onKeyDown={handleKeyPress}
            >
            </input>
            <button>
                <FaArrowRight
                    style={{fontSize: '18px'}}
                /></button>
        </div>
    )
}

export default Input2;