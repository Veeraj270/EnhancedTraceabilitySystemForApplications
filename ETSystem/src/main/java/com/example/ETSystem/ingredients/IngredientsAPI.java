package com.example.ETSystem.ingredients;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/ingredients")
@CrossOrigin(origins = "http://localhost:3000")
public class IngredientsAPI{

	private final IngredientTypeRepository ingredientTypeRepo;
	
	public IngredientsAPI(IngredientTypeRepository repo){
		ingredientTypeRepo = repo;
	}
	
	// standard getters
	
	@GetMapping("/fetch-ingredient-types")
	public List<IngredientType> getIngredientTypes(){
		return ingredientTypeRepo.findAll();
	}
	
	@GetMapping("/fetch-ingredient-type/{id}")
	public IngredientType getIngredientTypeById(@PathVariable long id){
		return ingredientTypeRepo.findById(id).orElseThrow();
	}
	
	@GetMapping("/fetch-ingredient-type-by-search-query/{search}")
	public List<IngredientType> getIngredientTypeBySearchQuery(@PathVariable String search){
		return getIngredientTypes().stream().filter(x -> x.getName().contains(search)).toList();
	}
	
	// standard adders
	
	@PostMapping("/add-ingredient-type")
	public IngredientType addIngredientType(@RequestBody IngredientType type){
		return ingredientTypeRepo.save(type);
	}
}