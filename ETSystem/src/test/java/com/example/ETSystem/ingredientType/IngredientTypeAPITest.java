package com.example.ETSystem.ingredientType;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class IngredientTypeAPITest {
	
	@Autowired
    IngredientTypeAPI api;
	
	@Test
	void testRoundtrip(){
		IngredientType inA = new IngredientType("eggs", true, true, false);
		api.addIngredientType(inA);
		IngredientType outA = api.getIngredientTypeById(inA.getId());
		assertEquals(outA.getName(), "eggs");
		assertTrue(outA.getIsAllergen());
		assertTrue(outA.getIsVegetarian());
		assertFalse(outA.getIsVegan());


		IngredientType inB = new IngredientType("flour", false, false, false);
		api.addIngredientType(inB);
		IngredientType outB = api.getIngredientTypeById(inB.getId());
		assertEquals(outB.getName(), "flour");
		assertFalse(outB.getIsAllergen());
		assertFalse(outB.getIsVegetarian());
		assertFalse(outB.getIsVegetarian());

		assertNotEquals(outA, outB);
	}
}