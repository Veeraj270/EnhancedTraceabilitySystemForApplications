import React, {useEffect, useRef, useState} from "react";
import { Network } from 'vis-network/peer'
import { DataSet } from 'vis-data/peer'


interface PropTypes{
    productID: number | null;
}

interface Node{
    id: number;
    label: string;
}

interface Edge{
    id: string;
    from: number;
    to: number;
}

interface Data{
    nodes: Node[],
    edges: Edge[]
}

const NodeLinkGraph = ( props : PropTypes) => {
    //State Variables
    const [ data, setData ] = useState<Data | null>(null);

    //Destructure props
    const productID = props.productID;

    //Hooks
    useEffect(() => {
        if (productID){
            fetchGraph(productID).then((json) => {
                buildGraph(json);
            })
        }
    }, [props.productID]);

    //Fetch graph
    const fetchGraph = async (id : number) => {
        const res= await fetch(`http://localhost:8080/api/products/fetch-graph/${id}`);
        if (!res.ok){
            throw new Error("fetch-graph response was not ok");
        }
        return await res.json();
    }

    //Extract the nodes and edges from the JSON
    const buildGraph = ( json : any) => {
        let nodes: Node[] = [];
        let edges: Edge[] = [];

        if (json.nodes && json.edges){
            console.log(json.nodes);
            console.log(json.edges);
            json.nodes.forEach((node: any) => {
                nodes.push({
                        id: node.id,
                        label: `${node.id}`
                    })
            })

            json.edges.forEach((edge: any) => {
                edges.push({
                    id: `${edge.source}to${edge.target}`,
                    from: edge.source,
                    to: edge.target
                });
            })

            setData({
                nodes: nodes,
                edges: edges
            })
        }
    }

    //Debugging
    useEffect(() => {
        console.log(data);
    }, [data]);

    const containerRef = useRef(null);

    const options = {
        edges: {
            smooth: true
        },
        layout: {
            hierarchical: {
                direction: "UD",
                sortMethod: "directed",
                shakeTowards: "roots"
            }
        },
        physics: false
    }

    //triggers after the first render
    useEffect(() => {
        if (containerRef.current && data){
            const network: Network = new Network(containerRef.current, data, options);
            network.focus(1, {scale: 1.2, offset: {x: -60, y: -100}})
        }
        }, [data]);

    return (
        <div ref={containerRef} className={"TP-node-link-graph"}></div>
    )
}

export default NodeLinkGraph;