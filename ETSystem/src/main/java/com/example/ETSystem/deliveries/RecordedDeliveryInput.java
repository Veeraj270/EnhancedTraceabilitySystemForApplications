package com.example.ETSystem.deliveries;


import com.example.ETSystem.productData.SuppliedGood;
import com.example.ETSystem.util.Generated;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

public class RecordedDeliveryInput {
    public PlannedDelivery plan;
    public Instant startTime, endTime;
    public List<SuppliedGood> recorded =  new ArrayList<>();

    public RecordedDeliveryInput(){}

    public @Generated PlannedDelivery getPlan() {
        return plan;
    }

    public @Generated void setPlan(PlannedDelivery plan) {
        this.plan = plan;
    }

    public @Generated Instant getStartTime() {
        return startTime;
    }

    public @Generated void setStartTime(Instant startTime) {
        this.startTime = startTime;
    }

    public @Generated Instant getEndTime() {
        return endTime;
    }

    public @Generated void setEndTime(Instant endTime) {
        this.endTime = endTime;
    }

    public @Generated List<SuppliedGood> getRecorded() {
        return recorded;
    }

    public @Generated void setRecorded(List<SuppliedGood> recorded) {
        this.recorded = recorded;
    }
}
