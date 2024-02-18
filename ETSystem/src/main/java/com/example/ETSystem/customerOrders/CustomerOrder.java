package com.example.ETSystem.customerOrders;

import com.example.ETSystem.finalProducts.FinalProduct;
import jakarta.persistence.*;

import java.time.LocalDate;
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
    private LocalDate date;



    public CustomerOrder() {
    }

    public CustomerOrder(String client, LocalDate date, List<FinalProduct> finalProducts) {
        this.client = client;
        this.date = date;
        this.finalProducts = finalProducts;
    }

    @OneToMany(mappedBy = "customerOrder", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<FinalProduct> finalProducts = new ArrayList<>();

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

    public List<FinalProduct> getFinalProducts() {
        return finalProducts;
    }

    public void setFinalProducts(List<FinalProduct> finalProducts) {
        this.finalProducts = finalProducts;
    }
}
