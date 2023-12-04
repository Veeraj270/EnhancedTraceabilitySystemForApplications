package com.example.ETSystem.timeline;

import jakarta.persistence.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
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
	private TimelineOwner owner;
	
	public MoveEvent(){}
	
	public MoveEvent(long timestamp, TimelineOwner owner){
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
	
	public TimelineOwner getOwner(){
		return owner;
	}
	
	public void setOwner(TimelineOwner owner){
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