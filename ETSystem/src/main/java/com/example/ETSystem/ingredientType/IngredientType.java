package com.example.ETSystem.ingredientType;

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

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public boolean getIsAllergen() { return isAllergen; }

    public boolean getIsVegetarian() { return isVegetarian; }

    public boolean getIsVegan() { return isVegan; }


    //Setters

    public void setName(String name) { this.name = name; }

    public void setIsAllergen(boolean isAllergen) { this.isAllergen = isAllergen; }

    public void setIsVegan(boolean isVegan) {
       this.isVegan = isVegan;
    }

    public void setId(long id) {
        this.id = id;
    }

    public boolean isAllergen() {
        return isAllergen;
    }

    public void setAllergen(boolean allergen) {
        isAllergen = allergen;
    }

    public boolean isVegan() {
        return isVegan;
    }

    public void setVegan(boolean vegan) {
        isVegan = vegan;
    }

    public boolean isVegetarian() {
        return isVegetarian;
    }

    public void setVegetarian(boolean vegetarian) {
        isVegetarian = vegetarian;
    }

    //Utility
    @Override
    public int hashCode() {
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
        if (obj instanceof IngredientType && ((IngredientType) obj).getId() == this.id){
            return true;
        }
        return false;
    }

    public String toString(){
        return "IngredientType{" +
                "id=" + id +
                ", name='" + name + "'" +
                ", isAllergen=" + isAllergen +
                ", isVegan=" + isVegan +
                ", isVegetarian=" + isVegetarian +
                '}';
    }
}
