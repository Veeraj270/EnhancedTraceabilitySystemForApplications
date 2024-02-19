

const RPSummaryPanel = (props) => {

    return(
        <div className={"RPSummary-grid"}>
            <p className={"RPSummary-name"}><b>Recipe name:</b>{props.name}</p>
            <div className={"RPSummary-item"}>
                <p ><b>Allergens:</b>{props.allergens}</p>
            </div>
            <div className={"RPSummary-item"}>
                <p><b>Description:</b></p>
            </div>
        </div>
    )

}

export default RPSummaryPanel;