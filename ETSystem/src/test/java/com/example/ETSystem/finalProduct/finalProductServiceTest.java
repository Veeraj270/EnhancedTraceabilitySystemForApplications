package com.example.ETSystem.finalProduct;

import com.example.ETSystem.customerOrders.CustomerOrderService;
import com.example.ETSystem.finalProducts.FinalProduct;
import com.example.ETSystem.finalProducts.FinalProductRepository;
import com.example.ETSystem.finalProducts.FinalProductService;
import com.example.ETSystem.ingredientType.IngredientType;
import com.example.ETSystem.ingredientType.IngredientTypeAPI;
import com.example.ETSystem.productData.MockDataGenerator;
import com.example.ETSystem.recipe.IngredientQuantity;
import com.example.ETSystem.recipe.Recipe;
import com.example.ETSystem.recipe.RecipeService;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@TestPropertySource(locations = "/application.properties")
public class finalProductServiceTest {
    private final FinalProductService finalProductService;
    private final MockDataGenerator mockDataGenerator;
    private final FinalProductRepository finalProductRepository;
    private final RecipeService recipeService;
    private final IngredientTypeAPI ingredientTypeAPI;

    @Autowired
    public finalProductServiceTest(FinalProductService finalProductService,
                                   MockDataGenerator mockDataGenerator,
                                   FinalProductRepository finalProductRepository,
                                   RecipeService recipeService,
                                   IngredientTypeAPI ingredientTypeAPI) {
        this.finalProductService = finalProductService;
        this.mockDataGenerator = mockDataGenerator;
        this.finalProductRepository = finalProductRepository;
        this.recipeService = recipeService;
        this.ingredientTypeAPI = ingredientTypeAPI;
    }

    @Test
    @Transactional
    void testAddNewFinalProduct(){
        Recipe recipe = new Recipe("recipe", Set.of());
        recipeService.addNewRecipe(recipe);

        FinalProduct fp1 = finalProductService.addNewFinalProduct(new FinalProduct("fp1", 10, recipe, 10));
        assertEquals(finalProductService.getFinalProductByID(fp1.getId()), fp1);

        assertThrows(IllegalArgumentException.class, () -> {finalProductService.addNewFinalProduct(fp1);});
    }

    @Test
    @Transactional
    void testGetFinalProducts(){
        Recipe recipe = new Recipe("recipe", Set.of());
        recipeService.addNewRecipe(recipe);

        FinalProduct fp1 = finalProductService.addNewFinalProduct(new FinalProduct("fp1", 10, recipe, 10));
        assertEquals(finalProductService.getFinalProductByID(fp1.getId()), fp1);

        // There isn't 100 items, so it should throw an error
        assertThrows(ResponseStatusException.class, () -> {
            finalProductService.getFinalProductByID(100L);
        });

        FinalProduct fp2 = finalProductService.addNewFinalProduct(new FinalProduct("fp2", 10, recipe, 10));
        assertEquals(finalProductService.getFinalProducts(), List.of(fp1, fp2));

    }

    @Test
    @Transactional
    void testEditFinalProduct(){
        Recipe recipe1 = recipeService.addNewRecipe(new Recipe("recipe1", Set.of()));
        Recipe recipe2 = recipeService.addNewRecipe(new Recipe("recipe2", Set.of()));

        FinalProduct fp1 = finalProductService.addNewFinalProduct(new FinalProduct("fp1", 10, recipe1, 10));
        FinalProduct fp2 = new FinalProduct("fp2", 100, recipe2, 100);

        // This method should change all the attributes from fp2 and set it to fp1
        finalProductService.editFinalProduct(fp1.getId(), fp2);
        FinalProduct fp = finalProductService.getFinalProductByID(fp1.getId());

        assertEquals(fp.getLabel(), "fp2");
        assertEquals(fp.getCost(), 100);
        assertEquals(fp.getRecipe(), recipe2);
        assertEquals(fp.getQuantity(), 100);
    }

