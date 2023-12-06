package com.example.ETSystem.timeline;

import java.util.Map;

public record TimelineData(
        long id,
        long timestamp,
        long ownerId,
        String type,
        Map<String, String> data
){}