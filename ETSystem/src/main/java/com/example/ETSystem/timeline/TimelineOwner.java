package com.example.ETSystem.timeline;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.util.Objects;

// a value which owns a timeline; stands in for products.
@Entity
public class TimelineOwner{
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	public void setId(long id){
		this.id = id;
	}
	
	public long getId(){
		return id;
	}
	
	public boolean equals(Object o){
		return this == o ||
			o instanceof TimelineOwner owner && id == owner.id;
	}
	
	public int hashCode(){
		return Objects.hash(id);
	}
}
