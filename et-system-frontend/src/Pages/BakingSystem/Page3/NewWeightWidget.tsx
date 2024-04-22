import React from "react"

const NewWeightWidget = () => {
    return (
        <div className={'BSP3-widget-1'}>
            <p>Step 1:</p>
            <div className={'BSP3-input-wrapper'}>
                <input
                    placeholder={'Scan id barcode'}
                >
                </input>
                <button>Search</button>
            </div>
            <p>Step 2:</p>
            <div className={'BSP3-input-wrapper'}>
                <input
                    placeholder={'Enter new weight'}
                >
                </input>
                <button>Submit</button>
            </div>
        </div>
    )
}

export default NewWeightWidget