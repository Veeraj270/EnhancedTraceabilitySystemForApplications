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
    return (
        <div className={'DOP-SP-2-grid'}>
            <div className={'DOP-SP-item'}>
                <p>Name: {props.name}</p>
            </div>
            <div className={'DOP-SP-item'}>
                <p>Date Delivered: {props.dateDelivered}</p>
            </div>
            <div className={'DOP-SP-item'}>
                <p>Start Time: {props.startTime}</p>
            </div>
            <div className={'DOP-SP-item'}>
                <p>End Time: {props.endTime}</p>
            </div>
            <div className={'DOP-SP-item'}>
                <p>Expected Item Count: {props.expectedItemCount}</p>
            </div>
            <div className={'DOP-SP-item'}>
                <p>Actual Item Counts {props.actualItemCount} </p>
            </div>
            <div className={'DOP-SP-item'}>
                <p>Suppliers: {props.suppliers}</p>
            </div>

        </div>
    )
}

export default DOPSummaryPanel2;