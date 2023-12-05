import SearchBar from "../components/TraceabilityComponents/SearchBar";
import {useState} from "react";
import Product from "../components/TraceabilityComponents/Product.tsx";

const TraceabilityPage = () => {
    const [ data, setData ] = useState([])
    const [ root, setRoot] = useState(null)

    const getData = (data) => {
        setData(data);
        console.log(data);
        if(data){
            const root = buildGraph(data)
            setRoot(root)
        }
    }

    const buildGraph = (data) => {
        let nodes = new Array()
        data.reverse().forEach((product, counter) => {
            // const parentID = product.parentID
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
        console.log("RecursiveBuild - depth: " + depth + ` ${node.data.label}`)
        ///Base case
        if (node.children.length === 0){
            //Return html for label
            return(
                <div style={{ marginLeft: depth * 20 + "px"}} className={`depth-${depth}`}>
                    <p>{`Label: ${node.data.label}`}</p>
                </div>
            )
        }
        else {
            //Recursive case
            depth ++
            return(
                <div style={{ marginLeft: (depth-1) * 20 + "px"}} className={`depth-${depth-1}`} >
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
                    <h3>Product History</h3>
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
