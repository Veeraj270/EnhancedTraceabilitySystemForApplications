import React, {useEffect, useState} from "react";
import "./BakingSystemPage1Components/BS1Stylesheet.css"
import {OrderedFinalProduct} from "./Interfaces/OrderedFinalProduct";
import FinalProductsTable from "./BakingSystemPage1Components/FinalProductsTable";

const BakingSystemPage1 = () => {

    const [finalProductsData, setFinalProductsData] = useState<OrderedFinalProduct[]>([])

    const fetchFinalProducts = async () => {
        const response = await fetch("http://localhost:8080/api/customerorders/fetch-ordered-final-products")
        if(!response.ok){
            throw new Error("Error fetching ordered final products")
        }
        return await response.json();
    }

    const mapData = (data: any) => {
        const mappedData = data.map((productAndOrder: any) => ({
            key: productAndOrder.first.id.toString() + productAndOrder.second.id.toString(),
            customerOrder: productAndOrder.first.id,
            finalProduct: productAndOrder.second,
            quantity: productAndOrder.second.quantity
        }))
        return mappedData
    }

    useEffect(() => {
        fetchFinalProducts().then((finalProductsData) => {
            setFinalProductsData(mapData(finalProductsData))
        })
            .catch((reason) => {console.error("Error setting final products data." + reason)})
    }, [])

    useEffect(() => {
        console.log(finalProductsData)
    }, [finalProductsData])

    return (
        <div className="BS1-page">
            <h1 className='BS1-title'>Baking System</h1>
            <div className="BS1-grid-container">
                <FinalProductsTable
                    rawData={finalProductsData}
                    setRawData={setFinalProductsData}
                />
            </div>
        </div>
    )

}

export default BakingSystemPage1