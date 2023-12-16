package com.example.ETSystem.recipe;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Objects;

@Entity
public class IngredientQuantity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(
            name = "id",
            updatable = false,
            nullable = false
    )
    private Long id;

    // CascadeType.MERGE connects the object with the appropriate Ingredient
    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    private Ingredient ingredient;

    @Column
    private Integer quantity;

    @Override
    public boolean equals(Object o) {
        if(this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        IngredientQuantity that = (IngredientQuantity) o;
        return Objects.equals(this.getQuantity(), that.getQuantity()) && Objects.equals(this.getIngredient(), that.getIngredient());
    }

    @Override
    public int hashCode() {
        return Objects.hash(ingredient, quantity);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Ingredient getIngredient() {
        return ingredient;
    }

    public void setIngredient(Ingredient ingredient) { this.ingredient = ingredient; }

    public Integer getQuantity() { return quantity; }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
