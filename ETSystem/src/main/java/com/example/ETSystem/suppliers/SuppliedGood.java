package com.example.ETSystem.suppliers;

import com.example.ETSystem.ingredients.IngredientType;
import jakarta.persistence.*;

import java.util.Objects;

@Entity
public class SuppliedGood{
	
	@Id
	@GeneratedValue
	private long id;
	
	// in pence
	private int price, quantity;
	
	@ManyToOne
	private IngredientType ingredientType;
	
	public long getId(){
		return id;
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
				", price=" + price +
				", quantity=" + quantity +
				", ingredientType=" + ingredientType +
				'}';
	}
}