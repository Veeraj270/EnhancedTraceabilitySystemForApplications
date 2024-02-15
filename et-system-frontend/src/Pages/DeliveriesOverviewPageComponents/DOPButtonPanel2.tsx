import React from "react";

// @ts-ignore
const DOPButtonPanel2 = ( {details} ) => {
    //Event Handlers
    const handleClick = (event: React.MouseEvent) => {
        details()
    }

    return (
        <div className={'DOP-BP-2-grid'}>
            <button onClick={handleClick}>DETAILS</button>
        </div>
    )
}

export default DOPButtonPanel2