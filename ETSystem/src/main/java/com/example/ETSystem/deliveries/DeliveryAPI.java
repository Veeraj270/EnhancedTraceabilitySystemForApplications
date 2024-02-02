package com.example.ETSystem.deliveries;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "api/deliveries")
@CrossOrigin(origins = "http://localhost:3000")
public class DeliveryAPI{

	private final PlannedDeliveryRepository plannedDeliveries;
	private final RecordedDeliveryRepository recordedDeliveries;
	
	public DeliveryAPI(PlannedDeliveryRepository deliveries, RecordedDeliveryRepository recordedDeliveries){
		plannedDeliveries = deliveries;
		this.recordedDeliveries = recordedDeliveries;
	}
	
	@GetMapping(path = "/fetch-planned-deliveries")
	public List<PlannedDelivery> getProducts(){
		return plannedDeliveries.findAll();
	}
}