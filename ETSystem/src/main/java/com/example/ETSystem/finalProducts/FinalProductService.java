package com.example.ETSystem.finalProducts;


import com.example.ETSystem.customerOrders.CustomerOrderService;
import com.example.ETSystem.recipe.IngredientQuantity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Set;

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

    public FinalProduct addNewFinalProduct(FinalProduct finalProduct){
        if(finalProductRepository.findByLabel(finalProduct.getLabel()).isEmpty()) {
            return finalProductRepository.save(finalProduct);
        } else {
            throw new IllegalArgumentException("Final product with the same label./g already exists");
        }
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
        FinalProduct existingFinalProduct = getFinalProductByID(id);
        existingFinalProduct.setLabel(finalProduct.getLabel());
        existingFinalProduct.setCost(finalProduct.getCost());
        existingFinalProduct.setRecipe(finalProduct.getRecipe());
        existingFinalProduct.setQuantity(finalProduct.getQuantity());

        return finalProductRepository.save(existingFinalProduct);
    }

    public static class IQData{
        public Long ingredientTypeId;
        public String ingredientName;
        public float quantity;

        public IQData(Long ingredientTypeId, String ingredientName, float quantity){
            this.ingredientTypeId = ingredientTypeId;
            this.ingredientName = ingredientName;
            this.quantity = quantity;
        }

        @Override
        public boolean equals(final Object o) {
            if (this == o) return true;
            if (null == o || this.getClass() != o.getClass()) return false;
            final IQData iqData = (IQData) o;
            return 0 == Float.compare(iqData.quantity, quantity) && Objects.equals(this.ingredientTypeId, iqData.ingredientTypeId) && Objects.equals(this.ingredientName, iqData.ingredientName);
        }
    }

    public List<IQData> getTotalIngredients(List<CustomerOrderService.FPData> finalProductData){
        List<IQData> totals = new ArrayList<>();

        //For each FinalProductData, find the final product by label, and add the ingredients need for the FP * quantity
        for (CustomerOrderService.FPData FPD : finalProductData){
            //Find the final product by label
            List<FinalProduct> list = finalProductRepository.findByLabel(FPD.finalProductLabel);

            if (list.size() == 0){
                throw new ResponseStatusException(NOT_FOUND, "Unable to find product with label" + FPD.finalProductLabel);
            }

            FinalProduct finalProduct = list.get(0);

            //Add the ingredients needed for the final product * quantity to the totals
            Set<IngredientQuantity> IQs = finalProduct.getRecipe().getIngredientQuantities();

            for (IngredientQuantity IQ : IQs){
                IQData toAdd = new IQData(
                        IQ.getIngredientType().getId(),
                        IQ.getIngredientType().getName(),
                        IQ.getQuantity() * FPD.amount
                );

                addIQData(totals, toAdd);
            }
        }
        return totals;
    }

    public void addIQData(List<IQData> totals, IQData IQ){
        for (IQData total : totals){
            if (total.ingredientTypeId == IQ.ingredientTypeId){
                total.quantity += IQ.quantity;
                return;
            }
        }
        totals.add(IQ);
    }
}
