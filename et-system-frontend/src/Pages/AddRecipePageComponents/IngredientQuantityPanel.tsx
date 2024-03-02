import React, {useEffect, useState} from "react";
import {IngredientQuantity} from "../Interfaces/IngredientQuantity";
import {Button, Input, Label} from "reactstrap";
import "./ARPStylesheet.css"

const IngredientQuantityPanel = ({recipe, setRecipe, selectedIngredient}) => {

    const [data, setData] = useState(selectedIngredient)
    const [ingredientQuantity, setIngredientQuantity] = useState<IngredientQuantity>()

    const handleIngredientSubmit = (event) => {
        event.preventDefault()
        setRecipe({...recipe, ingredients: [...recipe.ingredients, ingredientQuantity]})
        console.log(ingredientQuantity)
        setIngredientQuantity({})
    }

    useEffect(() => {
        setData(selectedIngredient)
        setIngredientQuantity({...ingredientQuantity, ingredient: selectedIngredient})
        console.log(selectedIngredient)
    }, [selectedIngredient])

    const handleChange = (event) => {
        const {name, value} = event.target
        setIngredientQuantity({...ingredientQuantity, [name]: value})
    }

    return(
        <div className={"ARPPanel-grid"}>
            <p className={'ARPPanel-name'}>Add ingredient to recipe</p>
            <div className={"ARPPanel-item"}>
                <p style={{margin: '10px 0 5px 0'}}>
                <b>Ingredient: </b>
                {data.label}
            </p>
                <Label for="quantity"><b>Quantity: </b></Label>
                <Input className="quantity-input" type="number" name="quantity" id="quantity" value={ingredientQuantity?.quantity || {}}
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