package com.example.ETSystem.deliveries;

import com.example.ETSystem.product.Product;
import com.example.ETSystem.product.ProductRepository;
import com.example.ETSystem.productData.SuppliedGood;
import com.example.ETSystem.timeline.CreateEvent;
import com.example.ETSystem.timeline.TimelineService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/deliveries")
@CrossOrigin(origins = "http://localhost:3000")
public class DeliveryAPI{

	private final Logger logger = LoggerFactory.getLogger(DeliveryAPI.class);

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
		//Validation
		List<Product> savedProducts = new ArrayList<>(newRecordInput.recorded.size());
		for (SuppliedGood product : newRecordInput.recorded){
			//Create new Product instance
			Product newProduct =  new Product();
			newProduct.setGtin(product.getGtin());
			newProduct.setLabel(product.getLabel());
			newProduct.setMaxQuantity(product.getQuantity());
			newProduct.setCurrentQuantity(product.getQuantity());

			//FIX NEEDED: needs to be updated to use Supplier class
			//newProduct.setSupplier(product.getSupplier());
			newProduct.setIngredientType(product.getIngredientType());

			//Save Product
			productRepo.save(newProduct);

			//Create TimeLineEvent for each new product
			timelineService.save(new CreateEvent(ZonedDateTime.now(), newProduct));
			savedProducts.add(newProduct);
		}
		//Save RecordedDelivery with list of new Products
		RecordedDelivery newRecord = new RecordedDelivery(
				newRecordInput.plan,
				newRecordInput.startTime,
				newRecordInput.endTime,
				savedProducts);

		return recordedRepo.save(newRecord);
	}

	@GetMapping("/fetch-unprocessed-planned")
	public List<PlannedDelivery> getUnprocessedPlanned(){
		return getPlanned().stream().filter((plannedDelivery -> (!plannedDelivery.isComplete()))).toList();
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

	@PostMapping("/set-planned-as-complete/{id}")
	public void setPlannedStatus(@PathVariable long id ) throws ResourceNotFoundException {
		Optional<PlannedDelivery> plannedDelivery = plannedRepo.findById(id);
		if (plannedDelivery.isPresent()){
			plannedDelivery.get().setComplete(true);
			plannedRepo.save(plannedDelivery.get());
		}
		else {
			throw new ResourceNotFoundException(id, "Error: delivery with given id not found");
		}
	}
}