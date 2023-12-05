package com.example.ETSystem.product;

import com.example.ETSystem.timeline.TimelineEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping(path = "api/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductAPI {
    private final ProductService productService;

    @Autowired
    public ProductAPI(ProductService productService){
        this.productService = productService;
    }

    @GetMapping(path = "/fetch-products")
    public List<Product> getProducts(){
        return productService.getProducts();
    }

    @GetMapping(path = "/fetch-product-intermediaries/{id}")
    public List<Product> getProductIntermediaries(@PathVariable("id") String id){
        //NEEDS WORK
        System.out.println("getProductIntermediaries request received");
        System.out.println(id);

        Long ID_long = Long.parseLong(id);
        List<Product> list =  productService.getProductIntermediaries(ID_long);
        for (Product product : list){
            System.out.println(product.getParentID());
        }
        return list;
    }

    @GetMapping(path = "/fetch-product-history/{id}")
    public List<TimelineEvent> getProductHistory(@PathVariable("id") String id){
        System.out.println("getProductHistory request received, id:" + id);
        Long ID_long = Long.parseLong(id);
        return productService.getProductHistory(ID_long);
    }

    @PostMapping(path = "/add-product")
    public Product addProduct(@RequestBody Product newProduct){
        productService.addNewProduct(newProduct);
        return newProduct;
    }
}
