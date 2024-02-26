package com.example.ETSystem.productData;

import com.example.ETSystem.ingredientType.IngredientType;
import com.example.ETSystem.ingredientType.IngredientTypeRepository;
import com.example.ETSystem.suppliers.Supplier;
import com.example.ETSystem.suppliers.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
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
        //INGREDIENTS
        //Flours
        ArrayList<String> flours = new ArrayList<>(Arrays.asList(
                "Bread Flour",
                "Strong Flour",
                "Wholemeal Flour",
                "Plain Flour",
                "Self Raising Flour",
                "Rice Flour"
        ));

        //Sugar Types
        ArrayList<String> sugars = new ArrayList<>(Arrays.asList(
                "Granulated Sugar",
                "Caster Sugar",
                "Icing Sugar",
                "Light Brown Sugar",
                "Dark Brown Sugar",
                "Demerara Sugar"
        ));


        ArrayList<String> nuts = new ArrayList<>(Arrays.asList(
                "Almonds",
                "Peanuts",
                "Hazelnuts",
                "Walnuts",
                "Cashew nuts"
        ));

        //Spices
        ArrayList<String> Spices = new ArrayList<>(Arrays.asList(
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
        ));

        //Liquids
        ArrayList<String> liquids = new ArrayList<>(Arrays.asList(
                "Coconut Oil",
                "Palm Oil",
                "Soybean Oil",
                "Canola Oil",
                "Olive Oil",
                "Sunflower Oil",
                "Semi-Skimmed Milk",
                "Whole Milk"
        ));

        //Fresh Fruit & Veg
        ArrayList<String> fruitAndVeg = new ArrayList<>(Arrays.asList(
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
        ));

        //Butters
        ArrayList<String> buttersAndCream = new ArrayList<>(Arrays.asList(
                "Salted Butter",
                "Unsalted Butter",
                "Sour Cream",
                "Cottage Cheese",
                "Cheddar Cheese"
        ));

        //Chocolate
        ArrayList<String> chocolates = new ArrayList<>(Arrays.asList(
                "Dark Chocolate",
                "White Chocolate",
                "Milk Chocolate"
        ));

        int i = 1;
        for (Supplier supplier : suppliers){
            Long barcode  = 1000000000000L * i; i ++;
            ArrayList<Float> quantities = new ArrayList<>(Arrays.asList(25F,10F, 5F, 2.5F, 1F));
            //Bulk Ingredients
            String unit = "kg";
            for (Float quantity : quantities){
                for (String name : flours){
                    barcode ++;
                    genTableRow(barcode, name, quantity, unit, supplier);
                }
                for (String name : sugars){
                    barcode ++;
                    genTableRow(barcode, name, quantity, unit, supplier);

                }
                for (String name : fruitAndVeg){
                    barcode ++;
                    genTableRow(barcode, name, quantity, unit, supplier);
                }
            }

            //Medium Bulk Ingredients
            quantities = new ArrayList<>(Arrays.asList(5F, 2.5F, 1F, 0.5F));
            unit = "kg";
            for (Float quantity : quantities){
                for (String name : buttersAndCream){
                    barcode ++;
                    genTableRow(barcode, name, quantity, unit, supplier);
                }
                for (String name : chocolates){
                    barcode ++;
                    genTableRow(barcode, name, quantity, unit, supplier);
                }
                for (String name : nuts){
                    barcode ++;
                    genTableRow(barcode, name, quantity, unit, supplier);
                }
            }

            //Liquids
            quantities = new ArrayList<>(Arrays.asList(5F, 2.5F, 1F, 0.5F));
            unit = "L";
            for (Float quantity : quantities){
                for (String name : liquids){
                    barcode ++;
                    genTableRow(barcode, name, quantity, unit, supplier);
                }
            }
        }
    }
     public void genTableRow(Long barcode,String name, Float quantity, String unit, Supplier supplier){
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
                 unit
         );

         //The suppliedGood is saved to the suppliedGood repo within this method
         supplierService.AddGoodToSupplier(supplier, entry);
     }
}

