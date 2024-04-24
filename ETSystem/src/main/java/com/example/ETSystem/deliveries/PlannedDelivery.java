package com.example.ETSystem.deliveries;

import com.example.ETSystem.customerOrders.CustomerOrder;
import com.example.ETSystem.util.Generated;
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

	@ManyToOne
	private CustomerOrder associatedCustomerOrder;

	public PlannedDelivery(){}

	public PlannedDelivery(String name, String description, ZonedDateTime deliveryTime){
		this.name = name;
		this.description = description;
		this.deliveryTime = deliveryTime;
		this.complete = false;
	}

	//Getters
	
	public @Generated long getId(){ return id;	}
	
	public @Generated String getName(){ return name; }
	
	public @Generated String getDescription(){ return description;	}

	public @Generated boolean isComplete(){ return complete; }

	public @Generated ZonedDateTime getDeliveryTime(){	return deliveryTime; }

	public @Generated List<DeliveryItem> getItems(){ return items;	}

	public @Generated CustomerOrder getAssociatedCustomerOrder(){ return associatedCustomerOrder; }

	//Setters

	public @Generated void setId(long id){ this.id = id; }
	
	public @Generated void setName(String name){ this.name = name;	}
	
	public @Generated void setDescription(String description){	this.description = description;	}
	
	public @Generated void setDeliveryTime(ZonedDateTime deliveryTime){ this.deliveryTime = deliveryTime; }
	
	public @Generated void setItems(List<DeliveryItem> items){ this.items = items;	}

	public @Generated void setComplete(boolean complete){ this.complete = complete; }

	public @Generated void setAssociatedCustomerOrder(CustomerOrder order){ this.associatedCustomerOrder  = order;	}

	//Utility

	public @Generated boolean equals(Object obj){
		return obj instanceof PlannedDelivery other && other.id == id;
	}
	
	public @Generated int hashCode(){
		return Objects.hashCode(id);
	}
	
	public @Generated String toString(){
		return "PlannedDelivery{" +
				"id=" + id +
				", name='" + name + '\'' +
				", description='" + description + '\'' +
				", deliveryTime=" + deliveryTime +
				", items=" + items +
				'}';
	}
}