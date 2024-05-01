import "./RecipePageComponents/RPStylesheet.css"
import RecipeTable from "./RecipePageComponents/RecipeTable";
import React, {useEffect, useState} from "react";
import RPSummaryPanel from "./RecipePageComponents/RPSummaryPanel";
import IngredientQuantitiesTableRP from "./RecipePageComponents/IngredientQuantitiesTableRP";
import {Link} from "react-router-dom";
import {IngredientQuantity} from "./BakingSystem/BakingSystemInterfaces";

const RecipesPage = () => {
    const [recipeData, setRecipesData] = useState([]);
    const [ingredientQuantitiesData, setIngredientQuantitiesData] = useState<IngredientQuantity[]>([]);
    const [selectedRecipeID, setSelectedRecipeID] = useState(-1);
    const [selectedRecipe, setSelectedRecipe] = useState({});

    const fetchRecipes = async () => {
        const response = await fetch("/api/recipes/fetch-recipes")
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
            const selected = recipeData.filter((recipe: any) => recipe.id === selectedRecipeID).at(0)

            if (selected){
                setSelectedRecipe(selected)
                setIngredientQuantitiesData(convertToIQs(selected.ingredientQuantities));
            }
        }
    }, [selectedRecipeID]);

    const convertToIQs = (input: any) => {
        return input.map((rawIQ : any) => {
            return {
                ingredientName: rawIQ.ingredientType.name,
                quantity: rawIQ.quantity
            }
        })
    }

    return (
        <div className='page-container'>
            <h1>Recipes</h1>
            <div className={'RP-grid-container'}>
                <div className={'RP-grid-column-1'}>
                    <RecipeTable
                        setSelectedRow={setSelectedRecipeID}
                        selectedRow={selectedRecipeID}
                        rawData = {recipeData}
                    />
                    <Link to={'/add-recipe'}><button className={'add-recipe-button'}>Add new recipe</button></Link>
                </div>
                <div className={'RP-grid-column-2'}>
                    <RPSummaryPanel
                        props={selectedRecipe}
                    />
                    <IngredientQuantitiesTableRP ingredientTotals={ingredientQuantitiesData}/>
                </div>
            </div>
        </div>
    )
}

export default RecipesPage