package com.example.ETSystem.ingredientType;

import com.example.ETSystem.productData.SuppliedGood;
import com.example.ETSystem.util.Generated;
import jakarta.persistence.*;
import java.util.Objects;

@Entity
public class IngredientType {

    @Id
    @GeneratedValue
    @Column(name = "ingredient_type_id")
    private long id;

    @Column(unique = true)
    private String name;

    @Column(nullable = false)
    private boolean isAllergen;

    @Column(nullable = false)
    private boolean isVegan;

    @Column(nullable = false)
    private boolean isVegetarian;

    //Constructors
    public IngredientType() {}

    public IngredientType(String name, boolean isAllergen, boolean isVegetarian, boolean isVegan) {
        this.name = name.toLowerCase();
        this.isAllergen = isAllergen;
        this.isVegetarian = isVegetarian;
        this.isVegan = isVegan;
    }

    //Getters

    public @Generated long getId() {
        return id;
    }

    public @Generated String getName() {
        return name;
    }

    public @Generated boolean getIsAllergen() { return isAllergen; }

    public @Generated boolean getIsVegetarian() { return isVegetarian; }

    public @Generated boolean getIsVegan() { return isVegan; }


    //Setters

    public @Generated void setName(String name) { this.name = name; }

    public @Generated void setIsAllergen(boolean isAllergen) { this.isAllergen = isAllergen; }

    public @Generated void setIsVegan(boolean isVegan) {
       this.isVegan = isVegan;
    }

    public @Generated void setId(long id) {
        this.id = id;
    }

    public @Generated boolean isAllergen() {
        return isAllergen;
    }

    public @Generated void setAllergen(boolean allergen) {
        isAllergen = allergen;
    }

    public @Generated boolean isVegan() {
        return isVegan;
    }

    public @Generated void setVegan(boolean vegan) {
        isVegan = vegan;
    }

    public @Generated boolean isVegetarian() {
        return isVegetarian;
    }

    public @Generated void setVegetarian(boolean vegetarian) {
        isVegetarian = vegetarian;
    }

    //Utility
    @Override
    public @Generated int hashCode() {
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
        if (obj instanceof IngredientType && ((IngredientType) obj).getId() == this.id){
            return true;
        }
        return false;
    }

    public @Generated String toString(){
        return "IngredientType{" +
                "id=" + id +
                ", name='" + name + "'" +
                ", isAllergen=" + isAllergen +
                ", isVegan=" + isVegan +
                ", isVegetarian=" + isVegetarian +
                '}';
    }
}
