package com.example.ETSystem.deliveries;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class DeliveryItem{
	
	@Id
	@GeneratedValue
	private long id;
	
	private String name;
	
	private int gtin;
	
	public long getId(){
		return id;
	}
	
	public String getName(){
		return name;
	}
	
	public int getGtin(){
		return gtin;
	}
	
	public void setId(long id){
		this.id = id;
	}
	
	public void setName(String name){
		this.name = name;
	}
	
	public void setGtin(int gtin){
		this.gtin = gtin;
	}
}
