import React, {ChangeEvent, useEffect, useState} from "react";
import {FaArrowRight} from "react-icons/fa";

interface Props{
    submit: (input: string) => void
}

const TDPBarCodeEntry : React.FC<Props> = ({submit}) => {
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
        <div className={'TDP-bar-code-entry'}>
            <input className={'TDP-input-box'} value={input}
                   onChange={handleChange}
                   onKeyDown={handleKeyPress}
            />
            <button className={'TDP-submit-barcode'} onClick={buttonClicked}><FaArrowRight/></button>
        </div>
    )
}

export default TDPBarCodeEntry;