    @Test
    @Transactional
    void testAddIQData(){
        IngredientType ingType1 = ingredientTypeAPI
                .addIngredientType(new IngredientType("ingType1", true, true, Set.of()));
        IngredientType ingType2 = ingredientTypeAPI
                .addIngredientType(new IngredientType("ingType2", true, true, Set.of()));
        IngredientType ingType3 = ingredientTypeAPI
                .addIngredientType(new IngredientType("ingType3", true, true, Set.of()));

        FinalProductService.IQData iqData1 = new FinalProductService.IQData(ingType1.getId(), "ingType1", 10);
        FinalProductService.IQData iqData2 = new FinalProductService.IQData(ingType1.getId(), "ingType1", 10);
        FinalProductService.IQData iqData3 = new FinalProductService.IQData(ingType2.getId(), "ingType2", 10);
        FinalProductService.IQData iqData4 = new FinalProductService.IQData(ingType3.getId(), "ingType3", 10);

        List<FinalProductService.IQData> totals = new ArrayList<>(List.of(iqData2, iqData3));
        // This just increases the quantity of iqData2 because they have the same ingredientType
        finalProductService.addIQData(totals, iqData1);
        // This adds iqData4 to the list because all the elements have a different ingredientType
        finalProductService.addIQData(totals, iqData4);

        assertEquals(iqData2.quantity, 20);
        assertEquals(totals, List.of(iqData2, iqData3, iqData4));
    }

    @Test
    @Transactional
    void testGetTotalIngredients(){
        IngredientType ingType1 = ingredientTypeAPI
                .addIngredientType(new IngredientType("ingType1", true, true, Set.of()));
        IngredientType ingType2 = ingredientTypeAPI
                .addIngredientType(new IngredientType("ingType2", true, true, Set.of()));

        IngredientQuantity IQ1 = new IngredientQuantity(ingType1, 10);
        IngredientQuantity IQ2 = new IngredientQuantity(ingType1, 20);
        IngredientQuantity IQ3 = new IngredientQuantity(ingType2, 10);

        Recipe recipe1 = recipeService.addNewRecipe(new Recipe("recipe1", Set.of(IQ1)));
        Recipe recipe2 = recipeService.addNewRecipe(new Recipe("recipe2", Set.of(IQ2, IQ3)));

        FinalProduct finalProduct1 = finalProductService
                .addNewFinalProduct(new FinalProduct("finalProduct1", 100, recipe1, 10));
        FinalProduct finalProduct2 = finalProductService
                .addNewFinalProduct(new FinalProduct("finalProduct2", 100, recipe2, 10));

        CustomerOrderService.FPData FPData1 = new CustomerOrderService
                .FPData(finalProduct1.getId(), finalProduct1.getLabel(), 5, 1);
        CustomerOrderService.FPData FPData2 = new CustomerOrderService
                .FPData(finalProduct2.getId(), finalProduct2.getLabel(), 5, 1);
        CustomerOrderService.FPData FPData3 = new CustomerOrderService
                .FPData(finalProduct2.getId(), "Non-existent", 5, 1);

        FinalProductService.IQData IQData1 = new FinalProductService.IQData(
                ingType1.getId(),
                ingType1.getName(),
                150);
        FinalProductService.IQData IQData2 = new FinalProductService.IQData(
                ingType2.getId(),
                ingType2.getName(),
                50);

        assertEquals(finalProductService.getTotalIngredients(List.of(FPData1, FPData2)).get(0), List.of(IQData1, IQData2).get(0));
        assertEquals(finalProductService.getTotalIngredients(List.of(FPData1, FPData2)).get(1), List.of(IQData1, IQData2).get(1));
        assertThrows(ResponseStatusException.class, () -> {finalProductService.getTotalIngredients(List.of(FPData3));});

    }
}
