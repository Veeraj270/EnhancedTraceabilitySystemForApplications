package com.example.ETSystem.recipe;

import com.example.ETSystem.ingredientType.IngredientType;
import com.example.ETSystem.util.Generated;
import jakarta.persistence.*;

import java.util.Objects;

@Entity
public class IngredientQuantity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(
            updatable = false,
            nullable = false
    )
    private Long id;

    // CascadeType.MERGE connects the object with the appropriate Ingredient
    // One Ingredient object can be merged with many IngredientQuantity objects
    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    private IngredientType ingredientType;

    @Column
    private float quantity;

    public IngredientQuantity(){};

    public IngredientQuantity(IngredientType type, float quantity){
        this.ingredientType = type;
        this.quantity = quantity;
    };

    @Override
    public @Generated boolean equals(Object o) {
        if(this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        IngredientQuantity that = (IngredientQuantity) o;
        return Objects.equals(this.getQuantity(), that.getQuantity()) && Objects.equals(this.getIngredientType(), that.getIngredientType()) && this.getId() == that.getId();
    }

    @Override
    public @Generated int hashCode() {
        return Objects.hash(ingredientType, quantity);
    }

    public @Generated Long getId() {
        return id;
    }

    public @Generated void setId(Long id) {
        this.id = id;
    }

    public @Generated IngredientType getIngredientType() {
        return ingredientType;
    }

    public @Generated void setIngredient(IngredientType ingredientType) { this.ingredientType = ingredientType; }

    public @Generated float getQuantity() { return quantity; }

    public @Generated void setQuantity(float quantity) {
        this.quantity = quantity;
    }
}
