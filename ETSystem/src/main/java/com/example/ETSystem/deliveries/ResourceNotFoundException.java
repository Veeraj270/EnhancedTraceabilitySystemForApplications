package com.example.ETSystem.deliveries;

public class ResourceNotFoundException extends Throwable{
    private Long id;
    private String status;

    public ResourceNotFoundException(Long id, String status){
        this.id = id;
        this.status = status;
    }
}
