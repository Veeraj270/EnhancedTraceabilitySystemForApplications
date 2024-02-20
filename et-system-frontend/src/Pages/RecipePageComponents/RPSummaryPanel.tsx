import {useEffect, useState} from "react";

const RPSummaryPanel = (props) => {

    const [data, setData] = useState(props)

    useEffect(() => {
        setData(props)
        console.log(props)
    }, [props])

    return(
        <div className={"RPSummary-grid"}>
            <p className={"RPSummary-name"}>
                <b>Recipe name: </b>
                {data.props.label}
                <b>{data.props.vegan ? ' (V)' : data.props.vegetarian ? ' (Ve)' : ""}</b>
            </p>
            <div className={"RPSummary-item"}>
                <p><b>Allergens: </b>{data.props.allergens ? data.props.allergens.map(ingredient => ingredient.label).join(", ") : ""}</p>
            </div>
            <div className={"RPSummary-item"}>
                <p><b>Description: </b></p>
            </div>
        </div>
    )

}

export default RPSummaryPanel;