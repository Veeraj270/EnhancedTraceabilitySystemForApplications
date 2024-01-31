package com.example.ETSystem.product;

import com.example.ETSystem.timeline.TimelineData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductAPI{

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
    public List<Product> getProductIntermediaries(@PathVariable("id") long id){
        return productService.getProductIntermediaries(id);
    }

    @GetMapping(path = "/fetch-product-history/{id}")
    public List<TimelineData> fetchProductHistory(@PathVariable("id") long id){
        return productService.getProductHistory(id);
    }

    @PostMapping(path = "/add-product")
    public Product addProduct(@RequestBody Product newProduct){
        productService.addNewProduct(newProduct);
        return newProduct;
    }
}