package com.example.ETSystem.product;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service //Marks this class as service provider
public class ProductService {
    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository){
        this.productRepository = productRepository;

    }

    public List<Product> getProducts(){
        List<Product> products =  productRepository.findAll();
        return products;
    }

    public void addNewProduct(Product product) {
        for (Long productId : product.getIntermediariesId()){
            if (!productRepository.existsById(productId)){
                throw new IllegalArgumentException("At least one of the intermediaries of the new product does not exist");
            }
        }
        this.productRepository.save(product);
    }
}
