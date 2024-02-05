package com.example.ETSystem.recipe;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.List;
import java.util.Objects;

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
            allocationSize = 1
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

    // cascade = CascadeType.ALL makes sure when saving/deleting/... a Recipe object into the db,
    // the appropriate IngredientQuantity objects are saved/deleted/... as well
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<IngredientQuantity> ingredients;

    public Recipe(String label, List<IngredientQuantity> ingredients) {
        this.label = label;
        this.ingredients = ingredients;
    }

    public Recipe() {

    }

    @Override
    public boolean equals(Object o) {
        if(this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Recipe that = (Recipe) o;
        return Objects.equals(this.getLabel(), that.getLabel()) &&
                new HashSet<>(this.getIngredients()).equals(new HashSet<>(that.getIngredients()));
    }

    @Override
    public int hashCode() {
        return Objects.hash(label, new HashSet<>(ingredients));
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
