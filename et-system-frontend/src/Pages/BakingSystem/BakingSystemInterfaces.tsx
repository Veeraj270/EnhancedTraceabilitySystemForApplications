import Product from "../Interfaces/Product";

//Final Product Data
export interface FPData{
    finalProductID: number,
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
    quantityUsed: number
}

export interface P3Table1Row{
    id: number,
    label: string,
    quantityUsed: number
}

export interface P3Table2Row{
    id: number,
    label:string,
    quantityUsed: number
    newWeight: number
}

export interface BPStructBP{
    amount: number,
    finalProductId: number,
    customerOrderId: number,
}

export interface BPStructUP{
    productId: number,
    quantityUsed: number,
    newQuantity: number,
}

export interface BPStruct{
    usedProducts: BPStructUP[],
    bakedProducts: BPStructBP[],
    location: string,
    userResponsible: string
}