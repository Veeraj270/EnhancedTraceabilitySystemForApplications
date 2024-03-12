package com.example.ETSystem.deliveries;

import com.example.ETSystem.customerOrders.CustomerOrder;
import com.example.ETSystem.customerOrders.CustomerOrderRepository;
import com.example.ETSystem.ingredientType.IngredientType;
import com.example.ETSystem.ingredientType.IngredientTypeRepository;
import com.example.ETSystem.product.Product;
import com.example.ETSystem.product.ProductRepository;
import com.example.ETSystem.productData.SuppliedGood;
import com.example.ETSystem.timeline.TimelineService;
import jakarta.transaction.Transactional;
import org.assertj.core.groups.Tuple;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static org.assertj.core.api.Assertions.assertThat;


import java.time.Instant;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class DeliveryAPITest {

    PlannedDeliveryRepository plannedDeliveryRepository;
    RecordedDeliveryRepository recordedDeliveryRepository;
    ProductRepository productRepository;
    TimelineService timelineService;
    IngredientTypeRepository ingredientTypeRepository;
    CustomerOrderRepository customerOrderRepository;
    DeliveryItemRepository deliveryItemRepository;
    DeliveryAPI deliveryAPI;

    @Autowired
    public DeliveryAPITest(PlannedDeliveryRepository plannedDeliveryRepository,
                           RecordedDeliveryRepository recordedDeliveryRepository,
                           TimelineService timelineService,
                           ProductRepository productRepository,
                           IngredientTypeRepository ingredientTypeRepository,
                           CustomerOrderRepository customerOrderRepository,
                           DeliveryItemRepository deliveryItemRepository){
        this.plannedDeliveryRepository = plannedDeliveryRepository;
        this.recordedDeliveryRepository = recordedDeliveryRepository;
        this.timelineService = timelineService;
        this.productRepository = productRepository;
        this.ingredientTypeRepository = ingredientTypeRepository;
        this.customerOrderRepository = customerOrderRepository;
        this.deliveryItemRepository = deliveryItemRepository;

        //Clear all repos
        plannedDeliveryRepository.deleteAll();
        recordedDeliveryRepository.deleteAll();
        productRepository.deleteAll();
        ingredientTypeRepository.deleteAll();
        customerOrderRepository.deleteAll();
        deliveryItemRepository.deleteAll();

        this.deliveryAPI = new DeliveryAPI(plannedDeliveryRepository, recordedDeliveryRepository,  timelineService, productRepository);
    }

    @Test
    @Transactional
    public void testAddRecordedWithProducts_AssociatesProductsWithCustomerOrder(){
        //Setup
        PlannedDelivery plan = new PlannedDelivery("name", "description", ZonedDateTime.now());

        CustomerOrder customerOrder = new CustomerOrder("client", ZonedDateTime.now(), ZonedDateTime.now(), new ArrayList<>());
        customerOrder = customerOrderRepository.save(customerOrder);

        //Setup plannedDelivery
        DeliveryItem dItem1 = deliveryItemRepository.save(new DeliveryItem("", "10001"));
        DeliveryItem dItem2 = deliveryItemRepository.save(new DeliveryItem("", "10002"));
        DeliveryItem dItem3 = deliveryItemRepository.save(new DeliveryItem("", "10003"));

        plan.setItems(List.of(dItem1, dItem2,dItem3));
        plan.setAssociatedCustomerOrder(customerOrder);
        plan = plannedDeliveryRepository.save(plan);

        //Setup recordedDeliveryInput
        RecordedDeliveryInput record = new RecordedDeliveryInput();

        IngredientType iType = new IngredientType("iType", false, false, false);
        ingredientTypeRepository.save(iType);

        SuppliedGood sGood1 = new SuppliedGood("10001", "", iType, 1, "kg", 1, 1);
        SuppliedGood sGood2 = new SuppliedGood("10002", "", iType, 1, "kg", 1, 1);
        SuppliedGood sGood3 = new SuppliedGood("10003", "", iType, 1, "kg", 1, 1);
        SuppliedGood sGood4 = new SuppliedGood("10004", "", iType, 1, "kg", 1, 1);
        SuppliedGood sGood5 = new SuppliedGood("10005", "", iType, 1, "kg", 1, 1);

        //This record would be coming from the front-end in areal scenario
        record.setPlan(plan);
        record.setStartTime(Instant.now());
        record.setEndTime(Instant.now());

        record.setRecorded(List.of(sGood5,sGood4,sGood3,sGood2, sGood2,sGood1, sGood1));

        //Call method to be tested
        deliveryAPI.addRecordedWithProducts(record);

        //Check result
        List<Product> savedProducts = productRepository.findAll();

        assertThat(savedProducts).extracting(Product::getGtin, Product::getAssociatedOrder).containsExactlyInAnyOrder(
                Tuple.tuple("10001", customerOrder),
                Tuple.tuple("10001", null),
                Tuple.tuple("10002", customerOrder),
                Tuple.tuple("10002", null),
                Tuple.tuple("10003", customerOrder),
                Tuple.tuple("10004", null),
                Tuple.tuple("10005", null)
        );
    }
}
