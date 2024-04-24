package com.example.ETSystem.timeline;

import com.example.ETSystem.product.Product;
import com.example.ETSystem.util.Generated;
import jakarta.persistence.*;

import java.time.ZonedDateTime;
import java.util.Objects;

@Entity
public non-sealed class MoveEvent implements TimelineEvent{
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@Column(name = "timestamp", nullable = false)
	private ZonedDateTime timestamp;
	
	@ManyToOne
	@JoinColumn(name = "owner", nullable = false)
	private Product owner;
	
	private String destination;
	
	@Column(nullable = true)
	private String userResponsible;
	
	public MoveEvent(){}
	
	public MoveEvent(ZonedDateTime timestamp, Product owner, String destination, String userResponsible){
		this.timestamp = timestamp;
		this.owner = owner;
		this.destination = destination;
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
	
	public String getDestination(){
		return destination;
	}
	
	public void setDestination(String destination){
		this.destination = destination;
	}
	
	public String getUserResponsible(){
		return userResponsible;
	}
	
	public void setUserResponsible(String userResponsible){
		this.userResponsible = userResponsible;
	}
	
	public TimelineData asData(){
		TimelineData td = TimelineEvent.super.asData();
		if(destination != null)
			td.data().put("destination", destination);
		return td;
	}
	
	public @Generated String toString(){
		return "MoveEvent[id=" + id + ", ownerId=" + owner.getId() + ", timestamp=" + timestamp + ", destination: " + destination + ", userResponsible=" + userResponsible + "]";
	}
	
	public @Generated boolean equals(Object o){
		return this == o
				|| o instanceof MoveEvent event
				&& id == event.id
				&& timestamp == event.timestamp
				&& Objects.equals(owner, event.owner)
				&& Objects.equals(destination, event.destination);
	}
	
	public @Generated int hashCode(){
		return Objects.hash(id, timestamp, owner, destination);
	}
}