package com.example.ETSystem.product;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component //Marks this class as service provider
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


    //NEEDS WORK
    public  List<Product> getProductIntermediaries(Long id) {
        //Needs to return a tree datastructures containing the root product and all of its intermediaries
        Product root = productRepository.findById(id).get();
        List<Product> intermediaries = new ArrayList<>();

        recursiveSearch(root, intermediaries);

        return intermediaries;
    }

    public void recursiveSearch(Product product, List<Product> intermediaries){
        List<Long> I = product.getIntermediariesId();

        //Base case
        if (I.isEmpty()){
            //Add itself to intermediaries
            intermediaries.add(product);
        }
        //Recursive case
        else{
            for (Long id : I){
                Product p = productRepository.findById(id).get();
                recursiveSearch(p, intermediaries);
            }
            intermediaries.add(product);
        }
    }
}

