package com.example.ETSystem.customerOrders;

import com.example.ETSystem.finalProducts.FinalProduct;
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

    @OneToMany(fetch = FetchType.EAGER)
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
    public long getID(){ return id; }

    public String getClient() {
        return client;
    }

    public ZonedDateTime getDate() {
        return date;
    }

    public ZonedDateTime getDeliveryDate() {
        return deliveryDate;
    }

    public List<FinalProduct> getFinalProducts() {
        return finalProducts;
    }

    //Setters
    public void setId(long id){ this.id = id;}

    public void setClient(String client) {
        this.client = client;
    }

    public void setDate(ZonedDateTime date) {
        this.date = date;
    }

    public void setFinalProducts(List<FinalProduct> finalProducts) {
        this.finalProducts = finalProducts;
    }

    public void setDeliveryDate(ZonedDateTime deliveryDate) {
        this.deliveryDate = deliveryDate;
    }
}
