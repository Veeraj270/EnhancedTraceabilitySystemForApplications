export interface Product {
    id: number;
    label: string;
    maxQuantity: number;
    currentQuantity: number;
    intermediariesID: number[];
    parentID: number | null;
}