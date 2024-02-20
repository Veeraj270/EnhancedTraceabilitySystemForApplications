package com.example.ETSystem.productData.Exceptions;

public class DuplicateGTINException extends Exception{
    public DuplicateGTINException(String gtin){
        super("Duplicates of barcode within GTINRepository: " + gtin);
    }
}
