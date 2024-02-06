package com.example.ETSystem.util;

/**
 * Utility record for ordering data by a property, without recalculating the property for every comparison.
 * @param data Value being ordered.
 * @param tag Property being used to order the value.
 * @param <Data> Type of the data being ordered.
 * @param <Tag> Type of the property used to order data.
 */
public record Reordered<Data, Tag extends Comparable<? super Tag>>(Data data, Tag tag) implements Comparable<Reordered<Data, Tag>>{
	
	public int compareTo(Reordered<Data, Tag> o){
		return tag.compareTo(o.tag);
	}
}