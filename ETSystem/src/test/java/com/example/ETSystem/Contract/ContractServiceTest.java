package com.example.ETSystem.Contract;

import com.example.ETSystem.contracts.Contract;
import com.example.ETSystem.contracts.ContractRepository;
import com.example.ETSystem.contracts.ContractService;
import com.example.ETSystem.finalProducts.FinalProduct;
import com.example.ETSystem.finalProducts.FinalProductService;
import com.example.ETSystem.recipe.Recipe;
import com.example.ETSystem.recipe.RecipeService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class ContractServiceTest {

    private ContractRepository contractRepository;
    private ContractService contractService;
    private FinalProductService finalProductService;
    private RecipeService recipeService;

    @Autowired
    public ContractServiceTest(ContractRepository contractRepository, ContractService contractService, FinalProductService finalProductService, RecipeService recipeService){
        this.contractRepository = contractRepository;
        this.contractService = contractService;
        this.finalProductService = finalProductService;
        this.recipeService = recipeService;
    }

    @Test
    @Transactional
    void testGettingContracts(){
        Recipe recipe = recipeService.addNewRecipe(new Recipe("recipe", Set.of()));
        FinalProduct finalProduct = finalProductService
                .addNewFinalProduct(new FinalProduct("final product", 10, recipe, 10));
        Contract contract = contractService
                .addNewContract(new Contract("client", "1 month", "weekly", new ArrayList<>(List.of(ZonedDateTime.now())), List.of(finalProduct)));

        // Test addNewContract first
        assertEquals(contractService.getContractByID(contract.getID()), contract);
        // Test getContractByID
        assertEquals(contractService.getContractByID(contract.getID()), contract);
        // Test throwing an exception by getContractByID
        assertThrows(ResponseStatusException.class, () -> {contractService.getContractByID(100L);});
        // Test getContracts
        assertEquals(contractService.getContracts(), List.of(contract));
    }

    @Test
    @Transactional
    void testEditContract(){
        Recipe recipe = recipeService.addNewRecipe(new Recipe("recipe", Set.of()));
        FinalProduct finalProduct = finalProductService
                .addNewFinalProduct(new FinalProduct("final product", 10, recipe, 10));
        Contract contract = contractService
                .addNewContract(new Contract("client", "1 month", "weekly", new ArrayList<>(List.of(ZonedDateTime.now())), new ArrayList<>(List.of(finalProduct))));
        // Changing the objects attributes
        contract.setClient("client2");
        contract.setDuration("2 months");
        contract.setFrequency("Monthly");
        contract.setDates(new ArrayList<>(List.of(ZonedDateTime.now().plusDays(3))));
        contractService.editContract(contract.getID(), contract);

        assertEquals(contractService.getContractByID(contract.getID()), contract);
    }
}
