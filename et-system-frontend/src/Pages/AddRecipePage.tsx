import React, {useEffect, useState} from "react";
import IngredientQuantitiesTable from "./RecipePageComponents/IngredientQuantitiesTable";
import RecipeTable from "./RecipePageComponents/RecipeTable";
import "./AddRecipePageComponents/ARPStylesheet.css"
import IngredientQuantityPanel from "./AddRecipePageComponents/IngredientQuantityPanel";
import {Button, Input, Label} from "reactstrap";
import {Recipe} from "./Interfaces/Recipe"

const AddRecipePage = () => {

    const [selectedIngredientID, setSelectedIngredientID] = useState(-1)
    const [ingredientsData, setIngredientsData] = useState([])
    const [selectedIngredient, setSelectedIngredient] = useState({})
    const [recipe, setRecipe] = useState<Recipe>({
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

    const handleChange = (event) => {
        setRecipe({...recipe, label: event.target.value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('http://localhost:8080/api/recipes/add-recipe', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(recipe)
        });

        if (!response.ok) {
            throw new Error('Failed to add recipe');
        }

        setRecipe({});

    }

    return(
        <div className={'add-recipe-page'}>
            <h1 className={'ARP-title'}> Add recipe </h1>
            <div className={'ARP-grid-container'}>
                <div className={'ARP-grid-column'}>
                    <RecipeTable
                        setSelectedRow={setSelectedIngredientID}
                        selectedRow={selectedIngredientID}
                        rawData={ingredientsData}
                        dataType={"ingredient"}
                        />
                </div>
                <div className={'ARP-grid-column'}>
                    <IngredientQuantityPanel
                        recipe={recipe}
                        setRecipe={setRecipe}
                        selectedIngredient={selectedIngredient}
                    />
                    <h2>Added ingredients</h2>
                    <div className={'IGTable'}>
                    <IngredientQuantitiesTable
                        ingredientQuantities={recipe.ingredients}
                    />
                    </div>
                </div>
                <div className={'ARP-submit-column'}>
                    <div className={'ARP-submit-panel'}>
                        <p className={'ARP-submit-panel-name'}>Submit recipe</p>
                            <Input type="text" name="recipe_label" id="recipe_label"
                                   className = "recipe-name-input"
                                   onChange={handleChange}
                                   placeholder={"Name.."}
                            />
                            <textarea
                                id={"recipe_description"}
                                className="paragraph-input"
                                onChange={handleChange}
                                placeholder={"Description..."}
                            />
                        <Button color="primary" className={"submit-button"} onClick={handleSubmit}>SUBMIT</Button>
                    </div>
                </div>
            </div>


        </div>
    )

}

export default AddRecipePage