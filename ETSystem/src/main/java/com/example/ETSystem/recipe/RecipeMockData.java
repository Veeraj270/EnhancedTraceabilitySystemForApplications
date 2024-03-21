package com.example.ETSystem.recipe;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
public class RecipeMockData {

    @Autowired
    private IngredientQuantityRepository ingredientQuantityRepository;

    @Autowired RecipeRepository recipeRepository;


    @Transactional
    public void processRecipes() throws Exception{
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode root = objectMapper.readTree(getClass().getResourceAsStream("/MOCK_RECIPES.json"));

        for(JsonNode node : root) {
            String label = node.get("label").asText();
            Set<IngredientQuantity> ingredientQuantities = new HashSet<>();

            for (JsonNode ingredientNode : node.get("ingredients")) {
                long ingredientQuantityId = ingredientNode.asLong();
                IngredientQuantity ingredientQuantity = ingredientQuantityRepository.findById(ingredientQuantityId)
                        .orElseThrow(() -> new RuntimeException("Ingredient Quantity for recipe not found"));
                ingredientQuantities.add(ingredientQuantity);

            }


            Recipe recipe = new Recipe(label, ingredientQuantities);


            recipeRepository.save(recipe);

        }

    }
}
