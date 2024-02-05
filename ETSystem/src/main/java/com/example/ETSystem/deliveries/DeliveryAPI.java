package com.example.ETSystem.deliveries;

import com.example.ETSystem.util.Reordered;
import org.springframework.web.bind.annotation.*;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api/deliveries")
@CrossOrigin(origins = "http://localhost:3000")
public class DeliveryAPI{

	private final PlannedDeliveryRepository plannedDeliveries;
	private final RecordedDeliveryRepository recordedDeliveries;
	
	public DeliveryAPI(PlannedDeliveryRepository deliveries, RecordedDeliveryRepository recordedDeliveries){
		plannedDeliveries = deliveries;
		this.recordedDeliveries = recordedDeliveries;
	}
	
	// basic getters
	
	@GetMapping("/fetch-planned")
	public List<PlannedDelivery> getPlanned(){
		return plannedDeliveries.findAll();
	}
	
	@GetMapping("/fetch-recorded")
	public List<RecordedDelivery> getRecorded(){
		return recordedDeliveries.findAll();
	}
	
	// basic adders
	
	@PostMapping("/add-planned")
	public PlannedDelivery addPlanned(@RequestBody PlannedDelivery newPlan){
		return plannedDeliveries.save(newPlan);
	}
	
	@PostMapping("/add-recorded")
	public RecordedDelivery addRecorded(@RequestBody RecordedDelivery newRecord){
		return recordedDeliveries.save(newRecord);
	}
	
	// convenience getters
	
	@GetMapping("/fetch-planned-by-next")
	public List<PlannedDelivery> getPlannedSortedByNext(){
		ZonedDateTime now = ZonedDateTime.now();
		List<PlannedDelivery> all = getPlanned();
		List<Reordered<PlannedDelivery, ZonedDateTime>> sortedPlans = new ArrayList<>(all.size());
		for(PlannedDelivery delivery : all)
			delivery.nextScheduledTimeFrom(now).ifPresent(time -> sortedPlans.add(new Reordered<>(delivery, time)));
		sortedPlans.sort(null);
		return sortedPlans.stream().map(Reordered::data).toList();
	}
}