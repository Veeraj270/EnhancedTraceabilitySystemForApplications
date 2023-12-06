import BasicTable from '../components/Table/BasicTable'
import AddProduct from "../components/TraceabilityComponents/AddProduct";
import {Link} from "react-router-dom";
import {Button} from "reactstrap";
import React from "react";

const ProductsPage = () => {
    return (
        <div className='page'>
            <h1>Products</h1>
            <Button color="primary" tag={Link} to="/products/add">Add Product</Button>
            <h3>All Products:</h3>
            <BasicTable/>
        </div>
    )
}

export default ProductsPage