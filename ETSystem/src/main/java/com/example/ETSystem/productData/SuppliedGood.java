package com.example.ETSystem.productData;

import com.example.ETSystem.ingredientType.IngredientType;
import jakarta.persistence.*;

import java.util.Objects;

@Entity
public class SuppliedGood {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(unique = true)
    private String gtin;

    @Column
    private String label;

    @ManyToOne
    private IngredientType ingredientType;

    @Column
    private float quantity;

    @Column
    private String units;

    @Column // In Pence
    private int price;

    public SuppliedGood(){};

    public SuppliedGood(String gtin, String label, IngredientType ingredientType, float quantity, String units){
        this.gtin = gtin;
        this.label = label;
        this.ingredientType = ingredientType;
        this.quantity = quantity;
        this.units = units;
    }

    //Getters
    public Long getId() {
        return id;
    }

    public String getGtin() {
        return gtin;
    }

    public String getUnits() {
        return units;
    }

    public String getLabel() {
        return label;
    }

    public float getQuantity() {
        return quantity;
    }

    public IngredientType getIngredientType() {
        return ingredientType;
    }

    //Setters
    public void setGtin(String gtin) {
        this.gtin = gtin;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public void setIngredientType(IngredientType ingredientType) {
        this.ingredientType = ingredientType;
    }

    public void setQuantity(float quantity) {
        this.quantity = quantity;
    }

    public void setUnits(String units) {
        this.units = units;
    }


    //Utility
    public String toString(){
        return "SuppliedGood{" +
                "id=" + id +
                ", label=" + label +
                ", price=" + price +
                ", quantity=" + quantity + units +
                ", ingredientType=" + ingredientType +
                '}';
    }

    @Override
    public int hashCode(){
        return Objects.hash(id);
    }

    @Override
    public boolean equals(Object obj){
        if (this == obj){
            return true;
        }
        if (obj == null){
            return false;
        }
        if (obj instanceof SuppliedGood && ((SuppliedGood) obj).getId().equals(this.id)){
            return true;
        }
        return false;
    }
}
