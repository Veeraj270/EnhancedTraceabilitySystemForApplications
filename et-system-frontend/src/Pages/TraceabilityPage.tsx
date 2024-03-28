import SearchBar from "./TracePageComponents/SearchBar";
import React, {useEffect, useState} from "react";
import ProductHistory from "./TracePageComponents/ProductHistory";
import Product from "./Interfaces/Product";
import {Event} from "./Interfaces/Event";
import './TracePageComponents/TPStylesheet.css'


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
    const [root , setRoot] = useState<Node>();
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [history, setHistory] = useState<Event[]>([]);
    const [input, setInput] = useState<string>("");

    //React Hooks
    useEffect(() => {
        //Check input is a number
        let id = parseInt(input, 10);
        if (!isNaN(id)){
            //Fetch the intermediaries for the Intermediaries Tree
            fetchProductIntermediaries(id)
                .then((products: Product[]) => {
                    //Build the intermediaries tree using the list of Products
                    const root: Node | undefined = buildGraph(products.reverse());
                    setRoot(root);
                })
                .catch((err) => console.log(err))
        }

    }, [input]);

    const clickHandler = (event : React.MouseEvent, product: Product) : void => {
        //If already selected then unselect
        if (selectedProduct == null){
            setSelectedProduct(product);
            fetchHistory(product.id).then((updatedHistory : Event[]) => {
                    setHistory(updatedHistory);
                }
            ).catch((err) => console.log(err));
        }

        //Allows unselecting
        else if (selectedProduct.id === product.id){
            setSelectedProduct(null);
            setHistory([]);
        }

        //Allows switching which item is selected
        else{
            setSelectedProduct(product)
            fetchHistory(product.id).then((updatedHistory: Event[]) => setHistory(updatedHistory));
        }

        event.stopPropagation();
    }

    const fetchHistory = async (id: number) : Promise<Event[]> => {
        const res = await fetch(`http://localhost:8080/api/products/fetch-product-history/${id}`);
        if (!res.ok){
            throw new Error("fetch-product-history response was not ok")
        }
        return await res.json()
    }

    const buildGraph = (products: Product[]) : Node | undefined => {
        let nodes: Node[] = [];

        products.forEach((product: Product) => {
            //Creates a new Node object
            const currentNode = new Node(product);

            //Add to the array of nodes
            nodes.push(currentNode);
          
            //Search the array of nodes for the current nodes parent
            if (currentNode.product.parentID !== 0){
                let parentNode : Node | undefined = nodes.filter((node : Node) => node.product.id === currentNode.product.parentID)?.at(0);
                if (parentNode){
                    //Once found add the current node as a child of the parent node
                    parentNode.add(currentNode);
                }
                else{
                    throw new Error("Unable to find parent node within provided array")
                }
            }
        })
        return nodes.at(0);
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

    //Fetches the product intermediaries
    const fetchProductIntermediaries = async (id : number) : Promise<Product[]> => {
        const res = await fetch(`http://localhost:8080/api/products/fetch-product-intermediaries/${id}`);
        if (!res.ok){
            throw new Error("fetch-product-intermediaries response was not ok");
        }
        return await res.json();
    }

    return (
        <div className='traceability-page'>
            <h1>Traceability</h1>
            <div className = 'search-bar-container'>
                <SearchBar
                    setInput={setInput}
                    input={input}
                />
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
