import React, {ChangeEvent, useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import IngredientQuantitiesTableRP from "./RecipePageComponents/IngredientQuantitiesTableRP";
import {UsedProductID} from "./Interfaces/UsedProductID";
import {UsedProduct} from "./Interfaces/UsedProduct";
import ScannedProductsTable from "./BakingSystemPage2Components/ScannedProductsTable";
import "./BakingSystemPage2Components/BS2Stylesheet.css"
import {IngredientQuantity} from "./Interfaces/IngredientQuantity";

const BakingSystemPage2 = () => {

    const [scannedProducts, setScannedProducts] = useState<UsedProduct[]>([])
    const [usedProductData, setUsedProductData] = useState<UsedProductID>({})
    const [ingredientsNeeded, setIngredientsNeeded] = useState<IngredientQuantity[]>([])

    const location = useLocation();
    const ingredients = location.state;

    useEffect(() => {
        if(location.state && location.state.ingredientsNeeded){
            setIngredientsNeeded(location.state.ingredientsNeeded)
        }else{
            console.log("No ingredients were passed to this page")
        }
    }, [location.state.ingredientsNeeded])

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

    const updateTables = (product: UsedProduct) => {
        // Find the ingredient whose quantity needs subtracting
        const ingredientIndex = ingredientsNeeded.findIndex((ing) =>
            ing.ingredientType?.name === product.ingredientType.name
        )
        if(ingredientIndex !== -1){
            const newSelectedData = ingredientsNeeded.map((x: IngredientQuantity) => {
                if(x.ingredientType?.name === product.ingredientType.name){
                    // If the measured weight is less than the needed quantity - subtract
                    if(x.quantity > product.weight){
                        return {...x, quantity: x.quantity - product.weight}
                    } else{
                        // If the weight is more, remove the ingredient from the table
                        return undefined
                    }
                }else{
                    return x
                }
            })
            // Removing the undefined elements
            setSelectedData(newSelectedData.filter(x => x !== undefined))

            setScannedProducts(prevState =>
                [...prevState,
                    {product: product,
                        weight: usedProductData.weight}
                ]
            )
        } else{
            alert("The ingredient type of this product doesn't match any ingredients from the table")
        }
    }

    const fetchProduct = async (productID: number) => {
        const response = await fetch(`http://localhost:8080/api/products/fetch-product-by-id/${productID}`)
        if(!response.ok){
            throw new Error("Error fetching ordered final products")
        }
        return await response.json();
    }

    const handleSubmit = () => {
        console.log(usedProductData)
        // If both inputs are there, fetch the product from the database and update the tables
        if(usedProductData && usedProductData.productID && usedProductData.weight) {
            fetchProduct(usedProductData.productID).then(product => {
                updateTables(
                    {
                        product: product,
                        weight: usedProductData.weight
                    })
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
                        height={{height: "500px"}}
                    />
                </div>
                <div className={'input-container'}>
                    <h2>Weigh needed ingredients</h2>
                    <div className={'BS2-grid-container-inputs'}>
                        <div>
                            <h3>Product ID</h3>
                        <input className={'BS2-input-box'}
                               onChange={handleChangeProductID}
                               value={usedProductData?.productID || ''}
                               type={"number"}
                        />
                        </div>
                        <div>
                            <h3>Weight</h3>
                        <input className={'BS2-input-box'}
                               type={"number"}
                               onChange={handleChangeWeight}
                               value={usedProductData?.weight || ''}
                        />
                        </div>
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