package com.example.ETSystem.recipe;

import com.example.ETSystem.ingredientType.IngredientType;
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
            Optional<IngredientType> optionalIngredient = ingredientRepository.findByName(ingredientQuantity.getIngredientType().getName());
            if (optionalIngredient.isEmpty()){
                throw new IllegalArgumentException("At least one of the ingredients of the new recipe does not exist.");
            }
        }
        if (recipeRepository.findByLabel(recipe.getLabel()).isPresent()){
            throw new IllegalArgumentException("A recipe with an identical label already exists.");
        }
        this.recipeRepository.save(recipe);
        return recipe;
    }

    public List<IngredientType> getIngredients(){
        List<IngredientType> ingredientTypes =  ingredientRepository.findAll();
        return ingredientTypes;
    }

    @Transactional
    public IngredientType addNewIngredient(IngredientType ingredientType) {
            if (ingredientRepository.findByName(ingredientType.getName()).isPresent()) {
                throw new IllegalArgumentException("Ingredient already exists.");
            }
        this.ingredientRepository.save(ingredientType);
            return ingredientType;
    }
}

