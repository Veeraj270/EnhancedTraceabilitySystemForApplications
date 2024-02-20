package com.example.ETSystem.ingredients;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

import java.util.Objects;

@Entity
public class IngredientType{
	
	@Id
	@GeneratedValue
	private long id;
	
	private String name;
	
	private boolean isAllergen;
	
	// veggie, vegan...
	
	public IngredientType(){}
	
	public IngredientType(String name){
		setName(name);
	}
	
	public long getId(){
		return id;
	}
	
	public String getName(){
		return name;
	}
	
	public boolean getIsAllergen(){
		return isAllergen;
	}
	
	public void setId(long id){
		this.id = id;
	}
	
	public void setName(String name){
		this.name = name;
	}
	
	public void setIsAllergen(boolean allergen){
		isAllergen = allergen;
	}
	
	public boolean equals(Object obj){
		return obj instanceof IngredientType other && other.id == id;
	}
	
	public int hashCode(){
		return Objects.hash(id);
	}
	
	public String toString(){
		return "IngredientType{" +
				"id=" + id +
				", name='" + name + '\'' +
				", isAllergen=" + isAllergen +
				'}';
	}
}