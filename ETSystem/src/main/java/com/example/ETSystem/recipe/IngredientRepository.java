package com.example.ETSystem.recipe;

import com.example.ETSystem.ingredientType.IngredientType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IngredientRepository extends JpaRepository<IngredientType, Long>  {
    Optional<IngredientType> findByName(String name);
}
