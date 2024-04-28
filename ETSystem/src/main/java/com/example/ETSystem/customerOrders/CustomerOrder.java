package com.example.ETSystem.customerOrders;

import com.example.ETSystem.finalProducts.FinalProduct;
import com.example.ETSystem.util.Generated;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

import static jakarta.persistence.GenerationType.SEQUENCE;

@Table(name = "customerOrders")
@Entity(name = "CustomerOrders")
public class CustomerOrder {
    @Id
    @SequenceGenerator(
            name = "CustomerOrders_sequence",
            sequenceName = "CustomerOrders_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = SEQUENCE,
            generator = "CustomerOrders_sequence"
    )
    @Column(
            name = "id",
            updatable = false,
            nullable = false
    )
    @JsonProperty
    private Long id;

    @Column(
            name = "client",
            nullable = false,
            columnDefinition = "TEXT"
    )
    @JsonProperty
    private String client;

    @Column(
            name = "date",
            nullable = false
    )
    private ZonedDateTime date;

    private ZonedDateTime deliveryDate;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinColumn(name = "customerOrder_Id")
    private List<FinalProduct> finalProducts = new ArrayList<>();

    public CustomerOrder() {
    }

    public CustomerOrder(String client, ZonedDateTime date, ZonedDateTime deliveryDate, List<FinalProduct> finalProducts) {
        this.client = client;
        this.date = date;
        this.deliveryDate = deliveryDate;
        this.finalProducts = finalProducts;
    }

    //Getters
    public @Generated Long getID(){ return id; }

    public @Generated String getClient() {
        return client;
    }

    public @Generated ZonedDateTime getDate() {
        return date;
    }

    public @Generated ZonedDateTime getDeliveryDate() {
        return deliveryDate;
    }

    public @Generated List<FinalProduct> getFinalProducts() {
        return finalProducts;
    }

    //Setters
    public @Generated void setId(long id){ this.id = id;}

    public @Generated void setClient(String client) {
        this.client = client;
    }

    public @Generated void setDate(ZonedDateTime date) {
        this.date = date;
    }

    public @Generated void setFinalProducts(List<FinalProduct> finalProducts) {
        this.finalProducts = finalProducts;
    }

    public @Generated void setDeliveryDate(ZonedDateTime deliveryDate) {
        this.deliveryDate = deliveryDate;
    }

}
