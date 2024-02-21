import {useState} from "react";
import {List} from "reactstrap";
import './Interfaces/IngredientQuantity'


const AddRecipePage = () => {
    const[recipe, setRecipe] = useState({
        label: '',
        ingredients: List<IngredientQuantity>
    })
}

export default AddRecipePage