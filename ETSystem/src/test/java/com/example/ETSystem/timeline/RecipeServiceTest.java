package com.example.ETSystem.timeline;

import com.example.ETSystem.recipe.*;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@SpringBootTest
public class RecipeServiceTest {
    @Autowired
    private RecipeService recipeService;

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private IngredientRepository ingredientRepository;

    private Ingredient milk;
    private Ingredient flour;
    private Ingredient chocolate;
    private Ingredient vanilla;

    @BeforeAll
    public void setup() {
        // Adding elements to the repository
        milk = recipeService.addNewIngredient(new Ingredient("MILK"));
        flour = recipeService.addNewIngredient(new Ingredient("fLoUR"));
        chocolate = recipeService.addNewIngredient(new Ingredient("chocolate"));
        vanilla = recipeService.addNewIngredient(new Ingredient("vanilla"));
    }

    @Test
    void testIngredient(){
        // Correctly saving label of Ingredient
        assertEquals(milk.getLabel(), "milk");
        assertEquals(flour.getLabel(), "flour");

        // Correctly saving ingredient in repository
        assertEquals(ingredientRepository.findAll().stream().toList(), List.of(milk, flour, chocolate, vanilla));

        // Throwing an error for adding the same element
        assertThrows(IllegalArgumentException.class, () -> {
            recipeService.addNewIngredient(new Ingredient("flour"));
        });
        assertThrows(IllegalArgumentException.class, () -> {
            recipeService.addNewIngredient(new Ingredient("FLOur"));
        });
    }

    @Test
    void testRecipe(){

        IngredientQuantity flour_500 = new IngredientQuantity();
        flour_500.setIngredient(flour);
        flour_500.setQuantity(500);

        IngredientQuantity chocolate_300 = new IngredientQuantity();
        chocolate_300.setIngredient(chocolate);
        chocolate_300.setQuantity(300);

        IngredientQuantity vanilla_100 = new IngredientQuantity();
        vanilla_100.setIngredient(vanilla);
        vanilla_100.setQuantity(100);

        // I cannot use flour_500 in rec2 because making rec1 somehow detaches it from the
        // managed objects, and when making rec2 it doesn't recognize it
        IngredientQuantity flour_500_2 = new IngredientQuantity();
        flour_500_2.setIngredient(flour);
        flour_500_2.setQuantity(500);

        var rec1 = recipeService.addNewRecipe(new Recipe("Vanilla Cake", List.of(vanilla_100, flour_500)));

        assertEquals(recipeRepository.findAll().stream().toList(), List.of(rec1));

        var rec2 = recipeService.addNewRecipe(new Recipe("Chocolate Cake", List.of(chocolate_300, flour_500_2)));

        assertEquals(recipeRepository.findAll().stream().toList(), List.of(rec1, rec2));

        IngredientQuantity mango_invalid = new IngredientQuantity();
        mango_invalid.setIngredient(new Ingredient("mango"));

        // Throwing an error for adding a nonexistent Ingredient
        assertThrows(IllegalArgumentException.class, () -> {
            recipeService.addNewRecipe(new Recipe("Mango Cake", List.of(mango_invalid)));
        });

        IngredientQuantity milk_100 = new IngredientQuantity();
        milk_100.setIngredient(milk);
        milk_100.setQuantity(100);

        assertThrows(IllegalArgumentException.class, () -> {
            recipeService.addNewRecipe(new Recipe("Mango Cake", List.of(milk_100, mango_invalid)));
        });

    }
}
