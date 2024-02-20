package com.example.ETSystem;

import com.example.ETSystem.ingredientType.IngredientTypeRepository;
import com.example.ETSystem.productData.SuppliedGoodRepository;
import com.example.ETSystem.productData.MockDataGenerator;
import com.example.ETSystem.deliveries.*;
import com.example.ETSystem.product.Product;
import com.example.ETSystem.product.ProductRepository;
import com.example.ETSystem.timeline.*;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

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
	
	@Bean
	CommandLineRunner commandLineRunner(ProductRepository productRepository,
										TimelineService timelineService,
										PlannedDeliveryRepository plannedDeliveryRepository,
										DeliveryItemRepository deliveryItemRepository,
										RecordedDeliveryRepository recordedDeliveryRepository,
										SuppliedGoodRepository suppliedGoodRepository,
										IngredientTypeRepository ingredientTypeRepository
	){
		return args -> {
			//Generate internal gtin database contents
			MockDataGenerator mockDataGenerator = new MockDataGenerator(suppliedGoodRepository, ingredientTypeRepository);
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
			list.add(new CreateEvent(1200L, eventOwner));
			list.add(new MoveEvent(1230L, eventOwner));
			list.add(new UseEvent(1300L, eventOwner));
			list.add(new MoveEvent(1400L, eventOwner));
			list.add(new UseEvent(1430L, eventOwner));
			list.add(new MoveEvent(1530L, eventOwner));
			list.add(new UseEvent(1600L, eventOwner));
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