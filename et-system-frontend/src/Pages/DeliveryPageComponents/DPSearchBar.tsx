import './DPStylesheet.css'

const DPSearchBar = () => {
    return(
        <div className={"dp-search-container"}>
            <label>Search scheduled deliveries</label>
            <input placeholder={"Search... "}/>
        </div>
    )
}

export default DPSearchBar