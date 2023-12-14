package com.example.ETSystem.timeline;

import com.example.ETSystem.recipe.Ingredient;
import com.example.ETSystem.recipe.IngredientRepository;
import com.example.ETSystem.recipe.RecipeRepository;
import com.example.ETSystem.recipe.RecipeService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
public class RecipeServiceTest {
    @Autowired
    private RecipeService recipeService;

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private IngredientRepository ingredientRepository;

    @Test
    void testIngredient(){
        var e1 = recipeService.addNewIngredient(new Ingredient("MILK"));
        var e2 = recipeService.addNewIngredient(new Ingredient("flour"));

        System.out.println(e1.getLabel());
        System.out.println(e2.getLabel());
        // Checking if its saved correctly
        assertEquals(ingredientRepository.findAll().stream().toList(), List.of(e1, e2));
        // Checking if it saved in lower case
        assertEquals(e1.getLabel(), "milk");
        // Checking if it throws an error for adding the same element
        assertThrows(IllegalArgumentException.class, () -> {
            var e3 = recipeService.addNewIngredient(new Ingredient("flour"));;
        });
        assertThrows(IllegalArgumentException.class, () -> {
            var e3 = recipeService.addNewIngredient(new Ingredient("FLOur"));;
        });


    }

//    @Test
//    void testRecipe(){
//
//    }
}
