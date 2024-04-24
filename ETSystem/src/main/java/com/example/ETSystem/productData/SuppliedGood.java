package com.example.ETSystem.productData;

import com.example.ETSystem.ingredientType.IngredientType;
import com.example.ETSystem.suppliers.Supplier;
import com.example.ETSystem.util.Generated;
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

    @Column
    private float weight;

    @Transient //Not stored in database but attribute used in AutoOrderService
    private Supplier supplier;

    public SuppliedGood(){};

    public SuppliedGood(String gtin, String label, IngredientType ingredientType, float quantity, String units, int price, float weight){
        this.gtin = gtin;
        this.label = label;
        this.ingredientType = ingredientType;
        this.quantity = quantity;
        this.units = units;
        this.price = price;
        this.weight = weight;
    }

    public SuppliedGood(String gtin, String label, IngredientType ingredientType, float quantity, String units, int price){
        this.gtin = gtin;
        this.label = label;
        this.ingredientType = ingredientType;
        this.quantity = quantity;
        this.units = units;
        this.price = price;
    }

    //Getters
    public @Generated Long getId() {
        return id;
    }

    public @Generated String getGtin() {
        return gtin;
    }

    public @Generated String getUnits() {
        return units;
    }

    public @Generated String getLabel() {
        return label;
    }

    public @Generated float getQuantity() {
        return quantity;
    }

    public @Generated IngredientType getIngredientType() {
        return ingredientType;
    }

    public @Generated int getPrice(){
        return this.price;
    }

    public @Generated float getWeight(){ return this.weight; }

    public @Generated Supplier getSupplier(){
        return this.supplier;
    }


    //Setters
    public @Generated void setId(Long id){
        this.id = id;
    }
    
    public @Generated void setGtin(String gtin) {
        this.gtin = gtin;
    }

    public @Generated void setLabel(String label) {
        this.label = label;
    }

    public @Generated void setIngredientType(IngredientType ingredientType) {
        this.ingredientType = ingredientType;
    }

    public @Generated void setQuantity(float quantity) {
        this.quantity = quantity;
    }

    public @Generated void setUnits(String units) {
        this.units = units;
    }

    public @Generated void setPrice(int price){
        this.price = price;
    }

    public @Generated void setWeight(float weight){ this.weight = weight; }

    public @Generated void setSupplier(Supplier supplier){
        this.supplier = supplier;
    }


    //Utility
    public @Generated String toString(){
        return "SuppliedGood{" +
                "id=" + id +
                ", label=" + label +
                ", price=" + price +
                ", quantity=" + quantity + units +
                ", ingredientType=" + ingredientType +
                '}';
    }

    @Override
    public @Generated int hashCode(){
        return Objects.hash(id);
    }

    @Override
    public @Generated boolean equals(Object obj){
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
