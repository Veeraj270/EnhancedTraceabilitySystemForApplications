import {IngredientType} from "./IngredientType";

export interface IngredientQuantity{
    ingredientType?: IngredientType,
    quantity: number
}