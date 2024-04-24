package com.example.ETSystem.timeline;

import com.example.ETSystem.product.Product;
import com.example.ETSystem.util.Generated;
import jakarta.persistence.*;

import java.time.ZonedDateTime;
import java.util.Objects;

@Entity
public non-sealed class UseEvent implements TimelineEvent{
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@Column(name = "timestamp", nullable = false)
	private ZonedDateTime timestamp;
	
	@ManyToOne
	@JoinColumn(name = "owner", nullable = false)
	private Product owner;
	
	@ManyToOne
	@JoinColumn(name = "result", nullable = true)
	private Product result;
	
	@Column(nullable = true)
	private String location;
	
	private float quantityUsed;
	
	@Column(nullable = true)
	private String userResponsible;
	
	public UseEvent(){}
	
	public UseEvent(ZonedDateTime timestamp, Product owner, Product result, String location, float quantityUsed, String userResponsible){
		this.timestamp = timestamp;
		this.owner = owner;
		this.result = result;
		this.location = location;
		this.quantityUsed = quantityUsed;
		this.userResponsible = userResponsible;
	}
	
	public @Generated long getId(){
		return id;
	}
	
	public @Generated void setId(long id){
		this.id = id;
	}
	
	public @Generated ZonedDateTime getTimestamp(){
		return timestamp;
	}
	
	public @Generated void setTimestamp(ZonedDateTime timestamp){
		this.timestamp = timestamp;
	}
	
	public @Generated Product getOwner(){
		return owner;
	}
	
	public @Generated void setOwner(Product owner){
		this.owner = owner;
	}
	
	public Product getResult(){
		return result;
	}
	
	public void setResult(Product result){
		this.result = result;
	}
	
	public String getLocation(){
		return location;
	}
	
	public void setLocation(String location){
		this.location = location;
	}
	
	public float getQuantityUsed(){
		return quantityUsed;
	}
	
	public void setQuantityUsed(float quantityUsed){
		this.quantityUsed = quantityUsed;
	}
	
	public String getUserResponsible(){
		return userResponsible;
	}
	
	public void setUserResponsible(String userResponsible){
		this.userResponsible = userResponsible;
	}
	
	public TimelineData asData(){
		TimelineData td = TimelineEvent.super.asData();
		if(result != null)
			td.data().put("resultId", String.valueOf(result.getId()));
		if(location != null)
			td.data().put("location", location);
		td.data().put("quantityUsed", String.valueOf(quantityUsed));
		return td;
	}
	
	public @Generated String toString(){
		return "UseEvent[id=" + id + ", ownerId=" + owner.getId() + ", timestamp=" + timestamp + ", resultId" + result.getId() + ", location" + location + ", quantityUsed" + quantityUsed + ", userResponsible=" + userResponsible + "]";
	}
	
	public @Generated boolean equals(Object o){
		return this == o || o instanceof UseEvent event
				&& id == event.id
				&& timestamp == event.timestamp
				&& Objects.equals(owner, event.owner)
				&& Objects.equals(result, event.result)
				&& Objects.equals(location, event.location)
				&& quantityUsed == event.quantityUsed
				&& Objects.equals(userResponsible, event.userResponsible);
	}
	
	public @Generated int hashCode(){
		return Objects.hash(id, timestamp, owner, result, location, quantityUsed, userResponsible);
	}
}