import React, { useState } from 'react';

import "./ContractsInterfaces"

const ContractsModal: React.FC<ModalProps> = ({ contract, onClose }) => {
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

        const contractWithoutDate : Contract = {
            id: contract.id,
            client: contract.client,
            duration: contract.duration,
            frequency: contract.frequency,
            finalProducts: contract.finalProducts,
            dates: updatedDates
        };

        console.log(JSON.stringify(customerOrder));
        try {
            const response = await fetch('/api/customerorders/add', {
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

        console.log(JSON.stringify(contractWithoutDate));
        try {
            const response = await fetch('/api/contracts/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contractWithoutDate),
            });
            if (!response.ok) throw new Error('Failed update contract');
            console.log('Contract updated');
        } catch (error) {
            console.error(error);
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
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default ContractsModal;
