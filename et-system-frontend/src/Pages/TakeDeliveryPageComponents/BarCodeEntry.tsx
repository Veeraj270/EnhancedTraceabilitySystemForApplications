import React from "react";
import {FaArrowRight} from "react-icons/fa";

interface Props{

}

const BarCodeEntry : React.FC<Props> = () => {
    return(
        <div className={'bar-code-entry'}>
            <input className={'input-box'}/>
            <button className={'submit-barcode'}><FaArrowRight/></button>
        </div>
    )
}

export default BarCodeEntry;