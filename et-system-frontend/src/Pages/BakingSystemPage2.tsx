import React, {ChangeEvent, useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import IngredientQuantitiesTableRP from "./RecipePageComponents/IngredientQuantitiesTableRP";
import ScannedProductsTable from "./BakingSystem/Page2/ScannedProductsTable";
import "./BakingSystem/Page2/BS2Stylesheet.css"
import {OrderedFinalProduct} from "./Interfaces/OrderedFinalProduct";

import {IngredientQuantity} from "./BakingSystem/BakingSystemInterfaces";
import {UsedProduct} from "./BakingSystem/BakingSystemInterfaces";
import NewWeightWidget from "./BakingSystem/Page3/NewWeightWidget";
import UseProductWidget from "./BakingSystem/Page2/UseProductWidget";

interface PropTypes{
    ingredientsNeeded: IngredientQuantity[],
    setPage: (page: number) => void
    setProductsUsed: (products: UsedProduct[]) => void
}

const BakingSystemPage2 = (props : PropTypes) => {
    //Destructure props
    const setPage = props.setPage;
    const setProductsUsed = props.setProductsUsed;

    //State variables
    const [ingredientsNeeded, setIngredientsNeeded] = useState<IngredientQuantity[]>(props.ingredientsNeeded)
    const [scannedProducts, setScannedProducts] = useState<UsedProduct[]>([])

    //Used by updateTables()
    const updateScannedProducts = (usedProduct: UsedProduct) => {
        const index = scannedProducts.findIndex(product => usedProduct.product.id === product.product.id)

        // If the product isn't in the table, add it
        if(index == -1){
            setScannedProducts(scannedProducts => [...scannedProducts, usedProduct])
            return;
        }

        //If it is, add the usedWeight to the existing usedWeight
        const copy = [...scannedProducts]
        copy[index].quantityUsed += usedProduct.quantityUsed
        setScannedProducts(copy);
        return;
    }

    //Used by handleSubmit()
    const updateTables = (usedProduct: UsedProduct) => {
        //Find the IQ that matches the ingredient type of the scanned product
        const IQIndex = ingredientsNeeded.findIndex((ing) =>
            ing.ingredientName === usedProduct.product.ingredientType.name
        )

        // If the ingredient is not found - alert
        if (IQIndex === -1){
            alert("The ingredient type of this product doesn't match any ingredients from the table")
            return;
        }

        // If the ingredient is found update it
        const newIngredientsNeeded = ingredientsNeeded.map((IQ: IngredientQuantity) => {
            if(IQ.ingredientName === usedProduct.product.ingredientType.name){
                //If the measured weight is less than the needed quantity - subtract
                if(IQ.quantity > usedProduct.quantityUsed){
                    return {...IQ, quantity: IQ.quantity - usedProduct.quantityUsed};
                }
                else{
                    //If the weight is more, remove the IQ from ingredientsNeeded
                    return undefined;
                }
            } else{
                return IQ;
            }}
        )

        // Removing the undefined elements
        const filteredIngredientsNeeded = newIngredientsNeeded.filter(IQ => IQ !== undefined)
        // @ts-ignore
        setIngredientsNeeded(filteredIngredientsNeeded)

        //Add the used product to the scanned products table
        updateScannedProducts(usedProduct);
    }

    //Used by handleSubmit()
    const fetchProduct = async (productID: number) => {
        const response = await fetch(`http://localhost:8080/api/products/fetch-product-by-id/${productID}`)
        if(!response.ok){
            throw new Error("Error fetching ordered final products")
        }
        return await response.json();
    }

    const handleSubmit = (productID : number, weight: number) => {
        // If both inputs are there, fetch the product from the database and update the tables
        if(productID && weight) {
            fetchProduct(productID).then(product => {
                updateTables(
                    {
                        product: product,
                        quantityUsed: weight
                    })
            }).catch((error) => console.log(error))
        }
    }

    const submit = () => {
        /*if (ingredientsNeeded.length !== 0){
            alert("You still have required ingredients to scan and weight out")
            return;
        }*/

        setProductsUsed(scannedProducts);
        setPage(3);
    }

    //Render table
    return (
        <div className="BS2-page-container">
            <h1 className="BS2-title">Baking System</h1>
            <div className={'BSP3-description'}>
                <p>LHS table shows the ingredients required to bake the selected product. Scan the products you are using as ingredients, then weigh out the amount you are using, and enter the amount used.</p>
            </div>
            <div className="BS2-grid-container">
                <div className={'BS2-column-1'}>
                    <h2>Required Ingredients</h2>
                    <IngredientQuantitiesTableRP
                        ingredientTotals={ingredientsNeeded}
                    />
                </div>
                <div className={'BS2-column-2'}>
                    <UseProductWidget
                        handleSubmit={handleSubmit}
                    />
                    <div className={'BS2-button-div'}>
                        <button className="finished-button"
                                onClick={submit}>
                            Finished </button>
                    </div>
                </div>
                <div className={'BS2-column-3'}>
                    <h2>Weighed Products</h2>
                    <ScannedProductsTable
                        scannedProducts={scannedProducts}
                    />
                </div>
            </div>
        </div>
    )
}

export default BakingSystemPage2