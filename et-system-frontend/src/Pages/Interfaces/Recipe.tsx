import {IngredientQuantity} from "./IngredientQuantity";

export interface Recipe{
    id: number;
    label: string;
    ingredientQuantities: IngredientQuantity[];
    allergens: string[];
    vegan: boolean;
    vegetarian: boolean;
}