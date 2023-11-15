package com.example.ETSystem.timeline;

public sealed interface TimelineEvent permits CreateEvent, MoveEvent, UseEvent{

	long getTimestamp();
	
	TimelineOwner getOwner();
}