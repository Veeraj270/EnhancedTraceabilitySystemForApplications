package com.example.ETSystem.productData;

import com.example.ETSystem.ingredientType.IngredientType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SuppliedGoodRepository extends JpaRepository<SuppliedGood, Long>{
    List<SuppliedGood> findByLabel(String label);
}