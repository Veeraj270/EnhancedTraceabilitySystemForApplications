package com.example.ETSystem.recipe;

import jakarta.persistence.*;

import java.util.List;

import static jakarta.persistence.GenerationType.SEQUENCE;

@Table(
        name = "recipes"
)
@Entity(name = "Recipe")
public class Recipe {
    @Id
    @SequenceGenerator(
            name = "recipe_sequence",
            sequenceName = "recipe_sequence",
            allocationSize = 1 //How much the sequence will increment by
    )
    @GeneratedValue(
            strategy = SEQUENCE,
            generator = "recipe_sequence"
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

    // IngredientQuantity contains the quantity and the Ingredient
    // cascade = CascadeType.ALL makes sure when making a Recipe object,
    // the appropriate IngredientQuantity objects are made as well
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<IngredientQuantity> ingredients;

    public Recipe(String label, List<IngredientQuantity> ingredients) {
        this.label = label;
        this.ingredients = ingredients;
    }

    public Recipe() {

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

    public List<IngredientQuantity> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<IngredientQuantity> ingredients) {
        this.ingredients = ingredients;
    }
}
