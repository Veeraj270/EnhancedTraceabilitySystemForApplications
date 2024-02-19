import {useEffect, useState} from "react";

const RPSummaryPanel = (props) => {

    const [data, setData] = useState(props)

    useEffect(() => {
        setData(props)
    }, [props])

    return(
        <div className={"RPSummary-grid"}>
            <p className={"RPSummary-name"}><b>Recipe name:</b>{data.props.name}</p>
            <div className={"RPSummary-item"}>
                <p ><b>Allergens:</b>{data.allergens}</p>
            </div>
            <div className={"RPSummary-item"}>
                <p><b>Description:</b></p>
            </div>
        </div>
    )

}

export default RPSummaryPanel;