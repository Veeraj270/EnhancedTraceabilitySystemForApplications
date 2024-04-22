import React from "react"
import './BakingSystem/Page3/BSP3StyleSheet.css'
import ProductsTable from "./BakingSystem/Page3/ProductsTable";
import UpdatedProductsTable from "./BakingSystem/Page3/UpdatedProductsTable";
import NewWeightWidget from "./BakingSystem/Page3/NewWeightWidget";
import ProducedTable from "./BakingSystem/Page3/ProducedTable";

const BakingSystemPage3 = () => {
    //Temp mock data
    const table1Data = new Array(30).fill({
        id: 1,
        label: 'Label',
        weight: 1
    })

    const table2Data = new Array(30).fill({
        id: 1,
        label: 'Label',
        newWeight: 1,
        oldWeight: 1
    })

    //End of temp mock data

    return (
        <div className={'page-container'}>
            <h1>Baking System - Page 3</h1>
            <div className={'BSP3-content'}>
                <div className={'BSP3-column'}>
                    <ProductsTable
                        products={table1Data}
                    />
                </div>
                <div className={'BSP3-column'}>
                    <NewWeightWidget/>
                </div>
                <div className={'BSP3-column'}>
                    <UpdatedProductsTable
                        products={table2Data}
                    />
                </div>
                <div className={'BSP3-column'}>
                    <ProducedTable/>
                    <button className={'BSP3-submit-button'}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default BakingSystemPage3