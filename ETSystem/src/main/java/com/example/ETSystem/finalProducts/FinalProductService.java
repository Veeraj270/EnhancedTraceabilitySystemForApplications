package com.example.ETSystem.finalProducts;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

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

        return finalProductRepository.save(existingFinalProduct);

    }



}
