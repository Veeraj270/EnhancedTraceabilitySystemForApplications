package com.example.ETSystem.product;


import com.example.ETSystem.timeline.TimelineData;
import com.example.ETSystem.timeline.TimelineEvent;
import com.example.ETSystem.timeline.TimelineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Component
public class ProductService{

	private final ProductRepository productRepository;
	private final TimelineService timelineService;

	@Autowired
	public ProductService(ProductRepository productRepository, TimelineService timelineService){
		this.productRepository = productRepository;
		this.timelineService = timelineService;
	}

	public List<Product> getProducts(){
		return productRepository.findAll();
	}

	public void addNewProduct(Product product){
		productRepository.save(product);
	}

	public List<Product> getProductIntermediaries(long id){
		// Return all (transitive) intermediaries of this product
		List<Product> intermediaries = new ArrayList<>();
		productRepository.findById(id).ifPresent(product -> recursiveSearch(product, intermediaries, null));
		return intermediaries;
	}

	public void recursiveSearch(Product product, List<Product> intermediaries, Product parent){
		for(long id : product.getIntermediaryIds())
			productRepository.findById(id).ifPresent(value -> recursiveSearch(value, intermediaries, product));

		intermediaries.add(product);
		if(parent != null)
			product.setParentID(parent.getId());
	}

	public List<TimelineData> getProductHistory(long id){
		return productRepository.findById(id)
				.map(value -> timelineService.findAllByProductSorted(value).map(TimelineEvent::asData).toList())
				.orElseGet(List::of);
	}



    public Product getProductByID(Long id){
        if(productRepository.findById(id).isPresent()){
            return productRepository.findById(id).get();
        }
        else{
            throw new ResponseStatusException(NOT_FOUND, "Unable to find product");
        }
    }



    public Product editProduct(Long id, Product product){
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        existingProduct.setLabel(product.getLabel());
        existingProduct.setParentID(product.getParentID());
        existingProduct.setIntermediaryIds(product.getIntermediaryIds());
        existingProduct.setMaxQuantity(product.getMaxQuantity());
        existingProduct.setCurrentQuantity(product.getCurrentQuantity());

        return productRepository.save(existingProduct);

    }
}