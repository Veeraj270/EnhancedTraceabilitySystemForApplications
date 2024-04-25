package com.example.ETSystem.finalProducts;

import com.example.ETSystem.recipe.*;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class FinalProductMockData {

    @Autowired
    private FinalProductRepository finalProductRepository;

    @Autowired
    private RecipeRepository recipeRepository;


    public void processFinalProduct() throws Exception{


    ObjectMapper objectMapper = new ObjectMapper();
    JsonNode root = objectMapper.readTree(getClass().getResourceAsStream("/MOCK_FINALPRODUCTS.json"));

    for(JsonNode node : root) {
        String label = node.get("label").asText();
        float cost = (float)node.get("cost").asDouble();
        int quantity = node.get("quantity").asInt();
        long recipeId = node.get("recipe").asLong();


        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new RuntimeException("RecipeId does not match a recipe"));


        FinalProduct finalProduct = new FinalProduct();
        finalProduct.setLabel(label);
        finalProduct.setCost(cost);
        finalProduct.setQuantity(quantity);
        finalProduct.setRecipe(recipe);

        finalProductRepository.save(finalProduct);


        }
    }
}
