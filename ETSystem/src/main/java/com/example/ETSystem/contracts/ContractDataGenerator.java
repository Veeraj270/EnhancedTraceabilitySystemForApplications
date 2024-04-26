package com.example.ETSystem.contracts;

import com.example.ETSystem.customerOrders.CustomerOrder;
import com.example.ETSystem.customerOrders.CustomerOrderRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

@Component
public class ContractDataGenerator {
    private final ContractRepository contractRepository;
    private final CustomerOrderRepository customerOrderRepository;

    @Autowired
    public ContractDataGenerator(ContractRepository contractRepository, CustomerOrderRepository customerOrderRepository){
        this.contractRepository = contractRepository;
        this.customerOrderRepository = customerOrderRepository;
    }

    public void generateContractData(){
        ZonedDateTime zdt = ZonedDateTime.now();

        List<ZonedDateTime> dates = new ArrayList<>() {};
        dates.add(zdt);
        dates.add(zdt.plusMonths(1));
        dates.add(zdt.plusMonths(2));
        Long one = 1L;
        CustomerOrder customerOrder = customerOrderRepository.findById(one).orElseThrow(() -> new EntityNotFoundException("When looking for a customerOrder to add to the contract, it was not found"));
        Contract contract = new Contract("Morrison's", "3 Months", "Monthly", dates, customerOrder);
        contractRepository.save(contract);
    }
}
