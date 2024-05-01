import DPDPercentageWidget from "./DPDPercentageWidget";
import Product from "../Interfaces/Product";
import {useEffect, useState} from "react";
import PDPRecentEventsView from "./PDPRecentEventsView";
import React from "react";

interface propsType{
    product: Product | undefined;
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
        else {
            setPercentage(100);
            setFraction("N/A")
            setType("N/A")
        }
    }, [props.product]);

    return (
        <div className={"PDP-details-view"}>
            <p className={"PDP-product-name"}>{props.product ? props.product.label : "N/A"}</p>
            <DPDPercentageWidget
                fraction={fraction}
                percentage={percentage}
            />
            <div className={"PDP-details"}>
                <p><b>Product Type: </b>&nbsp;{type}</p>
                <p><b>{type === "Composite" ? "Allergens:" : "Allergen: "}&nbsp;</b>{props.product && props.product.ingredientType ? props.product.ingredientType.allergens.join(", ") : "N/A"}</p>
            </div>
            <PDPRecentEventsView
                selectedId={props.product?.id}
            />
        </div>
    )
}

export default PDPDetailsView;