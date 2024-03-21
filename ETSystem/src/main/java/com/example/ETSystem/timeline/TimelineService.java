package com.example.ETSystem.timeline;

import com.example.ETSystem.product.Product;
import com.example.ETSystem.product.ProductRepository;
import org.springframework.stereotype.Component;

import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.stream.Stream;

@Component
public class TimelineService{
	
	public final CreateEventRepository createRepo;
	public final MoveEventRepository moveRepo;
	public final UseEventRepository useRepo;
	public final ProductRepository ownerRepo;
	
	public TimelineService(CreateEventRepository createRepo, MoveEventRepository moveRepo, UseEventRepository useRepo, ProductRepository ownerRepo){
		this.createRepo = createRepo;
		this.moveRepo = moveRepo;
		this.useRepo = useRepo;
		this.ownerRepo = ownerRepo;
	}
	
	public Stream<TimelineEvent> findAll(){
		return Stream.concat(Stream.concat(
				createRepo.findAll().stream(),
				moveRepo.findAll().stream()),
				useRepo.findAll().stream()
		);
	}
	
	public Stream<TimelineEvent> findAllSorted(){
		return findAll().sorted(Comparator.comparing(TimelineEvent::getTimestamp));
	}
	
	public Stream<TimelineEvent> findAllByProduct(Product p){
		return findAll().filter(x -> Objects.equals(x.getOwner(), p));
	}
	
	public Stream<TimelineEvent> findAllByProductSorted(Product p){
		return findAllByProduct(p).sorted(Comparator.comparing(TimelineEvent::getTimestamp));
	}
	
	public TimelineEvent save(TimelineEvent in){
		// JDK 21 when
		if(in instanceof CreateEvent ce)
			return createRepo.save(ce);
		else if(in instanceof UseEvent ue)
			return useRepo.save(ue);
		else if(in instanceof MoveEvent me)
			return moveRepo.save(me);
		throw new IncompatibleClassChangeError("Unsupported new subclass of sealed interface " + in.getClass().getName());
	}
	
	public void saveAll(List<TimelineEvent> events){
		events.forEach(this::save);
	}
}