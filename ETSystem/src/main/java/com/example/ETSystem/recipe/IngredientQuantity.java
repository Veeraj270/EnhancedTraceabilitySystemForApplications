package com.example.ETSystem.recipe;

import jakarta.persistence.*;

@Embeddable
public class IngredientQuantity {

    @JoinColumn(name = "ingredient_id", referencedColumnName = "id")
    private Recipe ingredient_id;
    private int quantity;

}
