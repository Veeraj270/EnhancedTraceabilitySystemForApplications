package com.example.ETSystem.finalProduct;

import com.example.ETSystem.customerOrders.CustomerOrderService;
import com.example.ETSystem.finalProducts.FinalProductRepository;
import com.example.ETSystem.finalProducts.FinalProductService;
import com.example.ETSystem.productData.MockDataGenerator;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

import java.util.List;

@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@TestPropertySource(locations = "/application.properties")
public class finalProductServiceTest {
    private final FinalProductService finalProductService;
    private final MockDataGenerator mockDataGenerator;

    @Autowired
    public finalProductServiceTest(FinalProductService finalProductService, MockDataGenerator mockDataGenerator) {
        this.finalProductService = finalProductService;
        this.mockDataGenerator = mockDataGenerator;
    }

    //Written for dev purposes - needs finishing later
    @Test
    @Transactional
    public void testGetTotalIngredients(){
       /* //Setup
        mockDataGenerator.generateAllMockData();

        CustomerOrderService.FPData fpData = new CustomerOrderService.FPData(,"6 x Ultimate Pistachio", 6, 1);
        List<CustomerOrderService.FPData> inputData = List.of(fpData);
        //Test
        List<FinalProductService.IQData>  result =  finalProductService.getTotalIngredients(inputData);

        System.out.println();
        //Check results*/
    }
}
