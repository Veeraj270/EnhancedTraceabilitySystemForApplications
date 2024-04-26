package com.example.ETSystem.customerOrders;


import com.example.ETSystem.finalProducts.FinalProduct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import java.util.stream.Collectors;

@Component
public class CustomerOrderService {

    private final CustomerOrderRepository customerOrderRepository;

    @Autowired
    public CustomerOrderService(CustomerOrderRepository customerOrderRepository) {
        this.customerOrderRepository = customerOrderRepository;
    }

    public List<CustomerOrder> getCustomerOrders(){
        return customerOrderRepository.findAll();
    }

    public List<Pair<CustomerOrder, FinalProduct>> getOrderedFinalProducts(){
        return getCustomerOrders().stream().flatMap(order -> { return
            order.getFinalProducts().stream().map(finalProduct -> Pair.of(order, finalProduct));}).collect(Collectors.toList());
    }

    public void addNewCustomerOrder(CustomerOrder customerOrder){
        customerOrderRepository.save(customerOrder);
    }

    public CustomerOrder getCustomerOrderByID(Long id) throws Exception {
        if(customerOrderRepository.findById(id).isPresent()){
            return customerOrderRepository.findById(id).get();
        }
        else{
            throw new Exception("Unable to find customer order");
        }
    }

    public CustomerOrder editCustomerOrder(Long id, CustomerOrder customerOrder){
        CustomerOrder existingCustomerOrder = customerOrderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer order not found with id: " + id));
        existingCustomerOrder.setClient(customerOrder.getClient());
        existingCustomerOrder.setDate(customerOrder.getDate());
        existingCustomerOrder.setFinalProducts(customerOrder.getFinalProducts());

        return customerOrderRepository.save(existingCustomerOrder);
    }

    public CustomerOrder editCustomerOrderFinalProducts(Long id, Pair<Long, Integer> newFinalProductData){
        CustomerOrder existingCustomerOrder = customerOrderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer order not found with id: " + id));
        List<FinalProduct> existingFinalProducts = existingCustomerOrder.getFinalProducts();
        existingFinalProducts.stream().map(finalProduct -> {
            // I use findFirst() because there can't be 2 final products with the same id
            if(newFinalProductData.getFirst() == finalProduct.getId()){
                finalProduct.setQuantity(finalProduct.getQuantity() - newFinalProductData.getSecond());
            }
            return finalProduct;
        }).collect(Collectors.toList());
        existingCustomerOrder.setFinalProducts(existingFinalProducts);

        return customerOrderRepository.save(existingCustomerOrder);
    }



    public static class FPData {
        public String finalProductLabel;
        public Integer amount;
        public long associatedCustomerOrderID;

        public FPData(String finalProductLabel, Integer amount, long associatedCustomerOrderID){
            this.finalProductLabel = finalProductLabel;
            this.amount = amount;
            this.associatedCustomerOrderID = associatedCustomerOrderID;
        }
    }


    public List<FPData> getFinalProductData(){
        List<CustomerOrder> allOrders = customerOrderRepository.findAll();
        List<FPData> allFPData = new ArrayList<>();

        for (CustomerOrder order: allOrders){
            //Get all finalProducts from the order
            List<FinalProduct> finalProducts = order.getFinalProducts();

            //Get the orders ID
            long orderID = order.getID();

            List<FPData> orderFPData = new ArrayList<>();

            for (FinalProduct FP : finalProducts){
                //Search the list to see if the final product is already in the list
                Optional<FPData> existing = orderFPData.stream().filter(x -> x.finalProductLabel.equals(FP.getLabel())).findFirst();

                if (existing.isPresent()){
                    existing.get().amount += 1;
                } else {
                    orderFPData.add(new FPData(FP.getLabel(), 1, orderID));
                }
            }
            allFPData.addAll(orderFPData);
            orderFPData.clear();
        }

        return allFPData;
    }
}
