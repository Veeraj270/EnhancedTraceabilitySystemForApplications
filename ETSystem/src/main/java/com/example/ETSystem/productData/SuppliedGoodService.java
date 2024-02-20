package com.example.ETSystem.productData;

import com.example.ETSystem.productData.Exceptions.ProductNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Component
public class SuppliedGoodService {
    private final GTINRepository gtinRepository;

    @Autowired
    public SuppliedGoodService(GTINRepository gtinRepository){
        this.gtinRepository = gtinRepository;
    }

    public SuppliedGood getProductData(@RequestBody String gtin){
        List<SuppliedGood> data = gtinRepository.findAll().stream().filter((productData -> productData.getGtin().equals(gtin))).toList();
        if (data.isEmpty()){
            throw new ProductNotFoundException(gtin);
        }
        return data.get(0);
    }
}
