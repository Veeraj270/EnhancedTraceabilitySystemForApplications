package com.example.ETSystem.productData;

import com.example.ETSystem.ingredientType.IngredientType;
import com.example.ETSystem.ingredientType.IngredientTypeRepository;
import com.example.ETSystem.suppliers.Supplier;
import com.example.ETSystem.suppliers.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class MockDataGenerator {
    private final SuppliedGoodRepository suppliedGoodRepository;
    private final IngredientTypeRepository ingredientTypeRepository;
    private final SupplierService supplierService;

    @Autowired
    public MockDataGenerator(SuppliedGoodRepository suppliedGoodRepository,
                             IngredientTypeRepository ingredientTypeRepository,
                             SupplierService supplierService
    ){
        this.suppliedGoodRepository = suppliedGoodRepository;
        this.ingredientTypeRepository = ingredientTypeRepository;
        this.supplierService = supplierService;
    }

    public void GenerateMockData(){
        //Starting Barcode - 13 digits to fit EAC format
        //SUPPLIERS
        List<String> supplierNames = List.of(
                "Cisco",
                "Andrew Ingredients",
                "Harry Harvey",
                "Brakes"
        );

        ArrayList<Supplier> suppliers = new ArrayList<Supplier>();

        for (String name : supplierNames){
            suppliers.add(new Supplier(name, new ArrayList<SuppliedGood>()));
        }

        int unitPrice = 10000;
        //INGREDIENTS
        //Flours
        List<String> flours = List.of(
                "Bread Flour",
                "Strong Flour",
                "Wholemeal Flour",
                "Plain Flour",
                "Self Raising Flour",
                "Rice Flour"
        );

        //Sugar Types
        List<String> sugars = List.of(
                "Granulated Sugar",
                "Caster Sugar",
                "Icing Sugar",
                "Light Brown Sugar",
                "Dark Brown Sugar",
                "Demerara Sugar"
        );


        List<String> nuts = List.of(
                "Almonds",
                "Peanuts",
                "Hazelnuts",
                "Walnuts",
                "Cashew nuts"
        );

        //Spices
        List<String> Spices = List.of(
                "Ground Cinnamon",
                "Ground Nutmeg",
                "Ground Cloves",
                "Ground Ginger",
                "All Spice",
                "Anise",
                "Black Pepper",
                "Saffron",
                "Cayenne Pepper",
                "Black Pepper"
        );

        //Liquids
        List<String> liquids = List.of(
                "Coconut Oil",
                "Palm Oil",
                "Soybean Oil",
                "Canola Oil",
                "Olive Oil",
                "Sunflower Oil",
                "Semi-Skimmed Milk",
                "Whole Milk"
        );

        //Fresh Fruit & Veg
        List<String> fruitAndVeg = List.of(
                "Apples",
                "Bananas",
                "Blueberries",
                "Strawberries",
                "Raspberries",
                "Lemons",
                "Oranges",
                "Limes",
                "Pumpkin",
                "Carrots",
                "Zucchini",
                "Sweet Potatoes",
                "Pears",
                "Peaches",
                "Apricots",
                "Cherries",
                "Blackberries",
                "Mangoes",
                "Pineapple",
                "Cranberries",
                "Rhubarb",
                "Kiwifruit",
                "Grapes",
                "Figs",
                "Dates",
                "Coconut",
                "Avocado",
                "Beetroot"
        );

        //Butters
        List<String> buttersAndCream = List.of(
                "Salted Butter",
                "Unsalted Butter",
                "Sour Cream",
                "Cottage Cheese",
                "Cheddar Cheese"
        );

        //Chocolate
        List<String> chocolates = List.of(
                "Dark Chocolate",
                "White Chocolate",
                "Milk Chocolate"
        );

        int i = 1;
        for (Supplier supplier : suppliers){
            Long barcode  = 1000000000000L * i; i ++;
            List<Float> quantities = List.of(25F,10F, 5F, 2.5F, 1F);
            //Bulk Ingredients
            String unit = "kg";
            for (Float quantity : quantities){
                for (String name : flours){
                    barcode ++;
                    genTableRow(barcode, name, quantity, unit, supplier, (int) (unitPrice * quantity));
                }
                for (String name : sugars){
                    barcode ++;
                    genTableRow(barcode, name, quantity, unit, supplier, (int)(unitPrice * quantity));

                }
                for (String name : fruitAndVeg){
                    barcode ++;
                    genTableRow(barcode, name, quantity, unit, supplier,(int) (unitPrice * quantity));
                }
            }

            //Medium Bulk Ingredients
            quantities = List.of(5F,2.5F, 1F, 0.5F);
            unit = "kg";
            for (Float quantity : quantities){
                for (String name : buttersAndCream){
                    barcode ++;
                    genTableRow(barcode, name, quantity, unit, supplier, (int) (unitPrice * quantity));
                }
                for (String name : chocolates){
                    barcode ++;
                    genTableRow(barcode, name, quantity, unit, supplier, (int) (unitPrice * quantity));
                }
                for (String name : nuts){
                    barcode ++;
                    genTableRow(barcode, name, quantity, unit, supplier, (int) (unitPrice * quantity));
                }
            }

            //Liquids
            quantities = List.of(5F, 2.5F, 1F, 0.5F);
            unit = "L";
            for (Float quantity : quantities){
                for (String name : liquids){
                    barcode ++;
                    genTableRow(barcode, name, quantity, unit, supplier, (int) (unitPrice * quantity));
                }
            }
        }
    }
     public void genTableRow(Long barcode,String name, Float quantity, String unit, Supplier supplier, int price){
         //Format label
         String label = String.format("%s-%s-%s", name.replace(" ","-").toLowerCase(), quantity, unit);
         String ingredientTypeName = name.replace(" ","-").toLowerCase();

         List<IngredientType> list = ingredientTypeRepository.findByName(ingredientTypeName);

         IngredientType ingredientType = null;
         if (list.isEmpty()){
             //Currently just setting all ingredients to be non allergen, vegetarian, and vegan
             ingredientType = new IngredientType(ingredientTypeName, false, false, false);
             ingredientType = ingredientTypeRepository.save(ingredientType);
         }
         else {
             ingredientType = list.get(0);
         }

         SuppliedGood entry = new SuppliedGood(
                 barcode.toString(),
                 label,
                 ingredientType,
                 quantity,
                 unit,
                 price
         );

         //The suppliedGood is saved to the suppliedGood repo within this method
         supplierService.AddGoodToSupplier(supplier, entry);
     }
}

