import React, {useEffect, useState} from "react";
import IngredientQuantitiesTableARP from "./AddRecipePageComponents/IngredientQuantitiesTableARP";
import "./AddRecipePageComponents/ARPStylesheet.css"
import IngredientQuantityPanel from "./AddRecipePageComponents/IngredientQuantityPanel";
import SubmitRecipePanel from "./AddRecipePageComponents/SubmitRecipePanel";
import IngredientsTable from "./AddRecipePageComponents/IngredientsTable";

const AddRecipePage = () => {

    const [selectedIngredientID, setSelectedIngredientID] = useState(-1)
    const [ingredientsData, setIngredientsData] = useState([])
    const [selectedIngredient, setSelectedIngredient] = useState({})
    const [recipe, setRecipe] = useState({
        label: '',
        ingredientQuantities: []
    })

    const fetchIngredientTypes = async () => {
        const response = await fetch("http://localhost:8080/api/ingredients/fetch-ingredient-types")
        if (!response.ok){
            throw new Error("Error fetching ingredient types")
        }
        return await response.json();
    }

    useEffect(() => {
        fetchIngredientTypes().then((ingredientData) =>
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
        event.preventDefault()
        setRecipe({...recipe, label: event.target.value})
    }

    const handleSubmit = async (event) => {
        //Check if all fields of recipe are filled
        if (!recipe || recipe.ingredientQuantities.length === 0 || recipe.label.length === 0) {
            alert("Please fill in Name field and add an ingredient to the recipe.")
            console.error('Name is not filled or table is empty.');
            return;
        }

        event.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/recipes/add-recipe', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(recipe)
            });

            if(response.ok) {
                setRecipe(recipe => ({
                    ...recipe,
                    label: '',
                    ingredientQuantities: []
                }));
            } else{
                alert("Error adding recipe to database. ")
            }
        }catch (e) {
            console.log("Error adding recipe: " + e)
        }
    }

    return(
        <div className={'add-recipe-page'}>
            <h1 className={'ARP-title'}> Add recipe </h1>
            <div className={'ARP-grid-container'}>
                <div className={'ARP-grid-column'}>
                    <IngredientsTable
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
                    <IngredientQuantitiesTableARP
                        ingredientQuantities={recipe.ingredientQuantities}
                        recipe={recipe}
                        setRecipe={setRecipe}
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