import React, {useEffect, useState} from 'react';

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

interface Text{
    x: number;
    y: number;
    content: string;
}

const PDPRecentEventsView = ( props: PropType ) =>{
    //State Variables
    const [nodes, setNodes] = useState<CustomNode[]>([]);
    const [links, setLinks] = useState<Link[]>([]);

    //Related to SVG
    const viewBoxHeight = 100;
    const viewBoxWidth = 100;
    const maxEventsVisible = 5;
    const radius = 3.5;
    const stroke = "lightblue";
    const textOffset = 10;

    useEffect(() => {
        if (props.selectedId){
            fetchHistory(props.selectedId).then((JSON: any) => {
                console.log(JSON);
                genGraph(JSON); //Generate node-link graph based of events data
            }).catch((err: Error) => console.log(err))
        }
    }, [props.selectedId]);

    //Fetch timeline history
    const fetchHistory = async (id: number): Promise<any> => {
        const res = await fetch(`/api/products/fetch-product-history/${id}`);
        if (!res.ok){
            throw new Error("fetch-product-history response was not ok")
        }
        return res.json();
    }

    const genGraph = (events : any[]) : void => {
        let trimmedEvents = events.reverse().splice(0, maxEventsVisible);
        let localNodes: CustomNode[] = [];
        let localLinks: Link[] = [];
        let X = 10;
        let Y = 10;
        let gap = 20;

        if (trimmedEvents.length > 0){
            //Add a node for each event
            trimmedEvents.forEach((event) => {
                localNodes.push(
                    {
                        x: X,
                        y: Y,
                        r: radius,
                        text: extractEventText(event)
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

            //Add Text {Date}-{Time}-{EventType}
            trimmedEvents.forEach((event) => {
                let timestamp = event.timestamp;
                let date = timestamp.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/)?.at(0);
                let time = timestamp.match(/[0-9]{2}:[0-9]{2}:[0-9]{2}/)?.at(0);
                let eventType = event.type;
            })

            setNodes(localNodes);
            setLinks(localLinks);
        } else {
            setNodes([]);
            setLinks([]);
        }
    }

    const extractEventText = (event: any): string => {
        let date = event.timestamp.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/)?.at(0);
        let time = event.timestamp.match(/[0-9]{2}:[0-9]{2}:[0-9]{2}/)?.at(0);
        let eventType = event.type;
        return `${eventType} at ${date}, ${time}`;
    }

    const renderNodes = () => {
        return (
            nodes.map((n: CustomNode) => (
                    <circle
                        cx={`${n.x}`}
                        cy={`${n.y}`}
                        r={`${n.r}`}
                        fill={"lightblue"}
                        stroke={"black"}
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

    const renderText = () => {
        return (
            nodes.map((n: CustomNode) => (
                <text
                    x={n.x + textOffset}
                    y={n.y + 0.5*n.r}
                    className={"PDP-svg-text-style"}
                >{n.text}</text>
            ))
        )
    }

    return (
        <div className={"PDP-recent-events-view"}>
            <div className={"PDP-svg-wrapper"}>
                <b>Recent Events:</b>
                <svg viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}>
                    {renderNodes()}
                    {renderLinks()}
                    {renderText()}
                </svg>
            </div>
        </div>

    )
}

export default  PDPRecentEventsView;

