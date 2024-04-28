package com.example.ETSystem.recipe;

import com.example.ETSystem.ingredientType.IngredientType;
import com.example.ETSystem.util.Generated;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

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
            strategy = GenerationType.SEQUENCE,
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

    @OneToMany()
    private Set<IngredientQuantity> ingredientQuantities;

    @ElementCollection(fetch = FetchType.EAGER)
    private Set<String> allergens;

    @Column(
            name = "vegan",
            nullable = false
    )
    private boolean vegan;

    @Column(
            name = "vegetarian",
            nullable = false
    )
    private boolean vegetarian;

    @Column(
            name = "description",
            nullable = true
    )
    private String description;

    public Recipe(String label, Set<IngredientQuantity> ingredientQuantities, String description) {
        this.label = label.trim();
        this.description = description;
        // Throws and exception if there are for example 2 milk ingredients
        if(ingredientQuantities.stream().count() != ingredientQuantities.stream().map(x -> x.getIngredientType()).distinct().count()){
            throw new IllegalArgumentException("You can't have 2 separate identical ingredients in your recipe");
        }
        this.ingredientQuantities = ingredientQuantities;
        this.allergens = ingredientQuantities.stream().
                map(IngredientQuantity::getIngredientType)
                .flatMap(x -> x.getAllergens().stream())
                .collect(Collectors.toSet());
        this.vegan = ingredientQuantities.stream()
                .allMatch(x -> x.getIngredientType().getIsVegan());
        this.vegetarian = ingredientQuantities.stream()
                .allMatch(x -> x.getIngredientType().getIsVegetarian());
    }
    
    public Recipe(String label, Set<IngredientQuantity> ingredientQuantities) {
        this(label, ingredientQuantities, null);
    }

    public Recipe() {

    }

    @Override
    public @Generated boolean equals(Object o) {
        if(this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Recipe that = (Recipe) o;
        return Objects.equals(this.getLabel(), that.getLabel()) &&
                new HashSet<>(this.getIngredientQuantities()).equals(new HashSet<>(that.getIngredientQuantities()));
    }

    @Override
    public @Generated int hashCode() {
        return Objects.hash(label, new HashSet<>(ingredientQuantities));
    }

    public @Generated Long getId() {
        return id;
    }

    public @Generated void setId(Long id) {
        this.id = id;
    }

    public @Generated String getLabel() {
        return label;
    }

    public @Generated void setLabel(String label) {
        this.label = label.trim();
    }

    public @Generated Set<IngredientQuantity> getIngredientQuantities() {
        return ingredientQuantities;
    }
    
    public void setIngredientQuantities(Set<IngredientQuantity> ingredients) {
        this.allergens = ingredients.stream().
                map(IngredientQuantity::getIngredientType)
                .flatMap(x -> x.getAllergens().stream())
                .collect(Collectors.toSet());
        this.vegan = ingredients.stream()
                .allMatch(x -> x.getIngredientType().getIsVegan());
        this.vegetarian = ingredients.stream()
                .allMatch(x -> x.getIngredientType().getIsVegetarian());
        this.ingredientQuantities = ingredients;
    }
    
    public @Generated boolean isVegan() {
        return this.vegan;
    }
    
    public @Generated boolean isVegetarian() {
        return this.vegetarian;
    }
    
    public @Generated Set<String> getAllergens() {
        return allergens;
    }

    public @Generated void setAllergens(Set<String> allergens){
        this.allergens = allergens;
    }

    public @Generated String getDescription() {
        return description;
    }

    public @Generated void setDescription(String description) {
        this.description = description;
    }
}
