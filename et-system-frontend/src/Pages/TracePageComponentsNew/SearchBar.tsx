import React, {ChangeEvent, useCallback, useEffect, useState} from "react";
import {clear} from "@testing-library/user-event/dist/clear";

const SearchBar = () => {
    //state variables
    const [input, setInput] = useState<string | null>();

    //When search bar value is updated

    //Send request to back-end to check if the id matches one within the system

    //If it does, send requests for node-link graph and product details

    const debounce = (cb : any, delay : number) => {
        let timeout : ReturnType<typeof setTimeout> | undefined
        return () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => cb("hello"), delay)
        }
    }

    useEffect(() => {
        verify();
    }, [input]);

    const verify = useCallback(debounce( (input: any) => {
        //Send request to back-end for the node-link graph data and the product details


        }, 500)
    ,[]);


    //Handle change method for <input>
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setInput(event.target.value);
        event.stopPropagation();
    }

    return (
        <div className={"TP-search-bar-wrapper"}>
            <input className={"TP-search-input"}
                placeholder={"Search by product id..."}
                value={input ? input : ""}
                onChange={(e) => handleChange(e)}>
            </input>
        </div>
    )
}

export default SearchBar;