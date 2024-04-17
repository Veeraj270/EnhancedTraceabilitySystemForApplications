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
	
	public MoveEvent(){}
	
	public MoveEvent(ZonedDateTime timestamp, Product owner){
		this.timestamp = timestamp;
		this.owner = owner;
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
	
	public @Generated String toString(){
		return "MoveEvent[id=" + id + ", ownerId=" + owner.getId() + ", timestamp=" + timestamp + "]";
	}
	
	public @Generated boolean equals(Object o){
		return this == o ||
				o instanceof MoveEvent event && id == event.id && timestamp == event.timestamp && Objects.equals(owner, event.owner);
	}
	
	public @Generated int hashCode(){
		return Objects.hash(id, timestamp, owner);
	}
}