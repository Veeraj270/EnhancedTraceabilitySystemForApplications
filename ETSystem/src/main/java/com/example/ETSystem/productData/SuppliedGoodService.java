package com.example.ETSystem.productData;

import com.example.ETSystem.productData.Exceptions.ProductNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Component
public class SuppliedGoodService {
    private final SuppliedGoodRepository suppliedGoodRepository;

    @Autowired
    public SuppliedGoodService(SuppliedGoodRepository suppliedGoodRepository){
        this.suppliedGoodRepository = suppliedGoodRepository;
    }

    public SuppliedGood getProductData(@RequestBody String gtin){
        List<SuppliedGood> data = suppliedGoodRepository.findAll().stream().filter((productData -> productData.getGtin().equals(gtin))).toList();
        if (data.isEmpty()){
            throw new ProductNotFoundException(gtin);
        }
        return data.get(0);
    }
}
