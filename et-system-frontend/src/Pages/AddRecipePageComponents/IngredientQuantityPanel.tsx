import React, {useEffect, useState} from "react";
import {IngredientQuantity} from "../Interfaces/IngredientQuantity";
import {Button, Input, Label} from "reactstrap";
import "./ARPStylesheet.css"

const IngredientQuantityPanel = ({recipe, setRecipe, selectedIngredient}) => {

    const [ingredientQuantity, setIngredientQuantity] = useState<IngredientQuantity>()

    const handleIngredientSubmit = (event) => {
        // Check if both fields exist before submitting
        if (!ingredientQuantity || !ingredientQuantity.quantity || !ingredientQuantity.ingredientType) {
            alert('Please fill in both ingredient and quantity fields.')
            console.error('Please fill in both quantity and ingredient.');
            return;
        }

        // Check if the ingredient is already in the table before submitting it
        if (recipe.ingredientQuantities
            .find(el => el.ingredientType === ingredientQuantity.ingredientType) !== undefined){
            alert('The ingredient that you are adding is already in the table.')
            return;
        }

        event.preventDefault()
        setRecipe({...recipe,
            ingredientQuantities: [...recipe.ingredientQuantities, ingredientQuantity]
        })
        console.log(ingredientQuantity)
        setIngredientQuantity({ ingredientType: undefined, quantity: undefined})
    }

    useEffect(() => {
        setIngredientQuantity({...ingredientQuantity, ingredientType: selectedIngredient})
        console.log(selectedIngredient)
    }, [selectedIngredient])

    const handleChange = (event) => {
        event.preventDefault()
        setIngredientQuantity({...ingredientQuantity, quantity: event.target.value})
    }

    return(
        <div className={"ARPPanel-grid"}>
            <p className={'ARPPanel-name'}>Add ingredient to recipe</p>
            <div className={"ARPPanel-item"}>
                <p style={{margin: '10px 0 5px 0'}}>
                <b>Ingredient: </b>
                    {ingredientQuantity?.ingredientType ? ingredientQuantity?.ingredientType.name : '   '}
            </p>
                <Label><b>Quantity: </b></Label>
                <Input className="quantity-input"
                       type="number"
                       value={ingredientQuantity?.quantity || ' '}
                       onChange={handleChange}/>
            </div>
                <Button onClick={handleIngredientSubmit} className = {'add-to-recipe-button'}>Add to recipe</Button>
            <div>
                <i className="arrow down"></i>
            </div>

        </div>
    )

}

export default IngredientQuantityPanel;