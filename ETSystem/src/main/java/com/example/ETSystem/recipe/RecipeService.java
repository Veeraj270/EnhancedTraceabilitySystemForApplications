package com.example.ETSystem.recipe;

import com.example.ETSystem.ingredientType.IngredientType;
import com.example.ETSystem.ingredientType.IngredientTypeRepository;
import jakarta.transaction.Transactional;
import org.aspectj.lang.annotation.Before;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Component
public class RecipeService {

    private final RecipeRepository recipeRepository;

    private final IngredientTypeRepository ingredientTypeRepository;

    private final IngredientQuantityRepository ingredientQuantityRepository;

    @Autowired
    public RecipeService(RecipeRepository recipeRepository,
                         IngredientTypeRepository ingredientRepository,
                         IngredientQuantityRepository ingredientQuantityRepository){
        this.recipeRepository = recipeRepository;
        this.ingredientTypeRepository = ingredientRepository;
        this.ingredientQuantityRepository = ingredientQuantityRepository;
    }

    public List<Recipe> getRecipes(){
        List<Recipe> recipes =  recipeRepository.findAll();
        return recipes;
    }

    @Transactional
    public Recipe addNewRecipe(Recipe recipe) {
        List<IngredientQuantity> IQs = new ArrayList<>(recipe.getIngredientQuantities());

        //Save the IQs
        Set<IngredientQuantity> sIQs = new HashSet<>();
        for (int i = 0; i < IQs.size(); i++) {
            //Save the IQ
            IngredientQuantity IQ = new IngredientQuantity(IQs.get(i).getIngredientType(), IQs.get(i).getQuantity());
            sIQs.add(ingredientQuantityRepository.save(IQ));
        }

        recipe.setIngredientQuantities(sIQs);

        //Save the recipe
        return recipeRepository.save(recipe);
    }
}

