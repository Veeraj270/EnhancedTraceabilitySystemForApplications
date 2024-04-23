import React, {useEffect, useRef, useState} from "react"
import './BakingSystem/Page3/BSP3StyleSheet.css'
import ProductsTable from "./BakingSystem/Page3/ProductsTable";
import UpdatedProductsTable from "./BakingSystem/Page3/UpdatedProductsTable";
import NewWeightWidget from "./BakingSystem/Page3/NewWeightWidget";
import ProducedTable from "./BakingSystem/Page3/ProducedTable";

interface Table1Row{
    id: number,
    label: string,
    oldWeight: number
}

interface Table2Row{
    id: number,
    label:string,
    oldWeight: number
    newWeight: number
}

const BakingSystemPage3 = () => {
    //Temp mock data
    const [table1Data, setTable1Data] = useState<Table1Row[]>([])
    let tempData1 : any[] = []
    let id = 1
    for (let i = 0; i < 30; i++) {
        tempData1.push({
            id: id + i,
            label: 'Label',
            oldWeight: 1
        })
    }

    const [table2Data, setTable2Data] = useState<Table2Row[]>([])

    const table3Data = new Array(10).fill({
        quantity: 1,
        label: 'Cake'
    })

    //Temporary
    const firstRender = useRef(true);

    useEffect(() => {
        if (firstRender.current){
            firstRender.current = false;
            setTable1Data(tempData1);
        }
    }, []);

    //End temp

    //Debugging
    useEffect(() => {
        console.log("table2Data: " + table2Data);
    }, [table2Data]);

    //End-debugging

    const [selectedProduct, setSelectedProduct] = useState<Table1Row | null>(null)

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

        //Check if newWeight is less than old weight
        if (table1Data[index].oldWeight < weight){
            alert("Entered weight is more than old weight");
            return false;
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
        console.log("removeProduct()");

        //Find product id in table2Data
        let index = -1;
        for (let i = 0; i < table1Data.length; i ++){
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
                oldWeight: table2Data[index].oldWeight
            }]);

        //Remove from table2Data
        let temp = Array.from(table2Data);
        temp.splice(index,1);
        setTable2Data(temp);
    }

    const submit = () => {
        console.log("Submit")
    }

    //End of temp mock data
    return (
        <div className={'page-container'}>
            <h1>Baking System - Page 3</h1>
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