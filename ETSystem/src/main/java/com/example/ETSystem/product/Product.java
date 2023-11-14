package com.example.ETSystem.product;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

import static jakarta.persistence.GenerationType.*;
@Table(
        name = "product"
)
@Entity(name = "Product") //Good practice to be explicit about name
public class Product {
    @Id //Primary Key
    @SequenceGenerator(
            name = "student_sequence",
            sequenceName = "student_sequence",
            allocationSize = 1 //How much the sequence will increment by
    )
    @GeneratedValue(
            strategy = SEQUENCE,
            generator = "student_sequence"
    )
    @Column(
            name = "id",
            updatable = false,
            nullable = false
    )
    private Long id;
    @Column(
            name = "label",
            nullable = false, //Now column cannot be NULL
            columnDefinition = "TEXT"
    )
    private String label;

    @Column(
            name = "max_quantity"
    )
    private Integer maxQuantity;

    @Column(name="intermediaries_id")
    @ElementCollection(targetClass = Long.class, fetch = FetchType.EAGER)
    @CollectionTable(name = "intermediaries_id", joinColumns = @JoinColumn(name = "product_id"))
    private List<Long> intermediariesId = new ArrayList<>();


    @Transient
    private List<Product>  intermediaries = new ArrayList<>();

    public Product(String label, Integer maxQuantity, List<Long> intermediariesId) {
        this.label = label;
        this.maxQuantity = maxQuantity;
        this.intermediariesId = intermediariesId;
    }

    public Product(String label, Integer maxQuantity) {
        this.label = label;
        this.maxQuantity = maxQuantity;
    }

    public Product() {

    }

    //Getters
    public Long getId() {
        return id;
    }

    public String getLabel() {
        return label;
    }

    public List<Long> getIntermediariesId() {
        return intermediariesId;
    }

    public Integer getMaxQuantity() {
        return maxQuantity;
    }

    //Setters
    public void setLabel(String label) {
        this.label = label;
    }

    public void setIntermediaries(List<Long> intermediaries) {
        this.intermediariesId = intermediariesId;
    }

    public void setMaxQuantity(Integer maxQuantity) {
        this.maxQuantity = maxQuantity;
    }
}

