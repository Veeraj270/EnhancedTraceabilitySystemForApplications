import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import {Link} from "react-router-dom";
import React from "react";
import './EditProductForm.css'

const EditProductForm = ({ product, handleChange, handleSubmit}) => {
    return(
    <div className="edit-product-form">
        <Container>
            <Form onSubmit={handleSubmit}>

                <FormGroup>
                    <Label for="parentID">parentID</Label>
                    <Input type="text" name="parentID" id="parentID" value={product.parentID} onChange={handleChange}/>
                </FormGroup>


                <FormGroup>
                    <Label for="label">Label</Label>
                    <Input type="text" name="label" id="label" value={product.label}
                           onChange={handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="maxQuantity">Max Quantity</Label>
                    <Input type="number" name="maxQuantity" id="maxQuantity" value={product.maxQuantity}
                           onChange={handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="currentQuantity">Current Quantity</Label>
                    <Input type="number" name="currentQuantity" id="currentQuantity" value={product.currentQuantity}
                           onChange={handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="intermediariesId">Intermediaries ID</Label>
                    <Input
                        type="text"
                        name="intermediariesId"
                        id="intermediariesId"
                        value={product.intermediariesId.join(', ') ?? []}
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
    );
};

export default EditProductForm;