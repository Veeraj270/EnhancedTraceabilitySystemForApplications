import {Ingredient} from "./Ingredient";
import {IngredientQuantity} from "./IngredientQuantity";

export interface Recipe{
    id: number;
    label: string;
    ingredients: IngredientQuantity[];
    allergens: Ingredient[];
    vegan: boolean;
    vegetarian: boolean;
}