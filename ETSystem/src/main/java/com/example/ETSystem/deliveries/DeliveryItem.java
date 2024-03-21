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
	
	private String gtin;

	public DeliveryItem(){};
	public DeliveryItem(String label, String gtin){
		this.label = label;
		this.gtin = gtin;
	}
	
	public long getId(){
		return id;
	}
	
	public String getLabel(){
		return label;
	}
	
	public String getGtin(){
		return gtin;
	}
	
	public void setId(long id){
		this.id = id;
	}
	
	public void setLabel(String label){
		this.label = label;
	}
	
	public void setGtin(String gtin){
		this.gtin = gtin;
	}
}
