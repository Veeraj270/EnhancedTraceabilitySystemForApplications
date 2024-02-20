package com.example.ETSystem.product;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import static jakarta.persistence.GenerationType.AUTO;

@Table(name = "product")
@Entity(name = "Product") //Good practice to be explicit about name
public class Product{
	
	@Id
	@GeneratedValue(strategy = AUTO)
	private Long id;

	@Column(name = "gtin")
	private String gtin;

	@Column(name = "label", nullable = false)
	private String label;
	
	@Column(name = "max_quantity")
	private Integer maxQuantity;
	
	@Column(name = "current_quantity")
	private Integer currentQuantity;
	
	@Column(name = "intermediaries_id")
	@ElementCollection(targetClass = Long.class, fetch = FetchType.EAGER)
	@CollectionTable(name = "intermediaries_id", joinColumns = @JoinColumn(name = "product_id"))
	private List<Long> intermediariesId = new ArrayList<>();


	@Transient
	private Long parentID;
	
	public Product(String label, Integer maxQuantity, List<Long> intermediariesId){
		this.label = label;
		this.maxQuantity = maxQuantity;
		this.intermediariesId = intermediariesId;
	}
	
	public Product(String label, Integer maxQuantity, Integer currentQuantity){
		this.label = label;
		this.maxQuantity = maxQuantity;
		this.currentQuantity = currentQuantity;
	}
	
	public Product(){
	}
	
	//Getters
	public Long getId(){
		return id;
	}
	
	public String getLabel(){
		return label;
	}
	
	public List<Long> getIntermediariesId(){
		return intermediariesId;
	}
	
	public Integer getMaxQuantity(){
		return maxQuantity;
	}
	
	public Integer getCurrentQuantity(){
		return currentQuantity;
	}
	
	public Long getParentID(){
		return this.parentID;
	}
	
	//Setters
	public void setLabel(String label){
		this.label = label;
	}
	
	public void setIntermediaries(List<Long> intermediaries){
		this.intermediariesId = intermediaries;
	}
	
	public void setMaxQuantity(Integer maxQuantity){
		this.maxQuantity = maxQuantity;
	}
	
	public void setCurrentQuantity(Integer currentQuantity){
		this.currentQuantity = currentQuantity;
	}
	
	public void setParentID(Long id){
		this.parentID = id;
	}
	
	public boolean equals(Object obj){
		return obj instanceof Product other && Objects.equals(other.id, id);
	}
	
	public int hashCode(){
		return id.hashCode();
	}
}