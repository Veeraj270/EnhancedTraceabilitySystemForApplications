import React, {useEffect, useRef} from "react";
import { Network } from 'vis-network/peer'
import { DataSet } from 'vis-data/peer'

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

    //triggers after the first render
    useEffect(() => {
        if (containerRef.current){
            console.log("container ref set!!")
            console.log(containerRef.current as HTMLElement)
            const network = new Network(containerRef.current, data, {});
        }

        }, []);


    return (
        <div ref={containerRef} className={"TP-node-link-graph"}></div>
    )
}

export default NodeLinkGraph;