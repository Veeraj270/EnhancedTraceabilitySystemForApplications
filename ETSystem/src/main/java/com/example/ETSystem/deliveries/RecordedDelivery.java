package com.example.ETSystem.deliveries;

import com.example.ETSystem.product.Product;
import jakarta.persistence.*;

import java.time.Instant;
import java.util.List;

@Entity
public class RecordedDelivery{
	
	@Id
	@GeneratedValue
	private long id;
	
	@ManyToOne
	private PlannedDelivery plan;
	
	private Instant startTime, endTime;
	
	@OneToMany
	private List<Product> recorded;
	
	public long getId(){
		return id;
	}
	
	public PlannedDelivery getPlan(){
		return plan;
	}
	
	public Instant getStartTime(){
		return startTime;
	}
	
	public Instant getEndTime(){
		return endTime;
	}
	
	public List<Product> getRecorded(){
		return recorded;
	}
	
	public void setId(long id){
		this.id = id;
	}
	
	public void setPlan(PlannedDelivery plan){
		this.plan = plan;
	}
	
	public void setStartTime(Instant startTime){
		this.startTime = startTime;
	}
	
	public void setEndTime(Instant endTime){
		this.endTime = endTime;
	}
	
	public void setRecorded(List<Product> recorded){
		this.recorded = recorded;
	}
}