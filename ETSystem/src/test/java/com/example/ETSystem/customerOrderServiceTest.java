package com.example.ETSystem;

import com.example.ETSystem.customerOrders.CustomerOrder;
import com.example.ETSystem.customerOrders.CustomerOrderRepository;
import com.example.ETSystem.customerOrders.CustomerOrderService;
import com.example.ETSystem.finalProducts.FinalProduct;
import com.example.ETSystem.finalProducts.FinalProductRepository;
import com.example.ETSystem.recipe.IngredientQuantity;
import com.example.ETSystem.recipe.Recipe;
import com.example.ETSystem.recipe.RecipeRepository;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.util.Pair;

import com.example.ETSystem.productData.MockDataGenerator;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class customerOrderServiceTest {
    private final CustomerOrderRepository customerOrderRepository;
    private final CustomerOrderService customerOrderService;
    private final FinalProductRepository finalProductRepository;
    private final RecipeRepository recipeRepository;
    private final MockDataGenerator mockDataGenerator;

    @Autowired
    public customerOrderServiceTest(CustomerOrderRepository customerOrderRepository,
                                    FinalProductRepository finalProductRepository,
                                    RecipeRepository recipeRepository,
                                    MockDataGenerator mockDataGenerator){
        this.customerOrderRepository = customerOrderRepository;
        this.customerOrderService = new CustomerOrderService(customerOrderRepository);
        this.finalProductRepository = finalProductRepository;
        this.recipeRepository = recipeRepository;
        this.mockDataGenerator = mockDataGenerator;
    }

    @BeforeAll
    public void before(){
        customerOrderRepository.deleteAll();
    }

    @Test
    @Transactional
    void testGetCustomerOrders(){
        //Setup
        ArrayList<FinalProduct> finalProducts = new ArrayList<>();
        ArrayList<FinalProduct> finalProducts2 = new ArrayList<>();
        ArrayList<FinalProduct> finalProducts3 = new ArrayList<>();

        CustomerOrder order1 = new CustomerOrder("Cafe1", ZonedDateTime.now(), ZonedDateTime.now().plusDays(7), finalProducts);
        CustomerOrder order2 = new CustomerOrder("Cafe2", ZonedDateTime.now(), ZonedDateTime.now().plusDays(7), finalProducts2);
        CustomerOrder order3 = new CustomerOrder("Cafe3", ZonedDateTime.now(), ZonedDateTime.now().plusDays(7), finalProducts3);

        order1 = customerOrderRepository.save(order1);
        order2 = customerOrderRepository.save(order2);
        order3 = customerOrderRepository.save(order3);

        //Call method to be tested
        List<CustomerOrder> result = customerOrderService.getCustomerOrders();

        //Check result
        assertThat(result)
                .extracting(CustomerOrder::getClient)
                .containsExactlyInAnyOrder("Cafe1", "Cafe2", "Cafe3");
    }

    @Test
    @Transactional
    public void testAddNewCustomerOrder(){
        //Setup
        String client = "client1";
        ZonedDateTime date = ZonedDateTime.now();
        ZonedDateTime deliveryDate = ZonedDateTime.now().plusDays(7);
        ArrayList<FinalProduct> finalProducts = new ArrayList<>();

        CustomerOrder order1 = new CustomerOrder(client, date, deliveryDate, finalProducts);

        //Call method to be tested
        customerOrderService.addNewCustomerOrder(order1);

        //Check result
        CustomerOrder result = customerOrderRepository.findAll().get(0);
        assert result.getClient().equals(client);
        assert result.getDate().equals(date);
        assert result.getDeliveryDate().equals(deliveryDate);
    }

    @Test
    @Transactional
    public void testGetCustomerOrderByID_FindsByID() throws Exception {
        //Setup
        ArrayList<FinalProduct> finalProducts = new ArrayList<>();
        ArrayList<FinalProduct> finalProducts2 = new ArrayList<>();
        ArrayList<FinalProduct> finalProducts3 = new ArrayList<>();

        CustomerOrder order1 = new CustomerOrder("Cafe1", ZonedDateTime.now(), ZonedDateTime.now().plusDays(7), finalProducts);
        CustomerOrder order2 = new CustomerOrder("Cafe2", ZonedDateTime.now(), ZonedDateTime.now().plusDays(7), finalProducts2);
        CustomerOrder order3 = new CustomerOrder("Cafe3", ZonedDateTime.now(), ZonedDateTime.now().plusDays(7), finalProducts3);

        order1 = customerOrderRepository.save(order1);
        order2 = customerOrderRepository.save(order2);
        order3 = customerOrderRepository.save(order3);

        //Call method to be tested
        CustomerOrder result = customerOrderService.getCustomerOrderByID(order2.getID());

        //Check result
        assert result.getClient().equals("Cafe2");
    }

    @Test
    @Transactional
    public void testGetCustomerOrderByID_ThrowsExceptionWhenIDNotFound(){
        //Repo is already empty due to before() method

        //Call method to be tested
        Exception exception = assertThrows(Exception.class, () -> {
            customerOrderService.getCustomerOrderByID(1L);
        });

        //Check result
        assert exception.getMessage().equals("Unable to find customer order");
    }

    @Test
    @Transactional
    public void testEditCustomerOrder_EditsCorrectly(){
        //Setup
        String client = "client1";
        ZonedDateTime date = ZonedDateTime.now();
        ZonedDateTime deliveryDate = ZonedDateTime.now().plusDays(7);
        ArrayList<FinalProduct> finalProducts = new ArrayList<>();

        CustomerOrder order1 = new CustomerOrder(client, date, deliveryDate, finalProducts);

        order1 = customerOrderRepository.save(order1);
        long id = order1.getID();

        //New values
        String updatedClient = "client2";
        Set<IngredientQuantity> IQs = Set.of();
        Recipe recipe = recipeRepository.save(new Recipe("recipe", IQs));
        FinalProduct fProduct = finalProductRepository.save( new FinalProduct("label",1, recipe, 1));
        ArrayList<FinalProduct> updatedFinalProducts = new ArrayList<>(Arrays.asList(fProduct));

        //Edit the order
        order1.setClient(updatedClient);
        order1.setFinalProducts(updatedFinalProducts);

        //Call method to be tested
        customerOrderService.editCustomerOrder(id, order1);

        //Check result
        CustomerOrder result = customerOrderRepository.findById(id).get();

        assert result.getClient().equals(updatedClient);
        assert result.getFinalProducts().equals(updatedFinalProducts);
    }

    @Test
    @Transactional
    public void testGetOrderedFinalProducts(){

        ArrayList<FinalProduct> finalProducts = new ArrayList<>();

        CustomerOrder order1 = new CustomerOrder("Cafe1", ZonedDateTime.now(), ZonedDateTime.now().plusDays(7), finalProducts);

        order1 = customerOrderRepository.save(order1);

        assertEquals(customerOrderService.getOrderedFinalProducts(), List.of());

        FinalProduct finalProduct1 = new FinalProduct();
        FinalProduct finalProduct2 = new FinalProduct();
        FinalProduct finalProduct3 = new FinalProduct();

        ArrayList<FinalProduct> finalProducts2 = new ArrayList<>();
        finalProducts2.add(finalProduct1);
        ArrayList<FinalProduct> finalProducts3 = new ArrayList<>();
        finalProducts3.add(finalProduct2);
        finalProducts3.add(finalProduct3);

        CustomerOrder order2 = new CustomerOrder("Cafe2", ZonedDateTime.now(), ZonedDateTime.now().plusDays(7), finalProducts2);
        CustomerOrder order3 = new CustomerOrder("Cafe3", ZonedDateTime.now(), ZonedDateTime.now().plusDays(7), finalProducts3);

        order2 = customerOrderRepository.save(order2);

        assertEquals(customerOrderService.getOrderedFinalProducts(), List.of(Pair.of(order2, finalProduct1)));

        order3 = customerOrderRepository.save(order3);

        assertEquals(customerOrderService.getOrderedFinalProducts(), List.of(Pair.of(order2, finalProduct1), Pair.of(order3, finalProduct2), Pair.of(order3, finalProduct3)));

    }

    @Test
    @Transactional
    public void testGetFinalProductData(){
        //Setup
        CustomerOrder order1 = new CustomerOrder("order", ZonedDateTime.now(), ZonedDateTime.now().plusDays(7), new ArrayList<>());

        mockDataGenerator.generateAllMockData();

        AddToOrder(order1, 4, "6 x Ultimate Pistachio");
        AddToOrder(order1, 6, "12 x Double Chocolate Crookies");
        AddToOrder(order1, 4, "24 x Rhubarb and Custard Blondie");
        AddToOrder(order1, 8, "6 x Blueberry Muffins");
        customerOrderRepository.save(order1);

        //Call method to be tested
        List<CustomerOrderService.FinalProductData> result = customerOrderService.getFinalProductData();
        System.out.println();


        //Check result

    }

    public void AddToOrder(CustomerOrder order, Integer quantity, String label){
        List<FinalProduct> list =  finalProductRepository.findByLabel(label);

        if (list.size() > 1){
            throw new RuntimeException("Multiple final products with the same label found");
        } else if (list.isEmpty()){
            throw new RuntimeException("No final products with the label found");
        }

        FinalProduct FP = list.get(0);

        for (int i = 0; i < quantity; i++){
            order.getFinalProducts().add(FP);
        }
    }
}
