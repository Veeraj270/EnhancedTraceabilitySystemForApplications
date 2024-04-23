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

    const [table2Data, setTable2Data] = useState<Table1Row[]>([])

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
        //Add selected product to updated items table
        setTable2Data([...table2Data, {...selectedProduct, newWeight: weight}]);

        //Remove selected product from the used items table
        for (let i = 0; i < table1Data.length; i ++){
            if (table1Data[i].id === selectedProduct?.id){
                let temp = Array.from(table1Data);
                temp.splice(i,1);
                setTable1Data(temp);
            }
        }
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
                    />
                </div>
                <div className={'BSP3-column'}>
                    <ProducedTable
                        products={table3Data}
                    />
                    <button className={'BSP3-submit-button'}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default BakingSystemPage3