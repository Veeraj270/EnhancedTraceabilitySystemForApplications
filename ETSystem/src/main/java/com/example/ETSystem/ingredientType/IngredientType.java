package com.example.ETSystem.ingredients;

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

    @Column
    private String name;

    @Column(nullable = false)
    private boolean isAllergen;

    @Column(nullable = false)
    private boolean isVegan;

    @Column(nullable = false)
    private boolean isVegetarian;

    //Constructors
    public IngredientType() {}

    public IngredientType(String label, boolean isAllergen, boolean isVegetarian, boolean isVegan) {
        this.name = label.toLowerCase();
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

    public boolean isAllergen() { return isAllergen; }

    public boolean isVegan() { return isVegan; }


    //Setters

    public void setName(String name) { this.name = name; }

    public void setAllergen(boolean allergen) { this.isAllergen = allergen; }

    public void setVegan(boolean vegan) {
        if (vegan) { this.isVegetarian = true; }
        this.isVegan = vegan;
    }

    public boolean isVegetarian() { return isVegetarian; }

    //Utility
    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        return this == o || Objects.equals(((IngredientType) o).getName(), this.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    public String toString(){
        return "IngredientType{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", isAllergen=" + isAllergen +
                ", isVegan=" + isVegan +
                ", isVegetarian" + isVegetarian +
                '}';
    }
}
