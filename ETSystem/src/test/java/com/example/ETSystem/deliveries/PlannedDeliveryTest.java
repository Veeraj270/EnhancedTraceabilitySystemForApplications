package com.example.ETSystem.deliveries;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.Period;
import java.time.ZonedDateTime;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class PlannedDeliveryTest{

	@Autowired
	PlannedDeliveryRepository plannedDeliveries;
	
	@Test
	void testJsonRoundtrip() throws JsonProcessingException{
		PlannedDelivery p = plannedDeliveries.save(new PlannedDelivery("", "", ZonedDateTime.now(), Period.ofDays(1)));
		System.out.println(p);
		ObjectMapper mapper = new ObjectMapper().registerModule(new JavaTimeModule());
		String json = mapper.writeValueAsString(p);
		System.out.println(json);
		PlannedDelivery expected = mapper.readValue(json, PlannedDelivery.class);
		System.out.println(expected);
		assertEquals(expected, p);
	}
}