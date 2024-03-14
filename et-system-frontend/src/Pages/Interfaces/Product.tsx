export default interface Product {
    id: number;
    gtin?: string;
    label?: string;
    currentQuantity: number;
    maxQuantity: number;
    ingredientType?: any;
    intermediaryIds: number[];
    parentID?: number;
}