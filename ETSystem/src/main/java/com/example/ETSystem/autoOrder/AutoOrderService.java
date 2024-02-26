package com.example.ETSystem.autoOrder;

import com.example.ETSystem.customerOrders.CustomerOrder;
import com.example.ETSystem.customerOrders.CustomerOrderRepository;
import com.example.ETSystem.customerOrders.CustomerOrderService;
import com.example.ETSystem.deliveries.PlannedDelivery;
import com.example.ETSystem.finalProducts.FinalProduct;
import com.example.ETSystem.ingredientType.IngredientType;
import com.example.ETSystem.recipe.Ingredient;
import com.example.ETSystem.recipe.IngredientQuantity;
import com.example.ETSystem.recipe.Recipe;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.AbstractMap.SimpleEntry;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.stream.Collectors;

@Component
public class AutoOrderService {

    private final CustomerOrderService customerOrderService;

    @Autowired
    public AutoOrderService(CustomerOrderService customerOrderService){
        this.customerOrderService = customerOrderService;
    }

    public PlannedDelivery generateRequiredOrders(CustomerOrder order){
        //Calculate required total of each distinct IngredientQuantity
        List<IngredientQuantity> totals = totalIngredients(order.getFinalProducts());

        //Query suppliers to determine what SuppliedGoods can be bought to match the requirements

        return new PlannedDelivery();
    }

    public List<IngredientQuantity> totalIngredients(List<FinalProduct> finalProducts){
        ArrayList<IngredientQuantity> ingredientQuantities = new ArrayList<>();
        ArrayList<IngredientQuantity> ingredientTotals = new ArrayList<>();

        //Extract all IngredientQuantities
        for (FinalProduct finalProduct : finalProducts){
            int quantity = finalProduct.getQuantity();
            Recipe recipe = finalProduct.getRecipe();

            for (IngredientQuantity IQ : recipe.getIngredientQuantities()){
                ingredientQuantities.add(IQ);
            }
        }

        //Generate array containing totals of each IngredientType (IngredientQuantities)
        for (int i = 0; i < ingredientQuantities.size(); i ++){
            IngredientQuantity IQ = ingredientQuantities.get(i);
            if (IQ == null){ continue; }
            IngredientType type = IQ.getIngredientType();
            int total = IQ.getQuantity();
            for (int x = i + 1; i < ingredientQuantities.size(); i ++){
                if (ingredientQuantities.get(x).equals(ingredientQuantities.get(i))){
                    total += ingredientQuantities.get(x).getQuantity();
                    ingredientQuantities.set(x, null);
                }
            }
            ingredientTotals.add(new IngredientQuantity(type, total));
        }

        return ingredientTotals;
    }











    /* @Autowired
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
    }*/

}
