import Product from "../Interfaces/Product";

//Final Product Data
export interface FPData{
    finalProductLabel: string,
    amount: number,
    associatedCustomerOrderID: number
}

//Ingredient Quantity
export interface IngredientQuantity{
    ingredientTypeID: number,
    ingredientName: string,
    quantity: number
}

export interface UsedProduct{
    product: Product,
    weightUsed: number
}