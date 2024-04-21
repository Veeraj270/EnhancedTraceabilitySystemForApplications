package com.example.ETSystem.ingredientType;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import static jakarta.persistence.GenerationType.SEQUENCE;

@Entity
public class IngredientType {

    @Id
    @GeneratedValue
    @Column
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

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public boolean getIsVegetarian() {
        return isVegetarian;
    }
    
    public boolean getIsVegan() {
        return isVegan;
    }
    
    public Set<String> getAllergens() {
        return allergens;
    }

    //Setters
    
    public void setId(long id) {
        this.id = id;
    }
    
    public void setName(String name) {
        this.name = name;
    }

    public void setIsVegan(boolean vegan) {
        isVegan = vegan;
    }
    
    public void setIsVegetarian(boolean vegetarian) {
        isVegetarian = vegetarian;
    }
    
    public void setAllergens(Set<String> allergens) {
        this.allergens = allergens;
    }

    //Utility
    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public boolean equals(Object obj){
	    return this == obj || obj instanceof IngredientType it && it.getId() == this.id;
    }

    public String toString(){
        return "IngredientType{" +
                "id=" + id +
                ", name='" + name + "'" +
                ", allergens=" + allergens +
                ", isVegan=" + isVegan +
                ", isVegetarian=" + isVegetarian +
                '}';
    }
}
