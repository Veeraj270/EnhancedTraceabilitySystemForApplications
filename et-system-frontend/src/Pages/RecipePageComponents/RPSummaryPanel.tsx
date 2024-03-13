const RPSummaryPanel = ({props}) => {

    return(
        <div className={"RPSummary-grid"}>
            <p className={"RPSummary-name"}>
                <b>Recipe name: </b>
                 {props.label}
                <b>{props.vegan ? ' (V)' : props.vegetarian ? ' (Ve)' : ""}</b>
            </p>
            <div className={"RPSummary-item"}>
                <p><b>Allergens:&nbsp;</b>{props.allergens ? props.allergens.map(ingredientType => ingredientType.name).join(", ") : ""}</p>
            </div>
            <div className={"RPSummary-item"}>
                <p><b>Description:&nbsp;</b>{props.description}</p>
            </div>
        </div>
    )
}

export default RPSummaryPanel;