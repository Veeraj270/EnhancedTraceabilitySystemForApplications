package com.example.ETSystem.timeline;

import com.example.ETSystem.product.Product;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class TimelineServiceTest{

	@Autowired
	private TimelineService service;
	
	@Test
	void testRoundtrip(){
		/*
		Product owner = service.ownerRepo.save(new Product("a", 1, 1));
		var e2 = service.save(new CreateEvent(1, owner));
		var e3 = service.save(new MoveEvent(2, owner));
		var e1 = service.save(new CreateEvent(0, owner));
		var e4 = service.save(new UseEvent(4, owner));
		assertEquals(service.findAllSorted().toList(), List.of(e1, e2, e3, e4));
		
		Product owner2 = service.ownerRepo.save(new Product("b", 1, 1));
		var e5 = service.save(new CreateEvent(2, owner2));
		var e6 = service.save(new MoveEvent(1, owner2));
		assertEquals(service.findAllByProductSorted(owner).toList(), List.of(e1, e2, e3, e4));
		assertEquals(service.findAllByProductSorted(owner2).toList(), List.of(e6, e5));*/
	}
}