import FinalProductComponent from "./FinalProductPageComponents/FinalProductComponent";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import React from "react";


const FinalProductPage = () => {

    const {orderId} = useParams<{ orderId : string}>();
    const [customerOrder, setCustomerOrder] = useState<CustomerOrder>();


    type CustomerOrder = {
        id: number;
        client: string;
        date: string;
    };


    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            try {
                const response = await fetch(`/api/customerorders/fetch-by-id/${orderId}`);
                console.log("Fetch Request!")
                if (!response.ok) {
                    throw new Error("Fetch customerOrders request was not ok");
                }
                const customerOrder: CustomerOrder = await response.json();
                setCustomerOrder(customerOrder);
                console.log(customerOrder)
            } catch (error) {
                console.error("Error occurred within fetchData(): ", error);
            }
        };

        fetchData();
    }, [orderId]);


    return (
        <div className='customer-orders-page'>
            <h1>Customer Order : {orderId}</h1>

            {customerOrder ? (
                <>

                    <h2>Client: {customerOrder.client}</h2>
                    <h2>Date: {customerOrder.date}</h2>
                    <FinalProductComponent/>
                </>
            ) : (
                    <p>Loading</p>
                )}
        </div>
    )
}

export default FinalProductPage