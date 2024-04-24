import { useParams, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";

import EditProductForm from "./EditProductPageComponents/EditProductForm";



const EditProductPage = () => {
    const {id} = useParams();
    const [product, setProduct] = useState({
        id: '',
        parentID: '',
        intermediariesId: [],
        label: '',
        maxQuantity: 0,
        currentQuantity: 0

    })
    const navigate = useNavigate()


    useEffect(() => {
        fetch(`/api/products/fetch-product-by-id/${id}`)
            .then(response => response.json())
            .then(data => {
                console.log("Fetched data:", data);
                if (!data.intermediariesId) {
                    console.error("intermediariesID is missing from the fetched data", data);
                }
                setProduct(data);
            })
            .catch(error => console.error('Error:', error));
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target

        if (name === 'intermediariesId') {
            const intermediariesArray = value.split(', ').map(item => item.trim()) || [];
            setProduct({ ...product, [name]: intermediariesArray });
        } else {
            setProduct({ ...product, [name]: value });
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();


        await fetch(`/api/products/edit/${product.id}`, {
            //method: (product.id) ? 'PUT' : 'POST'
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })

        navigate('/products');
    }

    return (
        <div>
            <h2>Edit Product</h2>
            <EditProductForm product={product} handleChange={handleChange} handleSubmit={handleSubmit} />
        </div>
    )

};

export default EditProductPage