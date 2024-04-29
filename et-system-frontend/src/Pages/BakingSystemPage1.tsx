import React, {useEffect, useState} from "react";
import "./BakingSystem/Page1/BS1Stylesheet.css"
import FinalProductsTable from "./BakingSystem/Page1/FinalProductsTable";
import SelectedFinalProductsTable from "./BakingSystem/Page1/SelectedFinalProductsTable";
import IngredientQuantitiesTableRP from "./RecipePageComponents/IngredientQuantitiesTableRP";
import './BakingSystem/Page3/BSP3StyleSheet.css'
import {FPData, IngredientQuantity} from "./BakingSystem/BakingSystemInterfaces";

interface PropTypes{
    finalProductData: FPData[]
    setPage: (page: number) => void
    setIngredientsNeeded: (ingredientsNeeded: IngredientQuantity[]) => void
    setSelectedFPData: (selectedFPData: FPData[]) => void
}

const BakingSystemPage1 = (props : PropTypes) => {
    //Destructure props
    const setPage = props.setPage;
    const setIngredientsNeeded = props.setIngredientsNeeded;
    const setSelectedFPData = props.setSelectedFPData;

    //State variables
    const [table1Data, setTable1Data] = useState<FPData[]>([])
    const [table2Data, setTable2Data] = useState<FPData[]>([])
    const [table3Data, setTable3Data] = useState<IngredientQuantity[]>([]);

    useEffect(() => {
        setTable1Data(props.finalProductData)
    }, [props.finalProductData]);

    //Fetches the ingredients needed for the selected final products
    const fetchIngredientsNeeded = async (finalProductData : FPData[]) => {
        const response = await fetch(`/api/finalproducts/get-total-ingredients`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(finalProductData)
        });

        if (!response.ok) {
            throw new Error("Error occurred whilst fetching total ingredients");
        }
        return await response.json();
        return [];
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

            setTable2Data(prevState => [...prevState, {...row, amount: 1}]);
        }
        else {
            let table2DataCopy = [...table2Data];
            table2DataCopy[rowIndex] = {...table2DataCopy[rowIndex], amount: table2DataCopy[rowIndex].amount + 1};
            setTable2Data(table2DataCopy)
        }
    }

    const equalsFPData = (fp1: FPData, fp2: FPData) => {
        return fp1.finalProductLabel == fp2.finalProductLabel &&
            fp1.associatedCustomerOrderID == fp2.associatedCustomerOrderID
    }

    const startBaking = () => {
        setIngredientsNeeded(table3Data);
        setSelectedFPData(table2Data);
        setPage(2);
    }

    //Render the page
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
                <div className={"BS1-RHS-container"}>
                        <div className={'BSP1-RHS-column-1'}>
                            <h2>Selected Products</h2>
                            {<SelectedFinalProductsTable
                                table2Data={table2Data}
                                setTable2Data={setTable2Data}
                                updateTable1Data={updateTable1Data}
                                equalsFPData={equalsFPData}
                            />}
                        </div>
                        <div className={'BSP1-RHS-column-2'}>
                            <h2>Ingredients needed</h2>
                            {<IngredientQuantitiesTableRP
                                ingredientTotals={table3Data}
                            />}
                            <button className={'BS1-baking-button'} onClick={startBaking}>Start Baking</button>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default BakingSystemPage1