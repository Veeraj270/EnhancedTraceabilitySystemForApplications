package com.example.ETSystem.customerOrders;

import com.example.ETSystem.finalProducts.FinalProduct;
import com.fasterxml.jackson.annotation.JsonFormat;
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
    private Long id;

    @Column(
            name = "client",
            nullable = false,
            columnDefinition = "TEXT"
    )
    private String client;

    @Column(
            name = "date",
            nullable = false
    )
    private ZonedDateTime date;

    private ZonedDateTime deliveryDate;

    public CustomerOrder() {
    }

    public CustomerOrder(String client, ZonedDateTime date, ZonedDateTime deliveryDate, List<FinalProduct> finalProducts) {
        this.client = client;
        this.date = date;
        this.deliveryDate = deliveryDate;
        this.finalProducts = finalProducts;
    }

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "customerOrder_Id")
    private List<FinalProduct> finalProducts = new ArrayList<>();

    public String getClient() {
        return client;
    }

    public void setClient(String client) {
        this.client = client;
    }

    public ZonedDateTime getDate() {
        return date;
    }

    public void setDate(ZonedDateTime date) {
        this.date = date;
    }

    public List<FinalProduct> getFinalProducts() {
        return finalProducts;
    }

    public void setFinalProducts(List<FinalProduct> finalProducts) {
        this.finalProducts = finalProducts;
    }

    public ZonedDateTime getDeliveryDate() {
        return deliveryDate;
    }

    public void setDeliveryDate(ZonedDateTime deliveryDate) {
        this.deliveryDate = deliveryDate;
    }
}
