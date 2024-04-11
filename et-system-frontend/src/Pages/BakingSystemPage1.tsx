import React, {useEffect, useState} from "react";
import "./BakingSystemPage1Components/BS1Stylesheet.css"
import {OrderedFinalProduct} from "./Interfaces/OrderedFinalProduct";
import FinalProductsTable from "./BakingSystemPage1Components/FinalProductsTable";

const BakingSystemPage1 = () => {

    const [finalProductsData, setFinalProductsData] = useState<Map<OrderedFinalProduct, number>>()

    const fetchFinalProducts = async () => {
        const response = await fetch("http://localhost:8080/api/customerorders/fetch-ordered-final-products")
        if(!response.ok){
            throw new Error("Error fetching ordered final products")
        }
        return await response.json();
    }

    useEffect(() => {
        fetchFinalProducts().then((finalProductsData) => {
            setFinalProductsData(finalProductsData)
        })
            .catch((reason) => {console.error("Error setting final products data." + reason)})
    }, [finalProductsData])

    return (
        <div className="BS1-page">
            <h1 className='BS1-title'>Baking System</h1>
            <div className="BS1-grid-container">
                <FinalProductsTable
                    rawData={finalProductsData}
                />
            </div>
        </div>
    )

}

export default BakingSystemPage1