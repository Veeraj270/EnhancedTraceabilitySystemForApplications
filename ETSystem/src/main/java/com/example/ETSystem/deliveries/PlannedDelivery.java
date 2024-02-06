package com.example.ETSystem.deliveries;

import jakarta.persistence.*;

import java.time.Period;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Entity
public class PlannedDelivery{
	
	@Id
	@GeneratedValue
	private long id;
	
	private String name, description;
	
	private ZonedDateTime deliveryTime;
	
	private Period deliveryInterval;
	
	@OneToMany
	private List<DeliveryItem> items = new ArrayList<>();
	
	public PlannedDelivery(){}
	
	public PlannedDelivery(String name, String description, ZonedDateTime deliveryTime, Period deliveryInterval){
		this.name = name;
		this.description = description;
		this.deliveryTime = deliveryTime;
		this.deliveryInterval = deliveryInterval;
	}
	
	public Optional<ZonedDateTime> nextScheduledTimeFrom(ZonedDateTime observer){
		if(observer.isBefore(deliveryTime))
			return Optional.of(deliveryTime);
		if(deliveryInterval.isZero())
			return Optional.empty();
		// simpl impl, "just keep waiting"
		ZonedDateTime t = deliveryTime;
		while(t.isBefore(observer))
			t = t.plus(deliveryInterval);
		return Optional.of(t);
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
				", deliveryInterval=" + deliveryInterval +
				", items=" + items +
				'}';
	}
}