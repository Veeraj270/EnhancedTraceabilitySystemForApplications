package com.example.ETSystem.product;

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

    @PostMapping(path = "/add")
    public Product addProduct(@RequestBody Product newProduct){
        productService.addNewProduct(newProduct);
        return newProduct;
    }
}
