package com.example.ETSystem.recipe;


import com.example.ETSystem.ingredientType.IngredientType;
import com.example.ETSystem.ingredientType.IngredientTypeRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class IngredientMockData {

    @Autowired
    private IngredientTypeRepository ingredientTypeRepository;

    public void processIngredients() throws Exception{
        ObjectMapper objectMapper = new ObjectMapper();
        List<IngredientType> ingredients = objectMapper.readValue((getClass().getResourceAsStream("/MOCK_INGREDIENTS.json")), new TypeReference<>() {});
        ingredientTypeRepository.saveAll(ingredients);
    }
}
