import SearchBar from "../components/TraceabilityComponents/SearchBar";
import {useState} from "react";


const TraceabilityPage = () => {
    const [ data, setData ] = useState([])

    const getData = (data) => {
        setData(data);
        console.log(data);

    }


    return (
        <div className='traceability-page'>
            <h1>Traceability</h1>
            <div className = 'search-bar-container'>
                <SearchBar onUpdate = {getData}/>
            </div>
            <div className='data-container'>
                {data.length > 0 ? (data.map((item) => (
                        <div key={item.id}>
                            <p>{`Label: ${item.label}`} - ID : {item.id}</p>
                        </div>
                    )))
                    :
                    <p>No data available</p>
                }
            </div>

        </div>
    )
}

export default TraceabilityPage