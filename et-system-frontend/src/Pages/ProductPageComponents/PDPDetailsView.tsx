import {defer} from "react-router";
import DPDPercentageWidget from "./DPDPercentageWidget";
import Product from "../Interfaces/Product";
import {useEffect, useState} from "react";

interface propsType{
    product: Product | null;
}

const PDPDetailsView = ( props: propsType) => {
    const [fraction, setFraction] = useState("")
    const [percentage, setPercentage] = useState(0);
    const [type, setType] = useState("N/A");

    useEffect(() => {
        let product = props.product;
        if (product){
            setPercentage((product.currentQuantity / product.maxQuantity)* 100);
            setFraction(`${product.currentQuantity}/${product.maxQuantity}`);
            setType(((product.intermediaryIds?.length > 1) ? "Composite" : "Base Ingredient"));
        }
    }, [props.product]);

    useEffect(() => {
        console.log(type);
    }, [type]);
    return (
        <div className={"PDP-details-view"}>
            <p className={"PDP-product-name"}>{props.product?.label}</p>
            <DPDPercentageWidget
                fraction={fraction}
                percentage={percentage}
            />
            <div>Product Type: {type}</div>
            <div>Allergens: </div>
            <div>Most Recent Events: </div>
        </div>
    )
}

export default PDPDetailsView;