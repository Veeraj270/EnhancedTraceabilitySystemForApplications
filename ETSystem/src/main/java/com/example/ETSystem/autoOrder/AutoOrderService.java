package com.example.ETSystem.autoOrder;

import com.example.ETSystem.customerOrders.CustomerOrder;
import com.example.ETSystem.customerOrders.CustomerOrderRepository;
import com.example.ETSystem.finalProducts.FinalProduct;
import com.example.ETSystem.recipe.Ingredient;
import com.example.ETSystem.recipe.IngredientQuantity;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.AbstractMap.SimpleEntry;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.stream.Collectors;

@Component
public class AutoOrderService {

    private final CustomerOrderRepository customerOrderRepository;

    @Autowired
    public AutoOrderService(CustomerOrderRepository customerOrderRepository){
        this.customerOrderRepository = customerOrderRepository;
    }

    private List<Entry<Ingredient, Integer>> getIngredients(FinalProduct finalProduct){
        return finalProduct.getRecipe()
                .getIngredients()
                .stream()
                .map(x -> new SimpleEntry<>(x.getIngredient(), x.getQuantity()))
                .collect(Collectors.toList());
    }

    public List<Entry<Ingredient, Integer>> getIngredients(Long id){
        return customerOrderRepository.findById(id)
                .get().getFinalProducts().stream()
                .map(finalProduct -> getIngredients(finalProduct))
                .flatMap(List::stream)
                .collect(Collectors.groupingBy(ingredientQuantity -> ingredientQuantity.getKey())).entrySet()
                .stream()
                .map(entry -> Map.entry(entry.getKey(),
                        entry.getValue().stream().mapToInt(Entry<Ingredient, Integer>::getValue).sum()))
                .collect(Collectors.toList());
    }

}
