package com.example.ETSystem.deliveries;

import com.example.ETSystem.util.Generated;
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
	
	public @Generated long getId(){
		return id;
	}
	
	public @Generated String getLabel(){
		return label;
	}
	
	public @Generated String getGtin(){
		return gtin;
	}
	
	public @Generated void setId(long id){
		this.id = id;
	}
	
	public @Generated void setLabel(String label){
		this.label = label;
	}
	
	public @Generated void setGtin(String gtin){
		this.gtin = gtin;
	}
}
