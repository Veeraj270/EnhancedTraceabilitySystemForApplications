package com.example.ETSystem.recipe;

import com.example.ETSystem.ingredientType.IngredientType;
import com.example.ETSystem.ingredientType.IngredientTypeRepository;
import jakarta.transaction.Transactional;
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
        Set<IngredientQuantity> savedIQs = new HashSet<>();

        for (int i = 0; i < IQs.size(); i++) {
            IngredientQuantity IQ = IQs.get(i);
            //Check if the ingredient-type already exists

            List<IngredientType> ingredientList = ingredientTypeRepository.findByName(IQ.getIngredientType().getName());
            IngredientType iType;

            if (ingredientList.size() > 1){
                //If there are multiple ingredient types with the same name, throw an exception
                throw new RuntimeException("Multiple ingredient types with the same name exist.");
            }
            else if (ingredientList.isEmpty()){
                //If the ingredient type does not exist, create a new one
                iType = ingredientTypeRepository.save(IQ.getIngredientType());
            }
            else{
                iType = ingredientList.get(0);
            }

            //Update the IQ with the saved iType
            IQ.setIngredientType(iType);

            //Save the IQ
            IngredientQuantity sIQ = ingredientQuantityRepository.save(IQ);


            savedIQs.add(sIQ);
        }

        recipe.setIngredientQuantities(savedIQs);

        recipeRepository.save(recipe);

        return recipe;
    }
}

