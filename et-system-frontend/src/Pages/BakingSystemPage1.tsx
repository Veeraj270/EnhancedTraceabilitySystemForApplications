import React, {useEffect, useState} from "react";
import "./BakingSystemPage1Components/BS1Stylesheet.css"
import {OrderedFinalProduct} from "./Interfaces/OrderedFinalProduct";
import FinalProductsTable from "./BakingSystemPage1Components/FinalProductsTable";
import SelectedFinalProductsTable from "./BakingSystemPage1Components/SelectedFinalProductsTable";
import IngredientQuantitiesTableRP from "./RecipePageComponents/IngredientQuantitiesTableRP";
import {Link} from "react-router-dom";

const BakingSystemPage1 = () => {

    const [tableData, setTableData] = useState<OrderedFinalProduct[]>([])
    const [searchData, setSearchData] = useState<OrderedFinalProduct[]>([])
    const [selectedData, setSelectedData] = useState<OrderedFinalProduct[]>([])
    const [ingredientsNeeded, setIngredientsNeeded] = useState([])

    const fetchFinalProducts = async () => {
        const response = await fetch("http://localhost:8080/api/customerorders/fetch-ordered-final-products")
        if(!response.ok){
            throw new Error("Error fetching ordered final products")
        }
        return await response.json();
    }

    const fetchIngredientsNeeded = async (idsAndQuantities: {id: number, quantity: number}[]) => {
        const params = new URLSearchParams();

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
    }, [selectedData])

    useEffect(() => {
        fetchFinalProducts().then((finalProductsData) => {
            // setFinalProductsData(filterData(finalProductsData))
            const newData = filterTableData(finalProductsData)
            setTableData(newData)
            setSearchData(newData)
        })
            .catch((reason) => {console.error("Error setting final products data. " + reason)})
    }, [])

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
                            />
                        </div>
                    </div>
                <div>
                    <Link to={'/baking-system-page-2'}><button className={'start-baking-button'}>Start baking</button></Link>
                </div>
                </div>
            </div>
        </div>
    )

}

export default BakingSystemPage1