import React from "react";
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
            <p className={'DOP-SP-due-date'}><b>Due:&nbsp;</b> {data.props.dateDue}</p>
            <div className={'DOP-SP-item'}>
                <p><b>Name:&nbsp;</b> {data.props.name}</p>
            </div>
            <div className={'DOP-SP-item'}>
                <p><b>Description:&nbsp;</b> {data.props.description}</p>
            </div>
            <div className={'DOP-SP-item'}>
                <p><b>Suppliers:&nbsp;</b> {data.props.suppliers}</p>
            </div>
        </div>
    )
}

export default DOPSummaryPanel1;