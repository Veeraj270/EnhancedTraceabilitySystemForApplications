package com.example.ETSystem.product;

import com.example.ETSystem.customerOrders.CustomerOrder;
import com.example.ETSystem.ingredientType.IngredientType;
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

	public Product(String gtin, String label, float maxQuantity, float currentQuantity, List<Long> intermediaryIds, IngredientType ingredientType) {
		this.gtin = gtin;
		this.label = label;
		this.maxQuantity = maxQuantity;
		this.currentQuantity = currentQuantity;
		this.intermediaryIds = intermediaryIds;
		this.ingredientType = ingredientType;
	}
	
	//Getters
	public long getId(){
		return id;
	}
	
	public String getLabel(){
		return label;
	}
	
	public float getMaxQuantity(){
		return maxQuantity;
	}
	
	public float getCurrentQuantity(){
		return currentQuantity;
	}
	
	public String getGtin(){
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

	public CustomerOrder getAssociatedCustomerOrder(){ return this.associatedCustomerOrder; }
	
	//Setters
	public void setLabel(String label){
		this.label = label;
	}
	
	public void setMaxQuantity(float maxQuantity){
		this.maxQuantity = maxQuantity;
	}
	
	public void setCurrentQuantity(float currentQuantity){
		this.currentQuantity = currentQuantity;
	}
	
	public void setGtin(String gtin){
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

	public void setAssociatedCustomerOrder(CustomerOrder customerOrder){ this.associatedCustomerOrder = customerOrder; }

	//Utility
	
	public boolean equals(Object obj){
		return obj instanceof Product other && Objects.equals(other.id, id);
	}
	
	public int hashCode(){
		return Objects.hashCode(id);
	}
}