package com.example.ETSystem.suppliers;

import com.example.ETSystem.ingredientType.IngredientType;
import com.example.ETSystem.ingredientType.IngredientsTypeAPI;
import com.example.ETSystem.productData.SuppliedGood;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

@SpringBootTest
public class SuppliersAPITest{
	
	@Autowired
	SuppliersAPI sapi;
	
	@Autowired
	IngredientsTypeAPI iapi;
	
	@Test
	void testRoundtrip(){
		IngredientType eggsType = iapi.addIngredientType(new IngredientType("Eggs", true, true, false));
		SuppliedGood inEggsGood = new SuppliedGood("1653317388987","brown-eggs-20-units", eggsType, 20F, "units", "Cisco");

		sapi.addGood(inEggsGood);
		SuppliedGood outEggsGood = sapi.getGoodById(inEggsGood.getId());
		assertEquals("brown-eggs-20-units", outEggsGood.getLabel());
		
		Supplier inA = new Supplier();
		inA.setName("Sainsbury");
		sapi.addSupplier(inA);
		Supplier outA = sapi.getSupplierById(inA.getId());
		assertEquals("Sainsbury", outA.getName());
		
		Supplier inB = new Supplier();
		inB.setName("Brown and Orange Eggs. Co");
		inB.setGoods(List.of(outEggsGood));
		sapi.addSupplier(inB);
		Supplier outB = sapi.getSupplierById(inB.getId());
		assertEquals(outB.getName(), "Brown and Orange Eggs. Co");
		Assertions.assertIterableEquals(new ArrayList<>(outB.getGoods()), List.of(outEggsGood));
		
		assertNotEquals(outA, outB);
	}
	
	@Test
	void testSearchByType(){
		// ingredient types to search by
		IngredientType uniqA = iapi.addIngredientType(new IngredientType("Unique A", false, false, false)),
				uniqB = iapi.addIngredientType(new IngredientType("Unique B", false, false, false)),
				unobtainable = iapi.addIngredientType(new IngredientType("Unobtainium", false, false, false));
		
		// goods with different types
		SuppliedGood likeA1 = sapi.addGood(new SuppliedGood("0000000000000","A-like 1", uniqA, 10F, "kg", "supplier")),
				likeA2 = sapi.addGood(new SuppliedGood("0000000000001","A-like 2", uniqA, 10F, "kg", "supplier")),
				likeB = sapi.addGood(new SuppliedGood("0000000000002","B-like", uniqB, 10F, "kg", "supplier"));
		
		assertEquals(List.of(likeA1, likeA2), sapi.getGoodsWithType(uniqA));
		assertEquals(List.of(likeB), sapi.getGoodsWithType(uniqB));
		assertEquals(List.of(), sapi.getGoodsWithType(unobtainable));
	}
}