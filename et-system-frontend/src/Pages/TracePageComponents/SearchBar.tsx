import React, {ChangeEvent, useCallback, useEffect, useRef, useState} from "react";

interface PropTypes{
    setGraphData: any;
    setDetailsData: any;
}

interface ResponseType{
    present: boolean;
    graph: any;
    label: string;
    allergens: string[];
}

const SearchBar = (props : PropTypes) => {
    //destructure props
    const setGraphData = props.setGraphData;
    const setDetailsData = props.setDetailsData;

    //state variables
    const [input, setInput] = useState<string>("");
    const inputRef = useRef(input);

    useEffect(() => {
        inputRef.current = input;
    }, [input]);

    const debounce = (cb : any, delay : number) => {
        let timeout : ReturnType<typeof setTimeout> | undefined
        return () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => cb("hello"), delay)
        }
    }

    const fetchTraceData = async (id : string) => {
        const res = await fetch(`http://localhost:8080/api/products/fetch-trace-data/${id}`);
        if (!res.ok){
            throw new Error("fetch-trace-data response was not ok")
        }
        return await res.json();

    }

    const queryBackend = async () => {
        let input = inputRef.current;
        const re = /^\d+$/
        if (input.match(re) === null) {
            return;
        }
        fetchTraceData(input).then((data : ResponseType) => {
            if (!data.present) {
                setGraphData(null);
                setDetailsData();
                return;
            }

            //Update the graph data
            setGraphData(data.graph);

            //Update the details widget
            setDetailsData({
                label: data.label,
                allergens: data.allergens,
            })

        }).catch((e) => console.log(e));
    }

    //Runs when search bar input updates
    const queryBackendDebounced = useCallback(debounce(queryBackend, 1000),[]);

    useEffect(() => {
        queryBackendDebounced();
    }, [input])

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