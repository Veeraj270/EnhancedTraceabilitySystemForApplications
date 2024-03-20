package com.example.ETSystem.finalProducts;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/finalproducts")
@CrossOrigin
public class FinalProductAPI {
    private final FinalProductService finalProductService;

    @Autowired
    public FinalProductAPI(FinalProductService finalProductService) {
        this.finalProductService = finalProductService;
    }

    @GetMapping(path = "/fetch")
    public List<FinalProduct> getFinalProducts() {
        return finalProductService.getFinalProducts();
    }

    @GetMapping(path = "/fetch-by-id/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public FinalProduct getFinalProductById(@PathVariable("id") String id){
        return finalProductService.getFinalProductByID(Long.parseLong(id));
    }

    @PostMapping(path = "/add")
    public FinalProduct addFinalProduct(@RequestBody FinalProduct newFinalProduct){
        finalProductService.addNewFinalProduct(newFinalProduct);
        return newFinalProduct;
    }

    @PutMapping(path = "/edit/{id}")
    public ResponseEntity<FinalProduct> editFinalProduct(@PathVariable Long id, @RequestBody FinalProduct finalProduct){
        FinalProduct editedProduct = finalProductService.editFinalProduct(id, finalProduct);
        return ResponseEntity.ok(editedProduct);
    }

}
