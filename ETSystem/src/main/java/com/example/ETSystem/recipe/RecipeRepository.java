package com.example.ETSystem.recipe;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RecipeRepository extends JpaRepository<Recipe, Long>  {
    Optional<Recipe> findByLabel(String label);
}

