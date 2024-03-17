package com.example.ETSystem.timeline;

import com.example.ETSystem.product.Product;

import java.time.ZonedDateTime;
import java.util.HashMap;

public sealed interface TimelineEvent permits CreateEvent, MoveEvent, UseEvent{
	
	long getId();
	
	ZonedDateTime getTimestamp();
	
	Product getOwner();
	
	default TimelineData asData(){
		return new TimelineData(getId(), getTimestamp(), getOwner().getId(), getClass().getSimpleName(), new HashMap<>());
	}
}