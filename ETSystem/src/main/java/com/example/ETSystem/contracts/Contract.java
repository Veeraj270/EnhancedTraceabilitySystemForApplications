package com.example.ETSystem.contracts;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.time.ZonedDateTime;
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

    public Contract(String client, String duration, String frequency, List<ZonedDateTime> dates) {
        this.client = client;
        this.duration = duration;
        this.frequency = frequency;
        this.dates = dates;
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
};


