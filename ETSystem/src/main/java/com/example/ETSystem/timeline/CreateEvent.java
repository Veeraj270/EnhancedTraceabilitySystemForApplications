package com.example.ETSystem.timeline;

import com.example.ETSystem.product.Product;
import com.example.ETSystem.util.Generated;
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
	
	public @Generated CreateType getCreateType(){
		return createType;
	}
	
	public @Generated void setCreateType(CreateType type){
		this.createType = type;
	}
	
	@Nullable
	public @Generated String getLocation(){
		return location;
	}
	
	public @Generated void setLocation(@Nullable String location){
		this.location = location;
	}
	
	public @Generated String getUserResponsible(){
		return userResponsible;
	}
	
	public @Generated void setUserResponsible(String userResponsible){
		this.userResponsible = userResponsible;
	}
	
	public TimelineData asData(){
		TimelineData td = TimelineEvent.super.asData();
		td.data().put("createType", createType.name());
		if(location != null)
			td.data().put("location", location);
		return td;
	}
	
	public @Generated String toString(){
		return "CreateEvent[id=" + id + ", ownerId=" + owner.getId() + ", timestamp=" + timestamp + ", userResponsible=" + userResponsible + "]";
	}
	
	public @Generated boolean equals(Object o){
		return this == o
				|| o instanceof CreateEvent event
				&& id == event.id
				&& Objects.equals(timestamp, event.timestamp)
				&& Objects.equals(owner, event.owner)
				&& Objects.equals(createType, event.createType)
				&& Objects.equals(location, event.location)
				&& Objects.equals(userResponsible, event.userResponsible);
	}
	
	public @Generated int hashCode(){
		return Objects.hash(id, timestamp, owner, createType, location, userResponsible);
	}
	
	public enum CreateType{
		DELIVERED, BAKED
	}
}