package com.example.ETSystem.contracts;

import com.example.ETSystem.finalProducts.FinalProduct;
import com.example.ETSystem.finalProducts.FinalProductRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

@Component
public class ContractDataGenerator {
    private final ContractRepository contractRepository;
    private final FinalProductRepository finalProductRepository;

    @Autowired
    public ContractDataGenerator(ContractRepository contractRepository, FinalProductRepository finalProductRepository){
        this.contractRepository = contractRepository;
        this.finalProductRepository = finalProductRepository;
    }

    public void generateContractData(){
        ZonedDateTime zdt = ZonedDateTime.now();

        List<ZonedDateTime> dates = new ArrayList<>() {};

        dates.add(zdt);
        dates.add(zdt.plusMonths(1));
        dates.add(zdt.plusMonths(2));



        Long one = 1L;


        List<FinalProduct> finalProductList = new ArrayList<>();
        FinalProduct finalProduct = finalProductRepository.findById(1L).orElseThrow();
        finalProductList.add(finalProduct);

        Contract contract = new Contract("Morrison's", "3 Months", "Monthly", dates, finalProductList);
        contractRepository.save(contract);
    }
}
