package com.example.ETSystem.recipe;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

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
        milk = recipeService.addNewIngredient(new Ingredient("MILK", true, true, false));
        flour = recipeService.addNewIngredient(new Ingredient("fLoUR", false, true, true));
        chocolate = recipeService.addNewIngredient(new Ingredient("chocolate", true, true, false));
        vanilla = recipeService.addNewIngredient(new Ingredient("vanilla", false, true, true));
    }

    @Test
    void testIngredient(){
        // Correctly saving label of Ingredient
        assertEquals(milk.getLabel(), "milk");
        assertEquals(flour.getLabel(), "flour");

        // Correctly saving ingredient in repository
        System.out.println(ingredientRepository.findAll().stream().toList());

        //assertEquals(ingredientRepository.findAll().stream().toList(), List.of(milk, flour, chocolate, vanilla)); DOES NOT WORK AS MOCK DATA IS PRESENT ALSO, ADAPTATION IS BELOW:
        assertTrue(ingredientRepository.findAll().containsAll(List.of(milk, flour, chocolate, vanilla)));

        // Throwing an error for adding the same element
        assertThrows(IllegalArgumentException.class, () -> {
            recipeService.addNewIngredient(new Ingredient("flour", false, true, true));
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

        // flour_500 cannot be used a second time because it is
        // already managed by some Recipe entity(rec1 in this case)
        // For every Recipe entity should be created a new IngredientQuantity object
        IngredientQuantity flour_500_2 = new IngredientQuantity();
        flour_500_2.setIngredient(flour);
        flour_500_2.setQuantity(500);

        var rec1 = recipeService.addNewRecipe(new Recipe("Vanilla Cake", Set.of(vanilla_100, flour_500)));

        //assertEquals(recipeRepository.findAll().stream().toList(), List.of(rec1)); DOES NOT WORK AS MOCK DATA IS PRESENT ALSO, ADAPTATION IS BELOW:
        assertTrue(recipeRepository.findAll().contains(rec1));

        var rec2 = recipeService.addNewRecipe(new Recipe("Chocolate Cake Test", Set.of(chocolate_300, flour_500_2))); //PLEASE NOTE I ADDED THE "TEST". MOCK DATA CONTAINS OBJECT WITH SAME
        //LABEL AND RECIPESERVICE THROWS AN ERROR AS A RESULT. THIS SHOULD NOT BE THE CASE AS THE ONLY UNIQUE IDENTIFIER IS THE ID, DUPLICATE LABELS SHOULD BE PREVENTED
        //AT AN API LEVEL NOT AT A REPOSITORY LEVEL

        assertEquals(List.of(), rec1.getAllergens().stream().toList());
        assertEquals(List.of(chocolate), rec2.getAllergens().stream().toList());
        assertEquals(true, rec1.isVegetarian());
        assertEquals(true, rec1.isVegan());
        assertEquals(true, rec2.isVegetarian());
        assertEquals(false, rec2.isVegan());

        //assertEquals(recipeRepository.findAll().stream().toList(), List.of(rec1, rec2)); DOES NOT WORK AS MOCK DATA IS PRESENT ALSO, ADAPTATION IS BELOW:
        assertTrue(recipeRepository.findAll().containsAll(List.of(rec1, rec2)));


        IngredientQuantity mango_invalid = new IngredientQuantity();
        mango_invalid.setIngredient(new Ingredient("mango", false, true, true));

        IngredientQuantity milk_100 = new IngredientQuantity();
        milk_100.setIngredient(milk);
        milk_100.setQuantity(100);

        // Throwing an error for adding a nonexistent Ingredient
        assertThrows(IllegalArgumentException.class, () -> {
            recipeService.addNewRecipe(new Recipe("Mango Cake", Set.of(milk_100, mango_invalid)));
        });

        IngredientQuantity choc1_300 = new IngredientQuantity();
        choc1_300.setIngredient(chocolate);
        choc1_300.setQuantity(300);

        IngredientQuantity choc2_500 = new IngredientQuantity();
        choc2_500.setIngredient(chocolate);
        choc2_500.setQuantity(500);

        // Throwing an error for having 2 same ingredients in one recipe(2 chocolates in this case)
        assertThrows(IllegalArgumentException.class, () -> {
            recipeService.addNewRecipe(new Recipe("Triple Chocolate", Set.of(choc1_300, choc2_500)));
        });

        IngredientQuantity vanilla_1000 = new IngredientQuantity();
        vanilla_1000.setIngredient(vanilla);
        vanilla_1000.setQuantity(1000);

        // // Throwing an error for adding an element with same label
        assertThrows(IllegalArgumentException.class, () -> {
            recipeService.addNewRecipe(new Recipe("Vanilla Cake", Set.of(vanilla_1000)));
        });

    }
}
