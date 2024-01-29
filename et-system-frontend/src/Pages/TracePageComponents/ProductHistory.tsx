import {Event} from "../Interfaces/Event";

interface Props{
    history: Event[];
}

const ProductHistory = ( props : Props ) => {
    const generateJSX = (history: Event[]) => {
        console.log("history:" + history )
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
            {generateJSX(props.history)}
        </div>
    )
}

export default ProductHistory