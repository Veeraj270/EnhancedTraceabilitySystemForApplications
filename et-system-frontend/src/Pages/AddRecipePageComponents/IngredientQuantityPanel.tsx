import React, {useEffect, useState} from "react";
import {IngredientQuantity} from "../Interfaces/IngredientQuantity";
import {Button, Input, Label} from "reactstrap";
import "./ARPStylesheet.css"

const IngredientQuantityPanel = ({recipe, setRecipe, selectedIngredient}) => {

    const [ingredientQuantity, setIngredientQuantity] = useState<IngredientQuantity>()

    const handleIngredientSubmit = (event) => {
        if (!ingredientQuantity || !ingredientQuantity.quantity || !ingredientQuantity.ingredient) {
            console.error('Please fill in both quantity and ingredient.');
            return;
        }

        event.preventDefault()
        setRecipe({...recipe, ingredients: [...recipe.ingredients, ingredientQuantity]})
        console.log(ingredientQuantity)
        setIngredientQuantity({ingredient: undefined, quantity: undefined})
    }

    useEffect(() => {
        setIngredientQuantity({...ingredientQuantity, ingredient: selectedIngredient})
        console.log(selectedIngredient)
    }, [selectedIngredient])

    const handleChange = (event) => {
        event.preventDefault()
        const {value} = event.target
        setIngredientQuantity({...ingredientQuantity, quantity: value})
    }

    return(
        <div className={"ARPPanel-grid"}>
            <p className={'ARPPanel-name'}>Add ingredient to recipe</p>
            <div className={"ARPPanel-item"}>
                <p style={{margin: '10px 0 5px 0'}}>
                <b>Ingredient: </b>
                    {ingredientQuantity?.ingredient ? ingredientQuantity?.ingredient.label : '   '}
            </p>
                <Label><b>Quantity: </b></Label>
                <Input className="quantity-input"
                       type="number"
                       value={ingredientQuantity?.quantity || ' '}
                       onChange={handleChange}/>
            </div>
                <Button color="primary" onClick={handleIngredientSubmit} className = {'add-to-recipe-button'}>Add to recipe</Button>
            <div>
                <i className="arrow down"></i>
            </div>

        </div>
    )

}

export default IngredientQuantityPanel;