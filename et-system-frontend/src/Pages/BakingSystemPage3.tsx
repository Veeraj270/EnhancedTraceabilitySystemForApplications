import React, {useEffect, useState} from "react"
import './BakingSystem/Page3/BSP3StyleSheet.css'
import ProductsTable from "./BakingSystem/Page3/ProductsTable";
import UpdatedProductsTable from "./BakingSystem/Page3/UpdatedProductsTable";
import NewWeightWidget from "./BakingSystem/Page3/NewWeightWidget";
import ProducedTable from "./BakingSystem/Page3/ProducedTable";
import {
    BPStruct, BPStructBP,
    BPStructUP,
    FPData,
    P3Table1Row,
    P3Table2Row,
} from "./BakingSystem/BakingSystemInterfaces";

interface PropTypes{
    table1Data: P3Table1Row[]
    selectedFPData: FPData[]
    processFinished: () => void
}

const BakingSystemPage3 = (props : PropTypes) => {
    //Destructure props
    const processFinished = props.processFinished;

    //State variables
    const [table1Data, setTable1Data] = useState<P3Table1Row[]>(props.table1Data);
    const [table2Data, setTable2Data] = useState<P3Table2Row[]>([]);
    const [table3Data, setTable3Data] = useState<FPData[]>(props.selectedFPData);
    const [selectedProduct, setSelectedProduct] = useState<P3Table1Row | null>(null);

    useEffect(() => {
        setTable1Data(props.table1Data)
    }, [props.table1Data]);

    const searchUsedItems = (input : string): boolean => {
        for (let row of table1Data){
            if (row.id.toString() === input){
                setSelectedProduct(row)
                return true;
            }
        }
        return false;
    }

    const updateEntry = (weight: number) => {
        let index = -1;
        //Find product id in table1Data
        for (let i = 0; i < table1Data.length; i ++){
            if (table1Data[i].id === selectedProduct?.id){
                index = i;
                break;
            }
        }

        //Add selected product to updated items table
        if (selectedProduct){
            setTable2Data([...table2Data, {...selectedProduct, newWeight: weight}]);
        } else {
            alert("No selected product");
            return false;
        }

        let temp = Array.from(table1Data);
        temp.splice(index,1);
        setTable1Data(temp);

        return true;
    }

    const removeProduct = (id: number) => {
        //Find product id in table2Data
        let index = -1;
        for (let i = 0; i < table2Data.length; i ++){
            if (table2Data[i].id === id){
                index = i;
                break;
            }
        }

        //Add to table1Data
        setTable1Data([...table1Data,
            {
                id: id,
                label: table2Data[index].label,
                quantityUsed: table2Data[index].quantityUsed
            }]);

        //Remove from table2Data
        let temp = Array.from(table2Data);
        temp.splice(index,1);
        setTable2Data(temp);
    }

    const submit = () => {
        //Check that all items have been updated with new weights
        if (table1Data.length != 0){
            alert("All items must be updated with new weights before submission");
            return;
        }

        //Convert to the expected data format
        const data = convertToBPStruct();

        //Send the data to the backend
        sendToBackend(data).then((res) => {
            alert("Data submitted successfully")
        }).catch((error) => {
            console.error("Error submitting data to the backend: " + error)
        })

        processFinished();
    }

    const sendToBackend = async (data : BPStruct) => {
        const res = await fetch("/api/baking-system/process-bp-struct", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        const resJSON = await res.json();

        if (!resJSON.ok){
            alert("Error submitting data to the backend")
            throw new Error("Error submitting data to the backend")
        }

        return resJSON
    }

    const convertToBPStruct = () : BPStruct => {
        let usedProducts : BPStructUP[] = [];
        let bakedProducts : BPStructBP[] = [];

        let location = "Bakery";
        let userResponsible = "Admin";

        for (let product of table2Data){
            usedProducts.push({
                productId: product.id,
                quantityUsed: product.quantityUsed,
                newQuantity: product.newWeight
            })
        }

        for (let FP of table3Data){
            bakedProducts.push({
                amount: FP.amount,
                finalProductId: FP.finalProductID,
                customerOrderId: FP.associatedCustomerOrderID
            })
        }

        return {
            usedProducts: usedProducts,
            bakedProducts: bakedProducts,
            location: location,
            userResponsible: userResponsible
        }
    }

    //End of temp mock data
    return (
        <div className={'BS2-page-container'}>
            <h1>Baking System - Page 3</h1>
            <div className={'BSP3-description'}>
                <p>Scan each used item and enter the new weight of the product. Upon submission the newly produced products will be added to the database,
                    and all used products will be updated with their new weights.</p>
            </div>
            <div className={'BSP3-content'}>
                <div className={'BSP3-column'}>
                    <ProductsTable
                        products={table1Data}
                        selectedProductId={selectedProduct ? selectedProduct.id : null}
                    />
                </div>
                <div className={'BSP3-column'}>
                    <NewWeightWidget
                        selectedProductLabel={selectedProduct ? selectedProduct.label : null}
                        searchUsedItems={searchUsedItems}
                        updateEntry={updateEntry}
                    />
                </div>
                <div className={'BSP3-column'}>
                    <UpdatedProductsTable
                        products={table2Data}
                        removeProduct={removeProduct}
                    />
                </div>
                <div className={'BSP3-column'}>
                    <ProducedTable
                        products={table3Data}
                    />
                    <button className={'BSP3-submit-button'}
                        onClick={submit}
                    >Submit</button>
                </div>
            </div>
        </div>
    )
}

export default BakingSystemPage3