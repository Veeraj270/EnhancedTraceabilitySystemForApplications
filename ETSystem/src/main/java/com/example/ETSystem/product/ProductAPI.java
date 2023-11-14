package com.example.ETSystem.product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/products")
public class ProductAPI {
    private final ProductService productService;

    @Autowired
    public ProductAPI(ProductService productService){
        this.productService = productService;
    }

    @GetMapping
    public List<Product> getProducts(){
        return productService.getProducts();
    }

    @PostMapping(path = "/add")
    public Product addProduct(@RequestBody Product newProduct){
        productService.addNewProduct(newProduct);
        return newProduct;
    }
}
