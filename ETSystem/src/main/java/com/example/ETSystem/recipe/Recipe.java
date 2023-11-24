package com.example.ETSystem.recipe;

import jakarta.persistence.*;

import java.util.List;

@Table(
        name = "recipe"
)
public class Recipe {
    @Id
    @SequenceGenerator(
            name = "recipe_sequence",
            sequenceName = "recipe_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "recipe_sequence"
    )
    @Column(
            name = "label",
            nullable = false,
            columnDefinition = "TEXT"
    )
    private String label;

    @Column(name = "ingredients")
    @ElementCollection(targetClass = Long.class, fetch = FetchType.EAGER)
    @CollectionTable(name = "recipe_ingredients", joinColumns = @JoinColumn(name = "recipe_id"))
    private List<IngredientQuantity> ingredients;


}
