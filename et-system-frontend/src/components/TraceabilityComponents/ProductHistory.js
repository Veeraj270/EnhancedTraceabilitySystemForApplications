
import {useEffect, useState} from "react"

const ProductHistory = ( {history} ) => {
    const generateJSX = (history) => {
        console.log("generateJSX() history:" + history )
        return (
            ( history.length === 0) ? (<p>No events found</p>) : (
                history.map((event) => {
                    return(
                        <p>{event.type}: Timestamp: {event.timestamp}</p>
                    )
                })
            )
        )
    }

    return (
        <div>
            {generateJSX(history)}
        </div>
    )
}
export default ProductHistory

