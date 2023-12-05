package com.example.ETSystem.recipe;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

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

    public void addNewRecipe(Recipe recipe) {
        for (IngredientQuantity ingredientQuantity : recipe.getIngredients()){
            // Checks if the ingredients of the recipe exist, then adds the recipe
            if (!ingredientRepository.existsById(ingredientQuantity.getIngredient().getId())){
                throw new IllegalArgumentException("At least one of the ingredients of the new recipe does not exist");
            }
        }
        this.recipeRepository.save(recipe);
    }

    public List<Ingredient> getIngredients(){
        List<Ingredient> ingredients =  ingredientRepository.findAll();
        return ingredients;
    }

    public void addNewIngredient(Ingredient ingredient) {
        // Checks if the ingredient already exists ignoring letter case
            if (!ingredientRepository.findByLabelIgnoreCase(ingredient.getLabel()).isPresent()) {
                throw new IllegalArgumentException("Ingredient already exists");
            }
        this.ingredientRepository.save(ingredient);
    }
}

