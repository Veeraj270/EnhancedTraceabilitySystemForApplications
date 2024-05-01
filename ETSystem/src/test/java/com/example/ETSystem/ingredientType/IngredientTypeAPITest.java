package com.example.ETSystem.ingredientType;

import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class IngredientTypeAPITest {

	@Autowired
	private final IngredientTypeRepository ingredientTypeRepository;

	@Autowired
	private final IngredientTypeAPI ingredientTypeAPI;

	@Autowired
	public IngredientTypeAPITest(IngredientTypeRepository ingredientTypeRepository, final IngredientTypeAPI ingredientTypeAPI){
		this.ingredientTypeRepository = ingredientTypeRepository;
		this.ingredientTypeAPI = ingredientTypeAPI;
	}

	@BeforeAll
	public void before(){
		ingredientTypeRepository.deleteAll();
	}

	@Test
	@Transactional
	void testRoundTrip() {
		IngredientType inA = new IngredientType("eggs", true, false, Set.of("egg"));
		ingredientTypeAPI.addIngredientType(inA);
		IngredientType outA = ingredientTypeAPI.getIngredientTypeById(inA.getId());
		assertEquals(outA.getName(), "eggs");
		assertFalse(outA.getAllergens().isEmpty());
		assertTrue(outA.getIsVegetarian());
		assertFalse(outA.getIsVegan());


		IngredientType inB = new IngredientType("flour", false, false, Set.of());
		ingredientTypeAPI.addIngredientType(inB);
		IngredientType outB = ingredientTypeAPI.getIngredientTypeById(inB.getId());
		assertEquals(outB.getName(), "flour");
		assertTrue(outB.getAllergens().isEmpty());
		assertFalse(outB.getIsVegetarian());
		assertFalse(outB.getIsVegetarian());

		assertNotEquals(outA, outB);

		List<IngredientType> allIngredientTypes = ingredientTypeAPI.getIngredientTypes();
		assertEquals(allIngredientTypes, List.of(inA, inB));

		List<IngredientType> searchedFlour = ingredientTypeAPI.getIngredientTypeBySearchQuery("flour");
		assertEquals(searchedFlour, List.of(inB));

		List<IngredientType> searchedMilk = ingredientTypeAPI.getIngredientTypeBySearchQuery("milk");
		assertEquals(searchedMilk, List.of());

	}
}