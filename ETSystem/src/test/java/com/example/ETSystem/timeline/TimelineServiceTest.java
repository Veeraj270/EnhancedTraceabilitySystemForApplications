package com.example.ETSystem.timeline;

import com.example.ETSystem.product.Product;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.ZonedDateTime;
import java.util.List;

import java.time.ZonedDateTime;
import java.time.ZoneId;
import java.time.Instant;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class TimelineServiceTest{

	@Autowired
	private TimelineService service;
	
	@Test
	@Transactional
	void testRoundtrip(){
		Product owner = service.ownerRepo.save(new Product("a", 1, 1));
		ZonedDateTime epochUTC = ZonedDateTime.ofInstant(Instant.EPOCH, ZoneId.of("UTC"));

		var e2 = service.save(new CreateEvent(epochUTC.plusDays(1), owner, "c"));
		var e3 = service.save(new MoveEvent(epochUTC.plusDays(2), owner, "L1", "passageOfTime"));
		var e1 = service.save(new CreateEvent(epochUTC, owner, "v"));
		var e4 = service.save(new UseEvent(epochUTC.plusDays(4), owner, "baker"));
		assertEquals(service.findAllByProductSorted(owner).toList(), List.of(e1, e2, e3, e4));
		
		Product owner2 = service.ownerRepo.save(new Product("b", 1, 1));
		var e5 = service.save(new CreateEvent(epochUTC.plusDays(2), owner2, "u"));
		var e6 = service.save(new MoveEvent(epochUTC.plusDays(1), owner2, "L2", "passageOfSpace"));
		assertEquals(service.findAllByProductSorted(owner).toList(), List.of(e1, e2, e3, e4));
		assertEquals(service.findAllByProductSorted(owner2).toList(), List.of(e6, e5));
	}
}