package com.example.ETSystem.timeline;

import com.example.ETSystem.product.Product;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.ZonedDateTime;
import java.util.List;

import java.time.ZoneId;
import java.time.Instant;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class TimelineServiceTest{

	@Autowired
	private TimelineService service;
	
	@Test
	@Transactional
	void testRoundtrip(){
		Product owner = service.ownerRepo.save(new Product("a", 1, 1));
		Product owner2 = service.ownerRepo.save(new Product("b", 1, 1));
		ZonedDateTime epochUTC = ZonedDateTime.ofInstant(Instant.EPOCH, ZoneId.of("UTC"));
		
		var e2 = service.save(new CreateEvent(epochUTC.plusDays(1), owner, CreateEvent.CreateType.DELIVERED, "w1", "c"));
		var e3 = service.save(new MoveEvent(epochUTC.plusDays(2), owner, "L1", "passageOfTime"));
		var e1 = service.save(new CreateEvent(epochUTC, owner, CreateEvent.CreateType.DELIVERED, "w2", "v"));
		var e4 = service.save(new UseEvent(epochUTC.plusDays(4), owner, List.of(owner2), null, 1, "baker"));
		assertEquals(service.findAllByProductSorted(owner).toList(), List.of(e1, e2, e3, e4));
		
		var e5 = service.save(new CreateEvent(epochUTC.plusDays(2), owner2, CreateEvent.CreateType.BAKED, "k1", "u"));
		var e6 = service.save(new MoveEvent(epochUTC.plusDays(1), owner2, "L2", "passageOfSpace"));
		assertEquals(service.findAllByProductSorted(owner).toList(), List.of(e1, e2, e3, e4));
		assertEquals(service.findAllByProductSorted(owner2).toList(), List.of(e6, e5));
	}
	
	@Test
	@Transactional
	void testCreateEventData(){
		Product owner = service.ownerRepo.save(new Product("a", 100, 100));
		ZonedDateTime epochUTC = ZonedDateTime.ofInstant(Instant.EPOCH, ZoneId.of("UTC"));
		
		TimelineData cLoc = service.save(new CreateEvent(epochUTC, owner, CreateEvent.CreateType.DELIVERED, "warehouse 1", null)).asData();
		assertTrue(cLoc.data().containsKey("location"));
		assertEquals(cLoc.data().get("location"), "warehouse 1");
		assertTrue(cLoc.data().containsKey("createType"));
		assertEquals(cLoc.data().get("createType"), "DELIVERED");
		
		TimelineData cnLoc = service.save(new CreateEvent(epochUTC, owner, CreateEvent.CreateType.BAKED, null, null)).asData();
		assertFalse(cnLoc.data().containsKey("location"));
		assertTrue(cnLoc.data().containsKey("createType"));
		assertEquals(cnLoc.data().get("createType"), "BAKED");
	}
	
	@Test
	@Transactional
	void testMoveEventData(){
		Product owner = service.ownerRepo.save(new Product("a", 100, 100));
		ZonedDateTime epochUTC = ZonedDateTime.ofInstant(Instant.EPOCH, ZoneId.of("UTC"));
		
		TimelineData mDest = service.save(new MoveEvent(epochUTC, owner, "warehouse 2", null)).asData();
		assertTrue(mDest.data().containsKey("destination"));
		assertEquals(mDest.data().get("destination"), "warehouse 2");
		
		TimelineData mnDest = service.save(new MoveEvent(epochUTC, owner, null, null)).asData();
		assertFalse(mnDest.data().containsKey("destination"));
	}
	
	@Test
	@Transactional
	void testUseEventData(){
		Product ingredient = service.ownerRepo.save(new Product("ingredient", 100, 100));
		Product result = service.ownerRepo.save(new Product("result", 100, 100));
		ZonedDateTime epochUTC = ZonedDateTime.ofInstant(Instant.EPOCH, ZoneId.of("UTC"));
		
		TimelineData uRes = service.save(new UseEvent(epochUTC, ingredient, List.of(result), "warehouse 1", 10, null)).asData();
		assertTrue(uRes.data().containsKey("resultIds"));
		assertEquals(uRes.data().get("resultIds"), String.valueOf(List.of(result.getId())));
		assertTrue(uRes.data().containsKey("location"));
		assertEquals(uRes.data().get("location"), "warehouse 1");
		assertTrue(uRes.data().containsKey("quantityUsed"));
		assertEquals(uRes.data().get("quantityUsed"), "10.0");
		
		TimelineData unRes = service.save(new UseEvent(epochUTC, ingredient, null, null, 15, null)).asData();
		assertFalse(unRes.data().containsKey("resultIds"));
		assertFalse(unRes.data().containsKey("location"));
		assertTrue(unRes.data().containsKey("quantityUsed"));
		assertEquals(unRes.data().get("quantityUsed"), "15.0");
	}
}