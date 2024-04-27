import React, {useEffect, useRef, useState} from "react"
import './BakingSystem/Page3/BSP3StyleSheet.css'
import ProductsTable from "./BakingSystem/Page3/ProductsTable";
import UpdatedProductsTable from "./BakingSystem/Page3/UpdatedProductsTable";
import NewWeightWidget from "./BakingSystem/Page3/NewWeightWidget";
import ProducedTable from "./BakingSystem/Page3/ProducedTable";
import {FPData, UsedProduct} from "./BakingSystem/BakingSystemInterfaces";

interface Table1Row{
    id: number,
    label: string,
    quantityUsed: number
}

interface Table2Row{
    id: number,
    label:string,
    quantityUsed: number
    newWeight: number
}

interface PropTypes{
    productsUsed: UsedProduct[]
    selectedFPData: FPData[]
}

//The expected data formats to be sent to the backend
interface BakedProduct{
    amount: number,
    finalProductId: number,
    customerOrderId: number,
}

interface UsedProduct{
    productId: number,
    quantityUsed: number,
    newQuantity: number,
}

interface BPStruct{
    usedProducts: UsedProduct[],
    bakedProducts: BakedProduct[],
    location: string,
    userResponsible: string
}


const BakingSystemPage3 = (props : PropTypes) => {
    //Destructure props
    const productsUsed = props.productsUsed;
    const selectedFPData = props.selectedFPData;

    //State variables
    const [table1Data, setTable1Data] = useState<Table1Row[]>([]);
    const [table2Data, setTable2Data] = useState<Table2Row[]>([]);
    const [table3Data, setTable3Data] = useState<FPData[]>([]);

    const [selectedProduct, setSelectedProduct] = useState<Table1Row | null>(null);

    //UseEffects
    useEffect(() => {
        let temp : Table1Row[] = [];
        for (let product of productsUsed){
            temp.push({id: product.product.id,
                label: product.product.label ? product.product.label : "No label",
                quantityUsed: product.quantityUsed})
        }
        setTable1Data(temp);
    }, []);

    useEffect(() => {
        setTable3Data(selectedFPData);
    }, [selectedFPData]);

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
        console.log("Submit")

        //Check that all items have been updated with new weights
        if (table1Data.length != 0){
            alert("All items must be updated with new weights before submission");
            return;
        }

        //Send the list of updated used items and newly produced items to the backend [need to write the back-end methods first]

        //To be implemented during integration of all 3 baking system pages into a single system

        console.log(table3Data);
        console.log(table2Data);

        //Convert to the expected data format
        const data = convertToBPStruct();

        console.log("BPStruct: ", data)

        //Send the data to the backend
        sendToBackend(data).then((res) => {
            alert("Data submitted successfully")
        }).catch((error) => {
            console.error("Error submitting data to the backend: " + error)
        })
    }

    const sendToBackend = async (data : BPStruct) => {
        const res = await fetch("http://localhost:8080/api/baking-system/process-bp-struct", {
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
        let usedProducts : UsedProduct[] = [];
        let bakedProducts : BakedProduct[] = [];

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