import React from "react";

// @ts-ignore
const DOPButtonPanel2 = () => {
    //Event Handlers
    const handleClick = (event: React.MouseEvent) => {
        console.log('DETAILS')
    }

    return (
        <div className={'DOP-BP-2-grid'}>
            <button className={'DOP-button'} onClick={handleClick}>Details</button>
        </div>
    )
}

export default DOPButtonPanel2