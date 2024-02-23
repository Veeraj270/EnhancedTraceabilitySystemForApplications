import React, {useEffect, useState} from "react";
import AddRecipe from "./AddRecipePageComponents/AddRecipe";
import IngredientQuantitiesTable from "./RecipePageComponents/IngredientQuantitiesTable";
import RecipeTable from "./RecipePageComponents/RecipeTable";
import "./AddRecipePageComponents/ARPStylesheet.css"
import IngredientQuanitytPanel from "./AddRecipePageComponents/IngredientQuanitytPanel";
import {IngredientQuantity} from "./Interfaces/IngredientQuantity";

const AddRecipePage = () => {

    const [selectedIngredient, setSelectedIngredient] = useState(-1)
    const [ingredientsData, setIngredientsData] = useState([])
    const [panelProps, setPanelProps] = useState({})
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
        let panelPropsData = {}
        if (selectedIngredient !== -1){
            const selected = ingredientsData.filter((ingredient) => ingredient.id === selectedIngredient).at(0)
            panelPropsData = selected
            console.log(selected);
        }
        setPanelProps(panelPropsData)
    }, [selectedIngredient]);

    return(
        <div className={'add-recipe-page'}>
            <div>

            </div>
            <div className={'ARP-grid-container'}>
                <div className={'ARP-grid-column'}>
                    <RecipeTable
                        setSelectedRow={setSelectedIngredient}
                        selectedRow={selectedIngredient}
                        rawData={ingredientsData}
                        />
                </div>
                <div className={'ARP-grid-column'}>
                    <IngredientQuanitytPanel
                        props={panelProps}
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