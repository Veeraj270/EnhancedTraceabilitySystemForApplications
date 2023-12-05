package com.example.ETSystem;

import com.example.ETSystem.product.Product;
import com.example.ETSystem.product.ProductRepository;
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
	CommandLineRunner commandLineRunner(ProductRepository productRepository){
		return args -> {
			ObjectMapper objectMapper = new ObjectMapper();

			Resource mock_data = new ClassPathResource("MOCK_DATA.json");
			byte[] bytes = FileCopyUtils.copyToByteArray(mock_data.getInputStream());
			String string = new String(bytes, StandardCharsets.UTF_8);
			List<Product> products = objectMapper.readValue(string, new TypeReference<List<Product>>() {});

			productRepository.saveAll(products);

		};
	}

}
