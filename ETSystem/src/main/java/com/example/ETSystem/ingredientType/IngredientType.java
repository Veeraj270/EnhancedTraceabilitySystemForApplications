package com.example.ETSystem.ingredientType;

import com.example.ETSystem.productData.SuppliedGood;
import com.example.ETSystem.util.Generated;
import jakarta.persistence.*;
import org.hibernate.annotations.Fetch;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
public class IngredientType {

    @Id
    @GeneratedValue
    @Column(name = "ingredient_type_id")
    private long id;

    @Column(unique = true)
    private String name;

    @Column(nullable = false)
    private boolean isVegan;

    @Column(nullable = false)
    private boolean isVegetarian;

    @ElementCollection
    private Set<String> allergens = new HashSet<>();

    //Constructors
    public IngredientType() {}

    public IngredientType(String name, boolean isVegetarian, boolean isVegan, Set<String> allergens) {
        this.name = name.toLowerCase();
        this.allergens = allergens;
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

    public @Generated boolean getIsVegetarian() {
        return isVegetarian;
    }
    
    public @Generated boolean getIsVegan() {
        return isVegan;
    }
    
    public @Generated Set<String> getAllergens() {
        return allergens;
    }

    //Setters
    
    public @Generated void setId(long id) {
        this.id = id;
    }
    
    public @Generated void setName(String name) {
        this.name = name;
    }

    public @Generated void setIsVegan(boolean vegan) {
        isVegan = vegan;
    }
    
    public @Generated void setIsVegetarian(boolean vegetarian) {
        isVegetarian = vegetarian;
    }
    
    public @Generated void setAllergens(Set<String> allergens) {
        this.allergens = allergens;
    }

    //Utility
    @Override
    public @Generated int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public @Generated boolean equals(Object obj){
	    return this == obj || obj instanceof IngredientType it && it.getId() == this.id && it.getName().equals(this.name);
    }

    public @Generated String toString(){
        return "IngredientType{" +
                "id=" + id +
                ", name='" + name + "'" +
                ", allergens=" + allergens +
                ", isVegan=" + isVegan +
                ", isVegetarian=" + isVegetarian +
                '}';
    }
}
