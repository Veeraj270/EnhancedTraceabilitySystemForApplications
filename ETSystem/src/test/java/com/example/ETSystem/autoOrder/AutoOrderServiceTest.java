package com.example.ETSystem.autoOrder;

import com.example.ETSystem.customerOrders.CustomerOrder;
import com.example.ETSystem.customerOrders.CustomerOrderService;
import com.example.ETSystem.deliveries.PlannedDelivery;
import com.example.ETSystem.finalProducts.FinalProduct;
import com.example.ETSystem.ingredientType.IngredientType;
import com.example.ETSystem.productData.SuppliedGood;
import com.example.ETSystem.recipe.IngredientQuantity;
import com.example.ETSystem.recipe.Recipe;
import com.example.ETSystem.suppliers.Supplier;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@SpringBootTest
public class AutoOrderServiceTest {
    private final CustomerOrderService customerOrderService;
    private final AutoOrderService autoOrderService;

    //Constructor based dependency injection
    @Autowired
    public AutoOrderServiceTest(
            CustomerOrderService customerOrderService,
            AutoOrderService autoOrderService
    ){
        this.customerOrderService = customerOrderService;
        this.autoOrderService = autoOrderService;
    }

    //UNIT TESTS
    @Test
    void testTotalIngredients(){
        //Setup
        IngredientType iType1 = new IngredientType("flour", false, false, false);
        iType1.setId(1);
        IngredientType iType2 = new IngredientType("sugar", false, false, false);
        iType2.setId(2);

        IngredientQuantity iQuantity1 = new IngredientQuantity(iType1, 100);
        iQuantity1.setId(1L);

        IngredientQuantity iQuantity2 = new IngredientQuantity(iType1, 200);
        iQuantity2.setId(2L);

        IngredientQuantity iQuantity3 = new IngredientQuantity(iType2, 100);
        iQuantity3.setId(3L);

        IngredientQuantity iQuantity4 = new IngredientQuantity(iType2, 200);
        iQuantity4.setId(4L);

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

        assert result.get(0).getIngredientType().getName().equals("flour");
        assert result.get(0).getQuantity() == 900;

        assert result.get(1).getIngredientType().getName().equals("sugar");
        assert result.get(1).getQuantity() == 900;


    }

    @Test
    void testDetermineNumOfEach(){
        //Setup
        List<Float> distinctQuantities = List.of(0.5F, 1F, 2.5F, 5F, 25F);
        float reqAmount = 116.75F;

        //Call method to be tested
        int[] result = autoOrderService.determineNumOfEach(distinctQuantities, reqAmount);

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
    void testDetermineGoods(){
        //Setup
        IngredientType iType = new IngredientType("sugar", false, false, false);

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
        int[] amounts = autoOrderService.determineNumOfEach(distinctQuantities, reqAmount);

        //Call method to be tested
        List<SuppliedGood> result = autoOrderService.determineGoods(matchingGoods, distinctQuantities, amounts);

        //Check it matches expected output - (It chooses each suppliedGood with the lower cost)
        List<SuppliedGood> expectedResult = List.of(good2, good5, good5, good4, good7);
        assert result.containsAll(expectedResult);
    }

    @Test
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
    }}
