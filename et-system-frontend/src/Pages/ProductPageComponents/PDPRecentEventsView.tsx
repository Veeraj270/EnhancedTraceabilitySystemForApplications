import React, {useEffect, useState} from 'react';
import {Event} from "../Interfaces/Event";

interface PropType{
    selectedId: number | undefined;
}

interface CustomNode{
    x: number;
    y: number;
    r: number; //radius
    text?: string;
}

interface Link{
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    stroke: string;
}

const PDPRecentEventsView = ( props: PropType ) =>{
    //State Variables
    const [nodes, setNodes] = useState<CustomNode[]>([]);
    const [links, setLinks] = useState<Link[]>([]);

    //Related to SVG
    const viewBoxHeight = 100;
    const viewBoxWidth = 100;
    const maxEventsVisible = 5;
    const radius = 4;
    const stroke = "lightblue";

    useEffect(() => {
        if (props.selectedId){
            fetchHistory(props.selectedId).then((JSON: any) => {
                console.log(JSON);
                genGraph(JSON); //Generate node-link graph based of events data
            }
            ).catch((err: Error) => console.log(err))
        }
    }, [ props.selectedId]);

    //Fetch timeline history
    const fetchHistory = async (id: number): Promise<any> => {
        const res = await fetch(`http://localhost:8080/api/products/fetch-product-history/${id}`);
        if (!res.ok){
            throw new Error("fetch-product-history response was not ok")
        }
        return res.json();
    }

    const genGraph = (events : any[]) : void => {
        let trimmedEvents = events.splice(0, maxEventsVisible);
        let localNodes: CustomNode[] = [];
        let localLinks: Link[] = [];
        let X = 10;
        let Y = 10;
        let gap = 18;

        if (trimmedEvents.length > 0){
            //Add a node for each event
            trimmedEvents.forEach((event) => {
                localNodes.push(
                    {
                        x: X,
                        y: Y,
                        r: radius
                    });
                Y += gap;
            })

            //Add a link between each node
            for (let i = 0; i < localNodes.length - 1; i ++){
                let n1 = localNodes[i]
                let n2= localNodes[i+1]

                localLinks.push({
                    x1: n1.x,
                    y1: n1.y,
                    x2: n2.x,
                    y2: n2.y,
                    stroke: stroke
                });
            }
            setNodes(localNodes);
            setLinks(localLinks);
        } else {
            setNodes([]);
            setLinks([]);
        }
    }

    const renderNodes = () => {
        return (
            nodes.map((n: CustomNode) => (
                    <circle
                        cx={`${n.x}`}
                        cy={`${n.y}`}
                        r={`${n.r}`}
                        fill={"lightblue"}
                    />
            ))
        )
    }

    const renderLinks = () => {
        return (links.map((l: Link) => (
            <line
                x1={l.x1}
                y1={l.y1}
                x2={l.x2}
                y2={l.y2}
                stroke={l.stroke}
            />
        )))
    }

    const renderEventText = () => {
        //To Be Completed:

    }
    return (
        <div className={"PDP-recent-events-view"}>
            <svg viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}>
                {renderNodes()}
                {renderLinks()}
            </svg>
        </div>
    )
}

export default  PDPRecentEventsView;

