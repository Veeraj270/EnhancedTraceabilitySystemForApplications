package com.example.ETSystem.suppliers;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

@SpringBootTest
public class SuppliersAPITest{
	
	@Autowired
	SuppliersAPI api;
	
	@Test
	void testRoundtrip(){
		Supplier inA = new Supplier();
		inA.setName("Sainbury");
		api.addSupplier(inA);
		Supplier outA = api.getSupplierById(inA.getId());
		assertEquals(outA.getName(), "Sainbury");
		
		Supplier inB = new Supplier();
		inB.setName("Brown and Orange Eggs. Co");
		api.addSupplier(inB);
		Supplier outB = api.getSupplierById(inB.getId());
		assertEquals(outB.getName(), "Brown and Orange Eggs. Co");
		
		assertNotEquals(outA, outB);
	}
}