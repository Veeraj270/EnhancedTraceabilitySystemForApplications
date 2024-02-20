package com.example.ETSystem.ingredientType;

import com.example.ETSystem.productData.SuppliedGood;
import jakarta.persistence.*;

import java.util.Objects;

import static jakarta.persistence.GenerationType.SEQUENCE;

@Entity
public class IngredientType {

    @Id
    @SequenceGenerator(
            name = "ingredient_sequence",
            sequenceName = "ingredient_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = SEQUENCE,
            generator = "ingredient_sequence"
    )
    @Column
    private Long id;

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

    public Long getId() {
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

    public void setIsAllergen(boolean allergen) { this.isAllergen = allergen; }

    public void setIsVegan(boolean vegan) {
        if (vegan) { this.isVegetarian = true; }
        this.isVegan = vegan;
    }

    //Utility
    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public boolean equals(Object obj){
        //return obj instanceof com.example.ETSystem.productData.SuppliedGood other && other.id == id;
        if (this == obj){
            return true;
        }
        if (obj == null){
            return false;
        }
        if (obj instanceof IngredientType && ((IngredientType) obj).getId().equals(this.id)){
            return true;
        }
        return false;
    }


    public String toString(){
        return "IngredientType{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", isAllergen=" + isAllergen +
                ", isVegan=" + isVegan +
                ", isVegetarian=" + isVegetarian +
                '}';
    }
}
