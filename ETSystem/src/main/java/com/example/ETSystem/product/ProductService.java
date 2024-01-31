package com.example.ETSystem.product;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.springframework.http.HttpStatus.NOT_FOUND;

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

        recursiveSearch(root, intermediaries, null);

        return intermediaries;
    }

    public Product getProductByID(Long id){
        if(productRepository.findById(id).isPresent()){
            return productRepository.findById(id).get();
        }
        else{
            throw new ResponseStatusException(NOT_FOUND, "Unable to find product");
        }
    }

    public void recursiveSearch(Product product, List<Product> intermediaries, Product parent){
        List<Long> I = product.getIntermediariesId();

        //Recursive case
        if(!I.isEmpty()){
            for (Long id : I){
                Product p = productRepository.findById(id).get();
                recursiveSearch(p, intermediaries, product);
            }
        }
        intermediaries.add(product);
        if (parent != null){
            product.setParentID(parent.getId());
        }
    }

    public Product editProduct(Long id, Product product){
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        existingProduct.setLabel(product.getLabel());
        existingProduct.setParentID(product.getParentID());
        existingProduct.setIntermediaries(product.getIntermediariesId());
        existingProduct.setMaxQuantity(product.getMaxQuantity());
        existingProduct.setCurrentQuantity(product.getCurrentQuantity());

        return productRepository.save(existingProduct);

    }
}

