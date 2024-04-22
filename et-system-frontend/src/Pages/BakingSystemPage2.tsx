import React, {ChangeEvent, useState} from 'react';
import { useLocation } from 'react-router-dom';
import IngredientQuantitiesTableRP from "./RecipePageComponents/IngredientQuantitiesTableRP";
import Product from "./Interfaces/Product";

const BakingSystemPage2 = () => {

    const [scannedProducts, setScannedProducts] = useState<Product[]>([])
    const [usedProductData, setUsedProductData] = useState()

    const location = useLocation();
    const ingredients = location.state;

    const handleChangeProductID = (event: ChangeEvent<HTMLInputElement>) => {
        setUsedProductData(prevState => ({
            ...prevState,
                productId: event.target.value
            }))
    }

    const handleChangeWeight = (event: ChangeEvent<HTMLInputElement>) => {
        setUsedProductData(prevState => ({
            ...prevState,
            weight: event.target.value
        }))
    }

    const handleSubmit = () => {

    }

    return (
        <div className={'BS2-page'}>
            <h1>Baking System</h1>
            <div className={'BS2-grid-container'}>
                <div>
                <IngredientQuantitiesTableRP
                    ingredientQuantities={ingredients}
                />
                </div>
                <div>
                    <input className={'BS2-input-box'}
                           onChange={handleChangeProductID}
                    />
                    <input className={'BS2-input-box'}
                           onChange={handleChangeWeight}
                    />
                    <button onClick={handleSubmit} />
                </div>

                <div>

                </div>
            </div>
        </div>
    )
}

export default BakingSystemPage2