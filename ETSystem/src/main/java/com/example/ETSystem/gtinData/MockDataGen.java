package com.example.ETSystem.gtinData;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
public class MockDataGen {
    private final GTINRepository gtinRepository;

    @Autowired
    public MockDataGen(GTINRepository gtinRepository){
        this.gtinRepository = gtinRepository;
    }

    public void GenerateMockData(){
        //Starting Barcode - 13 digits to fit EAC format
        Long barcode = 1000000000000L;

        //Flours
        ArrayList<String> FlourTypes = new ArrayList<>(Arrays.asList(
                "Bread Flour",
                "Strong Flour",
                "Wholemeal Flour",
                "Plain Flour",
                "Self Raising Flour",
                "Rice Flour"
        ));

        //Sugar Types
        ArrayList<String> SugarTypes = new ArrayList<>(Arrays.asList(
                "Granulated Sugar",
                "Caster Sugar",
                "Icing Sugar",
                "Light Brown Sugar",
                "Dark Brown Sugar",
                "Demerara Sugar"
        ));


        ArrayList<String> NutTypes = new ArrayList<>(Arrays.asList(
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
        ArrayList<String> Oils = new ArrayList<>(Arrays.asList(
                "Coconut Oil",
                "Palm Oil",
                "Soybean Oil",
                "Canola Oil",
                "Olive Oil",
                "Sunflower Oil"
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
        ArrayList<String> ButtersAndCream = new ArrayList<>(Arrays.asList(
                "Dark Chocolate",
                "White Chocolate",
                "Milk Chocolate"
        ));



    }
}
