package com.example.ETSystem.recipe;

import com.example.ETSystem.ingredientType.IngredientType;
import com.example.ETSystem.ingredientType.IngredientTypeRepository;
import com.example.ETSystem.ingredientType.IngredientTypeAPI;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

import java.util.List;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@SpringBootTest
@TestPropertySource(locations = "/application.properties")
public class RecipeServiceTest {
    //API & SERVICE
    private RecipeService recipeService;

    private IngredientTypeAPI ingredientTypeAPI;

    //REPOs
    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private IngredientTypeRepository ingredientTypeRepository;

    @Autowired
    private IngredientQuantityRepository ingredientQuantityRepository;

    private IngredientType milk;
    private IngredientType flour;
    private IngredientType chocolate;
    private IngredientType vanilla;

    @BeforeAll
    public void setup() {
        // Adding elements to the repository
        recipeService = new RecipeService(recipeRepository, ingredientTypeRepository, ingredientQuantityRepository);
        ingredientTypeAPI = new IngredientTypeAPI(ingredientTypeRepository);

        milk = ingredientTypeAPI.addIngredientType(new IngredientType("MILK", true, false, Set.of("milk")));
        flour = ingredientTypeAPI.addIngredientType(new IngredientType("fLoUR", true, true, Set.of()));
        chocolate = ingredientTypeAPI.addIngredientType(new IngredientType("chocolate", true, false, Set.of("milk")));
        vanilla = ingredientTypeAPI.addIngredientType(new IngredientType("vanilla", true, true, Set.of()));
    }

    void testIngredient() {
        // Correctly saving name of Ingredient
        assertEquals(milk.getName(), "milk");
        assertEquals(flour.getName(), "flour");

        // Correctly saving ingredient in repository
        List<IngredientType> list = ingredientTypeRepository.findAll();
        assertTrue(ingredientTypeRepository.findAll().containsAll(List.of(milk, flour, chocolate, vanilla)));
    }

    @Test
    @Transactional
    void testRecipe() {
        IngredientQuantity flour_500 = new IngredientQuantity();
        flour_500.setIngredientType(flour);
        flour_500.setQuantity(500);

        IngredientQuantity chocolate_300 = new IngredientQuantity(chocolate, 300);
        chocolate_300.setIngredientType(chocolate);
        chocolate_300.setQuantity(300);

        IngredientQuantity vanilla_100 = new IngredientQuantity(vanilla, 100);
        vanilla_100.setIngredientType(vanilla);
        vanilla_100.setQuantity(100);

        // flour_500 cannot be used a second time because it is
        // already managed by some Recipe entity(rec1 in this case)
        // For every Recipe entity should be created a new IngredientQuantity object
        IngredientQuantity flour_500_2 = new IngredientQuantity();
        flour_500_2.setIngredientType(flour);
        flour_500_2.setQuantity(500);

        var rec1 = recipeService.addNewRecipe(new Recipe("Vanilla Cake", Set.of(vanilla_100, flour_500)));

        assertEquals(recipeRepository.findAll().stream().toList(), List.of(rec1));
        // Testing in case of using the constructor
        assertEquals(List.of(), rec1.getAllergens().stream().toList());
        assertTrue(rec1.isVegetarian());
        assertTrue(rec1.isVegan());

        var rec2 = new Recipe();
        rec2.setLabel("Chocolate Cake Test");
        rec2.setIngredientQuantities(Set.of(chocolate_300, flour_500_2));
        recipeService.addNewRecipe(rec2);

        // Testing the in case of using non-trivial ingredientQuantities setter
        assertEquals(List.of("milk"), rec2.getAllergens().stream().toList());
        assertTrue(rec2.isVegetarian());
        assertFalse(rec2.isVegan());

        // Testing getRecipes()
        assertEquals(recipeService.getRecipes(), List.of(rec1, rec2));
        assertEquals(recipeService.getRecipes(), recipeRepository.findAll().stream().toList());

        IngredientQuantity mango_invalid = new IngredientQuantity();
        mango_invalid.setIngredientType(new IngredientType("mango", true, true, Set.of()));

        IngredientQuantity milk_100 = new IngredientQuantity();
        milk_100.setIngredientType(milk);
        milk_100.setQuantity(100);

        IngredientQuantity choc1_300 = new IngredientQuantity();
        choc1_300.setIngredientType(chocolate);
        choc1_300.setQuantity(300);

        IngredientQuantity choc2_500 = new IngredientQuantity();
        choc2_500.setIngredientType(chocolate);
        choc2_500.setQuantity(500);

        // Throwing an error for having 2 same ingredients in one recipe(2 chocolates in this case)
        assertThrows(IllegalArgumentException.class, () -> {
            recipeService.addNewRecipe(new Recipe("Triple Chocolate", Set.of(choc1_300, choc2_500)));
        });

        IngredientQuantity vanilla_1000 = new IngredientQuantity();
        vanilla_1000.setIngredientType(vanilla);
        vanilla_1000.setQuantity(1000);
    }

    @Test
    @Transactional
    public void testAddNewRecipe() {
        //Setup
        IngredientType iType1 = new IngredientType("iType1", true, true, Set.of());
        IngredientType iType2 = new IngredientType("iType2", false, false, Set.of("milk"));

        //ITypes expected to already exist
        iType1 = ingredientTypeRepository.save(iType1);
        iType2 = ingredientTypeRepository.save(iType2);

        //Test
        IngredientQuantity flour_500 = new IngredientQuantity(iType1, 500);
        IngredientQuantity milk_100 = new IngredientQuantity(iType2, 100);

        Recipe recipe = new Recipe("cake", Set.of(flour_500, milk_100));

        //Check Results
        recipeService.addNewRecipe(recipe);

        List<Recipe> recipes = recipeService.getRecipes();

        assertEquals(1, recipes.size());
        Recipe savedRecipe = recipes.get(0);

        assertEquals("cake", savedRecipe.getLabel());
    }

}
