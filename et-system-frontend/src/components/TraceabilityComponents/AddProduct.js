import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';

const ProductEdit = () => {
    const title = <h2>{'Add Product'}</h2>;


    const initialFormState = {
        id: '0',
        parentID: '',
        intermediariesID: [],
        label: '',
        maxQuantity: 0,
        currentQuantity: 0
    };
    const [product, setProduct] = useState(initialFormState);
    const navigate = useNavigate();

    useEffect(() => {
        if (product.id !== 'addproduct') {
            fetch(`/api/ product/${product.id}`)
                .then(response => response.json())
                .then(data => setProduct(data));
        }
    }, [product.id, setProduct]);

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
        //await fetch(`/api/group${product.id ? `/${product.id}` : ''}`, {


            await fetch(`http://localhost:8080/api/products/add`, {
                //method: (product.id) ? 'PUT' : 'POST'
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });
        setProduct(initialFormState);
        navigate('/products');
    }

    //const title = <h2>{product.id ? 'Edit Product' : 'Add Product'}</h2>;


    return (<div>
            <Container>
                {title}
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="id">ID</Label>
                        <Input type="text" name="id" id="id" value={''}
                               onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="parentID">ParentID</Label>
                        <Input type="text" name="parentID" id="parentID" value={product.parentID || ''}
                               onChange={handleChange} />
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
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/products">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    )
};

export default ProductEdit;