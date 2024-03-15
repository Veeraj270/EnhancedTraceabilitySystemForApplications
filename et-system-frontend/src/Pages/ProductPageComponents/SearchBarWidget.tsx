import React, {ChangeEvent, useEffect, useState} from "react";

interface propsType{
    input: string;
    setInput: (input: string) => void;
    setFilter: (input : string) => void;
}

const SearchBarWidget = ( props : propsType ) => {
    const [placeHolder, setPlaceHolder] = useState("");
    const [selectedButton, setSelectedButtonId] = useState(0);

    useEffect(() => {
        setSelectedButtonId(1);
    }, []);

    const handleButtonPress = (event: React.MouseEvent<HTMLButtonElement>) => {
        const target = event.target as HTMLElement

        //Clear input contents
        props.setInput("");

        //Determine which button was pressed
        let id = target.getAttribute("data-id");
        let placeholder = target.getAttribute("data-placeholder")
        let filterBy = target.getAttribute("data-search-by")

        //Update state variables
        if(id && placeholder && filterBy){
            setSelectedButtonId(parseInt(id,10));
            setPlaceHolder(placeholder);
            props.setFilter(filterBy);
        }
        else(
            console.log("Error: Either id or placeholder is undefined")
        )
    }

    const getButtonClassName = (id: number) => {
        return `PDP-button${selectedButton === id ? "-selected":""}`;
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        props.setInput(event.target.value)
        event.stopPropagation();
    }

    return(
        <div className={"PDP-search-bar-container"}>
            <div className={"PDP-search-bar-wrapper"}>
                <input
                    className={"PDP-search-bar-input"}
                    placeholder={placeHolder}
                    onChange={(e) => handleChange(e)}
                    value={props.input}
                />
            </div>
            <button className={getButtonClassName(1)}
                    onClick={handleButtonPress}
                    data-placeholder={"search by ID"}
                    data-search-by={"id"}
                    data-id={1}>ID</button>
            <button className={getButtonClassName(2)}
                    onClick={handleButtonPress}
                    data-placeholder={"search by GTIN"}
                    data-search-by={"gtin"}
                    data-id={2}>GTIN</button>
            <button className={getButtonClassName(3)}
                    onClick={handleButtonPress}
                    data-placeholder={"search by label"}
                    data-search-by={"label"}
                    data-id={3}>Label</button>
        </div>
    )
}

export default SearchBarWidget;