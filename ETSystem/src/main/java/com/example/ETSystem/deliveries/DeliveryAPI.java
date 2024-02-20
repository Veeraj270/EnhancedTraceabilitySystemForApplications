package com.example.ETSystem.deliveries;

import com.example.ETSystem.product.Product;
import com.example.ETSystem.product.ProductRepository;
import com.example.ETSystem.productData.ProductData;
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
@RequestMapping("api/deliveries")
@CrossOrigin(origins = "http://localhost:3000")
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
	
	// standard getters
	
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
	
	@GetMapping("/fetch-planned-by-search-query/{search}")
	public List<PlannedDelivery> getPlannedBySearchQuery(@PathVariable String search){
		// TODO: fuzzy search? include non-matching results last?
		return getPlanned().stream().filter(x -> x.getName().contains(search)).toList();
	}

	// basic adders

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

	// convenience adders
	
	@PostMapping("/add-recorded-with-products")
	public RecordedDelivery addRecordedWithProducts(@RequestBody RecordedDeliveryInput newRecordInput){
		//Initialise new RecordedDelivery
		RecordedDelivery newRecord = new RecordedDelivery();

		for (ProductData product : newRecordInput.recorded){
			//If needed, add new delivery type

			//Create new Product instance

			//Save Product
		}
		//Save RecordedDelivery with list of new Products

		//DEPRECATED
		/*// assume constituent products to be valid up to IDs
		List<Product> savedProducts = new ArrayList<>(newRecord.getRecorded().size());
		for(Product product : newRecord.getRecorded()){
			Product saved = productRepo.save(product);
			savedProducts.add(saved);
			timelineService.save(new CreateEvent(Instant.now().getEpochSecond(), saved));
		}
		return recordedRepo.save(newRecord);*/
	}

	@PostMapping("/delete-planned-delivery/{id}")
	public void deletedScheduledDelivery(@PathVariable long id) throws ResourceNotFoundException {
		if (plannedRepo.findById(id).isPresent()){
			plannedRepo.deleteById(id);
		}
		else{
			throw new ResourceNotFoundException(id, "Error: planned delivery with given id not found");
		}
	}
}