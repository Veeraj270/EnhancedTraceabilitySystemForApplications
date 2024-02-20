package com.example.ETSystem.deliveries;


import com.example.ETSystem.productData.SuppliedGood;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

/*** ***/
public class RecordedDeliveryInput {
    public PlannedDelivery plan;
    public Instant startTime, endTime;
    public List<SuppliedGood> recorded =  new ArrayList<>();

    public RecordedDeliveryInput(){};

    public PlannedDelivery getPlan() {
        return plan;
    }

    public void setPlan(PlannedDelivery plan) {
        this.plan = plan;
    }

    public Instant getStartTime() {
        return startTime;
    }

    public void setStartTime(Instant startTime) {
        this.startTime = startTime;
    }

    public Instant getEndTime() {
        return endTime;
    }

    public void setEndTime(Instant endTime) {
        this.endTime = endTime;
    }

    public List<SuppliedGood> getRecorded() {
        return recorded;
    }

    public void setRecorded(List<SuppliedGood> recorded) {
        this.recorded = recorded;
    }
}
