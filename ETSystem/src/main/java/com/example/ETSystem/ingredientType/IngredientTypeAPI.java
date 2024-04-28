package com.example.ETSystem.ingredientType;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/ingredients")
@CrossOrigin
public class IngredientTypeAPI {

	private final IngredientTypeRepository ingredientTypeRepository;

	@Autowired
	public IngredientTypeAPI(IngredientTypeRepository repo){
		ingredientTypeRepository = repo;
	}
	
	// standard getters
	
	@GetMapping("/fetch-ingredient-types")
	public List<IngredientType> getIngredientTypes(){
		return ingredientTypeRepository.findAll();
	}
	
	@GetMapping("/fetch-ingredient-type/{id}")
	public IngredientType getIngredientTypeById(@PathVariable long id){
		return ingredientTypeRepository.findById(id).orElseThrow();
	}
	
	@GetMapping("/fetch-ingredient-type-by-search-query/{search}")
	public List<IngredientType> getIngredientTypeBySearchQuery(@PathVariable String search){
		return getIngredientTypes().stream().filter(x -> x.getName().contains(search)).toList();
	}
	
	// standard adders
	@Transactional
	@PostMapping("/add-ingredient-type")
	public IngredientType addIngredientType(@RequestBody IngredientType type){
		IngredientType ret = ingredientTypeRepository.save(type);
		return ret;
	}
}