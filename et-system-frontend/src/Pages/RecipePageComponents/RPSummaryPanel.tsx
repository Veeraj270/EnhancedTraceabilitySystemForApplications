import {useEffect, useState} from "react";

const RPSummaryPanel = ({props}) => {

    const [data, setData] = useState(props)

    useEffect(() => {
        setData(props)
        console.log(props)
    }, [props])

    return(
        <div className={"RPSummary-grid"}>
            <p className={"RPSummary-name"}>
                <b>Recipe name: </b>
                 {data.label}
                <b>{data.vegan ? ' (V)' : data.vegetarian ? ' (Ve)' : ""}</b>
            </p>
            <div className={"RPSummary-item"}>
                <p><b>Allergens: </b>{data.allergens ? data.allergens.map(ingredient => ingredient.label).join(", ") : ""}</p>
            </div>
            <div className={"RPSummary-item"}>
                <p><b>Description: </b></p>
            </div>
        </div>
    )

}

export default RPSummaryPanel;