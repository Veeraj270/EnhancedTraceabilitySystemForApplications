package com.example.ETSystem.finalProducts;

import com.example.ETSystem.recipe.Recipe;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import static jakarta.persistence.GenerationType.SEQUENCE;

@Table(name = "finalProducts")
@Entity(name = "FinalProducts")
public class FinalProduct {
    @Id
    @JsonProperty
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


    @ManyToOne
    @JoinColumn(
            name="recipe",
            nullable = false
    )
    private Recipe recipe;

    @Column(
            name = "quantity",
            nullable = false
    )
    private int quantity;


    public FinalProduct() {

    }

    public FinalProduct(String label, float cost, Recipe recipe, int quantity) {
        this.label = label;
        this.cost = cost;
        this.recipe = recipe;
        this.quantity = quantity;
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

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
