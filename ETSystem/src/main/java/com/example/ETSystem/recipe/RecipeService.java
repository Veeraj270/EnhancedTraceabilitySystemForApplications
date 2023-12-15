package com.example.ETSystem.recipe;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class RecipeService {

    private final RecipeRepository recipeRepository;

    private final IngredientRepository ingredientRepository;

    private final IngredientQuantityRepository ingredientQuantityRepository;

    @Autowired
    public RecipeService(RecipeRepository recipeRepository, IngredientRepository ingredientRepository, IngredientQuantityRepository ingredientQuantityRepository){
        this.recipeRepository = recipeRepository;
        this.ingredientRepository = ingredientRepository;
        this.ingredientQuantityRepository = ingredientQuantityRepository;
    }

    public List<Recipe> getRecipes(){
        List<Recipe> recipes =  recipeRepository.findAll();
        return recipes;
    }

    @Transactional
    public Recipe addNewRecipe(Recipe recipe) {
        for (IngredientQuantity ingredientQuantity : recipe.getIngredients()){
            // Checks if the ingredients of the recipe exist, then adds the recipe
            Optional<Ingredient> optionalIngredient = ingredientRepository.findByLabel(ingredientQuantity.getIngredient().getLabel());
            if (optionalIngredient.isEmpty()){
                throw new IllegalArgumentException("At least one of the ingredients of the new recipe does not exist");
            }
        }
        this.recipeRepository.save(recipe);
        return recipe;
    }

    public List<Ingredient> getIngredients(){
        List<Ingredient> ingredients =  ingredientRepository.findAll();
        return ingredients;
    }

    @Transactional
    public Ingredient addNewIngredient(Ingredient ingredient) {
        // Checks if the ingredient already exists ignoring letter case
            if (ingredientRepository.findByLabel(ingredient.getLabel()).isPresent()) {
                throw new IllegalArgumentException("Ingredient already exists");
            }
        this.ingredientRepository.save(ingredient);
            return ingredient;
    }
}

