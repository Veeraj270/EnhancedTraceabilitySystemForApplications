export interface Table1Row {
    id: number
    client: string
    date: string
    dueDate: string
}

export interface Table2Row{
    id: number
    quantity: number
    label: string
}

export interface Table3Row{
    id: number
    label: string
    quantity: number
    gtin: string
}