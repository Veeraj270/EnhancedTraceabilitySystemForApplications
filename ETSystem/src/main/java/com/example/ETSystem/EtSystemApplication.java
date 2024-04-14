package com.example.ETSystem;

import com.example.ETSystem.contracts.ContractDataGenerator;
import com.example.ETSystem.ingredientType.IngredientTypeRepository;
import com.example.ETSystem.productData.SuppliedGoodRepository;
import com.example.ETSystem.productData.MockDataGenerator;
import com.example.ETSystem.customerOrders.CustomerOrderMockData;
import com.example.ETSystem.deliveries.*;
import com.example.ETSystem.finalProducts.FinalProductMockData;
import com.example.ETSystem.product.ProductRepository;
import com.example.ETSystem.recipe.IngredientMockData;
import com.example.ETSystem.recipe.IngredientQuantityMockData;
import com.example.ETSystem.recipe.RecipeMockData;
import com.example.ETSystem.suppliers.SupplierService;
import com.example.ETSystem.timeline.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;

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
	@Autowired
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
										CustomerOrderMockData customerOrderMockData,
										MockDataGenerator mockDataGenerator,
										ContractDataGenerator contractDataGenerator

	){
		return args -> {
            ingredientMockData.processIngredients();
            ingredientQuantityMockData.processIngredientQuantity();
            recipeMockData.processRecipes();
            finalProductMockData.processFinalProduct();
            customerOrderMockData.processCustomerOrder();

			//Generate internal gtin database contents
			mockDataGenerator.generateMockData();
			mockDataGenerator.generateMockProductData();
			contractDataGenerator.generateContractData();

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
				RecordedDelivery recordedDelivery = new RecordedDelivery(plannedDelivery, Instant.now(), Instant.now().plusSeconds(500), new ArrayList<>());
				recordedDeliveryRepository.save(recordedDelivery);
			}
		};
	}
}