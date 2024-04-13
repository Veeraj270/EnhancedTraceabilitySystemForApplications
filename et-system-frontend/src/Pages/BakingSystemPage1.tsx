import React, {useEffect, useState} from "react";
import "./BakingSystemPage1Components/BS1Stylesheet.css"
import {OrderedFinalProduct} from "./Interfaces/OrderedFinalProduct";
import FinalProductsTable from "./BakingSystemPage1Components/FinalProductsTable";
import SelectedFinalProductsTable from "./BakingSystemPage1Components/SelectedFinalProductsTable";
import IngredientQuantitiesTableRP from "./RecipePageComponents/IngredientQuantitiesTableRP";

const BakingSystemPage1 = () => {

    const [finalProductsData, setFinalProductsData] = useState<OrderedFinalProduct[]>([])
    const [tableData, setTableData] = useState<OrderedFinalProduct[]>([])
    const [selectedData, setSelectedData] = useState<OrderedFinalProduct[]>([])
    const [ingredientsNeeded, setIngredientsNeeded] = useState([])

    const fetchFinalProducts = async () => {
        const response = await fetch("http://localhost:8080/api/customerorders/fetch-ordered-final-products")
        if(!response.ok){
            throw new Error("Error fetching ordered final products")
        }
        return await response.json();
    }

    const fetchIngredientNeeded = async (finalProductIds: number[]) => {
        const params = new URLSearchParams();

        finalProductIds.forEach(id => {
            params.append('finalProductIds', id);
        });

        const response = await fetch(`http://localhost:8080/api/finalproducts/get-total-ingredients?${params.toString()}`);
        if (!response.ok) {
            throw new Error("Error fetching total ingredients");
        }
        return await response.json();
    }

    const filterData = (data: any) => {
        const filteredData = data.map((productAndOrder: any) => ({
            key: productAndOrder.first.id.toString() + productAndOrder.second.id.toString(),
            customerOrder: productAndOrder.first.id,
            finalProduct: productAndOrder.second,
            quantity: productAndOrder.second.quantity
        }))
        return filteredData
    }

    const filterTableData = (data: any) => {
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
        if(selectedData !== undefined || selectedData.length > 0) {
            fetchIngredientNeeded(selectedData.map(x => x.finalProductId)).then((ingredientsNeededData) => {
                setIngredientsNeeded(ingredientsNeededData)
            })
                .catch((reason) => {
                    console.error("Error setting ingredients needed data. " + reason)
                })
        }
    }, [selectedData])

    useEffect(() => {
        fetchFinalProducts().then((finalProductsData) => {
            setFinalProductsData(filterData(finalProductsData))
            setTableData(filterTableData(finalProductsData))
        })
            .catch((reason) => {console.error("Error setting final products data. " + reason)})
    }, [])

    useEffect(() => {
        console.log(finalProductsData)
    }, [finalProductsData])

    return (
        <div className="BS1-page">
            <h1 className='BS1-title'>Baking System</h1>
            <div className="BS1-grid-container">
                <div>
                <FinalProductsTable
                    rawData={tableData}
                    setRawData={setTableData}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                />
                </div>
                <div>
                <SelectedFinalProductsTable
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    nonSelectedData={tableData}
                    setNonSelectedData={setTableData}
                />
                <IngredientQuantitiesTableRP
                    ingredientQuantities={ingredientsNeeded}
                />
                </div>
            </div>
        </div>
    )

}

export default BakingSystemPage1