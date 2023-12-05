import SearchBar from "../components/TraceabilityComponents/SearchBar";
import {useEffect, useState} from "react";
import Product from "../components/TraceabilityComponents/Product.tsx";

const TraceabilityPage = () => {
    const [ data, setData ] = useState([])
    const [ root, setRoot] = useState(null)
    const [ selectedProduct, setSelectedProduct ] = useState(null)
    const [ selectedProductLabel, setSelectedProductLabel ] = useState(null)

    useEffect(() => {

    }, [selectedProduct])

    const getData = (data) => {
        setData(data);
        console.log(data);
        if(data){
            const root = buildGraph(data)
            setRoot(root)
        }
    }

    const clickHandler =  (event, data) => {
        console.log("divClicked()" + data.label)
        setSelectedProduct(data)
        event.stopPropagation()
    }

    const buildGraph = (data) => {
        let nodes = new Array()
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
                <div id={node.data.id} style={{ marginLeft: depth * 20 + "px"}} className={`depth-${depth}`} onClick={(e) => clickHandler(e, node.data)}>
                    <p>{`Label: ${node.data.label}`}</p>
                </div>
            )
        }
        else {
            //Recursive case
            depth ++
            return(
                <div id={node.data.id} style={{ marginLeft: (depth-1) * 20 + "px"}} className={`depth-${depth-1}`} onClick={(e) => clickHandler(e, node.data)}>
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
                    <h3>Search Results</h3>
                    {
                        root ? buildGraphDisplay(root) : <p> No data available</p>
                    }
                </div>
                <div className='product-history-container'>
                    <h3>{`Product History of ${selectedProduct ? selectedProduct.label + " UID: " + selectedProduct.id: " "}`}</h3>
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
