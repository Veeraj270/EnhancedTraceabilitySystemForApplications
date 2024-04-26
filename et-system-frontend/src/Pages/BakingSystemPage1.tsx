import React, {useEffect, useState} from "react";
import "./BakingSystem/Page1/BS1Stylesheet.css"
import {OrderedFinalProduct} from "./Interfaces/OrderedFinalProduct";
import FinalProductsTable from "./BakingSystem/Page1/FinalProductsTable";
import SelectedFinalProductsTable from "./BakingSystem/Page1/SelectedFinalProductsTable";
import IngredientQuantitiesTableRP from "./RecipePageComponents/IngredientQuantitiesTableRP";
import {Link} from "react-router-dom";
import './BakingSystem/Page3/BSP3StyleSheet.css'
import {FPData, IngredientQuantity} from "./BakingSystem/BakingSystemInterfaces";

interface PropTypes{
    //setSelectedFinalProducts: (selectedFinalProducts: OrderedFinalProduct[]) => void
    //setIngredientsNeeded: (ingredientsNeeded: IngredientQuantity[]) => void
    //ingredientsNeeded: IngredientQuantity[];
    finalProductData: FPData[]
}

const BakingSystemPage1 = (props : PropTypes) => {
    //Destructure props
    //const setSelectedFinalProduct = props.setSelectedFinalProducts;
    //const setIngredientsNeeded = props.setIngredientsNeeded;
    //const ingredientsNeeded = props.ingredientsNeeded;


    //State variables
    const [table1Data, setTable1Data] = useState<FPData[]>([])
    const [table2Data, setTable2Data] = useState<FPData[]>([])
    const [table3Data, setTable3Data] = useState<IngredientQuantity[]>([]);

    const [ingredientTotals, setIngredientTotals] = useState<IngredientQuantity[]>([])

    useEffect(() => {
        setTable1Data(props.finalProductData)
    }, [props.finalProductData]);

    useEffect(() => {
        console.log("table2Data: ", table2Data)
    }, [table2Data]);

    //const [searchData, setSearchData] = useState<OrderedFinalProduct[]>([])
    //const [selectedData, setSelectedData] = useState<OrderedFinalProduct[]>([])
    //const [ingredientsNeeded, setIngredientsNeeded] = useState<IngredientQuantity[]>([])


    //Fetches the ingredients needed for the selected final products
    const fetchIngredientsNeeded = async (finalProductData : FPData[]) => {
        //Add the finalProductData to the fetch request body
        console.log(finalProductData);


        const response = await fetch(`http://localhost:8080/api/finalproducts/get-total-ingredients`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(finalProductData)
        });

        //Add the finalProductData to the request
        if (!response.ok) {
            throw new Error("Error occurred whilst fetching total ingredients");
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

    //When table2Data changes fetch the ingredients required to bake the selected products
    useEffect(() => {
        if(table2Data.length > 0) {
            fetchIngredientsNeeded(table2Data).then((IQData : IngredientQuantity[]) => {
                setTable3Data(IQData);
                console.log(IQData)
            }).catch((err) => {
                    console.error("Error setting ingredients needed data. " + err)
                })
        } else{
            setTable3Data([]);
        }
    }, [table2Data])

    //Used by the SelectedFinalProductsTable component to update table1Data
    const updateTable1Data = (row : FPData) => {
        //Check if there's a row that matches the row given
        const rowIndex = table1Data.findIndex(x => equalsFPData(x, row));

        if (rowIndex === -1){
            setTable1Data(table1Data => { return [...table1Data, {...row, amount: 1}]})
        }
        else {
            let table1DataCopy = [...table1Data];
            table1DataCopy[rowIndex].amount += 1;
            setTable1Data(table1DataCopy)
        }
    }

    //Used by the FinalProductsTable component to update the table2Data
    const updateTable2Data = (row : FPData) => {
        //Check if there;s a row that matches the given row
        const rowIndex = table2Data.findIndex(x => equalsFPData(x, row));

        if (rowIndex === -1){
            setTable2Data(table2Data => {return [...table2Data, {...row, amount: 1}]})
        }
        else {
            let table2DataCopy = [...table2Data];
            table2DataCopy[rowIndex].amount += 1;
            setTable2Data(table2DataCopy)
        }
    }


    const equalsFPData = (fp1: FPData, fp2: FPData) => {
        return fp1.finalProductLabel == fp2.finalProductLabel &&
            fp1.associatedCustomerOrderID == fp2.associatedCustomerOrderID
    }

    const startBaking = () => {

    }

    return (
        <div className="page-container">
            <h1 className='BS1-title'>Baking System</h1>
            <div className="BS1-grid-container">
                <div className={"BS1-grid-container-2"}>
                {<FinalProductsTable
                    table1Data={table1Data}
                    setTable1Data={setTable1Data}
                    updateTable2Data={updateTable2Data}
                    equalsFPData={equalsFPData}
                />}
                </div>
                <div className={"border-container"}>
                    <div className={"BS1-grid-container-3"}>
                        <div className={'BSP1'}>
                            <h2>Selected Products</h2>
                            {<SelectedFinalProductsTable
                                table2Data={table2Data}
                                setTable2Data={setTable2Data}
                                updateTable1Data={updateTable1Data}
                                equalsFPData={equalsFPData}
                            />}
                        </div>
                        <div>
                            <h2>Ingredients needed</h2>
                            {<IngredientQuantitiesTableRP
                                ingredientTotals={table3Data}
                            />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default BakingSystemPage1