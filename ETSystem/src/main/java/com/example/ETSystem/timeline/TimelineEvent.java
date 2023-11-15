package com.example.ETSystem.timeline;

public sealed interface TimelineEvent permits CreateEvent, MoveEvent, UseEvent{

	public long getTimestamp();
}