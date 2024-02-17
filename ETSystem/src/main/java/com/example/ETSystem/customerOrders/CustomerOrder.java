package com.example.ETSystem.customerOrders;

import jakarta.persistence.*;

import java.time.LocalDate;

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
    private LocalDate date;

    public CustomerOrder() {
    }

    public CustomerOrder(String client, LocalDate date) {
        this.client = client;
        this.date = date;
    }

    public String getClient() {
        return client;
    }

    public void setClient(String client) {
        this.client = client;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}
