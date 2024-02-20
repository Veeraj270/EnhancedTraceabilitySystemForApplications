package com.example.ETSystem.ingredientType;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class IngredientsTypeAPITest {
	
	@Autowired
	IngredientsTypeAPI api;
	
	@Test
	void testRoundtrip(){
		IngredientType inA = new IngredientType();
		inA.setName("Eggs");
		inA.setIsAllergen(true);
		api.addIngredientType(inA);
		IngredientType outA = api.getIngredientTypeById(inA.getId());
		assertEquals(outA.getName(), "Eggs");
		assertTrue(outA.getIsAllergen());
		
		IngredientType inB = new IngredientType();
		inB.setName("Flour");
		inB.setIsAllergen(false);
		api.addIngredientType(inB);
		IngredientType outB = api.getIngredientTypeById(inB.getId());
		assertEquals(outB.getName(), "Flour");
		assertFalse(outB.getIsAllergen());
		
		assertNotEquals(outA, outB);
	}
}