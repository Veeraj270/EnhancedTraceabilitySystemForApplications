package com.example.ETSystem.deliveries;

import com.example.ETSystem.product.Product;
import jakarta.persistence.*;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
public class RecordedDelivery{
	
	@Id
	@GeneratedValue
	private long id;
	
	@ManyToOne
	private PlannedDelivery plan;
	
	private Instant startTime, endTime;
	
	@OneToMany
	private List<Product> recorded = new ArrayList<>();
	
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
	
	public boolean equals(Object obj){
		return obj instanceof RecordedDelivery other && other.id == id;
	}
	
	public int hashCode(){
		return Objects.hashCode(id);
	}
	
	public String toString(){
		return "RecordedDelivery{" +
				"id=" + id +
				", plan=" + plan +
				", startTime=" + startTime +
				", endTime=" + endTime +
				", recorded=" + recorded +
				'}';
	}
}