package com.example.ETSystem.suppliers;

import com.example.ETSystem.ingredients.IngredientType;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(path = "api/suppliers")
@CrossOrigin(origins = "http://localhost:3000")
public class SuppliersAPI{

	private final SupplierRepository supplierRepo;
	private final SuppliedGoodRepository goodRepo;
	
	public SuppliersAPI(SupplierRepository supplierRepo, SuppliedGoodRepository goodRepo){
		this.supplierRepo = supplierRepo;
		this.goodRepo = goodRepo;
	}
	
	// standard getters
	
	@GetMapping("/fetch-suppliers")
	public List<Supplier> getSuppliers(){
		return supplierRepo.findAll();
	}
	
	@GetMapping("/fetch-goods")
	public List<SuppliedGood> getGoods(){
		return goodRepo.findAll();
	}
	
	@GetMapping("/fetch-supplier/{id}")
	public Supplier getSupplierById(@PathVariable long id){
		return supplierRepo.findById(id).orElseThrow();
	}
	
	@GetMapping("/fetch-good/{id}")
	public SuppliedGood getGoodById(@PathVariable long id){
		return goodRepo.findById(id).orElseThrow();
	}
	
	@GetMapping("/fetch-suppliers-by-search-query/{search}")
	public List<Supplier> getSuppliersBySearchQuery(@PathVariable String search){
		return getSuppliers().stream().filter(x -> x.getName().contains(search)).toList();
	}
	
	@GetMapping("/fetch-goods-by-search-query/{search}")
	public List<SuppliedGood> getGoodsBySearchQuery(@PathVariable String search){
		return getGoods().stream().filter(x -> x.getName().contains(search)).toList();
	}
	
	// standard adders
	
	@PostMapping("/add-supplier")
	public Supplier addSupplier(@RequestBody Supplier supplier){
		return supplierRepo.save(supplier);
	}
	
	@PostMapping("/add-good")
	public SuppliedGood addGood(@RequestBody SuppliedGood good){
		return goodRepo.save(good);
	}
	
	// other helpers
	
	@GetMapping("/fetch-goods-with-type")
	public List<SuppliedGood> getGoodsWithType(@RequestBody IngredientType type){
		List<SuppliedGood> ret = new ArrayList<>();
		for(SuppliedGood good : getGoods())
			if(type.equals(good.getIngredientType()))
				ret.add(good);
		return ret;
	}
}