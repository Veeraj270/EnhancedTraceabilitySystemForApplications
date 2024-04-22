import React, {ChangeEvent, useState} from 'react';
import { useLocation } from 'react-router-dom';
import IngredientQuantitiesTableRP from "./RecipePageComponents/IngredientQuantitiesTableRP";
import {UsedProductID} from "./Interfaces/UsedProductID";
import {UsedProduct} from "./Interfaces/UsedProduct";
import ScannedProductsTable from "./BakingSystemPage2Components/ScannedProductsTable";
import "./BakingSystemPage2Components/BS2Stylesheet.css"

const BakingSystemPage2 = () => {

    const [scannedProducts, setScannedProducts] = useState<UsedProduct[]>([])
    const [usedProductData, setUsedProductData] = useState<UsedProductID>({})

    const location = useLocation();
    const ingredients = location.state;

    const handleChangeProductID = (event: ChangeEvent<HTMLInputElement>) => {
        setUsedProductData(prevState => ({
            ...prevState,
            productID: event.target.value
            }))
    }

    const handleChangeWeight = (event: ChangeEvent<HTMLInputElement>) => {
        setUsedProductData(prevState => ({
            ...prevState,
            weight: event.target.value
        }))
    }

    const fetchFinalProducts = async (productID: number) => {
        const response = await fetch(`http://localhost:8080/api/products/fetch-product-by-id/${productID}`)
        if(!response.ok){
            throw new Error("Error fetching ordered final products")
        }
        return await response.json();
    }

    const handleSubmit = () => {
        console.log(usedProductData)
        if(usedProductData && usedProductData.productID && usedProductData.weight) {
            fetchFinalProducts(usedProductData.productID).then(product => {
                setScannedProducts(prevState =>
                    [...prevState,
                        {product: product,
                        weight: usedProductData.weight}
                    ]
                )
            }).catch((error) => console.log(error))
            setUsedProductData({})
        }
        console.log(scannedProducts)
    }

    return (
        <div className="BS2-page">
            <h1>Baking System</h1>
            <div className="BS2-grid-container">
                <div>
                    <IngredientQuantitiesTableRP
                        ingredientQuantities={ingredients}
                    />
                </div>
                <div className={'BS2-grid-container-inputs'}>
                    <div>
                        <h2>Product ID</h2>
                    <input className={'BS2-input-box'}
                           onChange={handleChangeProductID}
                           value={usedProductData?.productID || ''}
                           type={"number"}
                    />
                    </div>
                    <div>
                        <h2>Weight</h2>
                    <input className={'BS2-input-box'}
                           type={"number"}
                           onChange={handleChangeWeight}
                           value={usedProductData?.weight || ''}
                    />
                    </div>
                    <button
                        className={'BS2-submit-button'}
                        onClick={handleSubmit}>
                        Submit
                    </button>
                </div>
                <div>
                    <ScannedProductsTable
                        scannedProducts={scannedProducts}
                    />
                </div>
            </div>
        </div>
    )
}

export default BakingSystemPage2