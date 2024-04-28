import {useEffect, useState} from "react";
import BakingSystemPage1 from "./BakingSystemPage1";

import BakingSystemPage2 from "./BakingSystemPage2";
import BakingSystemPage3 from "./BakingSystemPage3";
import React from "react";
import {BPStructBP, IngredientQuantity, P3Table1Row} from "./BakingSystem/BakingSystemInterfaces";
import {FPData} from "./BakingSystem/BakingSystemInterfaces";
import {UsedProduct} from "./BakingSystem/BakingSystemInterfaces";


const BakingSystem =  () => {
    //State variables
    const [page, setPage] = useState(1);

    //For storing information across pages
    const [finalProductData, setFinalProductData] = useState<FPData[]>([]);
    const [ingredientsNeeded, setIngredientsNeeded] = useState<IngredientQuantity[]>([]);
    const [selectedFPData, setSelectedFPData] = useState<FPData[]>([]);
    const [productsUsed, setProductsUsed] = useState<UsedProduct[]>([]);

    //Convert to state variable
    const [p3Table1Data, setP3Table1Data] = useState<P3Table1Row[]>([]);

    //Fetch methods
    const fetchFinalProductData = async () => {
        const response = await fetch("/api/customerorders/fetch-all-fp-data")
        if(!response.ok){
            throw new Error("Error fetching ordered final products")
        }
        return await response.json();
    }

    //UseEffects
    useEffect(() => {
        console.log("UseEffect triggered: BakingSystem.tsx")
        let temp : P3Table1Row[] = [];
        for (let product of productsUsed){
            temp.push({id: product.product.id,
                label: product.product.label ? product.product.label : "No label",
                quantityUsed: product.quantityUsed})
        }
        console.log("temp: ", temp)
        setP3Table1Data(temp);
    }, [productsUsed]);

    useEffect(() => {
        console.log("p3Table1Data: ", p3Table1Data)
    }, [p3Table1Data]);

    //Upon initial render, fetch all final product data and pass it to page 1
    useEffect(() => {
        fetchFinalProductData()
            .then(data => {
                setFinalProductData(data)
            })
            .catch(err => console.log(err));
    }, []);

    const processFinished =  () => {
        //Reset all state variables
        setIngredientsNeeded([]);
        setSelectedFPData([]);
        setProductsUsed([]);

        //Fetch the final product data again
        fetchFinalProductData()
            .then(data => {
                setFinalProductData(data)
            })
            .catch(err => console.log(err));

        //Set page to page 1
        setPage(1);

        alert("Baking Process Submitted Successfully");
    }

    //Render the correct page depending on the value of page state variable
    const renderPage = () => {
        switch (page) {
            case(1):
                return <BakingSystemPage1
                    finalProductData={finalProductData}
                    setIngredientsNeeded={setIngredientsNeeded}
                    setPage={setPage}
                    setSelectedFPData={setSelectedFPData}
                />
            case(2):
                return <BakingSystemPage2
                    ingredientsNeeded={ingredientsNeeded}
                    setPage={setPage}
                    setProductsUsed={setProductsUsed}
                />
            case(3):
                return <BakingSystemPage3
                    processFinished={processFinished}
                    table1Data={p3Table1Data}
                    selectedFPData={selectedFPData}
                />
        }
    }

    //Render the baking system
    return (
        <div>
            {renderPage()}
        </div>
    )
}

export default BakingSystem;