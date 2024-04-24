package com.example.ETSystem.timeline;

import com.example.ETSystem.product.Product;
import jakarta.annotation.Nullable;

import java.time.ZonedDateTime;
import java.util.HashMap;

public sealed interface TimelineEvent permits CreateEvent, MoveEvent, UseEvent{
	
	long getId();
	
	ZonedDateTime getTimestamp();
	
	Product getOwner();
	
	// user responsible for this event
	@Nullable
	String getUserResponsible();
	
	default TimelineData asData(){
		return new TimelineData(getId(), getTimestamp(), getOwner().getId(), getClass().getSimpleName(), getUserResponsible(), new HashMap<>());
	}
}