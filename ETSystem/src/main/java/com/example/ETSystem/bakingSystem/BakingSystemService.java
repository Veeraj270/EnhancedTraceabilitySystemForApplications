package com.example.ETSystem.bakingSystem;

import com.example.ETSystem.product.Product;
import com.example.ETSystem.product.ProductRepository;
import com.example.ETSystem.timeline.TimelineService;
import com.example.ETSystem.timeline.UseEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.ZonedDateTime;
import java.util.Optional;

@Component
public class BakingSystemService {
    private final ProductRepository productRepository;
    private final TimelineService timelineService;

    @Autowired
    public BakingSystemService(ProductRepository productRepository, TimelineService timelineService){
        this.productRepository = productRepository;
        this.timelineService = timelineService;
    }

    public void useProduct(long id, float newQuantity) throws RuntimeException{
        //Create a useEvent for the product
        Optional<Product> optional = productRepository.findById(id);
        if (optional.isEmpty()){
            throw new RuntimeException("Product with id " + id + " not found.");
        }

        Product eventOwner = optional.get();
        timelineService.save(new UseEvent(ZonedDateTime.now(), eventOwner));

        //Update the product's quantity
        eventOwner.setCurrentQuantity(newQuantity);

        productRepository.save(eventOwner);
    }

    public void bakeProduct(){


    }
}
