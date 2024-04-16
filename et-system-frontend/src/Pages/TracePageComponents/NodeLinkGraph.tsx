import React, {useEffect, useRef, useState} from "react";
import { Network } from 'vis-network/peer'

import {Node, Edge, Graph} from "./Interfaces";
import LabelWidget from "./LabelWidget";

interface PropTypes{
    graphData: any;
    setSelectedProductID: (productID: number | null) => void;
}

const NodeLinkGraph = ( props : PropTypes) => {
    //Destructure props
    const setSelectedProductID = props.setSelectedProductID;

    //State Variables
    const [ graph, setGraph ] = useState<Graph | null>(null);
    const [label, setLabel] = useState<string | null>(null);

    //Hooks
    useEffect(() => {
        if (props.graphData){
            buildGraph(props.graphData);
        }
        else {
            setGraph({
                nodes: [],
                edges: []
            });
        }
    }, [props.graphData]);

    const onNodeClick = (node : Node) => {
        setSelectedProductID(parseInt(node.id.toString(), 10));
        setLabel(node.itemLabel ? node.itemLabel : null);
    }

    useEffect(() => {
        if (containerRef.current && graph){
            const network: Network = new Network(containerRef.current, graph, options);
            network.focus(1, {scale: 1.2, offset: {x: -60, y: -100}})
            network.on("click", (properties) => {
                let nodeId = network.getNodeAt(properties.pointer.DOM);
                if (nodeId){
                    graph.nodes.forEach((node) => {
                        if (node.id === nodeId) {
                            onNodeClick(node);
                        }
                    });
                    //setSelectedProductID(parseInt(nodeId.toString(), 10));
                    //onNodeClick(parseInt(nodeId.toString(), 10))
                }
            })

        }

        setSelectedProductID(graph?.nodes[0]?.id ? graph.nodes[0].id : null)
    }, [graph]);

    //Ref for the container
    const containerRef = useRef(null);

    //vis.js options
    const options = {
        edges: {
            smooth: true,
            arrows: {
                middle: {
                    enabled: true,
                    type: "arrow",
                }
            }
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
            json.nodes.forEach((node: any) => {
                nodes.push({
                        id: node.id,
                        label: `${node.id}`,
                        itemLabel: node.itemLabel,
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
        <div className={"TP-graph-wrapper"}>
            <LabelWidget
                label={label}
            />
            <div ref={containerRef} className={"TP-node-link-graph"}>

            </div>
        </div>
    )
}

export default NodeLinkGraph;