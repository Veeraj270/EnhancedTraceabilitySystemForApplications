import React, {ChangeEvent, useState} from "react";
import { FaSearch } from "react-icons/fa";

interface PropTypes{
    searchUsedItems: (input: string) => boolean
    input1Ref: React.RefObject<HTMLInputElement>
    input2Ref: React.RefObject<HTMLInputElement>
}

const Input1 = (props : PropTypes) => {
    //Destructure props
    const searchUsedItems = props.searchUsedItems;
    const input1Ref = props.input1Ref;
    const input2Ref = props.input2Ref;

    //State variables
    const [input, setInput] = useState("");

    //Methods
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    }

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter'){
            buttonClicked();
        }
    }

    const buttonClicked = () => {
        //Do something with the input
        let val = searchUsedItems(input);
        if (!val){
            alert("No used product found by given id");
            return;
        }
        //Clear the input
        setInput("");

        //Focus on the next input
        if (input2Ref.current){
            input2Ref.current.focus();
        }
    }

    //Render
    return (
        <div className={'BSP3-input-wrapper'}>
            <input
                ref={input1Ref}
                placeholder={'Scan id barcode'}
                value={input}
                onChange={handleChange}
                onKeyDown={handleKeyPress}
            >
            </input>
            <button onClick={buttonClicked}><FaSearch/></button>
        </div>
    )
}

export default Input1;