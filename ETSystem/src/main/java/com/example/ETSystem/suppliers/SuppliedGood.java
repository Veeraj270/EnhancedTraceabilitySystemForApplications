package com.example.ETSystem.suppliers;

import jakarta.persistence.*;

import java.util.Objects;

@Entity
public class SuppliedGood{
	
	@Id
	@GeneratedValue
	private long id;
	
	private String name;
	
	// in pence
	private int price, quantity;
	
	@ManyToOne
	private IngredientType ingredientType;
	
	public SuppliedGood(){}
	
	public SuppliedGood(String name, IngredientType ingredientType){
		setName(name);
		setIngredientType(ingredientType);
	}
	
	public long getId(){
		return id;
	}
	
	public String getName(){
		return name;
	}
	
	public int getPrice(){
		return price;
	}
	
	public int getQuantity(){
		return quantity;
	}
	
	public IngredientType getIngredientType(){
		return ingredientType;
	}
	
	public void setId(long id){
		this.id = id;
	}
	
	public void setName(String name){
		this.name = name;
	}
	
	public void setPrice(int price){
		this.price = price;
	}
	
	public void setQuantity(int quantity){
		this.quantity = quantity;
	}
	
	public void setIngredientType(IngredientType ingredientType){
		this.ingredientType = ingredientType;
	}
	
	public boolean equals(Object obj){
		return obj instanceof SuppliedGood other && other.id == id;
	}
	
	public int hashCode(){
		return Objects.hash(id);
	}
	
	public String toString(){
		return "SuppliedGood{" +
				"id=" + id +
				", name=" + name +
				", price=" + price +
				", quantity=" + quantity +
				", ingredientType=" + ingredientType +
				'}';
	}
}