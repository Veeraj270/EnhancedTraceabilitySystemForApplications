package com.example.ETSystem.timeline;

import com.example.ETSystem.product.Product;

public sealed interface TimelineEvent permits CreateEvent, MoveEvent, UseEvent{

	long getTimestamp();
	
	Product getOwner();
}