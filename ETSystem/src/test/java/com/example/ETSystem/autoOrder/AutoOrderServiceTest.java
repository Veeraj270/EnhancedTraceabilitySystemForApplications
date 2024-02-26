package com.example.ETSystem.autoOrder;

import com.example.ETSystem.customerOrders.CustomerOrderService;
import com.example.ETSystem.finalProducts.FinalProduct;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class AutoOrderServiceTest {
    private final CustomerOrderService customerOrderService;

    @Autowired
    public AutoOrderServiceTest(CustomerOrderService customerOrderService){
        this.customerOrderService = customerOrderService;
    }

    //Setup

    //Unit Test
    @Test
    void testTotalIngredients(){
        List<FinalProduct>  TFinalProducts = List.of(
                (new FinalProduct()),
                new FinalProduct(),
                new FinalProduct(),
                new FinalProduct(),
                new FinalProduct(),
                new FinalProduct()
        );
    }
}
