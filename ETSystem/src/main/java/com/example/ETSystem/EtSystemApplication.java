package com.example.ETSystem;

import com.example.ETSystem.product.Product;
import com.example.ETSystem.product.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class EtSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(EtSystemApplication.class, args);
	}

	@Bean //Indicates the method produces a bean to be managed by the spring container
	CommandLineRunner commandLineRunner(ProductRepository productRepository){
		return args -> {
			Product maria = new Product("flour",5);
			productRepository.save(maria);
		};
	}

}
