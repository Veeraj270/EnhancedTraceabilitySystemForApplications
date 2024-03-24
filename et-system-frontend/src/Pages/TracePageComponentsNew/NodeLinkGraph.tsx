import React, {useEffect, useRef} from "react";
import { Network } from 'vis-network/peer'
import { DataSet } from 'vis-data/peer'
import {allOptions} from "vis-network/declarations/network/options";
import {clear} from "@testing-library/user-event/dist/clear";

const NodeLinkGraph = () => {

    //Nodes
    const nodes = new DataSet([
        {id: 1, label: "Node 1"},
        {id: 2, label: "Node 2"},
        {id: 3, label: "Node 3"},
        {id: 4, label: "Node 4"},
        {id: 5, label: "Node 5"}
    ]);

    const edges = new DataSet([
        {id: 'e1', from: 1, to: 3},
        {id: 'e2', from: 1, to: 2},
        {id: 'e3', from: 2, to: 4},
        {id: 'e4', from: 2, to: 5}
    ]);

    const data = {
        nodes: nodes,
        edges: edges
    };

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
        if (containerRef.current){
            const network: Network = new Network(containerRef.current, data, options);
            network.focus(1, {scale: 1.2, offset: {x: -60, y: -100}})
        }
        }, []);

    return (
        <div ref={containerRef} className={"TP-node-link-graph"}></div>
    )
}

export default NodeLinkGraph;