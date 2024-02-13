package com.example.ETSystem.finalProducts;

import com.example.ETSystem.recipe.Recipe;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;

import static jakarta.persistence.GenerationType.SEQUENCE;

public class FinalProduct {
    @Id
    @SequenceGenerator(
            name = "FinalProduct_sequence",
            sequenceName = "FinalProduct_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = SEQUENCE,
            generator = "FinalProduct_sequence"
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
            name="cost",
            nullable = false
    )
    private float cost;

    @Column(
            name="recipe",
            nullable = false
    )
    private Recipe recipe;

    public FinalProduct(String label, float cost, Recipe recipe) {
        this.label = label;
        this.cost = cost;
        this.recipe = recipe;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public float getCost() {
        return cost;
    }

    public void setCost(float cost) {
        this.cost = cost;
    }

    public Recipe getRecipe() {
        return recipe;
    }

    public void setRecipe(Recipe recipe) {
        this.recipe = recipe;
    }
}
