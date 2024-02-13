package com.example.ETSystem;

import com.example.ETSystem.product.Product;
import com.example.ETSystem.product.ProductRepository;
import com.example.ETSystem.recipe.IngredientMockData;
import com.example.ETSystem.recipe.IngredientQuantityMockData;
import com.example.ETSystem.timeline.*;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
public class EtSystemApplication{
	
	public static void main(String[] args){
		SpringApplication.run(EtSystemApplication.class, args);
	}
	
	@Bean
	CommandLineRunner commandLineRunner(ProductRepository productRepository, TimelineService timelineService, IngredientMockData ingredientMockData, IngredientQuantityMockData ingredientQuantityMockData){
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



			ingredientMockData.processIngredients();
			ingredientQuantityMockData.processIngredientQuantity();
		};
	}
}