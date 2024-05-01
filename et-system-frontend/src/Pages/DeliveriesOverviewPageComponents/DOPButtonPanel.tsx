import React from "react";

// @ts-ignore
const DOPButtonPanel = ( {edit, cancel, process} ) => {
    //Event Handlers
    const handleClick1 = (event: React.MouseEvent) => {
        edit()
    }
    const handleClick2 = (event: React.MouseEvent) => {
        cancel()
    }
    const handleClick3 = (event: React.MouseEvent) => {
        process()
    }
    return (
        <div className={'DOP-BP-grid'}>
            <button className={'DOP-button'} onClick={handleClick1}>EDIT</button>
            <button className={'DOP-button'} onClick={handleClick2}>CANCEL</button>
            <button className={'DOP-button'} onClick={handleClick3}>PROCESS</button>
        </div>
    )
}

export default DOPButtonPanel