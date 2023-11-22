package com.example.ETSystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories("com.example.ETSystem.timeline")
public class EtSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(EtSystemApplication.class, args);
	}

}
