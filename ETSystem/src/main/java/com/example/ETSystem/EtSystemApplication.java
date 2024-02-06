package com.example.ETSystem;

import com.example.ETSystem.deliveries.DeliveryItem;
import com.example.ETSystem.deliveries.DeliveryItemRepository;
import com.example.ETSystem.deliveries.PlannedDelivery;
import com.example.ETSystem.deliveries.PlannedDeliveryRepository;
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
import java.time.Period;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
public class EtSystemApplication{
	
	public static void main(String[] args){
		SpringApplication.run(EtSystemApplication.class, args);
	}
	
	@Bean
	CommandLineRunner commandLineRunner(ProductRepository productRepository, TimelineService timelineService, PlannedDeliveryRepository plannedDeliveryRepository, DeliveryItemRepository deliveryItemRepository){
		return args -> {
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

			//Adding a single planned delivery to database for development purposes - will need removal at a later data
			PlannedDelivery plannedDelivery = new PlannedDelivery("Delivery 1", "A mock delivery for development purposes", ZonedDateTime.now(), Period.ZERO);
			List<DeliveryItem> plannedItems = new ArrayList<>();

			for (int i = 0; i < 20 ; i ++){
				DeliveryItem deliveryItem = new DeliveryItem();
				deliveryItem.setGtin(1000000 + i);
				deliveryItem.setName("Item " + Integer.toString(i));
				deliveryItemRepository.save(deliveryItem);
				plannedItems.add(deliveryItem);
			}
			plannedDelivery.setItems(plannedItems);
			plannedDeliveryRepository.save(plannedDelivery);
		};
	}
}