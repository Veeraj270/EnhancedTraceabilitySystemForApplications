import {Ingredient} from "./Ingredient";
import {IngredientQuantity} from "./IngredientQuantity";

export interface Recipe{
    id: number;
    label: string;
    ingredientQuantities: IngredientQuantity[]
    allergens: Ingredient[];
    vegan: boolean;
    vegetarian: boolean;
}