package com.example.ETSystem.contracts;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;


@Component
public class ContractService {

    private final ContractRepository contractRepository;

    @Autowired
    public ContractService(ContractRepository contractRepository) {
        this.contractRepository = contractRepository;
    }

    public List<Contract> getContracts(){
        return contractRepository.findAll();
    }

    public void addNewContract(Contract contract){
        contractRepository.save(contract);
    }

    public Contract getContractByID(Long id) throws Exception {
        if(contractRepository.findById(id).isPresent()){
            return contractRepository.findById(id).get();
        }
        else{
            throw new Exception("Unable to find contract");
        }
    }

    public Contract editContract(Long id, Contract contract){
        Contract existingContract = contractRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Contract not found with id: " + id));
        existingContract.setClient(contract.getClient());
        existingContract.setDuration(contract.getDuration());
        existingContract.setFrequency(contract.getFrequency());
        existingContract.setDates(contract.getDates());

        return contractRepository.save(existingContract);
    }

}
