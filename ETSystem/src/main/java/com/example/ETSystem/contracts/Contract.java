package com.example.ETSystem.contracts;

import com.example.ETSystem.finalProducts.FinalProduct;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

import static jakarta.persistence.GenerationType.SEQUENCE;

@Table(name = "contracts")
@Entity(name = "Contracts")
public class Contract {
    @Id
    @SequenceGenerator(
            name = "Contracts_sequence",
            sequenceName = "Contracts_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = SEQUENCE,
            generator = "Contracts_sequence"
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
            name = "duration",
            nullable = false,
            columnDefinition = "TEXT"
    )
    @JsonProperty
    private String duration;

    @Column(
            name = "frequency",
            nullable = false,
            columnDefinition = "TEXT"
    )
    @JsonProperty
    private String frequency;



    @ElementCollection
    private List<ZonedDateTime> dates;

    @OneToMany(fetch = FetchType.EAGER)
    @JoinColumn(name = "contract_Id")
    private List<FinalProduct> finalProducts = new ArrayList<>();


    public Contract() {
    }

    public Contract(String client, String duration, String frequency, List<ZonedDateTime> dates, List<FinalProduct> finalProducts) {
        this.client = client;
        this.duration = duration;
        this.frequency = frequency;
        this.dates = dates;
        this.finalProducts = finalProducts;
    }

    public String getClient() {
        return client;
    }

    public void setClient(String client) {
        this.client = client;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public String getFrequency() {
        return frequency;
    }

    public void setFrequency(String frequency) {
        this.frequency = frequency;
    }

    public List<ZonedDateTime> getDates() {
        return dates;
    }

    public void setDates(List<ZonedDateTime> dates) {
        this.dates = dates;
    }

    public List<FinalProduct> getFinalProducts() {
        return finalProducts;
    }

    public void setFinalProducts(List<FinalProduct> finalProducts) {
        this.finalProducts = finalProducts;
    }
}


