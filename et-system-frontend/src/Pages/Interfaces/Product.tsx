export interface Product {
    id: number;
    gtin: string;
    label: string;
    maxQuantity: number;
    currentQuantity: number;
    intermediaryIds: number[];
    parentID: number | null;
}