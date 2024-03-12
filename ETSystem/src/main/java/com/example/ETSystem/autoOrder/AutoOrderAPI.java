package com.example.ETSystem.autoOrder;

import com.example.ETSystem.customerOrders.CustomerOrder;
import com.example.ETSystem.deliveries.PlannedDelivery;
import com.example.ETSystem.product.Product;
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
    public AutoOrderGenOrderPlusResponse getAutoGenOrdersPlus(@RequestBody CustomerOrder order){
        autoOrderService.setSavedOrder(order);

        //Generate the planned deliveries that represent the orders to suppliers
        List<PlannedDelivery> planned = autoOrderService.generateRequiredOrders(order, true);

        //Save the deliveries - so they can be saved upon confirmation
        autoOrderService.setSavedDeliveries(planned);

        //Send back both the planned orders to suppliers, and the products in the Product repo that can be used to fulfill the requirements of the order
        return new AutoOrderGenOrderPlusResponse(planned, autoOrderService.getSavedProducts());
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

    //Custom response type
    public class AutoOrderGenOrderPlusResponse{
        public List<PlannedDelivery> plannedOrders;
        public List<Product> productsToReserve;

        public AutoOrderGenOrderPlusResponse(List<PlannedDelivery> plannedOrders, List<Product> productsToReserve){
            this.plannedOrders = plannedOrders;
            this.productsToReserve = productsToReserve;
        }
    }
}
