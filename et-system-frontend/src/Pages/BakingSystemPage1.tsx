import React, {useEffect, useState} from "react";
import "./BakingSystemPage1Components/BS1Stylesheet.css"
import {OrderedFinalProduct} from "./Interfaces/OrderedFinalProduct";
import FinalProductsTable from "./BakingSystemPage1Components/FinalProductsTable";
import SelectedFinalProductsTable from "./BakingSystemPage1Components/SelectedFinalProductsTable";
import IngredientQuantitiesTableRP from "./RecipePageComponents/IngredientQuantitiesTableRP";
import {Link} from "react-router-dom";
import {IngredientQuantity} from "./Interfaces/IngredientQuantity";

const BakingSystemPage1 = () => {

    const [tableData, setTableData] = useState<OrderedFinalProduct[]>([])
    const [searchData, setSearchData] = useState<OrderedFinalProduct[]>([])
    const [selectedData, setSelectedData] = useState<OrderedFinalProduct[]>([])
    const [ingredientsNeeded, setIngredientsNeeded] = useState<IngredientQuantity[]>([])

    const fetchFinalProducts = async () => {
        const response = await fetch("http://localhost:8080/api/customerorders/fetch-ordered-final-products")
        if(!response.ok){
            throw new Error("Error fetching ordered final products")
        }
        return await response.json();
    }

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

    useEffect(() => {
        // If there is selected products fetch the ingredients needed for those products
        if(selectedData !== undefined && selectedData.length > 0) {
            fetchIngredientsNeeded(selectedData.map(x => ({id: x.finalProductId, quantity: x.quantity}))).then((ingredientsNeededData) => {
                console.log(ingredientsNeededData)
                setIngredientsNeeded(ingredientsNeededData)
            })
                .catch((reason) => {
                    console.error("Error setting ingredients needed data. " + reason)
                })
        } else{
            setIngredientsNeeded([])
        }
    }, [selectedData])

    useEffect(() => {
        fetchFinalProducts().then((finalProductsData) => {
            const newData = filterTableData(finalProductsData)
            setTableData(newData)
            setSearchData(newData)
        })
            .catch((reason) => {console.error("Error setting final products data. " + reason)})
    }, [])

    const startBaking = async () => {
            // By clicking the start baking button, it updates the quantities of the final products in the customer orders
            // Might need to move it to recipe page 3

            // Because there can be a lot of final products updated, and because the depth of the final product
            // object is big, just the id's and the quantities are sent to the back-end
            const finalProducts = selectedData.map(x =>
                `${x.customerOrder};${x.finalProductId};${x.quantity}`
            );

            try {
                const response = await fetch('http://localhost:8080/api/customerorders/edit-final-products', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(finalProducts)
                });

                if (response.ok) {
                    console.log("The selected customer orders are updated")
                } else {
                    alert("Error updating selected customer orders")
                }
            } catch (e) {
                console.log("Error updating selected customer orders: " + e)
            }
    }

    return (
        <div className="BS1-page">
            <h1 className='BS1-title'>Baking System</h1>
            <div className="BS1-grid-container">
                <div className={"BS1-grid-container-2"}>
                <FinalProductsTable
                    rawData={tableData}
                    setRawData={setTableData}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    searchData={searchData}
                    setSearchData={setSearchData}
                />
                </div>
                <div className={"border-container"}>
                    <div className={"BS1--grid-container-3"}>
                        <div>
                            <h2>Selected Products</h2>
                            <SelectedFinalProductsTable
                                selectedData={selectedData}
                                setSelectedData={setSelectedData}
                                nonSelectedData={tableData}
                                setNonSelectedData={setTableData}
                                searchData={searchData}
                                setSearchData={setSearchData}
                            />
                        </div>
                        <div>
                            <h2>Ingredients needed</h2>
                            <IngredientQuantitiesTableRP
                                ingredientQuantities={ingredientsNeeded}
                                height={{height: "393px"}}
                            />
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