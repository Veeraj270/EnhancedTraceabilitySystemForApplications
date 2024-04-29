package com.example.ETSystem.contracts;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/contracts")
@CrossOrigin
public class ContractAPI {
    private final ContractService contractService;

    @Autowired
    public ContractAPI(ContractService contractService) {
        this.contractService = contractService;
    }

    @GetMapping(path = "/fetch")
    public List<Contract> getContracts() {
        return contractService.getContracts();
    }

    @GetMapping(path = "/fetch-by-id/{id}")
    public Contract getContractById(@PathVariable long id) throws Exception {
        return contractService.getContractByID(id);
    }

    @PostMapping(path = "/add")
    public Contract addContract(@RequestBody Contract newContract){
        contractService.addNewContract(newContract);
        return newContract;
    }

    @PutMapping(path = "/edit/{id}")
    public ResponseEntity<Contract> editContract(@PathVariable long id, @RequestBody Contract contract){
        Contract editedContract = contractService.editContract(id, contract);
        return ResponseEntity.ok(editedContract);
    }

}
