package com.example.ETSystem.deliveries;

import jakarta.persistence.*;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
public class PlannedDelivery{
	
	@Id
	@GeneratedValue
	private long id;
	
	private String name, description;
	
	private ZonedDateTime deliveryTime;

	@OneToMany
	private List<DeliveryItem> items = new ArrayList<>();

	//True - Delivery has been processed (Delivery has been "taken")
	//False - Delivery has not yet been processed
	private boolean complete;
	
	public PlannedDelivery(){}

	public PlannedDelivery(String name, String description, ZonedDateTime deliveryTime){
		this.name = name;
		this.description = description;
		this.deliveryTime = deliveryTime;
		this.complete = false;
	}
	
	// getters, setters, and default methods
	
	public long getId(){
		return id;
	}
	
	public String getName(){
		return name;
	}
	
	public String getDescription(){
		return description;
	}

	public boolean isComplete() {
		return complete;
	}

	public void setComplete(boolean complete) {
		this.complete = complete;
	}
	
	public ZonedDateTime getDeliveryTime(){
		return deliveryTime;
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
	
	public void setItems(List<DeliveryItem> items){
		this.items = items;
	}

	public void markAsComplete(){setComplete(true);}

	public boolean equals(Object obj){
		return obj instanceof PlannedDelivery other && other.id == id;
	}
	
	public int hashCode(){
		return Objects.hashCode(id);
	}
	
	public String toString(){
		return "PlannedDelivery{" +
				"id=" + id +
				", name='" + name + '\'' +
				", description='" + description + '\'' +
				", deliveryTime=" + deliveryTime +
				", items=" + items +
				'}';
	}
}