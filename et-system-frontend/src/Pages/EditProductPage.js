import {Link, useParams, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";

import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";



const EditProductPage = () => {
    const title = <h2>{'Edit Product'}</h2>;



    const {id} = useParams();
    const [product, setProduct] = useState({
        id: '',
        parentID: '',
        intermediariesID: [],
        label: '',
        maxQuantity: 0,
        currentQuantity: 0

    })
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:8080/api/products/fetch-product-by-id/${id}`)
            .then(response => response.json())
            .then(data => setProduct(data))
            .catch(error => console.error('Error:', error));
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target

        if (name === 'intermediariesID') {
            const intermediariesArray = value.split(', ').map(item => item.trim()) || [];
            setProduct({ ...product, [name]: intermediariesArray });
        } else {
            setProduct({ ...product, [name]: value });
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();


        await fetch(`http://localhost:8080/api/products/add`, {
            //method: (product.id) ? 'PUT' : 'POST'
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });

        navigate('/products');
    }

    return (<div>
            <Container>
                {title}
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="id">ID</Label>
                        <Input type="text" name="id" id="id" value={product.id || ''} onChange={handleChange}/>
                    </FormGroup>

                    <FormGroup>
                        <Label for="parentID">parentID</Label>
                        <Input type="text" name="parentID" id="parentID" value={product.parentID || ''} onChange={handleChange}/>
                    </FormGroup>




                    <FormGroup>
                        <Label for="label">Label</Label>
                        <Input type="text" name="label" id="label" value={product.label || ''}
                               onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="maxQuantity">Max Quantity</Label>
                        <Input type="number" name="maxQuantity" id="maxQuantity" value={product.maxQuantity || 0}
                               onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="currentQuantity">Current Quantity</Label>
                        <Input type="number" name="currentQuantity" id="currentQuantity" value={product.currentQuantity || 0}
                               onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="intermediariesID">Intermediaries ID</Label>
                        <Input
                            type="text"
                            name="intermediariesID"
                            id="intermediariesID"
                            value={product.intermediariesID.join(', ')}
                            onChange={handleChange}
                        />
                    </FormGroup>



                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/products">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    )

};

export default EditProductPage