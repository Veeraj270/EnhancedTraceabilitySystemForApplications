import SearchBar from "../components/TraceabilityComponents/SearchBar";
import { useState } from "react";
import ProductHistory from "../components/TraceabilityComponents/ProductHistory";

const TraceabilityPage = () => {
    //An impossible product - necessary for implementation of select
    const defaultProduct = {
        id: -1,
    }

    const [root, setRoot] = useState(null)
    const [selectedProduct, setSelectedProduct] = useState(defaultProduct)
    const [history, setHistory] = useState([]);


    const getData = (data) => {
        if(data){
            const root = buildGraph(data)
            setRoot(root)
        }
    }

    const clickHandler = (event, product) => {
        //If already selected then unselect
        if (selectedProduct.id === product.id){
            setSelectedProduct(defaultProduct)
            setHistory([])
        }
        else {
            setSelectedProduct(product)
            fetchHistory(product.id)
        }


        event.stopPropagation()
    }

    const fetchHistory = async (id) => {
        console.log("fetchHistory()")
        const res = await fetch(`http://localhost:8080/api/products/fetch-product-history/${id}`);
        const history = await res.json();
        console.log(history)
        setHistory(history)
    }

    const buildGraph = (data) => {
        let nodes = []
        data.reverse().forEach((product, counter) => {
            const currentNode = new Node(product)

            //Add to nodes array
            nodes.push(currentNode)

            //Search for parent node, add itself as a child
            if (currentNode.data.parentID != null){
                let parentNode = nodes.filter((node) => node.data.id === currentNode.data.parentID)
                console.log(parentNode.at(0))
                parentNode.at(0).add(currentNode)
            }
        })

        let root = nodes.at(0)
        console.log(root)
        return root
    }

    const buildGraphDisplay = (root) => {
        //Recursively build tree
        return (
            <div>
                {RecursiveBuild(root,0)}
            </div>
        )
    }

    const RecursiveBuild = (node, depth) => {
        ///Base case
        if (node.children.length === 0){
            //Return html for label
            return(
                <div
                     style={(depth === 0) ? {marginLeft: 0 + "px"} :{marginLeft: 20 + "px"}}
                     className={(node.data.id === selectedProduct.id) ? `depth-${depth}-selected` :`depth-${depth}`}
                     onClick={(e) => clickHandler(e, node.data)}>
                    <p>{`Label: ${node.data.label}`}</p>
                </div>
            )
        }
        else {
            //Recursive case
            depth ++
            console.log("node.data.id : " + node.data.id)
            return(
                <div style={(depth === 1) ? {marginLeft: 0 + "px"} :{marginLeft: 20 + "px"}}
                     className={(node.data.id === selectedProduct.id) ? `depth-${depth-1}-selected` :`depth-${depth}`}
                     onClick={(e) => clickHandler(e, node.data)}>
                    <p>{`Label: ${node.data.label}`}</p>
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

class Node{
    constructor(data){
        this.data = data;
        this.children = []
    }

    add(node){
        this.children.push(node);
    }
}