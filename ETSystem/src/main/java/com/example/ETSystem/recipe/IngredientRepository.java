package com.example.ETSystem.recipe;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IngredientRepository extends JpaRepository<Ingredient, Long>  {
    Optional<Ingredient> findByLabel(String label);
}
