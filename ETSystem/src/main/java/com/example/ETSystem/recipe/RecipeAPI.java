package com.example.ETSystem.recipe;

import com.example.ETSystem.ingredients.IngredientType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping(path = "api/recipes")
// @CrossOrigin(origins = "http://localhost:3000")
public class RecipeAPI {

    private final RecipeService recipeService;

    @Autowired
    public RecipeAPI(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @GetMapping(path = "/fetch-recipes")
    public List<Recipe> getRecipes(){
        return recipeService.getRecipes();
    }

    @PostMapping(path = "/add-recipe")
    public Recipe addRecipe(@RequestBody Recipe recipe){
        recipeService.addNewRecipe(recipe);
        return recipe;
    }

    @GetMapping(path = "/fetch-ingredients")
    public List<IngredientType> getIngredients(){
        return recipeService.getIngredients();
    }

    @PostMapping(path = "/add-ingredient")
    public IngredientType addIngredient(@RequestBody IngredientType ingredientType){
        recipeService.addNewIngredient(ingredientType);
        return ingredientType;
    }

}

