package com.example.ETSystem.timeline;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UseEventRepository extends JpaRepository<UseEvent, Long>{
	
	List<UseEvent> findAllByOrderByTimestampAsc();
}