import React, {useEffect, useState} from "react";

const SearchBarWidget = ( props ) => {
    const [placeHolder, setPlaceHolder] = useState("");
    const [input, setInput] = useState("");
    const [selectedButton, setSelectedButtonId] = useState(0);

    useEffect(() => {
        setSelectedButtonId(1);
    }, []);

    const handleButtonPress = (event: React.MouseEvent<HTMLButtonElement>) => {
        const target = event.target as HTMLElement
        let id = target.getAttribute("data-id");
        let placeholder = target.getAttribute("data-placeholder")
        if(id && placeholder){
            setSelectedButtonId(parseInt(id,10));
            setPlaceHolder(placeholder);
        }
        else(
            console.log("Error: Either id or placeholder is undefined")
        )
    }

    const getButtonClassName = (id: number) => {
        return `PDP-button${selectedButton === id ? "-selected":""}`;
    }

    return(
        <div className={"PDP-search-bar-container"}>
            <div className={"PDP-search-bar-wrapper"}>
                <input
                    className={"PDP-search-bar-input"}
                    placeholder={placeHolder}
                    onChange={props.onChange}
                    value={input}
                />
            </div>
            <button className={getButtonClassName(1)}
                    onClick={handleButtonPress}
                    data-placeholder={"search by ID"}
                    data-id={1}>ID</button>
            <button className={getButtonClassName(2)}
                    onClick={handleButtonPress}
                    data-placeholder={"search by GTIN"}
                    data-id={2}>GTIN</button>
            <button className={getButtonClassName(3)}
                    onClick={handleButtonPress}
                    data-placeholder={"search by label"}
                    data-id={3}>Label</button>
        </div>
    )
}

export default SearchBarWidget;