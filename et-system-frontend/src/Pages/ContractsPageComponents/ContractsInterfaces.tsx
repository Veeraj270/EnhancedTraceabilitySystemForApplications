

export interface FinalProduct {
    id: number;
    label: string;
    cost: number;
    quantity: number;
}

export interface CustomerOrder {
    id: number;
    client: string;
    date: string;
    deliveryDate: string;
    finalProducts: FinalProduct[];
}

export interface Contract{
    id: number;
    client: string;
    duration: string;
    frequency: string;

    finalProducts: FinalProduct[];

    dates: string[];

}

export interface Table1Row {
    id: number
    client: string
    duration: string
    frequency: string
}

export interface Table2Row{
    id: number
    label: string
    quantity: number
}

export interface Table3Row{
    contract: Contract
    date: string
}

