package com.example.ETSystem.autoOrder;

import com.example.ETSystem.customerOrders.CustomerOrder;
import com.example.ETSystem.customerOrders.CustomerOrderRepository;
import com.example.ETSystem.customerOrders.CustomerOrderService;
import com.example.ETSystem.deliveries.DeliveryItem;
import com.example.ETSystem.deliveries.DeliveryItemRepository;
import com.example.ETSystem.deliveries.PlannedDelivery;
import com.example.ETSystem.deliveries.PlannedDeliveryRepository;
import com.example.ETSystem.finalProducts.FinalProduct;
import com.example.ETSystem.ingredientType.IngredientType;
import com.example.ETSystem.ingredientType.IngredientTypeRepository;
import com.example.ETSystem.product.Product;
import com.example.ETSystem.product.ProductRepository;
import com.example.ETSystem.productData.SuppliedGood;
import com.example.ETSystem.productData.SuppliedGoodRepository;
import com.example.ETSystem.recipe.IngredientQuantity;
import com.example.ETSystem.recipe.IngredientQuantityRepository;
import com.example.ETSystem.recipe.Recipe;
import com.example.ETSystem.suppliers.Supplier;
import com.example.ETSystem.suppliers.SupplierRepository;
import com.example.ETSystem.suppliers.SupplierService;
import jakarta.transaction.Transactional;
import org.assertj.core.groups.Tuple;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static org.assertj.core.api.Assertions.assertThat;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;

