package com.example.ETSystem.deliveries;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class DeliveryItem{
	
	@Id
	@GeneratedValue
	private long id;
	
	private String label;
	
	private long gtin;
	
	public long getId(){
		return id;
	}
	
	public String getLabel(){
		return label;
	}
	
	public long getGtin(){
		return gtin;
	}
	
	public void setId(long id){
		this.id = id;
	}
	
	public void setLabel(String label){
		this.label = label;
	}
	
	public void setGtin(long gtin){
		this.gtin = gtin;
	}
}
