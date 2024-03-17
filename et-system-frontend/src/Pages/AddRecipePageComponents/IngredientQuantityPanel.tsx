import React, {useEffect, useRef, useState} from "react";
import {Button, Input, Label} from "reactstrap";
import "./ARPStylesheet.css"
import {IngredientType} from "../Interfaces/IngredientType";
import {IngredientQuantity} from "../Interfaces/IngredientQuantity";

// @ts-ignore
const IngredientQuantityPanel = ({recipe, setRecipe, selectedIngredient, ingredientsData, setIngredientsData, handleChangeIngredient}) => {

    const [ingredientQuantity, setIngredientQuantity] = useState<IngredientQuantity>()
    const selectIngredientRef = useRef<HTMLSelectElement>(null)

    useEffect(() => {
        setIngredientQuantity({...ingredientQuantity, ingredientType: selectedIngredient})
    }, [selectedIngredient])

    // Getting rid of the previous options because otherwise for every change in the ingredients data
    // it would keep adding the options
    useEffect(() => {
        const selectIngredient = selectIngredientRef.current
        if(selectIngredient) {
            while (selectIngredient.options.length > 1) {
                selectIngredient.remove(1)
            }
            ingredientsData.forEach((ing: IngredientType) => selectIngredient.appendChild(createOption(ing)))
        }
    }, [ingredientsData])

    const handleChangeQuantity = (event: any) => {
        event.preventDefault()
        setIngredientQuantity({...ingredientQuantity, quantity: event.target.value})
    }

    // This adds the ingredientQuantity object(state) to the recipe
    const handleIngredientSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        // Check if both fields exist before submitting
        if (!ingredientQuantity || !ingredientQuantity.quantity ||
            !ingredientQuantity.ingredientType || !ingredientQuantity.ingredientType.name) {
            alert('Please fill in both ingredient and quantity fields.')
            console.error('Please fill in both quantity and ingredient.');
            return;
        }

        // Check if the ingredient is already in the table before submitting it
        if (recipe.ingredientQuantities
            .find((ingQuantity: IngredientQuantity) => ingQuantity.ingredientType === ingredientQuantity.ingredientType) !== undefined){
            alert('The ingredient that you are adding is already in the table.')
            return;
        }

        const newIngredientsData = ingredientsData.filter((ing: IngredientType) => ing !== selectedIngredient)
        setIngredientsData(newIngredientsData)

        const selectIngredient = selectIngredientRef.current

        if(selectIngredient) {
            // Removing the already added ingredient from the options
            selectIngredient.remove(selectIngredient.selectedIndex)

            // This is adding a placeholder every time after adding the ingredient to the recipe
            if (selectIngredient.options[0].value !== "") {
                const placeholderOption = document.createElement("option");
                placeholderOption.value = "";
                placeholderOption.text = "Select an option";
                placeholderOption.disabled = true;
                placeholderOption.selected = true;
                selectIngredient.insertBefore(placeholderOption, selectIngredient.options[0]);
            }
            selectIngredient.selectedIndex = 0;
        } else {
            alert("There are no ingredients in the database")
        }

        event.preventDefault()
        setRecipe({...recipe,
            ingredientQuantities: [ingredientQuantity, ...recipe.ingredientQuantities]
        })
        console.log(ingredientQuantity)
        setIngredientQuantity(undefined)
    }

    function createOption(ingredient: IngredientType){
        const option = document.createElement('option')
        option.value = ingredient.name
        option.text = ingredient.name
        return option
    }

    return(
        <div className="ARPPanel-grid">
            <p className='ARPPanel-name'>Add ingredient to recipe</p>
            <div className="ARPPanel-item">
                <p style={{margin: '10px 0 5px 0'}}>
                <b>Ingredient:&nbsp;</b>
                    <select id='select-ingredient' ref={selectIngredientRef} onChange={handleChangeIngredient}>
                        <option value="" disabled selected>Select an ingredient</option>
                    </select>
                </p>
                <Label><b>Quantity: </b></Label>
                <Input className="quantity-input"
                       type="number"
                       value={ingredientQuantity?.quantity || ' '}
                       onChange={handleChangeQuantity}/>
            </div>
                <Button onClick={handleIngredientSubmit} className = 'add-to-recipe-button'>Add to recipe</Button>
            <div>
                <i className="arrow down"></i>
            </div>
        </div>
    )

}

export default IngredientQuantityPanel;