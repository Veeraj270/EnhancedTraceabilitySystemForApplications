package com.example.ETSystem.ProductData;

import com.example.ETSystem.ProductData.Exceptions.ProductNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Component
public class ProductDataService {
    private final GTINRepository gtinRepository;

    @Autowired
    public ProductDataService(GTINRepository gtinRepository){
        this.gtinRepository = gtinRepository;
    }

    public ProductData getProductData(@RequestBody String gtin){
        List<ProductData> data = gtinRepository.findAll().stream().filter((productData -> productData.getGtin().equals(gtin))).toList();
        if (data.isEmpty()){
            throw new ProductNotFoundException(gtin);
        }
        return data.get(0);
    }
}
