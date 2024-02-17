package com.example.ETSystem.autoOrder;

import com.example.ETSystem.finalProducts.FinalProduct;
import com.example.ETSystem.recipe.Ingredient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.AbstractMap.SimpleEntry;
import java.util.List;
import java.util.Map.Entry;
import java.util.stream.Collectors;

@Component
public class AutoOrderService {

    @Autowired
    public AutoOrderService(){

    }

    public List<Entry<Ingredient, Integer>> getIngredients(FinalProduct finalProduct){
        return finalProduct.getRecipe()
                .getIngredients()
                .stream()
                .map(x -> new SimpleEntry<>(x.getIngredient(), x.getQuantity()))
                .collect(Collectors.toList());
    }

}
