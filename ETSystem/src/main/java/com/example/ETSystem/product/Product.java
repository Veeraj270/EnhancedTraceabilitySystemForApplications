package com.example.ETSystem.product;

import com.example.ETSystem.customerOrders.CustomerOrder;
import com.example.ETSystem.ingredientType.IngredientType;
import com.example.ETSystem.util.Generated;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import static jakarta.persistence.GenerationType.AUTO;

@Entity
public class Product{
	@Id
	@GeneratedValue(strategy = AUTO)
	private Long id;

	@Column(name = "gtin")
	private String gtin;

	@Column(name = "label", nullable = false)
	private String label;

    @Column
	private float maxQuantity, currentQuantity;

	@ElementCollection
	private List<Long> intermediaryIds = new ArrayList<>();

	@ManyToOne
	private IngredientType ingredientType;
  
    @ManyToOne
	private CustomerOrder associatedCustomerOrder;

	@Transient
	private transient long parentID;

	public Product(){}

	public Product(String label, float maxQuantity, List<Long> intermediaryIds){
		this.label = label;
		this.maxQuantity = maxQuantity;
		this.currentQuantity = maxQuantity;
		this.intermediaryIds = intermediaryIds;
	}

	public Product(String label, float maxQuantity,float currentQuantity){
		this.label = label;
		this.maxQuantity = maxQuantity;
		this.currentQuantity = currentQuantity;
	}

	public Product(String label, float maxQuantity, float currentQuantity, IngredientType iType){
		this.label = label;
		this.maxQuantity = maxQuantity;
		this.currentQuantity = currentQuantity;
		this.ingredientType = iType;
	}

	public Product(String gtin, String label, float maxQuantity, float currentQuantity, List<Long> intermediaryIds, IngredientType iType) {
		this.gtin = gtin;
		this.label = label;
		this.maxQuantity = maxQuantity;
		this.currentQuantity = currentQuantity;
		this.intermediaryIds = intermediaryIds;
		this.ingredientType = iType;
	}

	public Product(String label, float maxQuantity, float currentQuantity, List<Long> intermediaryIds, IngredientType iType, CustomerOrder associatedCustomerOrder) {
		this.label = label;
		this.maxQuantity = maxQuantity;
		this.currentQuantity = currentQuantity;
		this.intermediaryIds = intermediaryIds;
		this.ingredientType = iType;
		this.associatedCustomerOrder = associatedCustomerOrder;
	}

	public Product (String label, IngredientType iType, List<Long> intermediaryIds){
		this.label = label;
		this.ingredientType = iType;
		this.intermediaryIds = intermediaryIds;
	}

	public Product (String label, IngredientType iType){
		this.label = label;
		this.ingredientType = iType;
	}

	//Getters
	public @Generated long getId(){
		return id;
	}
	
	public @Generated String getLabel(){
		return label;
	}
	
	public @Generated float getMaxQuantity(){
		return maxQuantity;
	}
	
	public @Generated float getCurrentQuantity(){
		return currentQuantity;
	}
	
	public @Generated String getGtin(){
		return gtin;
	}

	public @Generated List<Long> getIntermediaryIds(){
		return intermediaryIds;
	}

	public @Generated IngredientType getIngredientType(){
		return ingredientType;
	}

	public @Generated long getParentID(){
		return this.parentID;
	}

	public @Generated CustomerOrder getAssociatedCustomerOrder(){ return this.associatedCustomerOrder; }
	
	//Setters
	public @Generated void setId(long id){
		this.id = id;
	}
	
	public @Generated void setLabel(String label){
		this.label = label;
	}
	
	public @Generated void setMaxQuantity(float maxQuantity){
		this.maxQuantity = maxQuantity;
	}
	
	public @Generated void setCurrentQuantity(float currentQuantity){
		this.currentQuantity = currentQuantity;
	}
	
	public @Generated void setGtin(String gtin){
		this.gtin = gtin;
	}

	public @Generated void setIntermediaryIds(List<Long> intermediaries){
		this.intermediaryIds = intermediaries;
	}

	public @Generated void setIngredientType(IngredientType ingredientType){
		this.ingredientType = ingredientType;
	}

	public @Generated void setParentID(long id){
		this.parentID = id;
	}

	public @Generated void setAssociatedCustomerOrder(CustomerOrder customerOrder){ this.associatedCustomerOrder = customerOrder; }

	//Utility
	
	public @Generated boolean equals(Object obj){
		return obj instanceof Product other && Objects.equals(other.id, id);
	}
	
	public @Generated int hashCode(){
		return Objects.hashCode(id);
	}
}