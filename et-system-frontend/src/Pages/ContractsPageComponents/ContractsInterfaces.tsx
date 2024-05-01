type ModalProps = {
    contract: Contract;
    onClose: () => void;
}

type FinalProduct = {
    id: number;
    label: string;
    cost: number;
    quantity: number;
};

type CustomerOrder = {
    id: number;
    client: string;
    date: string;
    deliveryDate: string;
    finalProducts: FinalProduct[];
};

type Contract = {
    id: number;
    client: string;
    duration: string;
    frequency: string;

    finalProducts: FinalProduct[];

    dates: Date[];

};



