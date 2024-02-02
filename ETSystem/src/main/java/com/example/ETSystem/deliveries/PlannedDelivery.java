package com.example.ETSystem.deliveries;

import jakarta.persistence.*;

import java.time.Period;
import java.time.ZonedDateTime;
import java.util.List;

@Entity
public class PlannedDelivery{
	
	@Id
	@GeneratedValue
	private long id;
	
	private String name, description;
	
	private ZonedDateTime deliveryTime;
	
	private Period deliveryInterval;
	
	@OneToMany
	private List<DeliveryItem> items;
	
	public long getId(){
		return id;
	}
	
	public String getName(){
		return name;
	}
	
	public String getDescription(){
		return description;
	}
	
	public ZonedDateTime getDeliveryTime(){
		return deliveryTime;
	}
	
	public Period getDeliveryInterval(){
		return deliveryInterval;
	}
	
	public List<DeliveryItem> getItems(){
		return items;
	}
	
	public void setId(long id){
		this.id = id;
	}
	
	public void setName(String name){
		this.name = name;
	}
	
	public void setDescription(String description){
		this.description = description;
	}
	
	public void setDeliveryTime(ZonedDateTime deliveryTime){
		this.deliveryTime = deliveryTime;
	}
	
	public void setDeliveryInterval(Period deliveryInterval){
		this.deliveryInterval = deliveryInterval;
	}
	
	public void setItems(List<DeliveryItem> items){
		this.items = items;
	}
}