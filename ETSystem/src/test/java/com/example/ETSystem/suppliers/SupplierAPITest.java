package com.example.ETSystem.suppliers;

import com.example.ETSystem.ingredientType.IngredientType;
import com.example.ETSystem.ingredientType.IngredientTypeAPI;
import com.example.ETSystem.productData.SuppliedGood;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.test.context.TestPropertySource;

import java.util.ArrayList;
import java.util.List;

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
	void testRoundTrip(){
		Supplier testSupplier = new Supplier("testing supplier", new ArrayList<>());

		IngredientType eggsType = ingredientTypeAPI.addIngredientType(new IngredientType("Eggs", true, true, false));
		SuppliedGood inEggsGood = new SuppliedGood("1653317388987","brown-eggs-20-units", eggsType, 20F, "units");

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
		SuppliedGood eggsGood2 =  new SuppliedGood("1653317388988","brown-eggs-20-units", eggsType, 20F, "units");
		supplierService.AddGoodToSupplier(inB, eggsGood2);
		supplierAPI.addSupplier(inB);

		Supplier outB = supplierAPI.getSupplierById(inB.getId());
		assertEquals(outB.getName(), "Brown and Orange Eggs. Co");
		Assertions.assertIterableEquals(new ArrayList<>(outB.getGoods()), List.of(eggsGood2));
		assertNotEquals(outA, outB);
	}
	
	@Test
	void testSearchByType(){
		Supplier testSupplier = new Supplier("testing supplier", new ArrayList<>());

		// ingredient types to search by
		IngredientType uniqA = ingredientTypeAPI.addIngredientType(new IngredientType("Unique A", false, false, false)),
				uniqB = ingredientTypeAPI.addIngredientType(new IngredientType("Unique B", false, false, false)),
				unobtainable = ingredientTypeAPI.addIngredientType(new IngredientType("Unobtainium", false, false, false));
		
		// goods with different types
		SuppliedGood likeA1 = supplierService.AddGoodToSupplier(testSupplier, new SuppliedGood("0000000000000","A-like 1", uniqA, 10F, "kg")),
				likeA2 = supplierService.AddGoodToSupplier(testSupplier, new SuppliedGood("0000000000001","A-like 2", uniqA, 10F, "kg")),
				likeB = supplierService.AddGoodToSupplier(testSupplier, new SuppliedGood("0000000000002","B-like", uniqB, 10F, "kg"));
		
		assertEquals(List.of(likeA1, likeA2), supplierAPI.getGoodsWithType(uniqA));
		assertEquals(List.of(likeB), supplierAPI.getGoodsWithType(uniqB));
		assertEquals(List.of(), supplierAPI.getGoodsWithType(unobtainable));
	}
}