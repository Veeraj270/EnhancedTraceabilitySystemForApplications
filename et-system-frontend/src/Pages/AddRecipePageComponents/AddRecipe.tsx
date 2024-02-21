import React, {useState} from "react";
import {IngredientQuantity} from "../Interfaces/IngredientQuantity";
import {Button, FormGroup, Input, Label} from "reactstrap";

const AddRecipe = ({recipe, setRecipe}) => {

    const [ingredientQuantity, setIngredientQuantity] = useState<IngredientQuantity>()

    const handleIngredientSubmit = (event) => {
        event.preventDefault()
        setRecipe({...recipe, ingredients: [...recipe.ingredients, ingredientQuantity]})
        console.log(ingredientQuantity)
    }

    const handleChange = (event) => {
        const {name, value} = event.target
        setIngredientQuantity({...ingredientQuantity, [name]: value})
    }

    return (
        <div>
            <FormGroup onSubmit={handleIngredientSubmit}>
                <Label for="ingredient">Ingredient:</Label>
                <Input type="text" name="ingredient" id="ingredient" value={ingredientQuantity?.ingredient || ''}
                       onChange={handleChange}/>

                <Label for="quantity">Quantity:</Label>
                <Input type="number" name="quantity" id="quantity" value={ingredientQuantity?.quantity || 0}
                       onChange={handleChange}/>

                <Button color="primary" onClick={handleIngredientSubmit}>Add to recipe</Button>
            </FormGroup>
        </div>
    )

}
export default AddRecipe