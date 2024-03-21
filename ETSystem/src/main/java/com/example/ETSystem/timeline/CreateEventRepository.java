package com.example.ETSystem.timeline;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CreateEventRepository extends JpaRepository<CreateEvent, Long>{
	
	List<CreateEvent> findAllByOrderByTimestampAsc();
}