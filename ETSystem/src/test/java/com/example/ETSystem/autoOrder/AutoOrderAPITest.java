package com.example.ETSystem.autoOrder;


import com.example.ETSystem.customerOrders.CustomerOrder;
import com.example.ETSystem.finalProducts.FinalProduct;
import com.example.ETSystem.ingredientType.IngredientType;
import com.example.ETSystem.recipe.Recipe;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class AutoOrderAPITest {

    private final AutoOrderAPI autoOrderAPI;

    @Autowired
    public AutoOrderAPITest(AutoOrderAPI autoOrderAPI){
        this.autoOrderAPI = autoOrderAPI;
    }

    @Test
    public void testGetAutoGenOrders_SavesToService(){
        //To Do:
    }
}
