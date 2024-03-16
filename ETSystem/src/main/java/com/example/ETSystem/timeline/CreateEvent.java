package com.example.ETSystem.timeline;

import com.example.ETSystem.product.Product;
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
	
	public CreateEvent(){
	}
	
	public CreateEvent(ZonedDateTime timestamp, Product owner){
		this.timestamp = timestamp;
		this.owner = owner;
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

	//Needs fixing
	public String toString(){
		return "CreateEvent[id=" + id + ", ownerId=" + owner.getId() + ", timestamp=" + timestamp + "]";
	}
	
	public boolean equals(Object o){
		return this == o ||
				o instanceof CreateEvent event && id == event.id && timestamp == event.timestamp && Objects.equals(owner, event.owner);
	}
	
	public int hashCode(){
		return Objects.hash(id, timestamp, owner);
	}
}