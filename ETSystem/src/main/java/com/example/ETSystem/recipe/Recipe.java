package com.example.ETSystem.recipe;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

import static jakarta.persistence.GenerationType.SEQUENCE;

@SuppressWarnings("JpaAttributeTypeInspection")
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

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<IngredientQuantity> ingredients;

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
