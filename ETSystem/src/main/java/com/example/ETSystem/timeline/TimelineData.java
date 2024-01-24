package com.example.ETSystem.timeline;

import java.util.Map;

/**
 * Stores a timeline event in a generic format for sending to the frontend.
 *
 * @param id ID of this event.
 * @param timestamp Time that this event occurred.
 * @param ownerId ID of the product that this event occurred to.
 * @param type Type of this event.
 * @param data Extra type-specific data.
 */
public record TimelineData(
		long id,
		long timestamp,
		long ownerId,
		String type,
		Map<String, String> data
){}