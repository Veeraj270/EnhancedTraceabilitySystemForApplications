package com.example.ETSystem.customerOrders;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/customerorders")
@CrossOrigin
public class CustomerOrderAPI {
    private final CustomerOrderService customerOrderService;

    @Autowired
    public CustomerOrderAPI(CustomerOrderService customerOrderService) {
        this.customerOrderService = customerOrderService;
    }

    @GetMapping(path = "/fetch")
    public List<CustomerOrder> getCustomerOrders() {
        return customerOrderService.getCustomerOrders();
    }

    @GetMapping(path = "/fetch-by-id/{id}")
    public CustomerOrder getCustomerOrderById(@PathVariable("id") String id) throws Exception {
        return customerOrderService.getCustomerOrderByID(Long.parseLong(id));
    }

    @PostMapping(path = "/add")
    public CustomerOrder addCustomerOrder(@RequestBody CustomerOrder newCustomerOrder){
        customerOrderService.addNewCustomerOrder(newCustomerOrder);
        return newCustomerOrder;
    }

    @PutMapping(path = "/edit/{id}")
    public ResponseEntity<CustomerOrder> editCustomerOrder(@PathVariable Long id, @RequestBody CustomerOrder customerOrder){
        CustomerOrder editedOrder = customerOrderService.editCustomerOrder(id, customerOrder);
        return ResponseEntity.ok(editedOrder);
    }

}
