package com.example.ETSystem;

import com.example.ETSystem.product.Product;
import com.example.ETSystem.product.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@SpringBootApplication
public class EtSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(EtSystemApplication.class, args);
	}

	@Bean //Indicates the method produces a bean to be managed by the spring container
	CommandLineRunner commandLineRunner(ProductRepository productRepository){
		return args -> {
			Product flour = new Product("flour",5);
			Product salt = new Product("salt", 5);
			Product sugar = new Product("sugar", 8);
			//Long[] array = {sugar.getId(), salt.getId(), sugar.getId()};
			Long[] array = {1L,2L,3L};
			List<Long> intermediariesId = new ArrayList<>(Arrays.asList(array));
			Product cake = new Product("cake", 1, intermediariesId);
			productRepository.save(flour);
			productRepository.save(salt);
			productRepository.save(sugar);
			productRepository.save(cake);
		};
	}

}
