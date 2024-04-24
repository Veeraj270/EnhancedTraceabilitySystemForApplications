package com.example.ETSystem.timeline;

import com.example.ETSystem.product.Product;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;

import java.time.ZonedDateTime;
import java.util.Objects;

@Entity
public non-sealed class CreateEvent implements TimelineEvent{
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@Column(name = "timestamp", nullable = false)
	private ZonedDateTime timestamp;
	
	@ManyToOne
	@JoinColumn(name = "owner", nullable = false)
	private Product owner;
	
	@Enumerated
	private CreateType createType;
	
	@Column(nullable = true)
	private String location;
	
	@Column(nullable = true)
	private String userResponsible;
	
	public CreateEvent(){
	}
	
	public CreateEvent(ZonedDateTime timestamp, Product owner, CreateType createType, String location, String userResponsible){
		this.timestamp = timestamp;
		this.owner = owner;
		this.createType = createType;
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
	
	public CreateType getCreateType(){
		return createType;
	}
	
	public void setCreateType(CreateType type){
		this.createType = type;
	}
	
	@Nullable
	public String getLocation(){
		return location;
	}
	
	public void setLocation(@Nullable String location){
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
		td.data().put("createType", createType.name());
		if(location != null)
			td.data().put("location", location);
		return td;
	}
	
	public String toString(){
		return "CreateEvent[id=" + id + ", ownerId=" + owner.getId() + ", timestamp=" + timestamp + ", userResponsible=" + userResponsible + "]";
	}
	
	public boolean equals(Object o){
		return this == o
				|| o instanceof CreateEvent event
				&& id == event.id
				&& Objects.equals(timestamp, event.timestamp)
				&& Objects.equals(owner, event.owner)
				&& Objects.equals(createType, event.createType)
				&& Objects.equals(location, event.location)
				&& Objects.equals(userResponsible, event.userResponsible);
	}
	
	public int hashCode(){
		return Objects.hash(id, timestamp, owner, createType, location, userResponsible);
	}
	
	public enum CreateType{
		DELIVERED, BAKED
	}
}