import {useEffect, useState} from "react";

interface Props {
    dateDue: string,
    name: string,
    description: string,
    suppliers: string,
}

// @ts-ignore
const DOPSummaryPanel1 = (props) => {
    const [data, setData] = useState(props)

    //Update state whenever props change
    useEffect(() => {
        setData(props)
    }, [props]);

    return (
        <div className={'DOP-SP-1-grid'}>
            <p className={'DOP-SP-due-date'}>Due: {data.props.dateDue}</p>
            <div className={'DOP-SP-item'}>
                <p>Name: {data.props.name}</p>
            </div>
            <div className={'DOP-SP-item'}>
                <p>Description: {data.props.description}</p>
            </div>
            <div className={'DOP-SP-item'}>
                <p>Suppliers: {data.props.suppliers}</p>
            </div>
        </div>
    )
}

export default DOPSummaryPanel1;