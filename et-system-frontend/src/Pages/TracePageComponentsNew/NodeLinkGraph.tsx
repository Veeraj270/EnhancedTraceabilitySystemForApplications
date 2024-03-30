import React, {useEffect, useRef, useState} from "react";
import { Network } from 'vis-network/peer'
import { DataSet } from 'vis-data/peer'


import {Node, Edge, Graph} from "./Interfaces/GraphInterface";

interface PropTypes{
    graphData: any;
}
const NodeLinkGraph = ( props : PropTypes) => {
    //State Variables
    const [ graph, setGraph ] = useState<Graph | null>(null);

    //Hooks
    useEffect(() => {
        if (props.graphData){
            buildGraph(props.graphData);
        }
    }, [props.graphData]);

    useEffect(() => {
        if (containerRef.current && graph){
            const network: Network = new Network(containerRef.current, graph, options);
            network.focus(1, {scale: 1.2, offset: {x: -60, y: -100}})
        }
    }, [graph]);

    //Ref for the container
    const containerRef = useRef(null);

    //vis.js options
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

            setGraph({
                nodes: nodes,
                edges: edges
            })
        }
    }

    return (
        <div ref={containerRef} className={"TP-node-link-graph"}></div>
    )
}

export default NodeLinkGraph;