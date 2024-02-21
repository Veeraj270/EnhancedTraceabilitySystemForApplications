import React, {useState} from "react";
import AddRecipe from "./AddRecipePageComponents/AddRecipe";
import IngredientQuantitiesTable from "./RecipePageComponents/IngredientQuantitiesTable";

const AddRecipePage = () => {

    const [recipe, setRecipe] = useState({
        label: '',
        ingredients: []
    })

    return(
        <div>
            <AddRecipe
                recipe = {recipe}
                setRecipe = {setRecipe}
            />
            <IngredientQuantitiesTable
                ingredientQuantities={recipe.ingredients}
            />
        </div>
    )

}

export default AddRecipePage