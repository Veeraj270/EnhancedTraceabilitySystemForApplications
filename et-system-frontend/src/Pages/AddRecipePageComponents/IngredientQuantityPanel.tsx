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
            <p className={"ARPPanel-name"}>
                <b>Ingredient: </b>
                {data.label}
            </p>
            <div className={"ARPPanel-item"}>
                <Label for="quantity">Add quantity: </Label>
                <Input type="number" name="quantity" id="quantity" value={ingredientQuantity?.quantity || {}}
                       onChange={handleChange}/>
            </div>
            <div className={"ARPPanel-item"}>
                <Button color="primary" onClick={handleIngredientSubmit}>Add to recipe</Button>
            </div>
        </div>
    )

}

export default IngredientQuantityPanel;