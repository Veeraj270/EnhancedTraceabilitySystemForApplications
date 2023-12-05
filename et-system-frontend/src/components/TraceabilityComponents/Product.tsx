
interface Product {
    id: string;
    parentID: string;
    intermediariesId: string[];
    label: string;
    maxQuantity: number;
    currentQuantity: number;

}

export default Product;