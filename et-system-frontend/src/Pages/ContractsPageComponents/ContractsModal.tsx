import React, { useState } from 'react';

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

const ContractsModal = ({ contract }: { contract: Contract }) => {
    const [dates, setDates] = useState(contract.dates);



    const removeDateAndAddOrder = async (date: Date) => {
        const updatedDates = dates.filter(d => d !== date);
        setDates(updatedDates); // takes out dates that have already been created


        const customerOrder: CustomerOrder = {
            id: 0,
            client: contract.client,
            date: new Date().toISOString(),
            deliveryDate: new Date(date).toISOString(),
            finalProducts: contract.finalProducts
        };

        console.log(JSON.stringify(customerOrder));
        try {
            const response = await fetch('http://localhost:8080/api/customerorders/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(customerOrder),
            });
            if (!response.ok) throw new Error('Failed to add customer order');
            console.log('Order added');
        } catch (error) {
            console.error('Failed to add customer order:', error);
        }
    };

    return (
        <div className="modal">
            <h2>Contract Details for {contract.client}</h2>
            <div>
                <h3>Final Products:</h3>
                <ul>
                    { contract.finalProducts ? contract.finalProducts.map((product, index) => (
                        <li key={index}>{product.label}</li>
                    )) : <li>No Products</li>}
                </ul>
            </div>
            <table>
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {dates.map((date, index) => (
                    <tr key={index}>
                        <td>{new Date(date).toLocaleDateString()}</td>
                        <td>
                            <button onClick={() => removeDateAndAddOrder(date)}>
                                Order
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button onClick={() => console.log('Modal closed')}>Close</button>
        </div>
    );
};

export default ContractsModal;
