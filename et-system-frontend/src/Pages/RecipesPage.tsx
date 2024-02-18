import RecipeTable from "./RecipePageComponents/RecipeTable";
import {useEffect, useState} from "react";

const RecipesPage = () => {

    const [recipeData, setRecipesData] = useState([]);

    const fetchRecipes = async () => {
        const response = await fetch("http://localhost:8080/api/recipes/fetch-recipes")
        if (!response.ok){
            throw new Error("Error fetching recipes")
        }
        return await response.json();
    }

    useEffect(() => {
        fetchRecipes().then((recipeData) => {setRecipesData(recipeData)}).catch((reason) => {console.error(reason)})
    })

    return (
        <div className='recipe-page'>
            <h1 className={'RP-title'}>Recipes</h1>
            <div className={'RP-grid-container'}>
                <div className={'RP-grid-column'}>
                    <RecipeTable tableData = {recipeData}/>
                </div>
                <div className={'RP-grid-column'}>

                </div>
            </div>

        </div>
    )
}

export default RecipesPage