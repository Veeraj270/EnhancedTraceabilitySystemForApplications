package com.example.ETSystem.contracts;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

@Component
public class ContractDataGenerator {
    private final ContractRepository contractRepository;

    @Autowired
    public ContractDataGenerator(ContractRepository contractRepository){
        this.contractRepository = contractRepository;
    }

    public void generateContractData(){
        ZonedDateTime zdt = ZonedDateTime.now();

        List<ZonedDateTime> dates = new ArrayList<>() {};
        dates.add(zdt);
        dates.add(zdt.plusMonths(1));
        dates.add(zdt.plusMonths(2));
        Contract contract = new Contract("Morrison's", "3 Months", "Monthly", dates);
        contractRepository.save(contract);
    }
}
