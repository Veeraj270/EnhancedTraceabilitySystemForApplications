package com.example.ETSystem.deliveries;


import com.example.ETSystem.productData.ProductData;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

/*** ***/
public class RecordedDeliveryInput {
    public PlannedDelivery plan;
    public Instant startTime, endTime;
    public List<ProductData> recorded =  new ArrayList<>();
}
