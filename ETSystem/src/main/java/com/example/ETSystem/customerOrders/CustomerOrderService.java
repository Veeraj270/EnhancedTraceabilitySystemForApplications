package com.example.ETSystem.customerOrders;


import com.example.ETSystem.finalProducts.FinalProduct;
import com.example.ETSystem.productData.Exceptions.ProductNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.http.HttpStatus.NOT_FOUND;

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

    public List<FinalProduct> getOrderedFinalProducts(){
        return getCustomerOrders().stream().flatMap(order -> order.getFinalProducts().stream()).collect(Collectors.toList());
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
