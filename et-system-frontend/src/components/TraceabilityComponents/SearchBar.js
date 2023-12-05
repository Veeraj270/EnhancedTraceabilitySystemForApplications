
import {FaSearch} from "react-icons/fa"
import './SearchBar.css'
import {useEffect, useState} from "react"


const SearchBar = ( {onUpdate} ) => {
    const [input, setInput] = useState("");

    const fetchData = async (value) => {
        if (value != "" && !(value === undefined)){
            //Needs work: Further validation require

            console.log("passed checks: " + value)
            const res = await fetch(`http://localhost:8080/api/products/fetch-product-intermediaries/${value}`);
            const data = await res.json();
            onUpdate(data)
        }
    }

    useEffect(() => {
        fetchData(input)
    }, [input])

    return (
        <div className={"input-wrapper"}>
            <input className={"search-bar-input"} placeholder={"Search by product ID..."} value={input}
                   onChange={((e) => setInput(e.target.value))}/>
            <FaSearch id = "search-icons"/>
        </div>
    )
}

export default SearchBar

