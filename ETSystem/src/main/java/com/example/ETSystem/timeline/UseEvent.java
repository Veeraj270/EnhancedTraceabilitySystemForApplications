package com.example.ETSystem.timeline;

import com.example.ETSystem.product.Product;
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
	
	@Column(nullable = true)
	private String userResponsible;
	
	public UseEvent(){}
	
	public UseEvent(ZonedDateTime timestamp, Product owner, Product result, String location, String userResponsible){
		this.timestamp = timestamp;
		this.owner = owner;
		this.result = result;
		this.location = location;
		this.userResponsible = userResponsible;
	}
	
	public long getId(){
		return id;
	}
	
	public void setId(long id){
		this.id = id;
	}
	
	public ZonedDateTime getTimestamp(){
		return timestamp;
	}
	
	public void setTimestamp(ZonedDateTime timestamp){
		this.timestamp = timestamp;
	}
	
	public Product getOwner(){
		return owner;
	}
	
	public void setOwner(Product owner){
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
		return td;
	}
	
	public String toString(){
		return "UseEvent[id=" + id + ", ownerId=" + owner.getId() + ", timestamp=" + timestamp + ", resultId" + result.getId() + ", location" + location + ", userResponsible=" + userResponsible + "]";
	}
	
	public boolean equals(Object o){
		return this == o || o instanceof UseEvent event
				&& id == event.id
				&& timestamp == event.timestamp
				&& Objects.equals(owner, event.owner)
				&& Objects.equals(result, event.result)
				&& Objects.equals(location, event.location)
				&& Objects.equals(userResponsible, event.userResponsible);
	}
	
	public int hashCode(){
		return Objects.hash(id, timestamp, owner, result, location, userResponsible);
	}
}