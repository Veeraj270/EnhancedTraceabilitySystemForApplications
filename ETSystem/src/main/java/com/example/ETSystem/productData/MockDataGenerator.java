package com.example.ETSystem.productData;

import com.example.ETSystem.ingredientType.IngredientType;
import com.example.ETSystem.ingredientType.IngredientTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;

@Component
public class MockDataGenerator {
    private final SuppliedGoodRepository suppliedGoodRepository;
    private final IngredientTypeRepository ingredientTypeRepository;

    @Autowired
    public MockDataGenerator(SuppliedGoodRepository suppliedGoodRepository, IngredientTypeRepository ingredientTypeRepository){
        this.suppliedGoodRepository = suppliedGoodRepository;
        this.ingredientTypeRepository = ingredientTypeRepository;
    }

    public void GenerateMockData(){
        //Starting Barcode - 13 digits to fit EAC format
        //SUPPLIERS
        ArrayList<String> Suppliers = new ArrayList<>(Arrays.asList(
                "Cisco",
                "Andrew Ingredients",
                "Harry Harvey",
                "Brakes"
        ));

        //INGREDIENTS
        //Flours
        ArrayList<String> Flours = new ArrayList<>(Arrays.asList(
                "Bread Flour",
                "Strong Flour",
                "Wholemeal Flour",
                "Plain Flour",
                "Self Raising Flour",
                "Rice Flour"
        ));

        //Sugar Types
        ArrayList<String> Sugars = new ArrayList<>(Arrays.asList(
                "Granulated Sugar",
                "Caster Sugar",
                "Icing Sugar",
                "Light Brown Sugar",
                "Dark Brown Sugar",
                "Demerara Sugar"
        ));


        ArrayList<String> Nuts = new ArrayList<>(Arrays.asList(
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
        ArrayList<String> Liquids = new ArrayList<>(Arrays.asList(
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
        ArrayList<String> FruitAndVeg = new ArrayList<>(Arrays.asList(
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
        ArrayList<String> ButtersAndCream = new ArrayList<>(Arrays.asList(
                "Salted Butter",
                "Unsalted Butter",
                "Sour Cream",
                "Cottage Cheese",
                "Cheddar Cheese"
        ));

        //Chocolate
        ArrayList<String> Chocolates = new ArrayList<>(Arrays.asList(
                "Dark Chocolate",
                "White Chocolate",
                "Milk Chocolate"
        ));

        int i = 1;
        for (String supplier : Suppliers){
            Long barcode  = 1000000000000L * i; i ++;
            ArrayList<Float> quantities = new ArrayList<>(Arrays.asList(25F,10F, 5F, 2.5F, 1F));
            //Bulk Ingredients
            String unit = "kg";
            for (Float quantity : quantities){
                for (String name : Flours){
                    barcode ++;
                    genTableRow(barcode, name, quantity, unit, supplier.toLowerCase());
                }
                for (String name : Sugars){
                    barcode ++;
                    genTableRow(barcode, name, quantity, unit, supplier.toLowerCase());

                }
                for (String name : FruitAndVeg){
                    barcode ++;
                    genTableRow(barcode, name, quantity, unit, supplier.toLowerCase());
                }
            }

            //Medium Bulk Ingredients
            quantities = new ArrayList<>(Arrays.asList(5F, 2.5F, 1F, 0.5F));
            unit = "kg";
            for (Float quantity : quantities){
                for (String name : ButtersAndCream){
                    barcode ++;
                    genTableRow(barcode, name, quantity, unit, supplier.toLowerCase());
                }
                for (String name : Chocolates){
                    barcode ++;
                    genTableRow(barcode, name, quantity, unit, supplier.toLowerCase());
                }
                for (String name : ButtersAndCream){
                    barcode ++;
                    genTableRow(barcode, name, quantity, unit, supplier.toLowerCase());
                }
            }

            //Liquids
            quantities = new ArrayList<>(Arrays.asList(5F, 2.5F, 1F, 0.5F));
            unit = "L";
            for (Float quantity : quantities){
                for (String name : Liquids){
                    barcode ++;
                    genTableRow(barcode, name, quantity, unit, supplier.toLowerCase());
                }
            }
        }
    }
     public void genTableRow(Long barcode,String name, Float quantity, String unit, String supplier){
         //Format label
         String label = String.format("%s-%s-%s", name.replace(" ","-").toLowerCase(), quantity, unit);
         String ingredientTypeName = name.replace(" ","-").toLowerCase();

         //Currently just setting all ingredients to be non allergen, vegetarian, and vegan
         IngredientType ingredientType = new IngredientType(ingredientTypeName, false, false, false);
         ingredientTypeRepository.save(ingredientType);

         SuppliedGood entry = new SuppliedGood(
                 barcode.toString(),
                 label,
                 ingredientType,
                 quantity,
                 unit,
                 supplier
         );

         System.out.println(entry);

         //Save to Internal Database
         suppliedGoodRepository.save(entry);
     }
}

