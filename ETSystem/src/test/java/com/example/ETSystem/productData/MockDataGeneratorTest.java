package com.example.ETSystem.productData;

import com.example.ETSystem.customerOrders.CustomerOrderRepository;
import com.example.ETSystem.finalProducts.FinalProductRepository;
import com.example.ETSystem.ingredientType.IngredientTypeRepository;
import com.example.ETSystem.product.ProductRepository;
import com.example.ETSystem.product.ProductService;
import com.example.ETSystem.recipe.IngredientQuantityRepository;
import com.example.ETSystem.recipe.Recipe;
import com.example.ETSystem.recipe.RecipeRepository;
import com.example.ETSystem.recipe.RecipeService;
import com.example.ETSystem.suppliers.SupplierService;
import com.example.ETSystem.timeline.TimelineService;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class MockDataGeneratorTest {
    private final SuppliedGoodRepository suppliedGoodRepository;
    private final IngredientTypeRepository ingredientTypeRepository;
    private final IngredientQuantityRepository ingredientQuantityRepository;
    private final SupplierService supplierService;
    private final ProductService productService;
    private final TimelineService timelineService;
    private final ProductRepository productRepository;
    private final RecipeRepository recipeRepository;
    private final RecipeService recipeService;
    private final CustomerOrderRepository customerOrderRepository;
    private final FinalProductRepository finalProductRepository;

    private final MockDataGenerator mockDataGenerator;

    @Autowired
    public MockDataGeneratorTest(SuppliedGoodRepository suppliedGoodRepository, IngredientTypeRepository ingredientTypeRepository, IngredientQuantityRepository ingredientQuantityRepository, SupplierService supplierService, ProductService productService, TimelineService timelineService, ProductRepository productRepository, RecipeRepository recipeRepository, CustomerOrderRepository customerOrderRepository, FinalProductRepository finalProductRepository) {
        this.suppliedGoodRepository = suppliedGoodRepository;
        this.ingredientTypeRepository = ingredientTypeRepository;
        this.ingredientQuantityRepository = ingredientQuantityRepository;
        this.supplierService = supplierService;
        this.productService = productService;
        this.timelineService = timelineService;
        this.productRepository = productRepository;
        this.recipeRepository = recipeRepository;
        this.customerOrderRepository = customerOrderRepository;
        this.finalProductRepository = finalProductRepository;

        recipeService = new RecipeService(recipeRepository, ingredientTypeRepository, ingredientQuantityRepository);
        mockDataGenerator = new MockDataGenerator(suppliedGoodRepository, ingredientTypeRepository, ingredientQuantityRepository, supplierService, productService, timelineService, productRepository, recipeService, this.finalProductRepository, this.customerOrderRepository);
    }
}
