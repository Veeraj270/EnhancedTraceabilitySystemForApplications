package com.example.ETSystem.recipe;

import com.example.ETSystem.ingredientType.IngredientType;
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
}

