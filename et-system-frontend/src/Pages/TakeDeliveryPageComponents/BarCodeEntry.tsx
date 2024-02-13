import React, {ChangeEvent, useEffect, useState} from "react";
import {FaArrowRight} from "react-icons/fa";

interface Props{
    submit: (input: string) => void
}

const BarCodeEntry : React.FC<Props> = ({submit}) => {
    const [input, setInputValue] = useState("")

    const buttonClicked = () => {
        submit(input);
        setInputValue("");
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }
    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter'){
            buttonClicked();
        }
    }

    return(
        <div className={'bar-code-entry'}>
            <input className={'input-box'} value={input}
                   onChange={handleChange}
                   onKeyDown={handleKeyPress}
            />
            <button className={'submit-barcode'} onClick={buttonClicked}><FaArrowRight/></button>
        </div>
    )
}

export default BarCodeEntry;