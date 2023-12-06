package com.example.ETSystem;

import com.example.ETSystem.product.Product;
import com.example.ETSystem.product.ProductRepository;
import com.example.ETSystem.timeline.*;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.context.annotation.Bean;
import org.springframework.util.FileCopyUtils;

import java.io.File;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@SpringBootApplication
public class EtSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(EtSystemApplication.class, args);
	}

	@Bean //Indicates the method produces a bean to be managed by the spring container
	CommandLineRunner commandLineRunner(ProductRepository productRepository, TimelineService timelineService){
		return args -> {
			//Code required to read from MOCK_DATA.json and save all entries to productRepo
			ObjectMapper objectMapper = new ObjectMapper();
			byte[] bytes = EtSystemApplication.class.getClassLoader().getResourceAsStream("MOCK_DATA.json").readAllBytes();
			String string = new String(bytes, StandardCharsets.UTF_8);
			List<Product> products = objectMapper.readValue(string, new TypeReference<List<Product>>() {});
			productRepository.saveAll(products);

			//Adding some mock event data - Will need further improvement
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
		};
	}

}
