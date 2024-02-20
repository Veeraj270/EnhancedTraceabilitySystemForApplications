package com.example.ETSystem.ingredientType;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IngredientTypeRepository extends JpaRepository<IngredientType, Long>{
    List<IngredientType> findByName(String name);
}