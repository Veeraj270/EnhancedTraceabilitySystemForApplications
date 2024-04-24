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

    useEffect(() => {
        // This is data passed from the first page of the baking system
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

    const updateScannedProducts = (scannedProduct: UsedProduct) => {

        const productIndex = scannedProducts.findIndex(product =>
        scannedProduct.product.id === product.product.id)

        if(productIndex == -1){
            // If the product isn't in the table just add it
            const newScannedProducts = scannedProducts.concat(scannedProduct)
            setScannedProducts(newScannedProducts)
        }else{
            // If the product is in the table just add the quantity to the already existing quantity
            const newScannedProducts = scannedProducts.map(product => {
                if(scannedProduct.product.id === product.product.id){
                    // Had to do this because it was concatenating it like 2 string
                    // instead of adding it as numbers
                    const newWeight: number = parseFloat(product.weight.toString()) + parseFloat(scannedProduct.weight.toString())
                    return {
                        product: product.product,
                        weight: newWeight
                    }
                }else {
                    return product
                }
            })
            setScannedProducts(newScannedProducts)
        }

    }

    const updateTables = (product: UsedProduct) => {
        // Find the ingredient whose quantity needs subtracting
        const ingredientIndex = ingredientsNeeded.findIndex((ing) =>
            ing.ingredientType?.name === product.product.ingredientType.name
        )
        // If the ingredient is found update it
        if(ingredientIndex !== -1){
            const newIngredientsNeeded = ingredientsNeeded.map((x: IngredientQuantity) => {
                if(x.ingredientType?.name === product.product.ingredientType.name){
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
            setIngredientsNeeded(newIngredientsNeeded.filter(x => x !== undefined))

            // Add the fetched product and the weight to the scanned products table data
            updateScannedProducts({
                product: product.product,
                weight: usedProductData.weight
            })

            setUsedProductData({})
            // If the ingredient is not found - alert
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
                console.log(product.ingredientType.name)
                updateTables(
                    {
                        product: product,
                        weight: usedProductData.weight
                    })
            }).catch((error) => console.log(error))
        }
        console.log(scannedProducts)
    }

    return (
        <div className="BS2-page">
            <h1 className="BS2-title">Baking System</h1>
            <div className="BS2-grid-container">
                <div>
                    <IngredientQuantitiesTableRP
                        ingredientQuantities={ingredientsNeeded}
                        height={{height: "500px"}}
                    />
                </div>
                <div className="weigh-outer-container">
                    <div className="weigh-container">
                        <div className={'input-container'}>
                            <h2 className='input-container-title'>Weigh needed ingredients</h2>
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
                            <b className="weigh-products-title">Weighed Products</b>
                            <ScannedProductsTable
                                scannedProducts={scannedProducts}
                            />
                        </div>
                    </div>
                    <button className="finished-button">
                        Finished
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BakingSystemPage2