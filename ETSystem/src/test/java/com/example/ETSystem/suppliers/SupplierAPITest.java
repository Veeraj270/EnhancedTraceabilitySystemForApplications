package com.example.ETSystem.suppliers;

import com.example.ETSystem.ingredientType.IngredientType;
import com.example.ETSystem.ingredientType.IngredientTypeAPI;
import com.example.ETSystem.productData.SuppliedGood;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@SpringBootTest
@TestPropertySource(locations = "/application.properties")
public class SupplierAPITest {
	
	@Autowired
	SupplierAPI supplierAPI;
	
	@Autowired
    IngredientTypeAPI ingredientTypeAPI;

	@Autowired
	SupplierService supplierService;

	@Test
	@Transactional
	void testRoundTrip(){
		Supplier testSupplier = new Supplier("testing supplier", new ArrayList<>());

		IngredientType eggsType = ingredientTypeAPI.addIngredientType(new IngredientType("Eggs", true, false, Set.of("egg")));
		SuppliedGood inEggsGood = new SuppliedGood("1653317388987","brown-eggs-20-units", eggsType, 20F, "units", 0);

		supplierService.AddGoodToSupplier(testSupplier, inEggsGood);
		SuppliedGood outEggsGood = supplierAPI.getGoodById(inEggsGood.getId());
		assertEquals("brown-eggs-20-units", outEggsGood.getLabel());
		
		Supplier inA = new Supplier();
		inA.setName("Sainsbury");
		supplierAPI.addSupplier(inA);
		Supplier outA = supplierAPI.getSupplierById(inA.getId());
		assertEquals("Sainsbury", outA.getName());

		Supplier inB = new Supplier();
		inB.setName("Brown and Orange Eggs. Co");
		SuppliedGood eggsGood2 =  new SuppliedGood("1653317388988","brown-eggs-20-units", eggsType, 20F, "units", 0);
		supplierService.AddGoodToSupplier(inB, eggsGood2);
		supplierAPI.addSupplier(inB);

		Supplier outB = supplierAPI.getSupplierById(inB.getId());
		assertEquals(outB.getName(), "Brown and Orange Eggs. Co");
		Assertions.assertIterableEquals(new ArrayList<>(outB.getGoods()), List.of(eggsGood2));
		assertNotEquals(outA, outB);
	}
	
	@Test
	@Transactional
	void testSearchByType(){
		Supplier testSupplier = new Supplier("testing supplier", new ArrayList<>());

		// ingredient types to search by
		IngredientType uniqA = ingredientTypeAPI.addIngredientType(new IngredientType("Unique A", false, false, Set.of())),
				uniqB = ingredientTypeAPI.addIngredientType(new IngredientType("Unique B", false, false, Set.of())),
				unobtainable = ingredientTypeAPI.addIngredientType(new IngredientType("Unobtainium", false, false, Set.of()));
		
		// goods with different types
		SuppliedGood likeA1 = supplierService.AddGoodToSupplier(testSupplier, new SuppliedGood("0000000000000","A-like 1", uniqA, 10F, "kg", 0)),
				likeA2 = supplierService.AddGoodToSupplier(testSupplier, new SuppliedGood("0000000000001","A-like 2", uniqA, 10F, "kg", 0)),
				likeB = supplierService.AddGoodToSupplier(testSupplier, new SuppliedGood("0000000000002","B-like", uniqB, 10F, "kg", 0));
		
		assertEquals(List.of(likeA1, likeA2), supplierAPI.getGoodsWithType(uniqA));
		assertEquals(List.of(likeB), supplierAPI.getGoodsWithType(uniqB));
		assertEquals(List.of(), supplierAPI.getGoodsWithType(unobtainable));
	}
}