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
import org.antlr.v4.runtime.misc.Array2DHashSet;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.web.server.ResponseStatusException;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;


@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class customerOrderServiceTest {
    private final CustomerOrderRepository customerOrderRepository;
    private final CustomerOrderService customerOrderService;
    private final FinalProductRepository finalProductRepository;
    private final RecipeRepository recipeRepository;

    @Autowired
    public customerOrderServiceTest(CustomerOrderRepository customerOrderRepository,
                                    FinalProductRepository finalProductRepository,
                                    RecipeRepository recipeRepository
    ){
        this.customerOrderRepository = customerOrderRepository;
        this.customerOrderService = new CustomerOrderService(customerOrderRepository);
        this.finalProductRepository = finalProductRepository;
        this.recipeRepository = recipeRepository;
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

        //New attributes
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

        System.out.println();

        assert result.getClient().equals(updatedClient);
        assert result.getFinalProducts().equals(updatedFinalProducts);
    }
}
