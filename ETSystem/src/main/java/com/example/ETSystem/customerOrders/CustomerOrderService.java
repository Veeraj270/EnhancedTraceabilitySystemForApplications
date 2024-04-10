package com.example.ETSystem.customerOrders;


import com.example.ETSystem.finalProducts.FinalProduct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Component;

import java.util.List;
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

}
