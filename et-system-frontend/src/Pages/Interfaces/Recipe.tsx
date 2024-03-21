import {IngredientType} from "./IngredientType";
import {IngredientQuantity} from "./IngredientQuantity";

export interface Recipe{
    id: number;
    label: string;
    ingredientQuantities: IngredientQuantity[];
    allergens: IngredientType[];
    vegan: boolean;
    vegetarian: boolean;
}