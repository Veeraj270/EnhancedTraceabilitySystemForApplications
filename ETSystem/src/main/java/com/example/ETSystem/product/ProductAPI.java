package com.example.ETSystem.product;

import com.example.ETSystem.timeline.TimelineData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/products")
@CrossOrigin
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

	@GetMapping(path = "/fetch-product-history/{id}")
	public List<TimelineData> fetchProductHistory(@PathVariable("id") long id){
		return productService.getProductHistory(id);
	}

	@PostMapping(path = "/add-product")
	public Product addProduct(@RequestBody Product newProduct){
		productService.addNewProduct(newProduct);
		return newProduct;
	}

    @PutMapping(path = "/edit/{id}")
    public ResponseEntity<Product> editProduct(@PathVariable Long id, @RequestBody Product product){
        Product editedProduct = productService.editProduct(id, product);
        return ResponseEntity.ok(editedProduct);
    }

    @GetMapping(path = "/fetch-product-by-id/{id}")
    public Product getProductById(@PathVariable("id") String id){
        return productService.getProductByID(Long.parseLong(id));
    }

	@GetMapping(path = "/fetch-graph/{id}")
	public ProductService.Graph getGraph(@PathVariable("id") String id){
		Product product = productService.getProductByID(Long.parseLong(id));
		return productService.getGraph(product);
	}

	//Used by the new traceability page
	@GetMapping(path = "fetch-trace-data/{id}")
	public ProductService.TraceData getTraceAbilityData(@PathVariable("id") String id) throws Exception {
		try {
			return productService.getTraceabilityData(id);
		} catch (Exception e){
			//This is expected to happen if the product is not found
			if (e.getMessage().equals("product not found")) {
				return new ProductService.TraceData(false,null, null, null);
			}
			//Something back has occurred
			throw new Exception("Exception thrown in getTraceAbilityData: " + e.getMessage());
		}
	}

}


