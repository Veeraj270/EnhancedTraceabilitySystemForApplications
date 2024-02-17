import {useEffect, useState} from "react";

interface Props {
    name: string,
    dateDelivered: string,
    startTime: string,
    endTime: string,
    expectedItemCount: number,
    suppliers: string
}

// @ts-ignore
const DOPSummaryPanel2 = ( props ) => {
    const [data, setData] = useState(props)

    //Update state whenever props change
    useEffect(() => {
        setData(props)
    }, [props]);

    return (
        <div className={'DOP-SP-2-grid'}>
            <div className={'DOP-SP-item'}>
                <p><b>Name:</b> {data.props.name}</p>
            </div>
            <div className={'DOP-SP-item'}>
                <p><b>Date Delivered:</b> {data.props.dateDelivered}</p>
            </div>
            <div className={'DOP-SP-item'}>
                <p><b>Start Time:</b> {data.props.startTime}</p>
            </div>
            <div className={'DOP-SP-item'}>
                <p><b>End Time:</b> {data.props.endTime}</p>
            </div>
            <div className={'DOP-SP-item'}>
                <p><b>Expected Item Count:</b> {data.props.expectedItemCount}</p>
            </div>
            <div className={'DOP-SP-item'}>
                <p><b>Actual Item Count:</b> {data.props.actualItemCount} </p>
            </div>
            <div className={'DOP-SP-item'}>
                <p><b>Suppliers:</b> {data.props.suppliers}</p>
            </div>

        </div>
    )
}

export default DOPSummaryPanel2;