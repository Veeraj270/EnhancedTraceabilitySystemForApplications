package com.example.ETSystem.finalProducts;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FinalProductRepository extends JpaRepository<FinalProduct, Long> {
    List<FinalProduct> findByLabel(String label);
}