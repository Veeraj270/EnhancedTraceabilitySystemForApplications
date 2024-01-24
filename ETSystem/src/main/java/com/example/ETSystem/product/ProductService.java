package com.example.ETSystem.product;


import com.example.ETSystem.timeline.TimelineData;
import com.example.ETSystem.timeline.TimelineEvent;
import com.example.ETSystem.timeline.TimelineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

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
		for(long productId : product.getIntermediariesId())
			if(!productRepository.existsById(productId))
				throw new IllegalArgumentException("At least one of the intermediaries of the new product does not exist");
		productRepository.save(product);
	}
	
	public List<Product> getProductIntermediaries(long id){
		// Return all (transitive) intermediaries of this product
		List<Product> intermediaries = new ArrayList<>();
		productRepository.findById(id).ifPresent(product -> recursiveSearch(product, intermediaries, null));
		return intermediaries;
	}
	
	public void recursiveSearch(Product product, List<Product> intermediaries, Product parent){
		List<Long> cur = product.getIntermediariesId();
		
		for(long id : cur)
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
}