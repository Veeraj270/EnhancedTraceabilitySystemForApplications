package com.example.ETSystem.autoOrder;

import com.example.ETSystem.customerOrders.CustomerOrder;
import com.example.ETSystem.deliveries.PlannedDelivery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/auto-order")
public class AutoOrderAPI {

    private final AutoOrderService autoOrderService;

    @Autowired
    public AutoOrderAPI(AutoOrderService autoOrderService) {
        this.autoOrderService = autoOrderService;
    }
    //Need method for generating the orders and sending them to the front-end

    @GetMapping(path = "/auto-gen-orders")
    public List<PlannedDelivery> getAutoGenOrders(@RequestBody CustomerOrder order){
        List<PlannedDelivery> planned = autoOrderService.generateRequiredOrders(order);
        autoOrderService.setSavedDeliveries(planned);
        return planned;
    }

    @RequestMapping(path = "/auto-gen-orders/confirm")
    public boolean confirmAutoGenResult(){
        return autoOrderService.confirmSavedOrders();
    }

    @RequestMapping(path = "/auto-gen-orders/cancel")
    public boolean cancelAutoGenResult(){
        autoOrderService.setSavedDeliveries(null);
        return false;
    }
}
