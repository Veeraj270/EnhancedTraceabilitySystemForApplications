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
}
