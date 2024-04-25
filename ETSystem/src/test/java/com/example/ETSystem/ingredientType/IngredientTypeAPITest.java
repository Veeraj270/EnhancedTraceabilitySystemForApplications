package com.example.ETSystem.ingredientType;

import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class IngredientTypeAPITest {
	
	@Autowired
    IngredientTypeAPI api;
	
	@Test
	@Transactional
	void testRoundtrip(){
		IngredientType inA = new IngredientType("eggs", true, false, Set.of("egg"));
		api.addIngredientType(inA);
		IngredientType outA = api.getIngredientTypeById(inA.getId());
		assertEquals(outA.getName(), "eggs");
		assertFalse(outA.getAllergens().isEmpty());
		assertTrue(outA.getIsVegetarian());
		assertFalse(outA.getIsVegan());


		IngredientType inB = new IngredientType("flour", false, false, Set.of());
		api.addIngredientType(inB);
		IngredientType outB = api.getIngredientTypeById(inB.getId());
		assertEquals(outB.getName(), "flour");
		assertTrue(outB.getAllergens().isEmpty());
		assertFalse(outB.getIsVegetarian());
		assertFalse(outB.getIsVegetarian());

		assertNotEquals(outA, outB);
	}
}