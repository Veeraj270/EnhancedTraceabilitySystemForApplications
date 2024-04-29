package com.example.ETSystem;

import com.example.ETSystem.contracts.ContractDataGenerator;
import com.example.ETSystem.ingredientType.IngredientTypeRepository;
import com.example.ETSystem.productData.SuppliedGoodRepository;
import com.example.ETSystem.productData.MockDataGenerator;
import com.example.ETSystem.deliveries.*;
import com.example.ETSystem.product.ProductRepository;
import com.example.ETSystem.suppliers.SupplierService;
import com.example.ETSystem.timeline.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;

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
	CommandLineRunner commandLineRunner(MockDataGenerator mockDataGenerator,
                                        ContractDataGenerator contractDataGenerator


    ){
		return args -> {
			mockDataGenerator.generateAllMockData();
            contractDataGenerator.generateContractData();

        };
	}
}