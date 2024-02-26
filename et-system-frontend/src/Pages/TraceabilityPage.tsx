import SearchBar from "./TracePageComponents/SearchBar";
import React, {useEffect, useState} from "react";
import ProductHistory from "./TracePageComponents/ProductHistory";
import {Product} from "./Interfaces/Product";
import {Event} from "./Interfaces/Event";

class Node{
    children: Node[];
    product: Product;

    constructor(product : Product){
        this.product = product;
        this.children = [];
    }

    add(node : Node): void{
        this.children.push(node);
    }
}

const TraceabilityPage = () => {
    const [root , setRoot] = useState<Node | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [history, setHistory] = useState<Event[]>([]);


    const getData = (products : Product[] | null) : void => {
        if (products !== null){
            const root : Node | null = buildGraph(products);
            setRoot(root);
        }
    }

    const clickHandler = (event : React.MouseEvent, product: Product) : void => {
        //If already selected then unselect
        if (selectedProduct == null){
            setSelectedProduct(product);
            fetchHistory(product.id).then();
        }
        //Allows unselecting
        else if (selectedProduct.id === product.id){
            setSelectedProduct(null);
            setHistory([]);
        }
        //Allows switching which item is selected
        else{
            setSelectedProduct(product)
            fetchHistory(product.id).then();
        }

        event.stopPropagation();
    }

    const fetchHistory = async (id: number) : Promise<void> => {
        try {
            const res = await fetch(`http://localhost:8080/api/products/fetch-product-history/${id}`);
            if (!res.ok){
                throw new Error("fetch-product-history response was not ok")
            }
            const updatedHistory : Event[] = await res.json();
            setHistory(updatedHistory);
            console.log(history);
        } catch(error) {
            console.log("Error occurred with fetchHistory(): ", error)
        }
    }

    const buildGraph = (data: Product[]) : Node | null => {
        let nodes: Node[] = [];
        data.reverse().forEach((product: Product) => {
            //Creates a new Node object
            const currentNode = new Node(product);

            //Add newNode object to nodes array
            nodes.push(currentNode);

            //Search for parent node, add itself as a child
            if (currentNode.product.parentID != null){
                //Attempt to find parentNode within the array
                let parentNode : Node | undefined = nodes.filter((node : Node) => node.product.id === currentNode.product.parentID).at(0);
                if (parentNode instanceof Node){
                    parentNode.add(currentNode);
                }
                else {
                    throw new Error("Unable to find parent node within provided array.");
                }
            }
        })

        let root : Node  | undefined = nodes.at(0);

        if (root === undefined){
            throw new Error(" Root is undefined. ");
        }
        else {
            console.log("root: " + root);
            return root;
        }
    }

    const buildGraphDisplay = (root : Node) => {
        //Recursively build tree
        return (
            <div>
                {RecursiveBuild(root,0)}
            </div>
        )
    }

    const RecursiveBuild = (node: Node, depth: number) => {
        ///Base case
        if (node.children.length === 0){
            //Return html for label
            return(
                <div
                     style={(depth === 0) ? {marginLeft: 0 + "px"} :{marginLeft: 20 + "px"}}
                     className={(selectedProduct != null && node.product.id === selectedProduct.id) ? `depth-${depth}-selected` :`depth-${depth}`}
                     onClick={(e) => clickHandler(e, node.product)}>
                    <p>{`Label: ${node.product.label}`}</p>
                </div>
            )
        }

        //Recursive case
        else {
            depth ++
            console.log("node.data.id : " + node.product.id)
            return(
                <div style={(depth === 1) ? {marginLeft: 0 + "px"} :{marginLeft: 20 + "px"}}
                     className={(selectedProduct != null && node.product.id === selectedProduct.id) ? `depth-${depth-1}-selected` :`depth-${depth}`}
                     onClick={(e) => clickHandler(e, node.product)}>
                    <p>{`Label: ${node.product.label}`}</p>
                    {node.children.map((child) => (RecursiveBuild(child, depth))).reverse()}
                </div>
            )
        }
    }

    return (
        <div className='traceability-page'>
            <h1>Traceability</h1>
            <div className = 'search-bar-container'>
                <SearchBar onUpdate = {getData}/>
            </div>
            <div className={'grid'}>
                <div className='data-container'>
                    <h3>Product Intermediaries Tree</h3>
                    {
                        root ? buildGraphDisplay(root) : <p> No data available</p>
                    }
                </div>
                <div className='product-history-container'>
                    <h3>{`Product History of ${selectedProduct ? selectedProduct.label + " UID: " + selectedProduct.id: "null"}`}</h3>
                    <ProductHistory history={history}/>
                </div>
            </div>

        </div>
    )
}

export default TraceabilityPage
