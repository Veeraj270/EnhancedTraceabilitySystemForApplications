package com.example.ETSystem.productData;

import jakarta.persistence.*;

@Table(name = "internalGTINDatabase")
@Entity(name = "ProductData")
public class SuppliedGood {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(unique = true)
    private String gtin;

    @Column
    private String label;

    @Column
    private IngredientType ingredientType;

    @Column
    private Float quantity;

    @Column
    private String units;

    @Column
    private String supplier;

    public SuppliedGood(){};

    public SuppliedGood(String gtin, String label, String ingredientType, Float quantity, String units, String supplier){
        this.gtin = gtin;
        this.label = label;
        this.ingredientType = ingredientType;
        this.quantity = quantity;
        this.units = units;
        this.supplier = supplier;
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
        return ingredientType;
    }

    //Setters
    public void setIngredientType(String ingredientType) {
        this.ingredientType = ingredientType;
    }

    public Float getQuantity() {
        return quantity;
    }

    public void setQuantity(Float quantity) {
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
