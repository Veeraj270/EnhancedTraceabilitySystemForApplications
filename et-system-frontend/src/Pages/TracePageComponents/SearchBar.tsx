import {FaSearch} from "react-icons/fa"
import './SearchBar.css'
import React, {useEffect, useState} from "react"
import {Product} from "../Interfaces/Product";

interface SearchBarProps {
    onUpdate: (products: Product[] | null) => void;
}

const SearchBar: React.FC<SearchBarProps> = ( { onUpdate } ) => {
    const [input, setInput] = useState("");

    const fetchData = async (id : number) : Promise<void> => {
        try {
            const res = await fetch(`http://localhost:8080/api/products/fetch-product-intermediaries/${id}`);
            if (!res.ok){
                throw new Error("fetch-product-intermediaries response was not ok");
            }
            const products = await res.json();
            console.log(products);
            onUpdate(products);
        } catch(error){
            console.log("Error occurred within fetchData(): ", error);
        }
    }

    useEffect(() => {
        //Check that the input is a number
        const number = parseInt(input, 10)
        if (!isNaN(number)){
            fetchData(number).then();
        }
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