package com.example.ETSystem.autoOrder;

import com.example.ETSystem.customerOrders.CustomerOrder;
import com.example.ETSystem.customerOrders.CustomerOrderRepository;
import com.example.ETSystem.customerOrders.CustomerOrderService;
import com.example.ETSystem.deliveries.PlannedDelivery;
import com.example.ETSystem.finalProducts.FinalProduct;
import com.example.ETSystem.ingredientType.IngredientType;
import com.example.ETSystem.productData.SuppliedGood;
import com.example.ETSystem.recipe.IngredientQuantity;
import com.example.ETSystem.recipe.Recipe;
import com.example.ETSystem.suppliers.Supplier;
import com.example.ETSystem.suppliers.SupplierService;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import static java.lang.Math.ceil;
import static java.lang.Math.round;

@Component
public class AutoOrderService {
    private final CustomerOrderService customerOrderService;
    private final SupplierService supplierService;

    @Autowired
    public AutoOrderService(
            CustomerOrderService customerOrderService,
            SupplierService supplierService
            ){
        this.customerOrderService = customerOrderService;
        this.supplierService = supplierService;
    }

    public PlannedDelivery generateRequiredOrders(CustomerOrder order){
        //Local Variables
        List<SuppliedGood>  toOrder = new ArrayList<>();

        //Calculate required total of each distinct IngredientQuantity
        List<IngredientQuantity> totals = totalIngredients(order.getFinalProducts());

        //For each IngredientType search each of the suppliers for goods that have the required IngredientType
        List<Supplier> suppliers = supplierService.GetAllSuppliers();

        for (IngredientQuantity IQ: totals){
            List<SuppliedGood> matchingGoods = new ArrayList<>();

            int reqAmount = IQ.getQuantity();
            int actAmount = 0;

            //Find all SuppliedGoods that match the IngredientType
            IngredientType reqType = IQ.getIngredientType();
            for (Supplier supplier : suppliers){
                matchingGoods.addAll(supplier.getGoods().stream()
                        .filter((good) -> good.getIngredientType().equals(reqType))
                        .map((good) -> {
                            good.setSupplier(supplier);
                            return good;
                        })
                        .toList());
            }
            //Each matching good now has its @Transient supplier attribute set
            //Determine the distinct set of matchingGoods's quantity attributes
            List<Float> distinctQuantities = matchingGoods.stream().map(SuppliedGood::getQuantity).distinct().sorted().toList();

            //Calculate the amount of each distinctQuantity is required
            int[] amounts = determineNumOfEach(distinctQuantities,reqAmount);

            //Add the cheapest good that matches the required quantity to the toOrder list
            toOrder = determineGoods(matchingGoods, distinctQuantities, amounts);

            //To Do: Generate Scheduled Delivery for each supplier used.
        }

        return new PlannedDelivery();
    }

    public List<SuppliedGood> determineGoods(List<SuppliedGood> matchingGoods, List<Float> distinctQuantities, int[] amounts){
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
    public int[] determineNumOfEach(List<Float> distinctQuantities, float reqAmount){
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
            amounts[0] = amounts[0] - (int)(x * (distinctQuantities.get(i)) / distinctQuantities.get(0));
            iDeliveryTotal -= distinctQuantities.get(i) * x;
        }
        return  amounts;
    }

    public List<IngredientQuantity> totalIngredients(List<FinalProduct> finalProducts){
        ArrayList<IngredientQuantity> iQuantities = new ArrayList<>();
        ArrayList<IngredientQuantity> iTotals = new ArrayList<>();

        //Extract all IngredientQuantities
        for (FinalProduct finalProduct : finalProducts){
            int quantity = finalProduct.getQuantity();
            Recipe recipe = finalProduct.getRecipe();

            for (IngredientQuantity IQ : recipe.getIngredientQuantities()){
                IQ.setQuantity(IQ.getQuantity() * quantity);
                iQuantities.add(IQ);
            }
        }

        //Sum up amount of each IngredientType and store result as list of IngredientQuantities
        for (int i = 0; i < iQuantities.size(); i ++){
            IngredientQuantity IQ = iQuantities.get(i);
            if (IQ == null){ continue; }
            IngredientType type = IQ.getIngredientType();
            int total = IQ.getQuantity();
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

    private class FloatIntPair{
        public float f;
        public int i;

        public FloatIntPair(){};
    }










    /* @Autowired
    public AutoOrderService(CustomerOrderRepository customerOrderRepository){
        this.customerOrderRepository = customerOrderRepository;
    }

    private List<Entry<Ingredient, Integer>> getIngredients(FinalProduct finalProduct){
        return finalProduct.getRecipe()
                .getIngredients()
                .stream()
                .map(x -> new SimpleEntry<>(x.getIngredient(), x.getQuantity()))
                .collect(Collectors.toList());
    }

    public List<Entry<Ingredient, Integer>> getIngredients(Long id){
        return customerOrderRepository.findById(id)
                .get().getFinalProducts().stream()
                .map(finalProduct -> getIngredients(finalProduct))
                .flatMap(List::stream)
                .collect(Collectors.groupingBy(ingredientQuantity -> ingredientQuantity.getKey())).entrySet()
                .stream()
                .map(entry -> Map.entry(entry.getKey(),
                        entry.getValue().stream().mapToInt(Entry<Ingredient, Integer>::getValue).sum()))
                .collect(Collectors.toList());
    }*/

}
