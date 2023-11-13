package com.example.ETSystem.timeline;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

@Entity
public class CreateEvent implements TimelineEvent{
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	private long timestamp;
	
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
	
	public static interface Repository extends JpaRepository<CreateEvent, Long>{
		
		List<CreateEvent> findAllByOrderByTimestampAsc();
	}
}