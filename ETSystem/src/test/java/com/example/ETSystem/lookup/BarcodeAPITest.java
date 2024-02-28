package com.example.ETSystem.lookup;

import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
public class BarcodeAPITest{
	
	@Autowired
	BarcodeAPI bapi;
	
	@Test
	@Transactional
	void testKnownGood() throws JsonProcessingException{
		/*long gtin = 737628064502L;
		BarcodeData riceNoodleData = bapi.lookupByGtin(gtin);
		assertTrue(riceNoodleData.valid());
		assertEquals(riceNoodleData.name(), "Rice Noodles");
		assertEquals(riceNoodleData.gtin(), gtin);*/
	}
}