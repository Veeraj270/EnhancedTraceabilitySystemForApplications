import React, {useEffect, useRef, useState} from "react";
import {EventDetails} from "./Interfaces";

interface Event{
    id: number;
    timestamp: string;
    owner: string;
    type: string;
}

interface CustomNode{
    x: number;
    y: number;
    r: number; //radius
    date: string;
    onClick: () => void;
}

interface Link{
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    stroke: string;
}

interface Chain{
    nodes: CustomNode[];
    links: Link[];
}

interface PropTypes{
    setEventDetails: (details: EventDetails) => void;
    selectedProductID: number | null;
}

const EventHistoryWidget = (props : PropTypes) => {
    //Destructure props
    const setEventDetails = props.setEventDetails;
    const productID = props.selectedProductID;

    //Related to svg view box
    const svgGridHeight = useRef<number>(100);
    const svgGridWidth = 100;
    const svgRef = useRef(null);

    //Related to node-link chain
    const [chain, setChain] = useState<Chain>({nodes: [],links: []})
    const pxPerNode = 60
    const stroke = "lightblue";
    
    const events = useRef<Event[]>([]); //Persistent reference to the events

    //Resize observer to resize the SVG view box
    useEffect(() => {
        if(!svgRef.current) return ;
        const resizeObserver = new ResizeObserver((entries  : ResizeObserverEntry[]) => {
            for (let entry of entries){
                //Recalc the SVG view box grid height to prevent warping
                svgGridHeight.current  = 100 * (entry.contentRect.height / entry.contentRect.width)

                //Recalc the node positions
                let newChain = genNodeLinkChain(events.current, svgGridHeight.current);

                //Trigger a re-render by updating the chain state variable
                setChain(newChain);
            }
        });
        resizeObserver.observe(svgRef.current);
        return () => resizeObserver.disconnect();
    }, []);


    //Fetch product history when productID state variable changes or upon initial render
    useEffect(() => {

        if (!productID) return;

        fetchProductHistory(productID).then((data: Event[]) => {
            events.current = data.reverse();

            let height = pxPerNode * events.current.length;

            //trigger a resize observer event
            if (svgRef.current){
                let svg = (svgRef.current as HTMLElement);
                svg.setAttribute("height", `${height}px`);
            }

            if (events.current[0]){
                updateEventDetails(events.current[0]);
            }
        }).catch((err) => {
            console.log(err);
        })
    }, [productID]);

    const updateEventDetails = (event: Event) => {
        setEventDetails({
            timestamp: event.timestamp,
            type: event.type
        })
    }
    const genNodeLinkChain = (events: Event[], gridHeight: number) => {
        let newNodes: CustomNode[] = []
        let newLinks = []

        //Create a node for each event
        for (let i = 0; i < events.length; i ++){
            let date = events[i].timestamp.match(/\d{4}-\d{2}-\d{2}/)?.at(0)?.split("-").reverse().join("/"); //Likely inefficient
            newNodes.push({
                x: 20,
                y: (gridHeight / (2 * events.length)) * ((2 * i) + 1),
                r: 6,
                date: date ? date : "N/A",
                onClick: () => {
                    setEventDetails(
                        {
                            timestamp: events[i].timestamp,
                            type: events[i].type,
                        }
                    )
                }
            });
        }

        //Create a link between each node
        for (let i = 0; i < newNodes.length - 1; i ++){
            let n1 = newNodes[i]
            let n2 = newNodes[i+1]

            newLinks.push({
                x1: n1.x,
                y1: n1.y,
                x2: n2.x,
                y2: n2.y,
                stroke: stroke
            });
        }

        //Update the state variables
        return {
            nodes: newNodes,
            links: newLinks
        };
    }

    const fetchProductHistory = async (productID: number) => {
        const res = await fetch(`http://localhost:8080/api/products/fetch-product-history/${productID}`);
        if (!res.ok){
            throw new Error("fetch-product-history response was not ok")
        }
        return await res.json()
    }

    //Render nodes
    const renderNodes = () => {
        if (!svgGridHeight.current) return;
        return (
            chain.nodes.map((n: CustomNode) => (
                <circle
                    cx={`${n.x}`}
                    cy={`${n.y}`}
                    r={`${n.r}`}
                    fill={"lightblue"}
                    stroke={"black"}
                    onClick={n.onClick}
                />
            ))
        )
    }

    //Render links
    const renderLinks = () => {
        if (!svgGridHeight.current) return;
        return (
            chain.links.map((l: Link) => (
                <line
                    x1={l.x1}
                    y1={l.y1}
                    x2={l.x2}
                    y2={l.y2}
                    stroke={l.stroke}
                />
            ))
        )
    }

    //Render date text
    const renderLabels = () => {
        if (!svgGridHeight.current) return;
        return (
            chain.nodes.map((n: CustomNode) => (
                <text
                    x={n.x + 10}
                    y={n.y + 1/2 * n.r}
                    fill={"black"}
                    fontSize={7}
                >
                    {n.date}
                </text>
            ))
        )
    }

    return (
        <div className={"TP-event-history-widget"}>
            <svg  ref={svgRef} className={"TP-svg-window"} viewBox={`0 0 ${svgGridWidth} ${svgGridHeight.current}`}>
                {renderLinks()}
                {renderNodes()}
                {renderLabels()}
            </svg>
        </div>
    )
}

export default EventHistoryWidget