@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class AutoOrderServiceTest {
    private final CustomerOrderService customerOrderService;
    private final AutoOrderService autoOrderService;
    private final SupplierService supplierService;
    private final PlannedDeliveryRepository plannedDeliveryRepository;
    private final SupplierRepository supplierRepository;
    private final SuppliedGoodRepository suppliedGoodRepository;
    private final IngredientTypeRepository ingredientTypeRepository;
    private final IngredientQuantityRepository ingredientQuantityRepository;
    private final DeliveryItemRepository deliveryItemRepository;
    private final CustomerOrderRepository customerOrderRepository;
    private final ProductRepository productRepository;

    //Constructor based dependency injection
    @Autowired
    public AutoOrderServiceTest(
            PlannedDeliveryRepository plannedDeliveryRepository,
            SupplierRepository supplierRepository,
            SuppliedGoodRepository suppliedGoodRepository,
            IngredientTypeRepository ingredientTypeRepository,
            IngredientQuantityRepository ingredientQuantityRepository,
            CustomerOrderRepository customerOrderRepository,
            DeliveryItemRepository deliveryItemRepository,
            ProductRepository productRepository
    ){
        this.plannedDeliveryRepository = plannedDeliveryRepository;
        this.supplierRepository = supplierRepository;
        this.suppliedGoodRepository  = suppliedGoodRepository;
        this.ingredientTypeRepository = ingredientTypeRepository;
        this.ingredientQuantityRepository = ingredientQuantityRepository;
        this.customerOrderRepository  = customerOrderRepository;
        this.deliveryItemRepository = deliveryItemRepository;
        this.productRepository = productRepository;

        this.customerOrderService = new CustomerOrderService(customerOrderRepository);
        this.supplierService = new SupplierService(supplierRepository, suppliedGoodRepository);
        this.autoOrderService = new AutoOrderService(this.customerOrderService, this.supplierService, plannedDeliveryRepository, deliveryItemRepository, productRepository);
    }

    @BeforeAll
    public void before(){
        plannedDeliveryRepository.deleteAll();
        supplierRepository.deleteAll();
        suppliedGoodRepository.deleteAll();
        ingredientTypeRepository.deleteAll();
        ingredientQuantityRepository.deleteAll();
        customerOrderRepository.deleteAll();
        plannedDeliveryRepository.deleteAll();
        customerOrderRepository.deleteAll();
    }

    //UNIT TESTS
    @Test
    @Transactional
    void testTotalIngredients(){
        //Setup
        IngredientType iType1 = new IngredientType("flour", false, false, Set.of());
        iType1 = ingredientTypeRepository.save(iType1);
        IngredientType iType2 = new IngredientType("sugar", false, false, Set.of());
        iType2 = ingredientTypeRepository.save(iType2);

        IngredientQuantity iQuantity1 = new IngredientQuantity(iType1, 100);
        iQuantity1 = ingredientQuantityRepository.save(iQuantity1);

        IngredientQuantity iQuantity2 = new IngredientQuantity(iType1, 200);
        iQuantity2 = ingredientQuantityRepository.save(iQuantity2);

        IngredientQuantity iQuantity3 = new IngredientQuantity(iType2, 100);
        iQuantity3 = ingredientQuantityRepository.save(iQuantity3);

        IngredientQuantity iQuantity4 = new IngredientQuantity(iType2, 200);
        iQuantity4 = ingredientQuantityRepository.save(iQuantity4);

        Recipe recipe1 = new Recipe("recipe-1", Set.of(iQuantity1, iQuantity3));
        Recipe recipe2 = new Recipe("recipe-2", Set.of(iQuantity2, iQuantity4));

        FinalProduct fProduct1 = new FinalProduct();
        fProduct1.setRecipe(recipe1);
        fProduct1.setQuantity(5);

        FinalProduct fProduct2 = new FinalProduct();
        fProduct2.setRecipe(recipe2);
        fProduct2.setQuantity(2);

        List<FinalProduct>  TFinalProducts = List.of(fProduct1,fProduct2);

        //Call method to be tested
        List<IngredientQuantity> result = autoOrderService.totalIngredients(TFinalProducts);

        //Check result
        assert result.size() == 2;

        assertThat(result)
                .extracting((IQ) -> IQ.getIngredientType().getName(), IngredientQuantity::getQuantity)
                .containsExactlyInAnyOrder(
                        Tuple.tuple("sugar", 900.0f),
                        Tuple.tuple("flour", 900.0f)
                );
    }

    @Test
    @Transactional
    void testDetermineNumOfEach(){
        //Setup
        List<Float> distinctQuantities = List.of(0.5F, 1F, 2.5F, 5F, 25F);
        float reqAmount = 116.75F;

        //Call method to be tested
        int[] result = autoOrderService.getNumOfEachDiQuant(distinctQuantities, reqAmount);

        //Check result
        assert result[0] == 0;
        assert result[1] == 2;
        assert result[2] == 0;
        assert result[3] == 3;
        assert result[4] == 4;

        //Is == 127 because this is the amount closes to 166.75 that can be achieved...
        //via sums of the distinctQuantities
        float sum = result[0] * distinctQuantities.get(0) +
                result[1] * distinctQuantities.get(1) +
                result[2] * distinctQuantities.get(2) +
                result[3] * distinctQuantities.get(3) +
                result[4] * distinctQuantities.get(4);

        assert (sum ==  117F);
    }

    //Need to test whether the algo chooses the cheapest good for each required distinct quantity;

    @Test
    @Transactional
    void testDetermineGoods(){
        //Setup
        IngredientType iType = new IngredientType("sugar", false, false, Set.of());

        Supplier testSupplier = new Supplier();

        SuppliedGood good1 = new SuppliedGood("00001", "good-1", iType, 10F, "kg", 10000);
        good1.setId(1L);
        SuppliedGood good2 = new SuppliedGood("00002", "good-2", iType, 5F, "kg", 5000);
        good2.setId(2L);
        SuppliedGood good3 = new SuppliedGood("00003", "good-3", iType, 2.5F, "kg", 10000);
        good3.setId(3L);
        SuppliedGood good4 = new SuppliedGood("00004", "good-4", iType, 1F, "kg", 5000);
        good4.setId(4L);
        SuppliedGood good5 = new SuppliedGood("00005", "good-5", iType, 10F, "kg", 5000);
        good5.setId(5L);
        SuppliedGood good6 = new SuppliedGood("00006", "good-6", iType, 5F, "kg", 10000);
        good6.setId(6L);
        SuppliedGood good7 = new SuppliedGood("00007", "good-7", iType, 2.5F, "kg", 5000);
        good7.setId(7L);
        SuppliedGood good8 = new SuppliedGood("00008", "good-8", iType, 1F, "kg", 10000);
        good8.setId(8L);

        List<SuppliedGood> matchingGoods = List.of(good1, good2, good3,good4, good5, good6, good7, good8);

        testSupplier.setGoods(matchingGoods);
        for (SuppliedGood good: matchingGoods){
            good.setSupplier(testSupplier);
        }
        List<Float> distinctQuantities = matchingGoods.stream().map(SuppliedGood::getQuantity).distinct().sorted().toList();
        float reqAmount = 27.5F;
        int[] amounts = autoOrderService.getNumOfEachDiQuant(distinctQuantities, reqAmount);

        //Call method to be tested
        List<SuppliedGood> result = autoOrderService.chooseCheapest(matchingGoods, distinctQuantities, amounts);

        //Check it matches expected output - (It chooses each suppliedGood with the lower cost)
        List<SuppliedGood> expectedResult = List.of(good2, good5, good5, good4, good7);
        assert result.containsAll(expectedResult);
    }

    @Test
    @Transactional
    void testGenOrdersToSuppliers(){
        //Setup
        Supplier supplier1 = new Supplier();
        supplier1.setId(1);
        Supplier supplier2 = new Supplier();
        supplier2.setId(2);

        SuppliedGood good1 = new SuppliedGood();
        good1.setSupplier(supplier1);
        good1.setGtin("00001");
        SuppliedGood good2 = new SuppliedGood();
        good2.setSupplier(supplier1);
        good1.setGtin("00002");
        SuppliedGood good3 = new SuppliedGood();
        good3.setSupplier(supplier1);
        good3.setGtin("00003");

        SuppliedGood good4 = new SuppliedGood();
        good4.setSupplier(supplier2);
        good4.setGtin("00004");
        SuppliedGood good5 = new SuppliedGood();
        good5.setSupplier(supplier2);
        good5.setGtin("00005");
        SuppliedGood good6 = new SuppliedGood();
        good6.setSupplier(supplier2);
        good6.setGtin("00006");


        supplier1.setGoods(List.of(good1, good2, good3));
        supplier2.setGoods(List.of(good4, good5, good6));

        List<Supplier> suppliers = List.of(supplier1, supplier2);

        List<SuppliedGood> toOrder = List.of(good1, good1, good2, good3, good4, good6);

        CustomerOrder order = new CustomerOrder("client", ZonedDateTime.now(), ZonedDateTime.now().plusDays(7), new ArrayList<FinalProduct>());

        //Call method to be tested
        List<PlannedDelivery> result = autoOrderService.genOrdersToSuppliers(suppliers, toOrder, order);

        //Check output
        assert result.size() == 2;
        assert result.get(0).getItems().size() == 4;
        assert result.get(1).getItems().size() == 2;

        //To-Do needs more comprehensive checking
    }

    @Test
    @Transactional
    void testGenerateRequiredOrders_useStoredProductsSetToFalse(){
        //Setup
        IngredientType flour = new IngredientType("flour", false, false, Set.of()); flour.setId(1);
        IngredientType sugar = new IngredientType("sugar", false, false, Set.of()); sugar.setId(2);

        flour = ingredientTypeRepository.save(flour);
        sugar = ingredientTypeRepository.save(sugar);

        IngredientQuantity iQuantity1 = new IngredientQuantity(flour, 5);
        IngredientQuantity iQuantity2 = new IngredientQuantity(sugar,5);

        Recipe recipe = new Recipe("recipe1", Set.of(iQuantity1, iQuantity2));
        FinalProduct fProduct1 = new FinalProduct("fProduct1", 1000, recipe, 4);

        CustomerOrder order = new CustomerOrder();
        order.setFinalProducts(new ArrayList<>(Arrays.asList(fProduct1)));
        order.setClient("client");
        order.setDate(ZonedDateTime.now());
        order.setDeliveryDate(ZonedDateTime.now().plusDays(7));

        //Add some SuppliedGoods that match requirements
        SuppliedGood flour1 = new SuppliedGood(); flour1.setIngredientType(flour); flour1.setQuantity(1); flour1.setLabel("flour1");
        SuppliedGood flour3 = new SuppliedGood(); flour3.setIngredientType(flour); flour3.setQuantity(3); flour3.setLabel("flour3");
        SuppliedGood flour9 = new SuppliedGood(); flour9.setIngredientType(flour); flour9.setQuantity(9); flour9.setLabel("flour9");

        SuppliedGood sugar1 = new SuppliedGood(); sugar1.setIngredientType(sugar); sugar1.setQuantity(1); sugar1.setLabel("sugar1");
        SuppliedGood sugar3 = new SuppliedGood(); sugar3.setIngredientType(sugar); sugar3.setQuantity(3); sugar3.setLabel("sugar3");
        SuppliedGood sugar9 = new SuppliedGood(); sugar9.setIngredientType(sugar); sugar9.setQuantity(9); sugar9.setLabel("sugar9");

        suppliedGoodRepository.saveAll(List.of(flour1, flour3, flour9, sugar1, sugar3, sugar9));

        Supplier supplier = new Supplier();
        supplier = supplierRepository.save(supplier);

        supplierService.AddGoodToSupplier(supplier, flour1);
        supplierService.AddGoodToSupplier(supplier, flour3);
        supplierService.AddGoodToSupplier(supplier, flour9);
        supplierService.AddGoodToSupplier(supplier, sugar1);
        supplierService.AddGoodToSupplier(supplier, sugar3);
        supplierService.AddGoodToSupplier(supplier, sugar9);

        //Call method to be tested
        List<PlannedDelivery> result = autoOrderService.generateRequiredOrders(order, false);

        //Check result against expected output
        List<DeliveryItem>  deliveryItemList = result.get(0).getItems();


        //Total quantities add to 20 - which is required amount
        assertThat(deliveryItemList)
                .extracting(DeliveryItem::getLabel)
                .containsExactlyInAnyOrder(
                        "sugar1",
                        "sugar1",
                        "sugar9",
                        "sugar9",
                        "flour1",
                        "flour1",
                        "flour9",
                        "flour9"
                );
    }

    @Test
    @Transactional
    void testGenerateRequiredOrders_usesStoredProducts(){
        //Setup
        IngredientType flour = new IngredientType("flour", false, false, Set.of());
        IngredientType sugar = new IngredientType("sugar", false, false, Set.of());

        flour = ingredientTypeRepository.save(flour);
        sugar = ingredientTypeRepository.save(sugar);

        IngredientQuantity iQuantity1 = new IngredientQuantity(flour, 5);
        IngredientQuantity iQuantity2 = new IngredientQuantity(sugar,5);

        iQuantity1 = ingredientQuantityRepository.save(iQuantity1);
        iQuantity2 = ingredientQuantityRepository.save(iQuantity2);

        Recipe recipe = new Recipe("recipe1", Set.of(iQuantity1, iQuantity2));
        FinalProduct fProduct1 = new FinalProduct("fProduct1", 1000, recipe, 4);

        CustomerOrder order = new CustomerOrder();
        order.setFinalProducts(new ArrayList<>(Arrays.asList(fProduct1)));
        order.setClient("client");
        order.setDate(ZonedDateTime.now());
        order.setDeliveryDate(ZonedDateTime.now().plusDays(7));

        //Add some SuppliedGoods that match requirements
        SuppliedGood flour1 = new SuppliedGood(); flour1.setIngredientType(flour); flour1.setQuantity(1); flour1.setLabel("flour1");
        SuppliedGood flour3 = new SuppliedGood(); flour3.setIngredientType(flour); flour3.setQuantity(3); flour3.setLabel("flour3");
        SuppliedGood flour9 = new SuppliedGood(); flour9.setIngredientType(flour); flour9.setQuantity(9); flour9.setLabel("flour9");

        SuppliedGood sugar1 = new SuppliedGood(); sugar1.setIngredientType(sugar); sugar1.setQuantity(1); sugar1.setLabel("sugar1");
        SuppliedGood sugar3 = new SuppliedGood(); sugar3.setIngredientType(sugar); sugar3.setQuantity(3); sugar3.setLabel("sugar3");
        SuppliedGood sugar9 = new SuppliedGood(); sugar9.setIngredientType(sugar); sugar9.setQuantity(9); sugar9.setLabel("sugar9");

        suppliedGoodRepository.saveAll(List.of(flour1, flour3, flour9, sugar1, sugar3, sugar9));

        Supplier supplier = new Supplier();
        supplier = supplierRepository.save(supplier);

        supplierService.AddGoodToSupplier(supplier, flour1);
        supplierService.AddGoodToSupplier(supplier, flour3);
        supplierService.AddGoodToSupplier(supplier, flour9);
        supplierService.AddGoodToSupplier(supplier, sugar1);
        supplierService.AddGoodToSupplier(supplier, sugar3);
        supplierService.AddGoodToSupplier(supplier, sugar9);

        //Add some Products to the productRepository that can be used to fulfill the order
        Product product1 = new Product("", 2.5f, 2.5f, flour);
        Product product2 = new Product("", 2.5f, 2.5f, flour);
        Product product3 = new Product("", 21f, 21f, sugar);

        productRepository.saveAll(List.of(product1, product2, product3));

        //Call method to be tested
        List<PlannedDelivery> result = autoOrderService.generateRequiredOrders(order, true);

        //Check that it saved the two products that were expected to be used
        assertThat(autoOrderService.getSavedProducts()).containsAll(List.of(product1, product2, product3));
    }


    @Test
    @Transactional
    void testConfirmSavedOrders_AddsToRepo(){
        //Setup
        plannedDeliveryRepository.deleteAll(); //Clear repo
        PlannedDelivery plan1 = new PlannedDelivery();
        plan1.setName("plan1");
        PlannedDelivery plan2 = new PlannedDelivery();
        plan2.setName("plan2");
        PlannedDelivery plan3 = new PlannedDelivery();
        plan3.setName("plan3");

        List<PlannedDelivery> planned = List.of(plan1, plan2, plan3);

        autoOrderService.setSavedDeliveries(planned);

        //Run method to be tested
        autoOrderService.confirmSavedOrders();

        //Check result
        List<PlannedDelivery> all = plannedDeliveryRepository.findAll();
        assert(all.get(0).getName() == "plan1");
        assert(all.get(1).getName() == "plan2");
        assert(all.get(2).getName() == "plan3");
    }
}
