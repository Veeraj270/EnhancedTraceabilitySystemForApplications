package com.example.ETSystem.product;

import com.example.ETSystem.ingredientType.IngredientType;
import com.example.ETSystem.ingredientType.IngredientTypeRepository;
import com.example.ETSystem.timeline.TimelineService;
import jakarta.transaction.Transactional;
import org.aspectj.lang.annotation.Before;
import org.assertj.core.groups.Tuple;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.TestPropertySource;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.fail;

@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@TestPropertySource(locations = "/application.properties")
public class ProductServiceTest {
    private final ProductRepository productRepository;
    private ProductService productService;
    private final IngredientTypeRepository ingredientTypeRepository;

    @Mock
    private TimelineService timelineService;

    @Autowired
    public ProductServiceTest(ProductRepository productRepository, IngredientTypeRepository ingredientTypeRepository){
        this.productRepository = productRepository;
        this.productService = new ProductService(productRepository, timelineService);
        this.ingredientTypeRepository = ingredientTypeRepository;
    }

    @BeforeEach
    void before(){
        productRepository.deleteAll();
        ingredientTypeRepository.deleteAll();
        productService = new ProductService(productRepository, timelineService);
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

        //Check results
        assertThat(graph.nodes())
                .extracting(ProductService.Node::id)
                .containsExactlyInAnyOrder(1L,2L,3L,4L,5L,6L,7L);

        assertThat(graph.edges()).extracting("source","target").containsExactlyInAnyOrder(
                Tuple.tuple(2L, 1L),
                Tuple.tuple(3L, 1L),
                Tuple.tuple(4L, 1L),
                Tuple.tuple(5L, 4L),
                Tuple.tuple(6L, 4L),
                Tuple.tuple(7L, 6L)
        );
    }

    @Test
    @Transactional
    void testExtractAllergens(){
        //Setup
        IngredientType testIType = new IngredientType("test", false, false, false);
        IngredientType p4iType = new IngredientType("flour", false, true, true);
        IngredientType p5iType = new IngredientType("egg", true, false, false);
        IngredientType p6iType = new IngredientType("milk", true, false, false);
        ingredientTypeRepository.saveAll(List.of(testIType, p4iType, p5iType, p6iType));

        //Depth 2
        Product p6 = new Product(); p6.setLabel("p6"); p6.setIngredientType(p6iType);
        p6 = productRepository.save(p6);
        Product p5 = new Product(); p5.setLabel("p5"); p5.setIngredientType(p5iType);
        p5 = productRepository.save(p5);
        Product p4 = new Product(); p4.setLabel("p4"); p4.setIngredientType(p4iType);
        p4 = productRepository.save(p4);

        //Depth 1
        Product p3 = new Product(); p3.setLabel("p3");  p3.setIngredientType(testIType); p3.setIntermediaryIds(List.of(p5.getId(), p6.getId()));
        p3 = productRepository.save(p3);
        Product p2 = new Product(); p2.setLabel("p2");  p2.setIngredientType(testIType); p2.setIntermediaryIds(List.of(p4.getId(), p5.getId()));
        p2 = productRepository.save(p2);

        //root
        Product p1 = new Product(); p1.setLabel("p1");  p1.setIngredientType(testIType); p1.setIntermediaryIds(List.of(p2.getId(), p3.getId()));
        p1 = productRepository.save(p1);
        //Test method
        ArrayList<String> allergens = new ArrayList<>();
        ArrayList<Long> explored = new ArrayList<>();

        try {
            productService.extractAllergens(p1, allergens, explored);
        } catch(Exception e){
            assertEquals("", e.getMessage());
            fail();
        }

        //Check results
        assert(allergens.size() == 2);
        assert(allergens.containsAll(List.of("milk", "egg")));
    }
}