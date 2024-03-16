package com.example.ETSystem;

import com.example.ETSystem.ingredientType.IngredientTypeRepository;
import com.example.ETSystem.productData.SuppliedGoodRepository;
import com.example.ETSystem.productData.MockDataGenerator;
import com.example.ETSystem.customerOrders.CustomerOrderMockData;
import com.example.ETSystem.deliveries.*;
import com.example.ETSystem.finalProducts.FinalProductMockData;
import com.example.ETSystem.product.Product;
import com.example.ETSystem.product.ProductRepository;
import com.example.ETSystem.recipe.IngredientMockData;
import com.example.ETSystem.recipe.IngredientQuantityMockData;
import com.example.ETSystem.recipe.RecipeMockData;
import com.example.ETSystem.suppliers.SupplierService;
import com.example.ETSystem.timeline.*;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Profile;

import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
public class EtSystemApplication{
	
	public static void main(String[] args){
		SpringApplication.run(EtSystemApplication.class, args);
	}

	@ConditionalOnProperty(
			prefix = "command-line-runner", name = "enabled"
	)
	@Bean
	CommandLineRunner commandLineRunner(ProductRepository productRepository,
                                        TimelineService timelineService,
                                        PlannedDeliveryRepository plannedDeliveryRepository,
										DeliveryItemRepository deliveryItemRepository,
										RecordedDeliveryRepository recordedDeliveryRepository,
										SuppliedGoodRepository suppliedGoodRepository,
										IngredientTypeRepository ingredientTypeRepository,
										SupplierService supplierService,
										IngredientMockData ingredientMockData,
										IngredientQuantityMockData ingredientQuantityMockData,
										RecipeMockData recipeMockData,
										FinalProductMockData finalProductMockData,
										CustomerOrderMockData customerOrderMockData
	){
		return args -> {
            ingredientMockData.processIngredients();
            ingredientQuantityMockData.processIngredientQuantity();
            recipeMockData.processRecipes();
            finalProductMockData.processFinalProduct();
            customerOrderMockData.processCustomerOrder();

			//Generate internal gtin database contents
			MockDataGenerator mockDataGenerator = new MockDataGenerator(suppliedGoodRepository, ingredientTypeRepository, supplierService);
			mockDataGenerator.GenerateMockData();

			// Read from MOCK_DATA.json and save all entries to productRepo
			ObjectMapper objectMapper = new ObjectMapper();
			byte[] bytes = EtSystemApplication.class.getClassLoader().getResourceAsStream("MOCK_DATA.json").readAllBytes();
			String string = new String(bytes, StandardCharsets.UTF_8);
			List<Product> products = objectMapper.readValue(string, new TypeReference<>(){ /* keep type info */ });
			productRepository.saveAll(products);
			
			// Add some mock event data - needs further improvement
			Product eventOwner = productRepository.findById(1L).get();
			List<TimelineEvent> list = new ArrayList<>();
			list.add(new CreateEvent(ZonedDateTime.now().plusDays(1), eventOwner));
			list.add(new MoveEvent(ZonedDateTime.now().plusDays(2), eventOwner));
			list.add(new UseEvent(ZonedDateTime.now().plusDays(3), eventOwner));
			list.add(new MoveEvent(ZonedDateTime.now().plusDays(4), eventOwner));
			list.add(new UseEvent(ZonedDateTime.now().plusDays(5), eventOwner));
			list.add(new MoveEvent(ZonedDateTime.now().plusDays(6), eventOwner));
			list.add(new UseEvent(ZonedDateTime.now().plusDays(7), eventOwner));
			timelineService.saveAll(list);


			//Add some mock planned deliveries to the database - for development purposes
			for (int x = 0; x < 6; x ++){
				PlannedDelivery plannedDelivery = new PlannedDelivery("Delivery " + x, "A mock delivery for development purposes", ZonedDateTime.now().plusDays(x));
				List<DeliveryItem> plannedItems = new ArrayList<>();
				for (int i = 1; i < 20 ; i ++){
					DeliveryItem deliveryItem = new DeliveryItem();
					deliveryItem.setGtin(Long.toString(1000000000000L + i));
					deliveryItem.setLabel("Item " + i);
					deliveryItemRepository.save(deliveryItem);
					plannedItems.add(deliveryItem);
				}
				plannedDelivery.setItems(plannedItems);
				plannedDeliveryRepository.save(plannedDelivery);
			}

			//Add some mock recorded deliveries to the database - for development purposes
			for (int x = 1; x < 4; x ++){
				PlannedDelivery plannedDelivery = new PlannedDelivery("Test-Delivery ", "description",ZonedDateTime.now().plusDays(x - 4));
				plannedDelivery.setComplete(true);
				plannedDeliveryRepository.save(plannedDelivery);
				RecordedDelivery recordedDelivery = new RecordedDelivery(plannedDelivery, Instant.now(), Instant.now().plusSeconds(500), new ArrayList<Product>());
				recordedDeliveryRepository.save(recordedDelivery);
			}
		};
	}
}