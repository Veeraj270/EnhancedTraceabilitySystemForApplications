import {FaSearch} from "react-icons/fa"
import './SearchBar.css'
import React, {ChangeEvent, useEffect, useState} from "react"
import Product from "../Interfaces/Product";

interface PropType {
    setInput: (input: string) => void;
    input: string
}

const SearchBar: React.FC<PropType> = ( props: PropType ) => {

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        props.setInput(event.target.value);
        event.stopPropagation();
    }

    return (
        <div className={"input-wrapper"}>
            <input className={"search-bar-input"}
                   placeholder={"Search by product ID..."}
                   value={props.input}
                   onChange={(e) => handleChange(e)}/>
            <FaSearch id = "search-icons"/>
        </div>
    )
}

export default SearchBar