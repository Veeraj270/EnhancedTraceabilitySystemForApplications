package com.example.ETSystem.recipe;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@SuppressWarnings("JpaAttributeTypeInspection")
@Table(
        name = "recipes"
)
@Entity(name = "Recipe")
public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

}
