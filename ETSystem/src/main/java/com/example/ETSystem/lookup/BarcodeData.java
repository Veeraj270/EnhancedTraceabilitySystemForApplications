package com.example.ETSystem.lookup;

public record BarcodeData(
		boolean valid,
		String name,
		String company,
		long gtin
){
	public static final BarcodeData INVALID = new BarcodeData(false, null, null, -1);
}