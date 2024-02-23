import React, {useEffect, useState} from "react";
import IngredientQuantitiesTable from "./RecipePageComponents/IngredientQuantitiesTable";
import RecipeTable from "./RecipePageComponents/RecipeTable";
import "./AddRecipePageComponents/ARPStylesheet.css"
import IngredientQuantityPanel from "./AddRecipePageComponents/IngredientQuantityPanel";

const AddRecipePage = () => {

    const [selectedIngredientID, setSelectedIngredientID] = useState(-1)
    const [ingredientsData, setIngredientsData] = useState([])
    const [selectedIngredient, setSelectedIngredient] = useState({})
    const [recipe, setRecipe] = useState({
        label: '',
        ingredients: []
    })

    const fetchRecipes = async () => {
        const response = await fetch("http://localhost:8080/api/recipes/fetch-ingredients")
        if (!response.ok){
            throw new Error("Error fetching recipes")
        }
        return await response.json();
    }

    useEffect(() => {
        fetchRecipes().then((ingredientData) =>
        {
            setIngredientsData(ingredientData)
        })
            .catch((reason) => {console.error("Error within fetchIngredients" + reason)})
    }, [])

    useEffect(() => {
        if (selectedIngredientID !== -1){
            const selected = ingredientsData.filter((ingredient) => ingredient.id === selectedIngredientID).at(0)
            console.log(selected);
            setSelectedIngredient(selected)
        }
    }, [selectedIngredientID]);

    return(
        <div className={'add-recipe-page'}>
            <div>

            </div>
            <div className={'ARP-grid-container'}>
                <div className={'ARP-grid-column'}>
                    <RecipeTable
                        setSelectedRow={setSelectedIngredientID}
                        selectedRow={selectedIngredientID}
                        rawData={ingredientsData}
                        />
                </div>
                <div className={'ARP-grid-column'}>
                    <IngredientQuantityPanel
                        recipe={recipe}
                        setRecipe={setRecipe}
                        selectedIngredient={selectedIngredient}
                    />
                </div>
                <div className={'ARP-grid-column'}>
                    <IngredientQuantitiesTable
                        ingredientQuantities={recipe.ingredients}
                    />
                </div>
            </div>
        </div>
    )

}

export default AddRecipePage