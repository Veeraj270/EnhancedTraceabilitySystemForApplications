package com.example.ETSystem.bakingSystem;

import com.example.ETSystem.customerOrders.CustomerOrder;
import com.example.ETSystem.customerOrders.CustomerOrderRepository;
import com.example.ETSystem.customerOrders.CustomerOrderService;
import com.example.ETSystem.finalProducts.FinalProduct;
import com.example.ETSystem.finalProducts.FinalProductRepository;
import com.example.ETSystem.finalProducts.FinalProductService;
import com.example.ETSystem.ingredientType.IngredientType;
import com.example.ETSystem.ingredientType.IngredientTypeRepository;
import com.example.ETSystem.product.Product;
import com.example.ETSystem.product.ProductRepository;
import com.example.ETSystem.product.ProductService;
import com.example.ETSystem.recipe.IngredientQuantity;
import com.example.ETSystem.recipe.IngredientQuantityRepository;
import com.example.ETSystem.recipe.Recipe;
import com.example.ETSystem.recipe.RecipeRepository;
import com.example.ETSystem.timeline.*;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import com.example.ETSystem.bakingSystem.BakingSystemService.BPStruct;
import com.example.ETSystem.bakingSystem.BakingSystemService.UsedProduct;
import com.example.ETSystem.bakingSystem.BakingSystemService.BakedProduct;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Set;

