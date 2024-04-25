import React, {useEffect, useState} from "react";
import "./BakingSystem/Page1/BS1Stylesheet.css"
import {OrderedFinalProduct} from "./Interfaces/OrderedFinalProduct";
import FinalProductsTable from "./BakingSystem/Page1/FinalProductsTable";
import SelectedFinalProductsTable from "./BakingSystem/Page1/SelectedFinalProductsTable";
import IngredientQuantitiesTableRP from "./RecipePageComponents/IngredientQuantitiesTableRP";
import {Link} from "react-router-dom";
//import {IngredientQuantity} from "./Interfaces/IngredientQuantity";
import IngredientQuantity from "./BakingSystem/BakingSystemInterfaces";
import './BakingSystem/Page3/BSP3StyleSheet.css'
import Page1Table1Row from "./BakingSystem/BakingSystemInterfaces";



interface PropTypes{
    setSelectedFinalProducts: (selectedFinalProducts: OrderedFinalProduct[]) => void
    setIngredientsNeeded: (ingredientsNeeded: IngredientQuantity[]) => void
    ingredientsNeeded: IngredientQuantity[];
}

interface FPData{
    finalProductLabel: string,
    amount: number,
    associatedCustomerOrderID: number
}

const BakingSystemPage1 = (props : PropTypes) => {
    //Destructure props
    const setSelectedFinalProduct = props.setSelectedFinalProducts;
    const setIngredientsNeeded = props.setIngredientsNeeded;
    const ingredientsNeeded = props.ingredientsNeeded;


    //State variables
    const [table1Data, setTable1Data] = useState<OrderedFinalProduct[]>([])
    const [searchData, setSearchData] = useState<OrderedFinalProduct[]>([])
    const [selectedData, setSelectedData] = useState<OrderedFinalProduct[]>([])
    //const [ingredientsNeeded, setIngredientsNeeded] = useState<IngredientQuantity[]>([])

    //Fetches all final products from the back-end
    const fetchFinalProductData = async () => {
        const response = await fetch("http://localhost:8080/api/customerorders/fetch-all-fp-data")
        if(!response.ok){
            throw new Error("Error fetching ordered final products")
        }
        return await response.json();
    }

    //Fetches the ingredients needed for the selected final products
    const fetchIngredientsNeeded = async (idsAndQuantities: {id: number, quantity: number}[]) => {
        const params = new URLSearchParams();

        // Sending the final product(which gives the recipe) and the quantity
        // so the backend can calculate the needed ingredients
        idsAndQuantities.forEach(x => {
            params.append('idsAndQuantities', `${x.id};${x.quantity}`);
        });

        const response = await fetch(`http://localhost:8080/api/finalproducts/get-total-ingredients?${params.toString()}`);
        if (!response.ok) {
            throw new Error("Error fetching total ingredients");
        }
        return await response.json();
    }

    const filterTableData = (data: any) => {
        // Filtering out the data we need
        const filteredTableData = data.map((productAndOrder: any) => ({
            key: productAndOrder.first.id.toString() + productAndOrder.second.id.toString(),
            customerOrder: productAndOrder.first.id,
            finalProduct: productAndOrder.second.label,
            quantity: productAndOrder.second.quantity,
            finalProductId: productAndOrder.second.id
        }))
        return filteredTableData
    }

    /*useEffect(() => {
        // If there is selected products fetch the ingredients needed for those products
        if(selectedData !== undefined && selectedData.length > 0) {
            fetchIngredientsNeeded(selectedData.map(x => ({id: x.finalProductId, quantity: x.quantity}))).then((ingredientsNeededData) => {
                setIngredientsNeeded(ingredientsNeededData)
            })
                .catch((reason) => {
                    console.error("Error setting ingredients needed data. " + reason)
                })
        } else{
            setIngredientsNeeded([])
        }
    }, [selectedData])*/


    useEffect(() => {
        fetchFinalProductData().then((finalProductData: any) => {
            console.log(finalProductData);
            setTable1Data(finalProductData);

           /* const newData = filterTableData(finalProductsData)
            setTableData(newData)
            setSearchData(newData)*/
        }).catch((reason) => {console.error("Error occured as a result of fetching fpData " + reason)})
    }, [])

    const startBaking = () => {

    }

    return (
        <div className="page-container">
            <h1 className='BS1-title'>Baking System</h1>
            <div className="BS1-grid-container">
                <div className={"BS1-grid-container-2"}>
                {<FinalProductsTable
                    rawTableData={table1Data}
                    setRawData={setTable1Data}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    searchData={searchData}
                    setSearchData={setSearchData}
                />}
                </div>
                <div className={"border-container"}>
                    <div className={"BS1-grid-container-3"}>
                        <div className={'BSP1'}>
                            <h2>Selected Products</h2>
                            {/*<SelectedFinalProductsTable
                                selectedData={selectedData}
                                setSelectedData={setSelectedData}
                                nonSelectedData={tableData}
                                setNonSelectedData={setTableData}
                                searchData={searchData}
                                setSearchData={setSearchData}
                            />*/}
                        </div>
                        <div>
                            <h2>Ingredients needed</h2>
                            {/*<IngredientQuantitiesTableRP
                                ingredientQuantities={ingredientsNeeded}
                                height={{height: "393px"}}
                            />*/}
                        </div>
                    </div>
                <div>
                    <Link to={'/baking-system-page-2'} state={{ingredientsNeeded, selectedData}}><button className={'start-baking-button'} onClick={startBaking}>Start baking</button></Link>
                </div>
                </div>
            </div>
        </div>
    )

}

export default BakingSystemPage1