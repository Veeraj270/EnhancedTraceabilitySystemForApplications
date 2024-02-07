package com.example.ETSystem.suppliers;

import com.example.ETSystem.ingredients.IngredientType;
import com.example.ETSystem.ingredients.IngredientsAPI;
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
	IngredientsAPI iapi;
	
	@Test
	void testRoundtrip(){
		IngredientType eggsType = iapi.addIngredientType(new IngredientType("Eggs"));
		
		SuppliedGood inEggsGood = new SuppliedGood("Brown Eggs", eggsType);
		sapi.addGood(inEggsGood);
		SuppliedGood outEggsGood = sapi.getGoodById(inEggsGood.getId());
		assertEquals(outEggsGood.getName(), "Brown Eggs");
		
		Supplier inA = new Supplier();
		inA.setName("Sainbury");
		sapi.addSupplier(inA);
		Supplier outA = sapi.getSupplierById(inA.getId());
		assertEquals(outA.getName(), "Sainbury");
		
		Supplier inB = new Supplier();
		inB.setName("Brown and Orange Eggs. Co");
		inB.setGoods(List.of(outEggsGood));
		sapi.addSupplier(inB);
		Supplier outB = sapi.getSupplierById(inB.getId());
		assertEquals(outB.getName(), "Brown and Orange Eggs. Co");
		assertEquals(new ArrayList<>(outB.getGoods()), List.of(outEggsGood));
		
		assertNotEquals(outA, outB);
	}
	
	@Test
	void testSearchByType(){
		// ingredient types to search by
		IngredientType uniqA = iapi.addIngredientType(new IngredientType("Unique A")),
				uniqB = iapi.addIngredientType(new IngredientType("Unique B")),
				unobtainable = iapi.addIngredientType(new IngredientType("Unobtainium"));
		
		// goods with different types
		SuppliedGood likeA1 = sapi.addGood(new SuppliedGood("A-like 1", uniqA)),
				likeA2 = sapi.addGood(new SuppliedGood("A-like 2", uniqA)),
				likeB = sapi.addGood(new SuppliedGood("B-like", uniqB));
		
		assertEquals(sapi.getGoodsWithType(uniqA), List.of(likeA1, likeA2));
		assertEquals(sapi.getGoodsWithType(uniqB), List.of(likeB));
		assertEquals(sapi.getGoodsWithType(unobtainable), List.of());
	}
}