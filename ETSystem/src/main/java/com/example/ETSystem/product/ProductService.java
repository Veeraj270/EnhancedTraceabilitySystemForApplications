package com.example.ETSystem.product;


import com.example.ETSystem.timeline.TimelineEvent;
import com.example.ETSystem.timeline.TimelineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.sql.Time;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@Component //Marks this class as service provider
public class ProductService {
    private final ProductRepository productRepository;
    private final TimelineService timelineService;

    @Autowired
    public ProductService(ProductRepository productRepository, TimelineService timelineService){
        this.productRepository = productRepository;
        this.timelineService = timelineService;
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

    public List<TimelineEvent> getProductHistory(Long id){
        Product product = productRepository.findById(id).get();
        Stream<TimelineEvent> timeline = timelineService.findAllByProductSorted(product);
        return timeline.toList();
    }
}

