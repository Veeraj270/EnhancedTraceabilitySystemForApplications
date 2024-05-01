package com.example.ETSystem.bakingSystem;

import com.example.ETSystem.customerOrders.CustomerOrder;
import com.example.ETSystem.customerOrders.CustomerOrderRepository;
import com.example.ETSystem.customerOrders.CustomerOrderService;
import com.example.ETSystem.finalProducts.FinalProduct;
import com.example.ETSystem.finalProducts.FinalProductRepository;
import com.example.ETSystem.finalProducts.FinalProductService;
import com.example.ETSystem.ingredientType.IngredientType;
import com.example.ETSystem.ingredientType.IngredientTypeRepository;
import com.example.ETSystem.product.Product;
import com.example.ETSystem.product.ProductRepository;
import com.example.ETSystem.product.ProductService;
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
    private final ProductService productService;
    private final TimelineService timelineService;
    private final FinalProductService finalProductService;
    private final IngredientTypeRepository iTypeRepository;
    private final CustomerOrderService customerOrderService;

    //The iType for baked products that consist of multiple other products
    private IngredientType compositeIType = new IngredientType("composite", false, false, Set.of());

    @Autowired
    public BakingSystemService(ProductService productService, TimelineService timelineService, IngredientTypeRepository iTypeRepository,
                               FinalProductService finalProductService,
                               CustomerOrderService customerOrderService){
        this.productService = productService;
        this.timelineService = timelineService;
        this.finalProductService = finalProductService;
        this.customerOrderService = customerOrderService;
        this.iTypeRepository = iTypeRepository;

        //Check if composite iType has been added to the database
        List<IngredientType> res = iTypeRepository.findByName("composite");

        if (res.isEmpty()){
            //If not, add it
            compositeIType = iTypeRepository.save(compositeIType);
        } else {
            compositeIType = res.get(0);
        }
    }

    public void useProduct(long id, float newQuantity, List<Product> producedProducts, String location, Float quantityUsed, String userResponsible) throws RuntimeException{
        Product eventOwner = productService.getProductByID(id);

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
        productService.addNewProduct(eventOwner);
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
        product = productService.addNewProduct(product);

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

    public record BakedProduct(Integer amount, Long finalProductId, Long customerOrderId){}

    public record BPStruct(List<UsedProduct> usedProducts,
                           List<BakedProduct> bakedProducts,
                           String location,
                           String userResponsible){}

    public void processBPStruct(BPStruct bpStruct){
        List<UsedProduct> usedProducts = bpStruct.usedProducts();
        List<BakedProduct> bakedProducts = bpStruct.bakedProducts();
        List<Long> ingredientIDs = usedProducts.stream().map(UsedProduct::productId).toList();

        List<Product> newlyAddedProducts = new ArrayList<>();

        for (BakedProduct bakedProduct : bakedProducts){
            for (int i = 0; i < bakedProduct.amount(); i ++){
                FinalProduct finalProduct = finalProductService.getFinalProductByID(bakedProduct.finalProductId);
                CustomerOrder customerOrder = customerOrderService.getCustomerOrderByID(bakedProduct.customerOrderId);

                //Create the new product based of the finalProduct
                newlyAddedProducts.add(bakeProduct(finalProduct, ingredientIDs, bpStruct.location(), bpStruct.userResponsible(), customerOrder));
            }
        }

        for (UsedProduct usedProduct : usedProducts){
            useProduct(usedProduct.productId(), usedProduct.newQuantity(), newlyAddedProducts, bpStruct.location(), usedProduct.quantityUsed(), bpStruct.userResponsible());
        }
    }
}
