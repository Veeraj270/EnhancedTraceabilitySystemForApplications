package com.example.ETSystem.product;

import com.example.ETSystem.ingredients.IngredientType;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
public class Product{
	
	@Id
	@GeneratedValue
	private long id;
	
	private String label;
	
	private int maxQuantity, currentQuantity;
	
	private long gtin;
	
	@ElementCollection
	private List<Long> intermediaryIds = new ArrayList<>();
	
	@ManyToOne
	private IngredientType ingredientType;
	
	@Transient
	private transient long parentID;
	
	public Product(String label, int maxQuantity, List<Long> intermediaryIds){
		this.label = label;
		this.maxQuantity = maxQuantity;
		this.intermediaryIds = intermediaryIds;
	}
	
	public Product(String label, int maxQuantity, int currentQuantity){
		this.label = label;
		this.maxQuantity = maxQuantity;
		this.currentQuantity = currentQuantity;
	}
	
	public Product(){}
	
	//Getters
	public long getId(){
		return id;
	}
	
	public String getLabel(){
		return label;
	}
	
	public int getMaxQuantity(){
		return maxQuantity;
	}
	
	public int getCurrentQuantity(){
		return currentQuantity;
	}
	
	public long getGtin(){
		return gtin;
	}
	
	public List<Long> getIntermediaryIds(){
		return intermediaryIds;
	}
	
	public IngredientType getIngredientType(){
		return ingredientType;
	}
	
	public long getParentID(){
		return this.parentID;
	}
	
	//Setters
	public void setLabel(String label){
		this.label = label;
	}
	
	public void setMaxQuantity(int maxQuantity){
		this.maxQuantity = maxQuantity;
	}
	
	public void setCurrentQuantity(int currentQuantity){
		this.currentQuantity = currentQuantity;
	}
	
	public void setGtin(long gtin){
		this.gtin = gtin;
	}
	
	public void setIntermediaryIds(List<Long> intermediaries){
		this.intermediaryIds = intermediaries;
	}
	
	public void setIngredientType(IngredientType ingredientType){
		this.ingredientType = ingredientType;
	}
	
	public void setParentID(long id){
		this.parentID = id;
	}
	
	public boolean equals(Object obj){
		return obj instanceof Product other && Objects.equals(other.id, id);
	}
	
	public int hashCode(){
		return Objects.hashCode(id);
	}
}