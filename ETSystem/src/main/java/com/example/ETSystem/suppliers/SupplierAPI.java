package com.example.ETSystem.suppliers;

import com.example.ETSystem.ingredientType.IngredientType;
import com.example.ETSystem.productData.SuppliedGoodRepository;
import com.example.ETSystem.productData.SuppliedGood;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Service
@RestController
@RequestMapping(path = "api/suppliers")
@CrossOrigin(origins = "http://localhost:3000")
public class SupplierAPI {

	private final SupplierRepository supplierRepo;
	private final SuppliedGoodRepository suppliedGoodRepository;

	@Autowired
	public SupplierAPI(SupplierRepository supplierRepo, SuppliedGoodRepository suppliedGoodRepository){
		this.supplierRepo = supplierRepo;
		this.suppliedGoodRepository = suppliedGoodRepository;
	}
	
	// standard getters
	
	@GetMapping("/fetch-suppliers")
	public List<Supplier> getSuppliers(){
		return supplierRepo.findAll();
	}
	
	@GetMapping("/fetch-goods")
	public List<SuppliedGood> getGoods(){
		return suppliedGoodRepository.findAll();
	}
	
	@GetMapping("/fetch-supplier/{id}")
	public Supplier getSupplierById(@PathVariable long id){
		return supplierRepo.findById(id).orElseThrow();
	}
	
	@GetMapping("/fetch-good/{id}")
	public SuppliedGood getGoodById(@PathVariable long id){
		return suppliedGoodRepository.findById(id).orElseThrow();
	}
	
	@GetMapping("/fetch-suppliers-by-search-query/{search}")
	public List<Supplier> getSuppliersBySearchQuery(@PathVariable String search){
		return getSuppliers().stream().filter(x -> x.getName().contains(search)).toList();
	}
	
	@GetMapping("/fetch-goods-by-search-query/{search}")
	public List<SuppliedGood> getGoodsBySearchQuery(@PathVariable String search){
		return getGoods().stream().filter(x -> x.getLabel().contains(search)).toList();
	}
	
	// standard adders
	
	@PostMapping("/add-supplier")
	public Supplier addSupplier(@RequestBody Supplier supplier){
		return supplierRepo.save(supplier);
	}
	
	@PostMapping("/add-good")
	public SuppliedGood addGood(@RequestBody SuppliedGood good){
		return suppliedGoodRepository.save(good);
	}
	
	// other helpers
	
	@GetMapping("/fetch-goods-with-type")
	public List<SuppliedGood> getGoodsWithType(@RequestBody IngredientType type){
		List<SuppliedGood> allGoods = getGoods();
		List<SuppliedGood> filtered = allGoods.stream().filter(suppliedGood -> suppliedGood.getIngredientType().equals(type)).toList();
		return filtered;
	}

}