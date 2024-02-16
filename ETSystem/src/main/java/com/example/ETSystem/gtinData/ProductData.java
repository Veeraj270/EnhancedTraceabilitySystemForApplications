package com.example.ETSystem.gtinData;

import jakarta.persistence.*;

import java.util.ArrayList;

@Table(name = "internalGTINDatabase")
@Entity(name = "ProductData")
public class ProductData {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column
    private String gtin;

    @Column
    private String label;

    @Column
    private String IngredientType;

    @Column
    private Integer quantity;

    @Column
    private String units;

    @Column
    private String supplier;

    public ProductData(){};

    //Mock Data Generation Methods
    public void GenerateMockData(){

    }


    //Getters
    public Long getId() {
        return id;
    }

    public String getGtin() {
        return gtin;
    }

    public void setGtin(String gtin) {
        this.gtin = gtin;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getIngredientType() {
        return IngredientType;
    }

    //Setters
    public void setIngredientType(String ingredientType) {
        IngredientType = ingredientType;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getUnits() {
        return units;
    }

    public void setUnits(String units) {
        this.units = units;
    }

    public String getSupplier() {
        return supplier;
    }

    public void setSupplier(String supplier) {
        this.supplier = supplier;
    }
}
