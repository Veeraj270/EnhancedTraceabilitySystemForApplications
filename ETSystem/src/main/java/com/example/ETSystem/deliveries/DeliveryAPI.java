package com.example.ETSystem.deliveries;

import com.example.ETSystem.product.Product;
import com.example.ETSystem.product.ProductRepository;
import com.example.ETSystem.timeline.CreateEvent;
import com.example.ETSystem.timeline.TimelineService;
import com.example.ETSystem.util.Reordered;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("api/deliveries")

public class DeliveryAPI{

	private Logger logger = LoggerFactory.getLogger(DeliveryAPI.class);

	private final PlannedDeliveryRepository plannedRepo;
	private final RecordedDeliveryRepository recordedRepo;
	
	private final TimelineService timelineService;
	private final ProductRepository productRepo;
	
	public DeliveryAPI(PlannedDeliveryRepository planned, RecordedDeliveryRepository recorded, TimelineService timelineService, ProductRepository productRepo){
		plannedRepo = planned;
		recordedRepo = recorded;
		this.timelineService = timelineService;
		this.productRepo = productRepo;
	}
	
	// basic getters
	
	@GetMapping("/fetch-planned")
	public List<PlannedDelivery> getPlanned(){
		return plannedRepo.findAll();
	}
	
	@GetMapping("/fetch-recorded")
	public List<RecordedDelivery> getRecorded(){
		return recordedRepo.findAll();
	}
	
	@GetMapping("/fetch-planned-by-id/{id}")
	public PlannedDelivery getPlannedById(@PathVariable long id){
		return plannedRepo.findById(id).orElse(null);
	}
	
	@GetMapping("/fetch-recorded-by-id/{id}")
	public RecordedDelivery getRecordedById(@PathVariable long id){
		return recordedRepo.findById(id).orElse(null);
	}
	
	// basic adder
	
	@PostMapping("/add-planned")
	public PlannedDelivery addPlanned(@RequestBody PlannedDelivery newPlan){
		return plannedRepo.save(newPlan);
	}
	
	@PostMapping("/add-recorded")
	public RecordedDelivery addRecorded(@RequestBody RecordedDelivery newRecord){
		//Logging
		logger.info(newRecord.toString());
		return recordedRepo.save(newRecord);
	}

	@PostMapping("/set-planned-as-complete/{id}")
	public void setPlannedStatus(@PathVariable long id ) throws ResourceNotFoundException {
		Optional<PlannedDelivery> plannedDelivery = plannedRepo.findById(id);
		if (plannedDelivery.isPresent()){
			plannedDelivery.get().markAsComplete();
		}
		else {
			throw new ResourceNotFoundException(id, "Error: delivery with given id not found");
		}
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
	
	@GetMapping("/fetch-planned-by-search-query/{search}")
	public List<PlannedDelivery> getPlannedBySearchQuery(@PathVariable String search){
		// TODO: fuzzy search? include non-matching results last?
		return getPlanned().stream().filter(x -> x.getName().contains(search)).toList();
	}
	
	// convenience adders
	
	@PostMapping("/add-recorded-with-products")
	public RecordedDelivery addRecordedWithProducts(@RequestBody RecordedDelivery newRecord){
		// assume constituent products to be valid up to IDs
		List<Product> savedProducts = new ArrayList<>(newRecord.getRecorded().size());
		for(Product product : newRecord.getRecorded()){
			Product saved = productRepo.save(product);
			savedProducts.add(saved);
			timelineService.save(new CreateEvent(Instant.now().getEpochSecond(), saved));
		}
		newRecord.setRecorded(savedProducts);
		return recordedRepo.save(newRecord);
	}
}