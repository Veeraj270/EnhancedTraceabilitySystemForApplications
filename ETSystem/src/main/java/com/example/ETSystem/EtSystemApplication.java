package com.example.ETSystem;

import com.example.ETSystem.product.Product;
import com.example.ETSystem.product.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
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

			Product rice = new Product("rice", 10, 4);
			Product milk = new Product("milk", 3, 2);
			Product eggs = new Product("eggs", 2, 1);
			Product pasta = new Product("pasta", 4, 3);
			Product butter = new Product("butter", 6, 1);
			Product cheese = new Product("cheese", 7, 2);
			Product tomato = new Product("tomato", 1, 0);
			Product onion = new Product("onion", 1, 0);
			Product apples = new Product("apples", 3, 1);
			Product oranges = new Product("oranges", 2, 1);
			Product carrots = new Product("carrots", 1, 1);
			Product lettuce = new Product("lettuce", 2, 0);
			Product coffee = new Product("coffee", 8, 3);
			Product tea = new Product("tea", 4, 2);
			Product chocolate = new Product("chocolate", 3, 2);
			Product yogurt = new Product("yogurt", 2, 1);
			Product iceCream = new Product("ice cream", 5, 2);

			productRepository.save(rice);
			productRepository.save(milk);
			productRepository.save(eggs);
			productRepository.save(pasta);
			productRepository.save(butter);
			productRepository.save(cheese);
			productRepository.save(tomato);
			productRepository.save(onion);
			productRepository.save(apples);
			productRepository.save(oranges);
			productRepository.save(carrots);
			productRepository.save(lettuce);
			productRepository.save(coffee);
			productRepository.save(tea);
			productRepository.save(chocolate);
			productRepository.save(yogurt);
			productRepository.save(iceCream);

			Long[] array = {1L,2L,3L};
			List<Long> intermediariesId = new ArrayList<>(Arrays.asList(array));
			Product cake = new Product("cake", 1, intermediariesId);

			productRepository.save(cake);


		};
	}

}
