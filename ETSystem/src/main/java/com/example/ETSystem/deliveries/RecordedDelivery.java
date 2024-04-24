package com.example.ETSystem.deliveries;

import com.example.ETSystem.product.Product;
import com.example.ETSystem.util.Generated;
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

	public RecordedDelivery(PlannedDelivery plan, Instant startTime, Instant endTime, List<Product> recorded){
		this.plan = plan;
		this.startTime = startTime;
		this.endTime = endTime;
		this.recorded = recorded;
	}

	public RecordedDelivery(){	};
	public @Generated long getId(){
		return id;
	}
	
	public @Generated PlannedDelivery getPlan(){
		return plan;
	}
	
	public @Generated Instant getStartTime(){
		return startTime;
	}
	
	public @Generated Instant getEndTime(){
		return endTime;
	}
	
	public @Generated List<Product> getRecorded(){
		return recorded;
	}
	
	public @Generated void setId(long id){
		this.id = id;
	}
	
	public @Generated void setPlan(PlannedDelivery plan){
		this.plan = plan;
	}
	
	public @Generated void setStartTime(Instant startTime){
		this.startTime = startTime;
	}
	
	public @Generated void setEndTime(Instant endTime){
		this.endTime = endTime;
	}
	
	public @Generated void setRecorded(List<Product> recorded){
		this.recorded = recorded;
	}
	
	public @Generated boolean equals(Object obj){
		return obj instanceof RecordedDelivery other && other.id == id;
	}
	
	public @Generated int hashCode(){
		return Objects.hashCode(id);
	}
	
	public @Generated String toString(){
		return "RecordedDelivery{" +
				"id=" + id +
				", plan=" + plan +
				", startTime=" + startTime +
				", endTime=" + endTime +
				", recorded=" + recorded +
				'}';
	}
}