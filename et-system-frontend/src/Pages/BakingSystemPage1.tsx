import React, {useEffect, useState} from "react";
import "./BakingSystemPage1Components/BS1Stylesheet.css"
import {OrderedFinalProduct} from "./Interfaces/OrderedFinalProduct";

const BakingSystemPage1 = () => {

    const [finalProductsData, setFinalProductsData] = useState<Map<OrderedFinalProduct, number>>()

    const fetchFinalProducts = async () => {
        const response = await fetch("http://localhost:8080/api/customerorders/fetch-ordered-final-products")
        if(!response.ok){
            throw new Error("Error fetching ordered final products")
        }
        return await response.json();
    }

    function filterFinalProductsData(finalProductsData: any): Map<OrderedFinalProduct, number> {
        const map = new Map<OrderedFinalProduct, number>();

        // Iterate over each final product
            finalProductsData.forEach(product => {
            // Check if the product already exists in the map
            if (map.has(product)) {
                // If yes, increment the count
                map.set(product, map.get(product)! + 1);
            } else {
                // If not, initialize the count to 1
                map.set(product, 1);
            }
        });

        return map;
    }


    useEffect(() => {
        fetchFinalProducts().then((finalProductsData) => {
            const data = filterFinalProductsData(finalProductsData);
            setFinalProductsData(data)
        })
            .catch((reason) => {console.error("Error setting final products data." + reason)})
    })

    return (
        <div className="BS1-page">
            <h1 className='BS1-title'>Baking System</h1>
            <div className="BS1-grid-container">

            </div>
        </div>
    )

}

export default BakingSystemPage1