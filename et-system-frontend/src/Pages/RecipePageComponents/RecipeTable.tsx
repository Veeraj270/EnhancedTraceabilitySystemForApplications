import {useState} from "react";

const RecipeTable = () => {

    const [searchInput, setSearchInput] = useState("")

    const handleChange = (event : any) => {
        event.preventDefault();
        setSearchInput(event.target.value)
    }

    return <div className={'RPTable-grid'}>
        <div className={'RPTable-search-container'}>
            <label>Search recipes</label>
            <input placeholder={"Search... "} onChange={handleChange} value={searchInput}/>
        </div>

        <div className={'DOP-T-content-div'}>

        </div>
    </div>
}

export default RecipeTable