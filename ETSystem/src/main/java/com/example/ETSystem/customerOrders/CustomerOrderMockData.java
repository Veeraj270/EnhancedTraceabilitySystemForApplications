package com.example.ETSystem.customerOrders;

import com.example.ETSystem.finalProducts.FinalProduct;
import com.example.ETSystem.finalProducts.FinalProductRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;

@Component
public class CustomerOrderMockData {

    @Autowired
    private FinalProductRepository finalProductRepository;

    @Autowired
    private CustomerOrderRepository customerOrderRepository;


    @Transactional
    public void processCustomerOrder() throws Exception{


        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode root = objectMapper.readTree(getClass().getResourceAsStream("/MOCK_CUSTOMERORDERS.json"));

        for(JsonNode node : root) {
            String client = node.get("client").asText();
            String localDateString = node.get("date").asText();
            String deliveryDateString = node.get("deliveryDate").asText();
            DateTimeFormatter formatter =DateTimeFormatter.ofPattern("yyyy/MM/dd");
            LocalDate localDate = LocalDate.parse(localDateString, formatter);
            LocalDate deliveryDate = LocalDate.parse(deliveryDateString, formatter);

            ArrayList<FinalProduct> finalProducts= new ArrayList<>();

            for(JsonNode finalProductNode : node.get("finalProducts")){
                Long finalProductId = finalProductNode.asLong();
                FinalProduct finalProduct = finalProductRepository.findById(finalProductId)
                        .orElseThrow(() -> new RuntimeException("FinalProductid does not match a finalproduct"));
                finalProducts.add(finalProduct);
            }

            CustomerOrder customerOrder= new CustomerOrder();
            customerOrder.setClient(client);
            customerOrder.setDate(localDate.atStartOfDay(ZoneOffset.UTC));
            customerOrder.setDeliveryDate(deliveryDate.atStartOfDay(ZoneOffset.UTC));
            customerOrder.setFinalProducts(finalProducts);

            customerOrderRepository.save(customerOrder);



        }
    }
}
