
export default interface IngredientQuantity{
    ingredientType: string
    quantity: number
}

export default interface Page1Table1Row{
    productLabel: string;
    quantity: number;
    associatedOrderId: number;
}

export default interface Page1Table1Row{
    finalProductId: number;
    productLabel: string;
    quantity: number;
    associatedOrderId: number;
}

//Final Product Data
export default interface FPData{
    finalProductLabel: string,
    amount: number,
    associatedCustomerOrderID: number
}