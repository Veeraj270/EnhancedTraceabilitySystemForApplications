package com.example.ETSystem.recipe;

import jakarta.persistence.*;

@Embeddable
public class IngredientQuantity {

    @OneToOne
    @JoinColumn(name = "ingredient_id", referencedColumnName = "id")
    private Ingredient ingredient;

    @Column
    private Integer quantity;

}
