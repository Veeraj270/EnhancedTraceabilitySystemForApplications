import React from "react";
import {FaArrowRight} from "react-icons/fa";

interface Props{

}

const BarCodeEntry : React.FC<Props> = () => {
    return(
        <div className={'bar-code-entry'}>
            <input/>
            <button><FaArrowRight/></button>
        </div>
    )
}

export default BarCodeEntry;