package com.example.ETSystem.timeline;

import org.springframework.stereotype.Service;

import java.util.stream.Stream;

@Service
public class TimelineService{
	
	private final CreateEvent.Repository createRepo;
	private final MoveEvent.Repository moveRepo;
	private final UseEvent.Repository useRepo;
	
	public TimelineService(CreateEvent.Repository createRepo, MoveEvent.Repository moveRepo, UseEvent.Repository useRepo){
		this.createRepo = createRepo;
		this.moveRepo = moveRepo;
		this.useRepo = useRepo;
	}
	
	public Stream<TimelineEvent> findAll(){
		return Stream.concat(Stream.concat(
				createRepo.findAll().stream(),
				moveRepo.findAll().stream()),
				useRepo.findAll().stream()
		);
	}
}