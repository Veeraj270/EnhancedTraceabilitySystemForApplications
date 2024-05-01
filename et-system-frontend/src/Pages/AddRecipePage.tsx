import React, {useEffect, useState} from "react";
import IngredientQuantitiesTableARP from "./AddRecipePageComponents/IngredientQuantitiesTableARP";
import "./AddRecipePageComponents/ARPStylesheet.css"
import IngredientQuantityPanel from "./AddRecipePageComponents/IngredientQuantityPanel";
import SubmitRecipePanel from "./AddRecipePageComponents/SubmitRecipePanel";
import {IngredientType} from "./Interfaces/IngredientType";

const AddRecipePage = () => {

    const [ingredientsData, setIngredientsData] = useState([])
    const [selectedIngredient, setSelectedIngredient] = useState({})
    const [recipe, setRecipe] = useState({
        label: '',
        ingredientQuantities: [],
        description: ''
    })

    const fetchIngredientTypes = async () => {
        const response = await fetch("/api/ingredients/fetch-ingredient-types")
        if (!response.ok){
            throw new Error("Error fetching ingredient types")
        }
        return await response.json();
    }

    useEffect(() => {
        fetchIngredientTypes().then((ingredientData) =>
        {
            setIngredientsData(ingredientData.sort((a: any, b: any) => a.name.localeCompare(b.name)))
        })
            .catch((reason) => {console.error("Error within fetchIngredients" + reason)})
    }, [])

    // This is used in the SubmitPanel
    const handleChange = (event: any) => {
        const {name, value} = event.target
        event.preventDefault()
        if(name === 'label') {
            setRecipe({...recipe, [name]: value})
        } else {
            setRecipe({...recipe, [name]: value})
        }
    }

    // This is used also in the SubmitPanel
    const handleSubmit = async (event: any) => {
        //Check if all fields of recipe are filled
        if (!recipe || recipe.ingredientQuantities.length === 0 || recipe.label.length === 0) {
            alert("Please fill in Name field and add an ingredient to the recipe.")
            console.error('Name is not filled or table is empty.');
            return;
        }

        event.preventDefault();
        try {
            const response = await fetch('/api/recipes/add-recipe', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(recipe)
            });

            if(response.ok) {
                setRecipe({...recipe,
                    label: '',
                    ingredientQuantities: [],
                    description: ''
                });
                fetchIngredientTypes().then((ingredientData) =>
                {
                    setIngredientsData(ingredientData.sort((a: any, b: any) => a.name.localeCompare(b.name)))
                })
                    .catch((reason) => {console.error("Error within fetchIngredients" + reason)})
            } else{
                alert("Error adding recipe to database. There might already be a recipe with that name")
            }
        }catch (e) {
            console.log("Error adding recipe: " + e)
        }
    }

    const handleChangeIngredient = (event: any) => {
        if(event.target.value !== "") {
            const ingredientType = ingredientsData
                .filter((ingredient: IngredientType) => ingredient.name === event.target.value).at(0)
            if(ingredientType) {
                setSelectedIngredient(ingredientType)
            } else{
                alert("Ingredient doesn't exist in the database.")
            }
        }
    }

    return(
        <div className={'page-container'}>
            <h1> Add recipe </h1>
            <div className={'ARP-grid-container'}>
                <div className={'ARP-grid-column'}>
                    <IngredientQuantityPanel
                        recipe={recipe}
                        setRecipe={setRecipe}
                        selectedIngredient={selectedIngredient}
                        ingredientsData={ingredientsData}
                        setIngredientsData={setIngredientsData}
                        handleChangeIngredient={handleChangeIngredient}
                    />
                    <h2>Added ingredients</h2>
                    <IngredientQuantitiesTableARP
                        ingredientQuantities={recipe?.ingredientQuantities}
                        recipe={recipe}
                        setRecipe={setRecipe}
                        ingredientsData={ingredientsData}
                        setIngredientsData={setIngredientsData}
                    />
                </div>
                <div className={'ARP-submit-column'}>
                    <SubmitRecipePanel
                        recipe = {recipe}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                    />
                </div>
            </div>
        </div>
    )
}

export default AddRecipePage