package com.example.ETSystem.recipe;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.File;

@Component
public class IngredientQuantityMockData {

    @Autowired
    private IngredientRepository ingredientRepository;

    @Autowired
    private IngredientQuantityRepository ingredientQuantityRepository;

    public void processIngredientQuantity() throws Exception{
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode root = objectMapper.readTree(new File(getClass().getResource("/MOCK_INGREDIENT-QUANTITY.json").toURI()));

        for(JsonNode node : root) {
            long ingredientId = node.get("ingredient").asLong();
            int quantity = node.get("quantity").asInt();

            Ingredient ingredient = ingredientRepository.findById(ingredientId)
                    .orElseThrow(() -> new RuntimeException("IngredientId does not match an ingredient"));

            IngredientQuantity ingredientQuantity = new IngredientQuantity();
            ingredientQuantity.setIngredient(ingredient);
            ingredientQuantity.setQuantity(quantity);

            ingredientQuantityRepository.save(ingredientQuantity);
        }
    }
}
