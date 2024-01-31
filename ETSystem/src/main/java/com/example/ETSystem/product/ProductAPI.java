package com.example.ETSystem.product;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;




@RestController
@RequestMapping(path = "api/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductAPI {
    private final ProductService productService;
    private final Logger log = LoggerFactory.getLogger(ProductAPI.class);

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

    @GetMapping(path = "/fetch-product-by-id/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public Product getProductById(@PathVariable("id") String id){
        return productService.getProductByID(Long.parseLong(id));
    }

/*
    @PostMapping(path = "/add")
    public Product addProduct(@RequestBody Product newProduct){
        productService.addNewProduct(newProduct);
        return newProduct;
    }

 */


    @PostMapping("/add")
    Product createGroup(@RequestBody Product product) {
        log.info("Request to add new product: {}", product);
        System.out.println(product);
        productService.addNewProduct(product);
        return product;
    }

    @PutMapping(path = "/edit/{id}")
    public ResponseEntity<Product> editProduct(@PathVariable Long id, @RequestBody Product product){
        log.info("Request to edit product : {}", product);
        Product editedProduct = productService.editProduct(id, product);
        return ResponseEntity.ok(editedProduct);
    }




}
