import React, {useEffect, useRef, useState} from "react";

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
const EventHistoryWidget = () => {
    //Related to scg view box
    //const [svgGridHeight, setSvgGridHeight] = useState<number>(100);
    const svgGridHeight = useRef<number>(100);
    const svgGridWidth = 100;
    const svgRef = useRef(null);
    const [svgHeight, setSvgHeight] = useState<number>(0);

    //Temporary (for development)
    //const exampleNodes: CustomNode[] = Array(20).fill( {x: 20, y: 0, r: 6});
    const productID = 1;

    //Related to node-link chain
    //const [nodes, setNodes] = useState<CustomNode[]>([]);
    const [chain, setChain] = useState<Chain>({nodes: [],links: []})
    const pxPerNode = 60
    const stroke = "lightblue";
    
    const events = useRef<Event[]>([]); //Persistent reference to the events

    //Resize observer to resize the SVG view box
    useEffect(() => {
        if(!svgRef.current) return ;
        const resizeObserver = new ResizeObserver((entries  : ResizeObserverEntry[]) => {
            for (let entry of entries){
                console.log("Resize event occurred")
                //Recalc the SVG view box grid height to prevent warping
                svgGridHeight.current  = 100 * (entry.contentRect.height / entry.contentRect.width)

                //Recalc the node positions - causing a rerender

                let newChain = genNodeLinkChain(events.current, svgGridHeight.current);

                //Triggering a rerender
                setChain(newChain);
                //[WIP]
            }
        });
        resizeObserver.observe(svgRef.current);
        return () => resizeObserver.disconnect();
    }, []);


    //Fetch product history when productID state variable changes or upon initial render
    useEffect(() => {
        fetchProductHistory(productID).then((data) => {
            events.current = data;
            console.log("events.current:", events.current);

            let height = pxPerNode * events.current.length;

            //trigger a resize observer event
            if (svgRef.current){
                let svg = (svgRef.current as HTMLElement);
                svg.setAttribute("height", `${height}px`);
                setSvgHeight(height);
            }

        }).catch((err) => {
            console.log(err);
        })
    }, [productID]);


    const genNodeLinkChain = (events: Event[], gridHeight: number) => {
        console.log("genNodeLinkChain called")
        let newNodes: CustomNode[] = []
        let newLinks = []
        //Create a node for each event

        let i = 0;
        for (let event in events){
            newNodes.push({
                x: 20,
                y: (gridHeight / (2 * events.length)) * ((2 * i) + 1),
                r: 6
            });
            i ++;
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

        let chain = {
            nodes: newNodes,
            links: newLinks
        }
        //Update the state variables
        return chain;
    }

    //Updates the position of the nodes depending on the new svg grid height
    const updateNodePositions = (svgGridHeight: number) => {
        let newNodes: CustomNode[] = []
        for (let i = 0; i < nodes.length; i ++){
            newNodes.push({...nodes[i], y: (svgGridHeight / (2 * nodes.length)) * ((2 * i) + 1)})
        }
        setNodes(newNodes);
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
        return (
            chain.nodes.map((n: CustomNode) => (
                <circle
                    cx={`${n.x}`}
                    cy={`${n.y}`}
                    r={`${n.r}`}
                    fill={"lightblue"}
                />
            ))
        )
    }

    //Render links
    const renderLinks = () => {
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


    return (
        <div className={"TP-event-history-widget"}>
            <svg  ref={svgRef} className={"TP-svg-window"} viewBox={`0 0 ${svgGridWidth} ${svgGridHeight.current}`}>
                {renderNodes()}
                {renderLinks()}
            </svg>
        </div>
    )
}

export default EventHistoryWidget