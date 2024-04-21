package com.example.ETSystem.finalProducts;


import com.example.ETSystem.ingredientType.IngredientType;
import com.example.ETSystem.recipe.IngredientQuantity;
import com.example.ETSystem.recipe.Recipe;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Component
public class FinalProductService {

    private final FinalProductRepository finalProductRepository;

    @Autowired
    public FinalProductService(com.example.ETSystem.finalProducts.FinalProductRepository finalProductRepository) {
        this.finalProductRepository = finalProductRepository;
    }

    public List<FinalProduct> getFinalProducts(){
        return finalProductRepository.findAll();
    }

    public void addNewFinalProduct(FinalProduct finalProduct){
        finalProductRepository.save(finalProduct);
    }

    public FinalProduct getFinalProductByID(Long id){
        if(finalProductRepository.findById(id).isPresent()){
            return finalProductRepository.findById(id).get();
        }
        else{
            throw new ResponseStatusException(NOT_FOUND, "Unable to find product");
        }
    }

    public FinalProduct editFinalProduct(Long id, FinalProduct finalProduct){
        FinalProduct existingFinalProduct = finalProductRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        existingFinalProduct.setLabel(finalProduct.getLabel());
        existingFinalProduct.setCost(finalProduct.getCost());
        existingFinalProduct.setRecipe(finalProduct.getRecipe());
        existingFinalProduct.setQuantity(finalProduct.getQuantity());

        return finalProductRepository.save(existingFinalProduct);

    }

    public List<IngredientQuantity> getTotalIngredientsById(List<Pair<Long, Integer>> finalProductIds){
        List<FinalProduct> finalProducts =  finalProductIds.stream()
                .map(x -> {
                    FinalProduct finalProduct = this.getFinalProductByID(x.getFirst());
                    finalProduct.setQuantity(x.getSecond());
                    return finalProduct;
                })
                .toList();
        return getTotalIngredients(finalProducts);
    }

    public List<IngredientQuantity> getTotalIngredients(List<FinalProduct> finalProducts){
        ArrayList<IngredientQuantity> iQuantities = new ArrayList<>();
        ArrayList<IngredientQuantity> iTotals = new ArrayList<>();

        //Extract all IngredientQuantities
        for (FinalProduct finalProduct : finalProducts){
            int quantity = finalProduct.getQuantity();
            Recipe recipe = finalProduct.getRecipe();
            for (IngredientQuantity IQ : recipe.getIngredientQuantities()){
                IngredientQuantity newIQ = new IngredientQuantity(IQ.getIngredientType(), IQ.getQuantity() * quantity);
                iQuantities.add(newIQ);
            }
        }

        //Sum up amount of each IngredientType and store result as list of IngredientQuantities
        for (int i = 0; i < iQuantities.size(); i ++){
            IngredientQuantity IQ = iQuantities.get(i);
            if (IQ == null){ continue; }
            IngredientType type = IQ.getIngredientType();
            float total = IQ.getQuantity();
            for (int x = i + 1; x < iQuantities.size(); x ++){
                if (iQuantities.get(x) != null && iQuantities.get(x).getIngredientType().equals(iQuantities.get(i).getIngredientType())){
                    total += iQuantities.get(x).getQuantity();
                    iQuantities.set(x, null);
                }
            }
            iQuantities.set(i, null);
            iTotals.add(new IngredientQuantity(type, total));
        }

        return iTotals;
    }

}
