import {useEffect, useState} from "react";
import BakingSystemPage1 from "./BakingSystemPage1";

import BakingSystemPage2 from "./BakingSystemPage2";
import BakingSystemPage3 from "./BakingSystemPage3";
import React from "react";
import {OrderedFinalProduct} from "./Interfaces/OrderedFinalProduct";
import IngredientQuantity from "./BakingSystem/BakingSystemInterfaces";
import FPData from "./BakingSystem/BakingSystemInterfaces";

//Interfaces - needs to be moved to its own file
const BakingSystem =  () => {
    //State variables
    const [page, setPage] = useState(1);

    //For storing information across pages
    const [selectedFinalProducts, setSelectedFinalProducts] = useState<OrderedFinalProduct[]>([]);
    const [ingredientsNeeded, setIngredientsNeeded] = useState<IngredientQuantity[]>([]);
    const [finalProductData, setFinalProductData] = useState<FPData[]>([]);

    //Fetch methods
    const fetchFinalProductData = async () => {
        const response = await fetch("http://localhost:8080/api/customerorders/fetch-all-fp-data")
        if(!response.ok){
            throw new Error("Error fetching ordered final products")
        }
        return await response.json();
    }

    //UseEffects
    //Upon initial render, fetch all final product data and pass it to page 1
    useEffect(() => {
        console.log("UseEffect triggered: BakingSystem.tsx")
        fetchFinalProductData()
            .then(data => {
                console.log(data);
                setFinalProductData(data)
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        console.log("Final Product Data: ", finalProductData)
    }, [finalProductData]);

    console.log("BakingSystem.tsx rendered");

    const renderPage = () => {
        switch (page) {
            case(1):
                return <BakingSystemPage1
                    finalProductData={finalProductData}
                    //setSelectedFinalProducts={setSelectedFinalProducts}
                    //setIngredientsNeeded={setIngredientsNeeded}
                    //ingredientsNeeded={ingredientsNeeded}
                />
            case(2):
                return <BakingSystemPage2/>
            case(3):
                return <BakingSystemPage3/>
        }
    }
    return (
        <div>
            {renderPage()}
        </div>
    )
}

export default BakingSystem;