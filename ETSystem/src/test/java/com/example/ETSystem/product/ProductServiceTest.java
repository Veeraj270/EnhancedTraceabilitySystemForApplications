package com.example.ETSystem.product;

import com.example.ETSystem.timeline.TimelineService;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.List;

@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class ProductServiceTest {

    private final ProductRepository productRepository;
    private final ProductService productService;

    @Mock
    private TimelineService timelineService;

    @Autowired
    public ProductServiceTest(ProductRepository productRepository){
        this.productRepository = productRepository;
        this.productService = new ProductService(productRepository, timelineService);
    }

    @BeforeAll
    void before(){
        productRepository.deleteAll();
    }

    @Test
    @Transactional
    void testGetGraph(){
        //Setup
        //Root
        Product p1 = new Product(); p1.setLabel("p1"); p1.setIntermediaryIds(List.of(2L, 3L, 4L)); p1 = productRepository.save(p1);

        //Depth 1
        Product p2 = new Product(); p2.setLabel("p2"); p2 = productRepository.save(p2);
        Product p3 = new Product(); p3.setLabel("p3"); p3 = productRepository.save(p3);
        Product p4 = new Product(); p4.setLabel("p4"); p4.setIntermediaryIds(List.of(5L, 6L)); p4 = productRepository.save(p4);

        //Depth 2
        Product p5 = new Product(); p5.setLabel("p5"); p5 = productRepository.save(p5);
        Product p6 = new Product(); p6.setLabel("p6"); p6.setIntermediaryIds(List.of(7L)); p6 = productRepository.save(p6);

        //Depth 3
        Product p7 = new Product(); p7.setLabel("p7"); p7 = productRepository.save(p7);

        //Call method to be tested
        ProductService.Graph graph = productService.getGraph(p1);

        System.out.println(graph);

        //Check results

    }
}