package com.example.ETSystem.customerOrders;

import com.example.ETSystem.finalProducts.FinalProduct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/customerorders")
@CrossOrigin(origins = "http://localhost:3000")
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

    @GetMapping(path = "/fetch-ordered-final-products")
    public List<Pair<CustomerOrder, FinalProduct>> getOrderedFinalProducts() {
        return customerOrderService.getOrderedFinalProducts();
    }

    @GetMapping(path= "/fetch-all-fp-data")
    public List<CustomerOrderService.FPData> getFinalProductData(){
        return customerOrderService.getFinalProductData();
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

    @PutMapping(path = "edit-final-products")
    public void editCustomerOrderFinalProducts(@RequestBody List<String> finalProducts){
       finalProducts.stream().forEach(x -> {
            String[] elements = x.split(";");
            customerOrderService.editCustomerOrderFinalProducts(Long.parseLong(elements[0]), Pair.of(Long.parseLong(elements[1]), Integer.parseInt(elements[2])));
        });
    }

}
