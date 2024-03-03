import {IngredientType} from "./IngredientType";
import {IngredientQuantity} from "./IngredientQuantity";

export interface Recipe{
    id: number;
    label: string;
    ingredients: IngredientQuantity[];
    allergens: IngredientType[];
    vegan: boolean;
    vegetarian: boolean;
}