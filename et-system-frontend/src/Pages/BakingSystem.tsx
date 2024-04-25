import {useState} from "react";
import BakingSystemPage1 from "./BakingSystemPage1";

import BakingSystemPage2 from "./BakingSystemPage2";
import BakingSystemPage3 from "./BakingSystemPage3";
import React from "react";
import {OrderedFinalProduct} from "./Interfaces/OrderedFinalProduct";
import IngredientQuantity from "./BakingSystem/BakingSystemInterfaces";

//Interfaces - needs to be moved to its own file
const BakingSystem =  () => {
    //State variables
    const [page, setPage] = useState(1);

    //For storing information across pages
    const [selectedFinalProducts, setSelectedFinalProducts] = useState<OrderedFinalProduct[]>([]);
    const [ingredientsNeeded, setIngredientsNeeded] = useState<IngredientQuantity[]>([]);

    const renderPage = () => {
        switch (page) {
            case(1):
                return <BakingSystemPage1
                    setSelectedFinalProducts={setSelectedFinalProducts}
                    setIngredientsNeeded={setIngredientsNeeded}
                    ingredientsNeeded={ingredientsNeeded}
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