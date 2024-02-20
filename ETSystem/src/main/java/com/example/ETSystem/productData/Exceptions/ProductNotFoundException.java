package com.example.ETSystem.productData.Exceptions;

public class ProductNotFoundException extends RuntimeException {
    public ProductNotFoundException(String gtin){
        super("Product not found with GTIN: " + gtin);
    }
}
