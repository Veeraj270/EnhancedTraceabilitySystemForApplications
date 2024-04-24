package com.example.ETSystem.bakingSystem;

import com.example.ETSystem.customerOrders.CustomerOrder;
import com.example.ETSystem.customerOrders.CustomerOrderRepository;
import com.example.ETSystem.finalProducts.FinalProduct;
import com.example.ETSystem.finalProducts.FinalProductRepository;
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
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Component
public class BakingSystemService {
    private final ProductRepository productRepository;
    private final TimelineService timelineService;
    private final IngredientTypeRepository iTypeRepository;
    private final FinalProductRepository finalProductRepository;
    private final CustomerOrderRepository customerOrderRepository;

    //The iType for baked products that consist of multiple other products
    private IngredientType compositeIType = new IngredientType("composite", false, false, Set.of());

    @Autowired
    public BakingSystemService(ProductRepository productRepository, TimelineService timelineService, IngredientTypeRepository iTypeRepository, FinalProductRepository finalProductRepository, CustomerOrderRepository customerOrderRepository) throws RuntimeException{
        this.productRepository = productRepository;
        this.timelineService = timelineService;
        this.iTypeRepository = iTypeRepository;
        this.finalProductRepository = finalProductRepository;
        this.customerOrderRepository = customerOrderRepository;

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

    public void useProduct(long id, float newQuantity, List<Product> producedProducts, String location, Float quantityUsed, String userResponsible) throws RuntimeException{
        Optional<Product> optional = productRepository.findById(id);
        if (optional.isEmpty()){
            throw new RuntimeException("Product with id " + id + " not found.");
        }

        Product eventOwner = optional.get();

        //Create a useEvent for the eventOwner
        UseEvent useEvent = new UseEvent(
                ZonedDateTime.now(),
                eventOwner,
                producedProducts,
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
    public Product bakeProduct(FinalProduct finalProduct, List<Long> ingredientIds, String location, String userResponsible, CustomerOrder associatedCustomerOrder){
        //Add new product to the database
        Product product = new Product(
                finalProduct.getLabel(),
                finalProduct.getQuantity(),
                finalProduct.getQuantity(),
                ingredientIds,
                compositeIType,
                associatedCustomerOrder
        );

        //Save the new product
        product = productRepository.save(product);

        //Create the createEvent for the new product
        CreateEvent createEvent = new CreateEvent(
                ZonedDateTime.now(),
                product,
                CreateEvent.CreateType.BAKED,
                location,
                userResponsible
        );

        //Save the new CreateEvent
        timelineService.save(createEvent);

        return product;
    }

    public record UsedProduct(Long productId, float quantityUsed, float newQuantity){}

    public record BakedProduct(Long finalProductId, Long customerOrderId){}

    public record BPStruct(List<UsedProduct> usedProducts,
                           List<BakedProduct> bakedProduct,
                           String location,
                           String userResponsible){}

    public void ProcessBPStruct(BPStruct bpStruct) throws RuntimeException{
        List<UsedProduct> usedProducts = bpStruct.usedProducts();
        List<BakedProduct> bakedProducts = bpStruct.bakedProduct();
        List<Long> ingredientIDs = usedProducts.stream().map(UsedProduct::productId).toList();

        List<Product> newlyAddedProducts = new ArrayList<>();

        for (BakedProduct bakedProduct : bakedProducts){
            //Find the associated final product
            Optional<FinalProduct> optionalP = finalProductRepository.findById(bakedProduct.finalProductId());
            if (optionalP.isEmpty()){
                throw new RuntimeException("Final product with id " + bakedProduct.finalProductId() + " not found.");
            }
            FinalProduct finalProduct = optionalP.get();

            //Check that the associated customerOrder exists
            Optional<CustomerOrder> optionalCO = customerOrderRepository.findById(bakedProduct.customerOrderId());
            if (optionalCO.isEmpty()){
                throw new RuntimeException("Customer order with id " + bakedProduct.customerOrderId() + " not found.");
            }
            CustomerOrder customerOrder = optionalCO.get();

            //Create the new product based of the finalProduct
            newlyAddedProducts.add(bakeProduct(finalProduct, ingredientIDs, bpStruct.location(), bpStruct.userResponsible(), customerOrder));
        }

        for (UsedProduct usedProduct : usedProducts){
            useProduct(usedProduct.productId(), usedProduct.newQuantity() ,newlyAddedProducts, bpStruct.location(), usedProduct.quantityUsed(), bpStruct.userResponsible());
        }
    }


}
