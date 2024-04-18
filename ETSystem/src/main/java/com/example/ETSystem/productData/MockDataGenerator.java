package com.example.ETSystem.productData;

import com.example.ETSystem.ingredientType.IngredientType;
import com.example.ETSystem.ingredientType.IngredientTypeRepository;
import com.example.ETSystem.product.Product;
import com.example.ETSystem.product.ProductRepository;
import com.example.ETSystem.product.ProductService;
import com.example.ETSystem.suppliers.Supplier;
import com.example.ETSystem.suppliers.SupplierService;
import com.example.ETSystem.timeline.CreateEvent;
import com.example.ETSystem.timeline.TimelineEvent;
import com.example.ETSystem.timeline.TimelineService;
import com.example.ETSystem.timeline.UseEvent;
import com.example.ETSystem.util.Generated;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.sql.Time;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

@Component
public class MockDataGenerator {
    private final SuppliedGoodRepository suppliedGoodRepository;
    private final IngredientTypeRepository ingredientTypeRepository;
    private final SupplierService supplierService;
    private final ProductService productService;
    private final TimelineService timelineService;
    private final ProductRepository productRepository;

    @Autowired
    @Generated
    public MockDataGenerator(SuppliedGoodRepository suppliedGoodRepository,
                             IngredientTypeRepository ingredientTypeRepository,
                             SupplierService supplierService,
                             ProductService productService,
                             TimelineService timelineService,
                             ProductRepository productRepository
    ){
        this.suppliedGoodRepository = suppliedGoodRepository;
        this.ingredientTypeRepository = ingredientTypeRepository;
        this.supplierService = supplierService;
        this.productService = productService;
        this.timelineService = timelineService;
        this.productRepository = productRepository;
    }

    @Generated
    public void generateMockData(){
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

            List<String> units = List.of("kg", "kg", "kg", "kg", "L");
            for(int g = 1; g < 6; g++){
                IngredientType ingredient = ingredientTypeRepository.findById((long)g)
                        .orElseThrow(() -> new RuntimeException("When applying suppliers to the ingredient mockdata from the ingredients file, the ingredients could not be found"));
                barcode++;
                SuppliedGood entry = new SuppliedGood(
                        barcode.toString(),
                        ingredient.getName(),
                        ingredient,
                        quantities.get(1),
                        units.get(g - 1),
                        (int) (unitPrice * quantities.get(1))

                );
                supplierService.AddGoodToSupplier(supplier, entry);


            }
        }
    }
	
	@Generated
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

         //Crude implementation:
         float weight = quantity; //Will result in inaccurate weights for liquids with density != density of water

         SuppliedGood entry = new SuppliedGood(
                 barcode.toString(),
                 label,
                 ingredientType,
                 quantity,
                 unit,
                 price,
                 weight
         );

         //The suppliedGood is saved to the suppliedGood repo within this method
         supplierService.AddGoodToSupplier(supplier, entry);
     }
	
	@Generated
     public void generateMockProductData(){
        Supplier supplier1 = supplierService.GetAllSuppliers().get(0);

        //Add a Product for every instance of SuppliedGood held by supplier1
        for (SuppliedGood good: supplier1.getGoods()){
            addProductFromSuppliedGood(good);
        }

        //Add some custom data that has some actual events for the Viva Presentation
        Product product1 = productRepository.findById(1L).get();
        List<TimelineEvent> events = addSomeUseEvents(product1,  9);
        product1.setCurrentQuantity(product1.getCurrentQuantity() * (10 - events.size())/10);
        productRepository.save(product1);
        timelineService.saveAll(events);

        Product product2 = productRepository.findById(2L).get();
        events = addSomeUseEvents(product2,  4);
        product2.setCurrentQuantity(product2.getCurrentQuantity() * (10 - events.size())/10);
        productRepository.save(product2);
        timelineService.saveAll(events);

        Product product3 = productRepository.findById(3L).get();
        events = addSomeUseEvents(product3,  7);
        product3.setCurrentQuantity(product3.getCurrentQuantity() * (10 - events.size())/10);
        productRepository.save(product3);
        timelineService.saveAll(events);

        //Add a cake to showcase intermediaries feature
        IngredientType iType = new IngredientType("irish cream cheesecake", false, false, false);
        iType = ingredientTypeRepository.save(iType);

         Product cake = new Product(
                "5000000000001",
                "irish cream cheesecake",
                20,
                20,
                List.of(1L,2L,3L),
                iType
         );

         productService.addNewProduct(cake);

         TimelineEvent creationEvent = new CreateEvent(ZonedDateTime.now(), cake);
         timelineService.save(creationEvent);

     }
    
    @Generated
     public void addProductFromSuppliedGood(SuppliedGood good){
        ZonedDateTime epochUTC = ZonedDateTime.ofInstant(Instant.EPOCH, ZoneId.of("UTC"));

        Product newProduct = new Product(
                good.getGtin(),
                good.getLabel(),
                good.getQuantity(),
                good.getQuantity(),
                List.of(),
                good.getIngredientType()
        );

        productService.addNewProduct(newProduct);
        TimelineEvent creationEvent = new CreateEvent(epochUTC, newProduct);
        timelineService.save(creationEvent);
     }

     public List<TimelineEvent> addSomeUseEvents(Product product, int num){
        List<TimelineEvent> events = new ArrayList<>();
        for (int i = 0; i < num; i ++){
            events.add(new UseEvent(ZonedDateTime.now().minusDays(i), product));
        }
        return events;
     }
}

