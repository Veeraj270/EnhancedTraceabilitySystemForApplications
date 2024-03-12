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
        autoOrderService.setSavedOrder(order);
        List<PlannedDelivery> planned = autoOrderService.generateRequiredOrders(order, false);
        autoOrderService.setSavedDeliveries(planned);
        return planned;
    }

    @GetMapping(path = "/auto-gen-orders-plus")
    public List<PlannedDelivery> getAutoGenOrdersPlus(@RequestBody CustomerOrder order){
        autoOrderService.setSavedOrder(order);
        List<PlannedDelivery> planned = autoOrderService.generateRequiredOrders(order, true);
        autoOrderService.setSavedDeliveries(planned);
        return planned;
    }


    @RequestMapping(path = "/auto-gen-orders/confirm")
    public void confirmAutoGenResult(){
        autoOrderService.confirmSavedOrders();
        autoOrderService.reserveProductsForOrder();

        //Reset autoOrderService
        autoOrderService.setSavedDeliveries(null);
        autoOrderService.setSavedProducts(null);
        autoOrderService.setSavedOrder(null);

    }

    @RequestMapping(path = "/auto-gen-orders/cancel")
    public boolean cancelAutoGenResult(){
        //Reset autoOrderService
        autoOrderService.setSavedDeliveries(null);
        autoOrderService.setSavedProducts(null);
        autoOrderService.setSavedOrder(null);
        return false;
    }
}
