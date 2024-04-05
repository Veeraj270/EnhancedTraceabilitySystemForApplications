import React, {useEffect, useRef, useState} from "react";

interface CustomNode{
    x: number;
    y: number;
    r: number; //radius
}

const EventHistoryWidget = () => {
    //Related to scg view box
    const [svgGridHeight, setSvgGridHeight] = useState<number>(100);
    const svgGridWidth = 100;
    const svgRef = useRef(null);

    //Temporary (for development)
    const exampleNodes: CustomNode[] = Array(20).fill( {x: 20, y: 0, r: 6});

    //Related to nodes
    const [nodes, setNodes] = useState<CustomNode[]>(exampleNodes);
    const pxPerNode = 60

    //Resize observer to resize the SVG view box
    useEffect(() => {
        if(!svgRef.current) return ;
        const resizeObserver = new ResizeObserver((entries  : ResizeObserverEntry[]) => {
            for (let entry of entries){
                //Resize the SVG view box to prevent warping
                let newSvgHeight  = 100 * (entry.contentRect.height / entry.contentRect.width)

                //Recalculate the node positions
                calcNodePositions(newSvgHeight);

                //Update svgGridHeight
                setSvgGridHeight(newSvgHeight);
            }
        });
        resizeObserver.observe(svgRef.current);
        return () => resizeObserver.disconnect();
    }, []);


    //Render nodes
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

    //This will trigger a resizeObserver event to resize the svg view box
    const setSvgViewBoxHeight = () => {
        if (svgRef.current){
            let svg = (svgRef.current as HTMLElement);
            svg.setAttribute("height", `${pxPerNode * nodes.length}px`);
        }
    }

    useEffect(() => {
        setSvgViewBoxHeight();
    }, []);

    //Updates the position of the nodes depending on the new svg grid height
    const calcNodePositions = (svgGridHeight: number) => {
        let newNodes: CustomNode[] = []
        for (let i = 0; i < nodes.length; i ++){
            newNodes.push({...nodes[i], y: (svgGridHeight / (2 * nodes.length)) * ((2 * i) + 1)})
        }
        setNodes(newNodes);
    }

    return (
        <div className={"TP-event-history-widget"}>
            <svg  ref={svgRef} className={"TP-svg-window"} viewBox={`0 0 ${svgGridWidth} ${svgGridHeight}`}>
                {renderNodes()}
            </svg>
        </div>
    )
}

export default EventHistoryWidget