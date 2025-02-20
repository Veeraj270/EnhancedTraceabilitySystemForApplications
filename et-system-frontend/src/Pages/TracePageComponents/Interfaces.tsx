export interface Node{
    id: number;
    label: string;
    itemLabel?: string;
}

export interface Edge{
    id: string;
    from: number;
    to: number;
}

export interface Graph{
    nodes: Node[],
    edges: Edge[]
}