package com.example.ETSystem.recipe;

import jakarta.persistence.*;

@Embeddable
public class IngredientQuantity {

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "ingredient_id", referencedColumnName = "id")
    private Ingredient ingredient;

    private int quantity;

}
