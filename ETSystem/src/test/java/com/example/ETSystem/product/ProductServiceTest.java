package com.example.ETSystem.product;

import com.example.ETSystem.ingredientType.IngredientType;
import com.example.ETSystem.ingredientType.IngredientTypeRepository;
import com.example.ETSystem.timeline.TimelineService;
import jakarta.transaction.Transactional;
import org.assertj.core.groups.Tuple;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

import java.util.List;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

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

        //Depth 3
        Product p7 = new Product(); p7.setLabel("p7"); p7 = productRepository.save(p7);
        
        //Depth 2
        Product p5 = new Product(); p5.setLabel("p5"); p5 = productRepository.save(p5);
        Product p6 = new Product(); p6.setLabel("p6"); p6.setIntermediaryIds(List.of(p7.getId())); p6 = productRepository.save(p6);
        
        //Depth 1
        Product p2 = new Product(); p2.setLabel("p2"); p2 = productRepository.save(p2);
        Product p3 = new Product(); p3.setLabel("p3"); p3 = productRepository.save(p3);
        Product p4 = new Product(); p4.setLabel("p4"); p4.setIntermediaryIds(List.of(p5.getId(), p6.getId())); p4 = productRepository.save(p4);
        
        //Root
        Product p1 = new Product(); p1.setLabel("p1"); p1.setIntermediaryIds(List.of(p2.getId(), p3.getId(), p4.getId())); p1 = productRepository.save(p1);
        
        //Call method to be tested
        ProductService.Graph graph = productService.getGraph(p1);

        //Check results
        assertThat(graph.nodes())
                .extracting(ProductService.Node::id)
                .containsExactlyInAnyOrder(p1.getId(), p2.getId(), p3.getId(), p4.getId(), p5.getId(), p6.getId(), p7.getId());

        assertThat(graph.edges()).extracting("source", "target").containsExactlyInAnyOrder(
                Tuple.tuple(p2.getId(), p1.getId()),
                Tuple.tuple(p3.getId(), p1.getId()),
                Tuple.tuple(p4.getId(), p1.getId()),
                Tuple.tuple(p5.getId(), p4.getId()),
                Tuple.tuple(p6.getId(), p4.getId()),
                Tuple.tuple(p7.getId(), p6.getId())
        );
    }

    @Test
    @Transactional
    void testExtractAllergens(){
        //Setup
        IngredientType testIType = new IngredientType("test", false, false, Set.of());
        IngredientType p4iType = new IngredientType("flour", true, true, Set.of());
        IngredientType p5iType = new IngredientType("egg", false, false, Set.of("egg"));
        IngredientType p6iType = new IngredientType("milk", false, false, Set.of("milk"));

        ingredientTypeRepository.saveAll(List.of(testIType, p4iType, p5iType, p6iType));

        //Depth 2
        Product p6 = new Product("p6", p6iType);
        p6 = productRepository.save(p6);
        Product p5 = new Product("p5", p5iType);
        p5 = productRepository.save(p5);
        Product p4 = new Product("p4", p4iType);
        p4 = productRepository.save(p4);

        //Depth 1
        Product p3 = new Product("p3", testIType, List.of(p5.getId(), p6.getId()));
        p3 = productRepository.save(p3);
        Product p2 = new Product("p2", testIType, List.of(p4.getId(), p5.getId()));
        p2 = productRepository.save(p2);

        //root
        Product p1 = new Product("p1", testIType, List.of(p2.getId(), p3.getId()));
        p1 = productRepository.save(p1);
        //Test method
        Set<String> allergens = productService.collectAllergens(p1);

        //Check results
        assert(allergens.size() == 2);
        assert(allergens.containsAll(List.of("milk", "egg")));
    }
}