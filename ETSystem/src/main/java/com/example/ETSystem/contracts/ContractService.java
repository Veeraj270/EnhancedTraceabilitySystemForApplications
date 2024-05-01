package com.example.ETSystem.contracts;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

import static org.springframework.http.HttpStatus.NOT_FOUND;


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

    public Contract addNewContract(Contract contract){
        return contractRepository.save(contract);
    }

    public Contract getContractByID(Long id){
        if(contractRepository.findById(id).isPresent()){
            return contractRepository.findById(id).get();
        }
        else{
            throw new ResponseStatusException(NOT_FOUND, "Unable to find product");
        }
    }

    public Contract editContract(Long id, Contract contract){
        Contract existingContract = getContractByID(id);
        existingContract.setClient(contract.getClient());
        existingContract.setDuration(contract.getDuration());
        existingContract.setFrequency(contract.getFrequency());
        existingContract.setDates(contract.getDates());

        return contractRepository.save(existingContract);
    }

}
