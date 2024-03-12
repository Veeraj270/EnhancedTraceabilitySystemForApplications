package com.example.ETSystem.autoOrder;

import com.example.ETSystem.customerOrders.CustomerOrder;
import com.example.ETSystem.customerOrders.CustomerOrderService;
import com.example.ETSystem.deliveries.DeliveryItem;
import com.example.ETSystem.deliveries.DeliveryItemRepository;
import com.example.ETSystem.deliveries.PlannedDelivery;
import com.example.ETSystem.deliveries.PlannedDeliveryRepository;
import com.example.ETSystem.finalProducts.FinalProduct;
import com.example.ETSystem.ingredientType.IngredientType;
import com.example.ETSystem.product.Product;
import com.example.ETSystem.product.ProductRepository;
import com.example.ETSystem.productData.SuppliedGood;
import com.example.ETSystem.recipe.IngredientQuantity;
import com.example.ETSystem.recipe.Recipe;
import com.example.ETSystem.suppliers.Supplier;
import com.example.ETSystem.suppliers.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import static java.lang.Math.ceil;

@Component
public class AutoOrderService {
    private final CustomerOrderService customerOrderService;
    private final SupplierService supplierService;
    private final PlannedDeliveryRepository plannedDeliveryRepo;
    private final DeliveryItemRepository deliveryItemRepository;
    private final ProductRepository productRepository;

    private List<PlannedDelivery> savedDeliveries;

    //List of products to be associated with current order if generated orders (plus) is confirmed
    private List<Product> savedProducts;

    private CustomerOrder savedOrder;

    @Autowired
    public AutoOrderService(
            CustomerOrderService customerOrderService,
            SupplierService supplierService,
            PlannedDeliveryRepository plannedDeliveryRepo,
            DeliveryItemRepository deliveryItemRepository,
            ProductRepository productRepository
            ){
        this.customerOrderService = customerOrderService;
        this.supplierService = supplierService;
        this.plannedDeliveryRepo = plannedDeliveryRepo;
        this.deliveryItemRepository = deliveryItemRepository;
        this.productRepository = productRepository;

        this.savedProducts = new ArrayList<>();
    }

    //Once confirmation that the generated orders are ok is received this is called to "make" orders to suppliers and save the planned deliveries
    public boolean confirmSavedOrders(){
        for (PlannedDelivery plan : savedDeliveries){
            boolean ok = makeOrder(plan);   //Exists to mimic the behaviour of making an order to our suppliers via their own APIs
            if (ok){
                plannedDeliveryRepo.save(plan);
            }
            else { return false; }
        }
        return true;
    }

    public void reserveProductsForOrder(){
        for (Product product: savedProducts){
            product.setAssociatedOrder(savedOrder);
            productRepository.save(product);
        }
    }

    public List<PlannedDelivery> generateRequiredOrders(CustomerOrder order, boolean useStoredProducts){
        //Local Variables
        List<SuppliedGood>  toOrder = new ArrayList<>();
        List<PlannedDelivery> plannedDeliveries = new ArrayList<>();

        //Calculate required total of each distinct IngredientQuantity
        List<IngredientQuantity> totals = totalIngredients(order.getFinalProducts());

        //For each IngredientType search each of the suppliers for goods that have the required IngredientType
        List<Supplier> suppliers = supplierService.GetAllSuppliers();

        for (IngredientQuantity IQ: totals){
            if (useStoredProducts){
                //Check whether there's Products within productRepository that match the required IType and have no associatedOrder
                List<Product> matchingProducts = productRepository.findAll().stream()
                        .filter(product -> product.getAssociatedOrder() == null && product.getIngredientType().equals(IQ.getIngredientType()))
                        .sorted(Comparator.comparing(Product::getCurrentQuantity))
                        .toList();

                int i = 0;
                int len = matchingProducts.size();
                while(IQ.getQuantity() > 0 && i < len){
                    Product mProduct = matchingProducts.get(i);
                    IQ.setQuantity(IQ.getQuantity() - mProduct.getCurrentQuantity());
                    savedProducts.add(mProduct);
                    i++;
                }
            }

            //If there's still quantity that needs fulfilling, order new goods
            if (IQ.getQuantity() > 0){
                toOrder.addAll(getGoodsForIQ(IQ, suppliers));
            }
        }

        plannedDeliveries = genOrdersToSuppliers(suppliers, toOrder, order);
        return plannedDeliveries;
    }

    public List<SuppliedGood> getGoodsForIQ(IngredientQuantity IQ, List<Supplier> suppliers){
        List<SuppliedGood> matchingGoods = new ArrayList<>();

        float reqAmount = IQ.getQuantity();

        IngredientType reqType = IQ.getIngredientType();

        //Find all SuppliedGoods that match the IngredientType
        for (Supplier supplier : suppliers){
            matchingGoods.addAll(supplier.getGoods().stream()
                    .filter((good) -> good.getIngredientType().equals(reqType))
                    .peek((good) -> {
                        good.setSupplier(supplier);
                    })
                    .toList());
        }
        //Each matching good now has its @Transient supplier attribute set
        //Determine the distinct set of matchingGoods's quantity attributes
        List<Float> distinctQuantities = matchingGoods.stream().map(SuppliedGood::getQuantity).distinct().sorted().toList();

        //Calculate the amount of each distinctQuantity is required
        int[] amounts = getNumOfEachDiQuant(distinctQuantities,reqAmount);

        //Add the cheapest good that matches the required quantity to the toOrder list
        return chooseCheapest(matchingGoods, distinctQuantities, amounts);
    }

