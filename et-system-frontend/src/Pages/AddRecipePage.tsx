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
        ingredientQuantities: [],
        description: ''
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
            setIngredientsData(ingredientData.sort((a: any, b: any) => a.name.localeCompare(b.name)))
        })
            .catch((reason) => {console.error("Error within fetchIngredients" + reason)})
    }, [])

    // The selectedIngredientID data dependency is changed by clicking in the Ingredients table
    useEffect(() => {
        if (selectedIngredientID !== -1){
            const selected = ingredientsData.filter((ingredient) => ingredient.id === selectedIngredientID).at(0)
            setSelectedIngredient(selected)
        }
    }, [selectedIngredientID]);

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
            const response = await fetch('http://localhost:8080/api/recipes/add-recipe', {
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

    const handleChangeIngredient = (event) => {
        console.log(event.target.value)
        if(event.target.value !== "") {
            const ingredientType = ingredientsData.filter(ingredient => ingredient.name === event.target.value).at(0)
            setSelectedIngredient(ingredientType)
        }
    }

    return(
        <div className={'add-recipe-page'}>
            <h1 className={'ARP-title'}> Add recipe </h1>
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