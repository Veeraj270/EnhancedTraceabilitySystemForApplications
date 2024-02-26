package com.example.ETSystem.recipe;

import com.example.ETSystem.ingredientType.IngredientType;
import com.example.ETSystem.ingredientType.IngredientTypeRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class RecipeService {

    private final RecipeRepository recipeRepository;

    private final IngredientTypeRepository ingredientTypeRepository;

    private final IngredientQuantityRepository ingredientQuantityRepository;

    @Autowired
    public RecipeService(RecipeRepository recipeRepository,
                         IngredientTypeRepository ingredientRepository,
                         IngredientQuantityRepository ingredientQuantityRepository){
        this.recipeRepository = recipeRepository;
        this.ingredientTypeRepository = ingredientRepository;
        this.ingredientQuantityRepository = ingredientQuantityRepository;
    }

    public List<Recipe> getRecipes(){
        List<Recipe> recipes =  recipeRepository.findAll();
        return recipes;
    }

    @Transactional
    public Recipe addNewRecipe(Recipe recipe) {
        //Need

        for (IngredientQuantity ingredientQuantity : recipe.getIngredientQuantities()){
            // Checks if the ingredients of the recipe exist, then adds the recipe
            List<IngredientType> optionalIngredient = ingredientTypeRepository.findByName(ingredientQuantity.getIngredientType().getName());
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

    //Should be handled by the IngredientTypeService or IngredientTypeAPI
    /*
    public List<IngredientType> getIngredientTypes(){
        List<IngredientType> ingredientTypes =  ingredientTypeRepository.findAll();
        return ingredientTypes;
    }

     @Transactional
    public IngredientType addNewIngredient(IngredientType ingredientType) {
            if (!ingredientTypeRepository.findByName(ingredientType.getName()).isEmpty()) {
                throw new IllegalArgumentException("Ingredient already exists.");
            }
        this.ingredientTypeRepository.save(ingredientType);
            return ingredientType;
    }
    */
}

