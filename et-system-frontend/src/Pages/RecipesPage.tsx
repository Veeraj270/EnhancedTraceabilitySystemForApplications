import "./RecipePageComponents/RPStylesheet.css"
import RecipeTable from "./RecipePageComponents/RecipeTable";
import {useEffect, useState} from "react";
import RPSummaryPanel from "./RecipePageComponents/RPSummaryPanel";

const RecipesPage = () => {

    const [recipeData, setRecipesData] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(-1)
    const [panelProps, setPanelProps] = useState(-1)

    const fetchRecipes = async () => {
        const response = await fetch("http://localhost:8080/api/recipes/fetch-recipes")
        if (!response.ok){
            throw new Error("Error fetching recipes")
        }
        return await response.json();
    }

    useEffect(() => {
        fetchRecipes().then((recipeData) => {setRecipesData(recipeData)}).catch((reason) => {console.error("Error within fetchRecipes" + reason)})
    }, [])

    useEffect(() => {
        let panelPropsData = {}
        if (selectedRecipe !== -1){
            const selected = recipeData.filter((recipe)=> recipe.id === selectedRecipe).at(0)
            panelPropsData = {
                name: selected.name,
                allergens: selected.allergens
            }
            console.log(panelPropsData);
        }
        setPanelProps(panelPropsData)
    }, [selectedRecipe]);

    return (
        <div className='recipe-page'>
            <h1 className={'RP-title'}>Recipes</h1>
            <div className={'RP-grid-container'}>
                <div className={'RP-grid-column'}>
                    <RecipeTable rawData = {recipeData}/>
                </div>
                <div className={'RP-grid-column'}>
                    <RPSummaryPanel props={panelProps}/>
                </div>
            </div>

        </div>
    )
}

export default RecipesPage