package com.example.ETSystem.ProductData.Exceptions;

public class DuplicateGTINException extends Exception{
    public DuplicateGTINException(String gtin){
        super("Duplicates of barcode within GTINRepository: " + gtin);
    }
}
