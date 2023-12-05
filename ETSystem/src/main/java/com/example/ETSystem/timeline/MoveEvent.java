package com.example.ETSystem.timeline;

import com.example.ETSystem.product.Product;
import jakarta.persistence.*;

import java.util.Objects;

@Entity
public non-sealed class MoveEvent implements TimelineEvent{
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	@Column(name = "timestamp", nullable = false)
	private long timestamp;
	@ManyToOne
	@JoinColumn(name = "owner", nullable = false)
	private Product owner;
	
	public MoveEvent(){}
	
	public MoveEvent(long timestamp, Product owner){
		this.timestamp = timestamp;
		this.owner = owner;
	}
	
	public long getId(){
		return id;
	}
	
	public void setId(long id){
		this.id = id;
	}
	
	public long getTimestamp(){
		return timestamp;
	}
	
	public void setTimestamp(long timestamp){
		this.timestamp = timestamp;
	}
	
	public Product getOwner(){
		return owner;
	}
	
	public void setOwner(Product owner){
		this.owner = owner;
	}
	
	public String toString(){
		return "MoveEvent[id=" + id + ", ownerId=" + owner.getId() + ", timestamp=" + timestamp + "]";
	}
	
	public boolean equals(Object o){
		return this == o ||
			o instanceof MoveEvent event && id == event.id && timestamp == event.timestamp && Objects.equals(owner, event.owner);
	}
	
	public int hashCode(){
		return Objects.hash(id, timestamp, owner);
	}
}