import "./RecipePageComponents/RPStylesheet.css"
import RecipeTable from "./RecipePageComponents/RecipeTable";
import {useEffect, useState} from "react";
import RPSummaryPanel from "./RecipePageComponents/RPSummaryPanel";
import IngredientQuantitiesTableRP from "./RecipePageComponents/IngredientQuantitiesTableRP";

const RecipesPage = () => {

    const [recipeData, setRecipesData] = useState([])
    const [ingredientQuantitiesData, setIngredientQuantitiesData] = useState([])
    const [selectedRecipeID, setSelectedRecipeID] = useState(-1)
    const [selectedRecipe, setSelectedRecipe] = useState({})

    const fetchRecipes = async () => {
        const response = await fetch("http://localhost:8080/api/recipes/fetch-recipes")
        if (!response.ok){
            throw new Error("Error fetching recipes")
        }
        return await response.json();
    }

    useEffect(() => {
        fetchRecipes().then((recipeData) =>
        {
            setRecipesData(recipeData)
        })
            .catch((reason) => {console.error("Error within fetchRecipes" + reason)})
    }, [])

    useEffect(() => {
        if (selectedRecipeID !== -1){
            const selected = recipeData.filter((recipe) => recipe.id === selectedRecipeID).at(0)
            setIngredientQuantitiesData(selected.ingredientQuantities)
            setSelectedRecipe(selected)
        }
    }, [selectedRecipeID]);

    return (
        <div className='recipe-page'>
            <h1 className={'RP-title'}>Recipes</h1>
            <div className={'RP-grid-container'}>
                <div className={'RP-grid-column'}>
                    <RecipeTable
                        setSelectedRow={setSelectedRecipeID}
                        selectedRow={selectedRecipeID}
                        rawData = {recipeData}
                    />
                </div>
                <div className={'RP-grid-column'}>
                    <RPSummaryPanel
                        props={selectedRecipe}
                    />
                    <IngredientQuantitiesTableRP ingredientQuantities={ingredientQuantitiesData}/>
                </div>
            </div>
        </div>
    )
}

export default RecipesPage