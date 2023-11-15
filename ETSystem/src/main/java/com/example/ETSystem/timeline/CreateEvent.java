package com.example.ETSystem.timeline;

import jakarta.persistence.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

@Entity
public non-sealed class CreateEvent implements TimelineEvent{
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	private long timestamp;
	@ManyToOne
	private TimelineOwner owner;
	
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
	
	public interface Repository extends JpaRepository<CreateEvent, Long>{
		
		List<CreateEvent> findAllByOrderByTimestampAsc();
	}
}