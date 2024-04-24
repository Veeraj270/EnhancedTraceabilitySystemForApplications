package com.example.ETSystem.bakingSystem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping(path = "api/baking-system")
@CrossOrigin(origins = "http://localhost:3000")
public class BakingSystemAPI {
    private final BakingSystemService bakingSystemService;

    @Autowired
    public BakingSystemAPI(BakingSystemService bakingSystemService) {
        this.bakingSystemService = bakingSystemService;
    }

    @PostMapping(path = "/process-bp-struct")
    public void processBPStruct(@RequestBody BakingSystemService.BPStruct bpStruct) {
        bakingSystemService.ProcessBPStruct(bpStruct);
    }
}