    //Takes the list of suppliedGoods that need to be ordered, and generates the required PlannedDeliveries
    public List<PlannedDelivery> genOrdersToSuppliers(List<Supplier> suppliers ,List<SuppliedGood> toOrder, CustomerOrder order){
        List<PlannedDelivery> plannedDeliveries = new ArrayList<>();

        for (Supplier supplier : suppliers){
            List<SuppliedGood> filteredToOrder = toOrder.stream().filter((good) -> good.getSupplier().equals(supplier)).toList();
            if (filteredToOrder.isEmpty()){ continue; }

            String name = String.format("%s-%d-%s",
                    order.getClient().toLowerCase(),
                    order.getDate().getDayOfMonth(),
                    order.getDate().getMonth().toString().toLowerCase()
            );

            String description = "Auto generated delivery";

            ZonedDateTime deliveryTime = order.getDeliveryDate().minusDays(4); //Want ingredients delivered 4 days before CustomerOrder is due
            PlannedDelivery plannedDelivery = new PlannedDelivery(name, description, deliveryTime);

            //PlannedDelivery items attribute is a List<DeliveryItem> - maybe change this later to List<SuppliedGood>
            plannedDelivery.setItems(filteredToOrder.stream().map(
                    (good) -> {
                        DeliveryItem item = new DeliveryItem(good.getLabel(), good.getGtin());
                        deliveryItemRepository.save(item);
                        return item;
                    }).toList());

            plannedDeliveries.add(plannedDelivery);
        }
        return plannedDeliveries;
    }

    public boolean makeOrder(PlannedDelivery plan){
        //Do nothing...
        return true;
    }

    //Determines which goods need to be ordered based on the amount of each distinct quantity needed, and the price of each SuppliedGood
    public List<SuppliedGood> chooseCheapest(List<SuppliedGood> matchingGoods, List<Float> distinctQuantities, int[] amounts){
        List<SuppliedGood> goods = new ArrayList<>();

        for (int i = 0; i < distinctQuantities.size(); i ++){
            if (amounts[i] == 0){ continue; }
            final int finalI = i;
            SuppliedGood chosenGood = matchingGoods.stream().filter((good) -> good.getQuantity() == distinctQuantities.get(finalI)).sorted(Comparator.comparing(SuppliedGood::getPrice)).toList().get(0);
            for (int x = 0; x < amounts[i]; x ++){
                goods.add(chosenGood);
            }
        }

        return goods;
    }

    //Takes a list of distinctQuantities and total required ingredient amount - returns an array containing no. of each distinctQuantity to reach reqAmount
    public int[] getNumOfEachDiQuant(List<Float> distinctQuantities, float reqAmount){
        //Sort distinctQuantities from smallest to largest
        distinctQuantities = distinctQuantities.stream().sorted().toList();
        int[] amounts = new int[distinctQuantities.size()];

        int a = (int) ceil((reqAmount/ distinctQuantities.get(0)));
        float iDeliveryTotal = distinctQuantities.get(0) * a;
        amounts[0] = a;

        //Determine how much of each distinct quantity is required - (This method seems inefficient)
        for (int i = distinctQuantities.size() - 1; i > 0 ; i --){
            int x = ((int) (iDeliveryTotal / distinctQuantities.get(i)));
            if (x == 0){ continue; }
            amounts[i] = x;
            amounts[0] = amounts[0]- (int)(x * (distinctQuantities.get(i)) / distinctQuantities.get(0));
            iDeliveryTotal -= distinctQuantities.get(i)*x;
        }
        return amounts;
    }

    public List<IngredientQuantity> totalIngredients(List<FinalProduct> finalProducts){
        ArrayList<IngredientQuantity> iQuantities = new ArrayList<>();
        ArrayList<IngredientQuantity> iTotals = new ArrayList<>();

        //Extract all IngredientQuantities
        for (FinalProduct finalProduct : finalProducts){
            int quantity = finalProduct.getQuantity();
            Recipe recipe = finalProduct.getRecipe();
            for (IngredientQuantity IQ : recipe.getIngredientQuantities()){
                IngredientQuantity newIQ = new IngredientQuantity(IQ.getIngredientType(), IQ.getQuantity() * quantity);
                iQuantities.add(newIQ);
            }
        }

        //Sum up amount of each IngredientType and store result as list of IngredientQuantities
        for (int i = 0; i < iQuantities.size(); i ++){
            IngredientQuantity IQ = iQuantities.get(i);
            if (IQ == null){ continue; }
            IngredientType type = IQ.getIngredientType();
            float total = IQ.getQuantity();
            for (int x = i + 1; x < iQuantities.size(); x ++){
                if (iQuantities.get(x) != null && iQuantities.get(x).getIngredientType().equals(iQuantities.get(i).getIngredientType())){
                    total += iQuantities.get(x).getQuantity();
                    iQuantities.set(x, null);
                }
            }
            iQuantities.set(i, null);
            iTotals.add(new IngredientQuantity(type, total));
        }

        return iTotals;
    }

    public List<PlannedDelivery> getSavedDeliveries() {
        return savedDeliveries;
    }

    public void setSavedDeliveries(List<PlannedDelivery> savedDeliveries) {
        this.savedDeliveries = savedDeliveries;
    }

    public List<Product> getSavedProducts(){ return savedProducts; }

    public void setSavedProducts(List<Product> list){ this.savedProducts = list; }

    public void setSavedOrder(CustomerOrder order){ this.savedOrder = order; }

}
