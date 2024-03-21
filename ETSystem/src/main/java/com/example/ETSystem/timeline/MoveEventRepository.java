package com.example.ETSystem.timeline;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MoveEventRepository extends JpaRepository<MoveEvent, Long>{
	
	List<MoveEvent> findAllByOrderByTimestampAsc();
}