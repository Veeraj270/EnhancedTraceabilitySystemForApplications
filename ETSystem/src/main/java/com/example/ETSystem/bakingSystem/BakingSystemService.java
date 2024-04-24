package com.example.ETSystem.bakingSystem;

import com.example.ETSystem.finalProducts.FinalProduct;
import com.example.ETSystem.ingredientType.IngredientType;
import com.example.ETSystem.ingredientType.IngredientTypeRepository;
import com.example.ETSystem.product.Product;
import com.example.ETSystem.product.ProductRepository;
import com.example.ETSystem.timeline.CreateEvent;
import com.example.ETSystem.timeline.TimelineService;
import com.example.ETSystem.timeline.UseEvent;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Component
public class BakingSystemService {
    private final ProductRepository productRepository;
    private final TimelineService timelineService;
    private final IngredientTypeRepository iTypeRepository;

    //The iType for baked products that consist of multiple other products
    private IngredientType compositeIType = new IngredientType("composite", false, false, Set.of());

    @Autowired
    public BakingSystemService(ProductRepository productRepository, TimelineService timelineService, IngredientTypeRepository iTypeRepository) throws RuntimeException{
        this.productRepository = productRepository;
        this.timelineService = timelineService;
        this.iTypeRepository = iTypeRepository;

        //Check if composite iType has been added to the database
        List<IngredientType> res = iTypeRepository.findByName("composite");

        if (res.isEmpty()){
            //If not, add it
            compositeIType = iTypeRepository.save(compositeIType);
        } else if(res.size() > 1){
            throw new RuntimeException("Multiple composite ingredient types found in the database.");
        } else {
            compositeIType = res.get(0);
        }
    }

    public void useProduct(long id, float newQuantity, Product producedProduct, String location, Float quantityUsed, String userResponsible) throws RuntimeException{
        Optional<Product> optional = productRepository.findById(id);
        if (optional.isEmpty()){
            throw new RuntimeException("Product with id " + id + " not found.");
        }

        Product eventOwner = optional.get();

        //Create a useEvent for the eventOwner
        UseEvent useEvent = new UseEvent(
                ZonedDateTime.now(),
                eventOwner,
                producedProduct,
                location,
                quantityUsed,
                userResponsible
        );

        //Save the new event
        timelineService.save(useEvent);

        //Update the product's quantity to reflect the change
        eventOwner.setCurrentQuantity(newQuantity);

        //Save the updated product
        productRepository.save(eventOwner);
    }

    @Transactional
    public void bakeProduct(FinalProduct finalProduct, List<Long> ingredientIds, String location, String userResponsible){
        //Add new product to the database
        Product product = new Product(
                finalProduct.getLabel(),
                finalProduct.getQuantity(),
                finalProduct.getQuantity(),
                compositeIType
        );

        //Create the createEvent for the new product
        CreateEvent createEvent = new CreateEvent(
                ZonedDateTime.now(),
                product,
                CreateEvent.CreateType.BAKED,
                location,
                userResponsible
        );

        //Save the new product and the createEvent
        productRepository.save(product);
        timelineService.save(createEvent);
    }
}
