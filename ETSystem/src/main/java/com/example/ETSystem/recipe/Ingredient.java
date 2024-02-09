package com.example.ETSystem.recipe;

import jakarta.persistence.*;

import java.util.Objects;

import static jakarta.persistence.GenerationType.SEQUENCE;

@Entity
public class Ingredient{

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
    @Column(
            name = "id",
            updatable = false,
            nullable = false
    )
    private Long id;

    @Column(
            name = "label",
            nullable = false,
            columnDefinition = "TEXT"
    )
    private String label;

    @Column(
            name = "allergen",
            nullable = false
    )
    private boolean allergen;

    @Column(
            name = "vegan",
            nullable = false
    )
    private boolean vegan;

    @Column(
            name = "vegetarian",
            nullable = false
    )
    private boolean vegetarian;

    public Ingredient(String label, boolean allergen, boolean vegetarian, boolean vegan) {
        this.label = label.toLowerCase();
        this.allergen = allergen;
    }

    public Ingredient() {
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        return this == o || Objects.equals(((Ingredient) o).getLabel(), this.label);
    }

    @Override
    public int hashCode() {
        return Objects.hash(label);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public boolean isAllergen() { return allergen; }

    public void setAllergen(boolean allergen) { this.allergen = allergen; }

    public boolean isVegan() { return vegan; }

    public void setVegan(boolean vegan) {
        if(vegan){ this.vegetarian = true; }
        this.vegan = vegan;
    }

    public boolean isVegetarian() { return vegetarian; }

    public void setVegetarian(boolean vegetarian) { this.vegetarian = vegetarian; }
}
