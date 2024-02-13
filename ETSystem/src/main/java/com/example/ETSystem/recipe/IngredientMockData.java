package com.example.ETSystem.recipe;


import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.File;
import java.util.List;

@Component
public class IngredientMockData {

    @Autowired
    private IngredientRepository ingredientRepository;

    public void processIngredients() throws Exception{

        ObjectMapper objectMapper = new ObjectMapper();

        File ingredientsFile = new File(getClass().getResource("/MOCK_INGREDIENTS.json").toURI());
        List<Ingredient> ingredients = objectMapper.readValue(ingredientsFile, new TypeReference<List<Ingredient>>() {
        });
        ingredientRepository.saveAll(ingredients);

    }
}