@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class BakingSystemServiceTest {
    private final ProductRepository productRepository;
    private final ProductService productService;
    private final IngredientTypeRepository iTypeRepository;
    private final IngredientQuantityRepository IQRepository;
    private final CustomerOrderRepository customerOrderRepository;
    private final CustomerOrderService customerOrderService;
    private final FinalProductRepository finalProductRepository;
    private final FinalProductService finalProductService;
    private final RecipeRepository recipeRepository;

    //Needed for timeline service
    public final CreateEventRepository createRepo;
    public final MoveEventRepository moveRepo;
    public final UseEventRepository useRepo;

    private final TimelineService timelineService;
    private final BakingSystemService bakingSystemService;

    @Autowired
    public BakingSystemServiceTest(ProductRepository productRepository,
                                   ProductService productService,
                                   IngredientTypeRepository iTypeRepository,
                                   CreateEventRepository createRepo,
                                   MoveEventRepository moveRepo,
                                   UseEventRepository useRepo,
                                   IngredientQuantityRepository IQRepository,
                                   CustomerOrderRepository customerOrderRepository,
                                   CustomerOrderService customerOrderService,
                                   FinalProductRepository finalProductRepository,
                                   FinalProductService finalProductService,
                                   RecipeRepository recipeRepository1){
        //Initialize the repositories
        this.productRepository = productRepository;
        this.productService = productService;
        this.iTypeRepository = iTypeRepository;
        this.createRepo = createRepo;
        this.moveRepo = moveRepo;
        this.useRepo = useRepo;
        this.IQRepository = IQRepository;
        this.customerOrderRepository = customerOrderRepository;
        this.customerOrderService = customerOrderService;
        this.finalProductRepository = finalProductRepository;
        this.finalProductService = finalProductService;
        this.recipeRepository = recipeRepository1;

        //Initialize the services
        this.timelineService = new TimelineService(createRepo, moveRepo, useRepo, productRepository);
        bakingSystemService = new BakingSystemService(productService, this.timelineService, iTypeRepository, finalProductService, customerOrderService);
    }

    @BeforeAll
    public void before(){
        productRepository.deleteAll();
        createRepo.deleteAll();
        moveRepo.deleteAll();
        useRepo.deleteAll();
    }

    @Test
    @Transactional
    public void testUseProduct(){
        //Setup
        IngredientType iType = new IngredientType("flour", false, false, Set.of());
        iTypeRepository.save(iType);

        Product testProduct = new Product("flour", 10, 10, iType);
        testProduct = productRepository.save(testProduct);

        IngredientType breadIType = new IngredientType("bread", false, false, Set.of());
        iTypeRepository.save(breadIType);
        Product newProduct = new Product("bread", 1, 1, breadIType);
        newProduct = productRepository.save(newProduct);

        //Test - simulate using 5 units of testProduct to produce 5 units of newProduct
        bakingSystemService.useProduct(testProduct.getId(), 5, List.of(newProduct), "kitchen", 5F, "user");

        //Check results - testProduct should now have 5 units left
        testProduct = productRepository.findById(testProduct.getId()).get();
        assertEquals(5, testProduct.getCurrentQuantity());

        List<TimelineEvent> events = timelineService.findAllByProductSorted(testProduct).toList();
        assertEquals(1, events.size());
        TimelineEvent event = events.get(0);
        assertEquals(true, event instanceof UseEvent);
        UseEvent useEvent = (UseEvent) event;

        //Check the event details
        assertEquals(testProduct, useEvent.getOwner());
        assertEquals(1, useEvent.getResult().size());
        assertEquals(newProduct, useEvent.getResult().get(0));
        assertEquals("kitchen", useEvent.getLocation());
        assertEquals(5F, useEvent.getQuantityUsed());
        assertEquals("user", useEvent.getUserResponsible());
    }

    @Test
    @Transactional
    public void testBakeProduct(){
        //Setup
        IngredientType iType = new IngredientType("flour", false, false, Set.of());
        iType = iTypeRepository.save(iType);

        IngredientQuantity IQ = new IngredientQuantity(iType, 500);
        IQ = IQRepository.save(IQ);

        Recipe recipe = new Recipe("cake", Set.of(IQ), "description");
        recipeRepository.save(recipe);

        FinalProduct finalProduct =  new FinalProduct("5 x cake", 10000, recipe, 5);
        finalProductRepository.save(finalProduct);

        Product ingredient = new Product("flour", 500, 500, iType);
        ingredient = productRepository.save(ingredient);


        CustomerOrder order = new CustomerOrder("client", ZonedDateTime.now(), ZonedDateTime.now(), List.of(finalProduct));
        order = customerOrderRepository.save(order);

        //Test
        bakingSystemService.bakeProduct(finalProduct, List.of(ingredient.getId()), "kitchen", "user", order);

        //Check results
        assertEquals(true ,checkTestBakeProductResults("5 x cake"));
    }

    public boolean checkTestBakeProductResults(String label){
        List<Product> products = productRepository.findByLabel(label);
        assertEquals(1, products.size());
        Product newProduct = products.get(0);

        List<TimelineEvent> events = timelineService.findAllByProductSorted(newProduct).toList();
        assertEquals(1, events.size());
        TimelineEvent event = events.get(0);

        assertEquals(true, event instanceof CreateEvent);
        CreateEvent createEvent = (CreateEvent) event;

        //Check the event details
        assertEquals(newProduct, createEvent.getOwner());
        assertEquals(CreateEvent.CreateType.BAKED, createEvent.getCreateType());
        assertEquals("kitchen", createEvent.getLocation());
        assertEquals("user", createEvent.getUserResponsible());

        return true;
    }

    @Test
    @Transactional
    public void testProcessBPStruct(){
        //Setup
        //Create customer order
        IngredientType iType = new IngredientType("flour", false, false, Set.of());
        iType = iTypeRepository.save(iType);

        IngredientQuantity IQ = new IngredientQuantity(iType, 500);
        IQ = IQRepository.save(IQ);

        Recipe recipe = new Recipe("cake", Set.of(IQ), "description");
        recipe = recipeRepository.save(recipe);

        FinalProduct finalProduct =  new FinalProduct("5 x cake", 10000, recipe, 5);
        finalProduct = finalProductRepository.save(finalProduct);

        Product ingredient = new Product("flour", 500, 500, iType);
        ingredient = productRepository.save(ingredient);

        CustomerOrder order = new CustomerOrder("client", ZonedDateTime.now(), ZonedDateTime.now(), List.of(finalProduct));
        order = customerOrderRepository.save(order);

        //CreateBPStruct
        List<UsedProduct> usedProducts = List.of(new UsedProduct(ingredient.getId(), 300, 200));
        List<BakedProduct> bakedProducts = List.of(new BakedProduct(1,finalProduct.getId(), order.getID()));

        BPStruct bpStruct = new BakingSystemService.BPStruct(usedProducts, bakedProducts, "kitchen", "user");

        //Test
        bakingSystemService.processBPStruct(bpStruct);

        //Check the newly baked product was added correctly
        assertEquals(true, checkTestBakeProductResults("5 x cake")); //Data is the same as in the previous test

        //Check the  ingredient was used properly
        ingredient = productRepository.findById(ingredient.getId()).get();
        assertEquals(200, ingredient.getCurrentQuantity());

        List<TimelineEvent> events = timelineService.findAllByProductSorted(ingredient).toList();
        assertEquals(1, events.size());
        TimelineEvent event = events.get(0);
        assertEquals(true, event instanceof UseEvent);
        UseEvent useEvent = (UseEvent) event;

        //Check the event details
        assertEquals(ingredient, useEvent.getOwner());
        assertEquals(1, useEvent.getResult().size());
        assertEquals("5 x cake", useEvent.getResult().get(0).getLabel());
        assertEquals("kitchen", useEvent.getLocation());
        assertEquals(300, useEvent.getQuantityUsed());
        assertEquals("user", useEvent.getUserResponsible());
    }
}
