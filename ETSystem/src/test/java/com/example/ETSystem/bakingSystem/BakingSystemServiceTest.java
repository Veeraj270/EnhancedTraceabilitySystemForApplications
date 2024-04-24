package com.example.ETSystem.bakingSystem;

import com.example.ETSystem.customerOrders.CustomerOrder;
import com.example.ETSystem.customerOrders.CustomerOrderRepository;
import com.example.ETSystem.finalProducts.FinalProduct;
import com.example.ETSystem.finalProducts.FinalProductRepository;
import com.example.ETSystem.ingredientType.IngredientType;
import com.example.ETSystem.ingredientType.IngredientTypeRepository;
import com.example.ETSystem.product.Product;
import com.example.ETSystem.product.ProductRepository;
import com.example.ETSystem.recipe.IngredientQuantity;
import com.example.ETSystem.recipe.IngredientQuantityRepository;
import com.example.ETSystem.recipe.Recipe;
import com.example.ETSystem.timeline.*;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Set;

@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class BakingSystemServiceTest {
    private final ProductRepository productRepository;
    private final IngredientTypeRepository iTypeRepository;
    private final IngredientQuantityRepository IQRepository;
    private final CustomerOrderRepository customerOrderRepository;
    private final FinalProductRepository finalProductRepository;

    //Needed for timeline service
    public final CreateEventRepository createRepo;
    public final MoveEventRepository moveRepo;
    public final UseEventRepository useRepo;

    private final TimelineService timelineService;
    private final BakingSystemService bakingSystemService;

    @Autowired
    public BakingSystemServiceTest(ProductRepository productRepository,
                                   IngredientTypeRepository iTypeRepository,
                                   CreateEventRepository createRepo,
                                   MoveEventRepository moveRepo,
                                   UseEventRepository useRepo,
                                   IngredientQuantityRepository IQRepository,
                                   CustomerOrderRepository customerOrderRepository, FinalProductRepository finalProductRepository){
        //Initialize the repositories
        this.productRepository = productRepository;
        this.iTypeRepository = iTypeRepository;
        this.createRepo = createRepo;
        this.moveRepo = moveRepo;
        this.useRepo = useRepo;
        this.IQRepository = IQRepository;
        this.customerOrderRepository = customerOrderRepository;
        this.finalProductRepository = finalProductRepository;

        //Initialize the services
        this.timelineService = new TimelineService(createRepo, moveRepo, useRepo, productRepository);
        bakingSystemService = new BakingSystemService(productRepository, this.timelineService, iTypeRepository, finalProductRepository, customerOrderRepository);
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
        assert(testProduct.getCurrentQuantity() == 5);

        List<TimelineEvent> events = timelineService.findAllByProductSorted(testProduct).toList();
        assert(events.size() == 1);
        TimelineEvent event = events.get(0);
        assert(event instanceof UseEvent);
        UseEvent useEvent = (UseEvent) event;

        //Check the event details
        assert(useEvent.getOwner().equals(testProduct));
        assert(useEvent.getResult().size() == 1);
        assert(useEvent.getResult().get(0).equals(newProduct));
        assert(useEvent.getLocation().equals("kitchen"));
        assert(useEvent.getQuantityUsed() == 5F);
        assert(useEvent.getUserResponsible().equals("user"));
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
        FinalProduct finalProduct =  new FinalProduct("5 x cake", 10000, recipe, 5);

        Product ingredient = new Product("flour", 500, 500, iType);
        ingredient = productRepository.save(ingredient);

        CustomerOrder order = new CustomerOrder("client", ZonedDateTime.now(), ZonedDateTime.now(), List.of(finalProduct));
        order = customerOrderRepository.save(order);

        //Test
        bakingSystemService.bakeProduct(finalProduct, List.of(ingredient.getId()), "kitchen", "user", order);

        //Check results
        List<Product> products = productRepository.findByLabel("5 x cake");
        assert(products.size() == 1);
        Product newProduct = products.get(0);

        List<TimelineEvent> events = timelineService.findAllByProductSorted(newProduct).toList();
        assert(events.size() == 1);
        TimelineEvent event = events.get(0);

        assert(event instanceof CreateEvent);
        CreateEvent createEvent = (CreateEvent) event;

        //Check the event details
        assert(createEvent.getOwner().equals(newProduct));
        assert(createEvent.getCreateType().equals(CreateEvent.CreateType.BAKED));
        assert(createEvent.getLocation().equals("kitchen"));
        assert(createEvent.getUserResponsible().equals("user"));
    }
}
