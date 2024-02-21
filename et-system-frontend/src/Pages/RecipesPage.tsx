import "./RecipePageComponents/RPStylesheet.css"
import RecipeTable from "./RecipePageComponents/RecipeTable";
import {useEffect, useState} from "react";
import RPSummaryPanel from "./RecipePageComponents/RPSummaryPanel";
import IngredientQuantitiesTable from "./RecipePageComponents/IngredientQuantitiesTable";
import {IngredientQuantity} from "./Interfaces/IngredientQuantity";

const RecipesPage = () => {

    const [recipeData, setRecipesData] = useState([])
    const [ingredientQuantitiesData, setIngredientQuantitiesData] = useState([])
    const [selectedRecipe, setSelectedRecipe] = useState(-1)
    const [panelProps, setPanelProps] = useState({})

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
        let panelPropsData = []
        let ingredientQuantityList: IngredientQuantity[] = []
        if (selectedRecipe !== -1){
            const selected = recipeData.filter((recipe) => recipe.id === selectedRecipe).at(0)
            ingredientQuantityList = selected.ingredients.map((x: IngredientQuantity) => ({
                ingredient: x.ingredient.label,
                quantity: x.quantity
            }))
            panelPropsData = selected
            console.log(selected);
            console.log(ingredientQuantityList)
        }
        setIngredientQuantitiesData(ingredientQuantityList)
        setPanelProps(panelPropsData)
    }, [selectedRecipe]);

    return (
        <div className='recipe-page'>
            <h1 className={'RP-title'}>Recipes</h1>
            <div className={'RP-grid-container'}>
                <div className={'RP-grid-column'}>
                    <RecipeTable
                        setSelectedRow={setSelectedRecipe}
                        selectedRow={selectedRecipe}
                        rawData = {recipeData}
                    />
                </div>
                <div className={'RP-grid-column'}>
                    <RPSummaryPanel props={panelProps}/>
                    <IngredientQuantitiesTable ingredientQuantities={ingredientQuantitiesData}/>
                </div>
            </div>

        </div>
    )
}

export default RecipesPage