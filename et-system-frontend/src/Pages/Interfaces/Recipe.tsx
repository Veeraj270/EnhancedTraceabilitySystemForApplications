import {Ingredient} from "./Ingredient";

export interface Recipe{
    id: number;
    label: string;
    allergens: Ingredient[];
    vegan: boolean;
    vegetarian: boolean;
}