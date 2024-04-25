package com.example.ETSystem.productData;

import com.example.ETSystem.customerOrders.CustomerOrder;
import com.example.ETSystem.customerOrders.CustomerOrderRepository;
import com.example.ETSystem.finalProducts.FinalProduct;
import com.example.ETSystem.finalProducts.FinalProductRepository;
import com.example.ETSystem.ingredientType.IngredientType;
import com.example.ETSystem.ingredientType.IngredientTypeRepository;
import com.example.ETSystem.product.Product;
import com.example.ETSystem.product.ProductRepository;
import com.example.ETSystem.product.ProductService;
import com.example.ETSystem.recipe.IngredientQuantity;
import com.example.ETSystem.recipe.IngredientQuantityRepository;
import com.example.ETSystem.recipe.Recipe;
import com.example.ETSystem.recipe.RecipeService;
import com.example.ETSystem.suppliers.Supplier;
import com.example.ETSystem.suppliers.SupplierService;
import com.example.ETSystem.timeline.CreateEvent;
import com.example.ETSystem.timeline.TimelineEvent;
import com.example.ETSystem.timeline.TimelineService;
import com.example.ETSystem.timeline.UseEvent;
import com.example.ETSystem.util.Generated;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Component
public class MockDataGenerator {
    private final SuppliedGoodRepository suppliedGoodRepository;
    private final IngredientTypeRepository ingredientTypeRepository;
    private final IngredientQuantityRepository ingredientQuantityRepository;
    private final SupplierService supplierService;
    private final ProductService productService;
    private final TimelineService timelineService;
    private final ProductRepository productRepository;
    private final RecipeService recipeService;
    private final FinalProductRepository finalProductRepository;
    private final CustomerOrderRepository customerOrderRepository;

    @Autowired
    @Generated
    public MockDataGenerator(SuppliedGoodRepository suppliedGoodRepository,
                             IngredientTypeRepository ingredientTypeRepository,
                             IngredientQuantityRepository ingredientQuantityRepository, SupplierService supplierService,
                             ProductService productService,
                             TimelineService timelineService,
                             ProductRepository productRepository,
                             RecipeService recipeService, FinalProductRepository finalProductRepository, CustomerOrderRepository customerOrderRepository){
        this.suppliedGoodRepository = suppliedGoodRepository;
        this.ingredientTypeRepository = ingredientTypeRepository;
        this.ingredientQuantityRepository = ingredientQuantityRepository;
        this.supplierService = supplierService;
        this.productService = productService;
        this.timelineService = timelineService;
        this.productRepository = productRepository;
        this.recipeService = recipeService;
        this.finalProductRepository = finalProductRepository;
        this.customerOrderRepository = customerOrderRepository;
    }

    public record ITypeInfo(String name, boolean isAllergen){}

    public void generateAllMockData(){
        //Order must not change as one relies on the other
        generateSuppliedGoods();
        generateMockProducts();
        generateMockRecipes();
        generateMockFinalProducts();
        generateMockCustomerOrders();
    }
    @Generated
    @Transactional
    public void generateSuppliedGoods(){
        //Starting Barcode - 13 digits to fit EAC format
        //SUPPLIERS
        List<String> supplierNames = List.of(
                "Cisco",
                "Andrew Ingredients"
        );

        ArrayList<Supplier> suppliers = new ArrayList<Supplier>();

        for (String name : supplierNames){
            suppliers.add(new Supplier(name, new ArrayList<SuppliedGood>()));
        }

        int unitPrice = 10000;
        //INGREDIENTS
        //Flours
        List<ITypeInfo> flours = List.of(
                new ITypeInfo("Bread Flour", false),
                new ITypeInfo("Strong Flour", false),
                new ITypeInfo("Wholemeal Flour", false),
                new ITypeInfo("Plain Flour", false),
                new ITypeInfo("Self Raising Flour", false),
                new ITypeInfo("Rice Flour", false)
        );

        //Sugar Types
        List<ITypeInfo> sugars = List.of(
                new ITypeInfo("Granulated Sugar", false),
                new ITypeInfo("Caster Sugar", false),
                new ITypeInfo("Icing Sugar", false),
                new ITypeInfo("Light Brown Sugar", false),
                new ITypeInfo("Dark Brown Sugar", false),
                new ITypeInfo("Demerara Sugar", false)
        );


        List<ITypeInfo> nuts = List.of(
                new ITypeInfo("Almonds", true),
                new ITypeInfo("Peanuts", true),
                new ITypeInfo("Hazelnuts", true),
                new ITypeInfo("Walnuts", true),
                new ITypeInfo("Cashew nuts", true)
        );

        //Spices
        List<ITypeInfo> Spices = List.of(
                new ITypeInfo("Ground Cinnamon", false),
                new ITypeInfo("Ground Nutmeg", false),
                new ITypeInfo("Ground Cloves", false),
                new ITypeInfo("Ground Ginger", false),
                new ITypeInfo("All Spice", false),
                new ITypeInfo("Anise", false),
                new ITypeInfo("Black Pepper", false),
                new ITypeInfo("Saffron", false),
                new ITypeInfo("Cayenne Pepper", false),
                new ITypeInfo("Black Pepper", false)
        );

        //Liquids
        List<ITypeInfo> liquids = List.of(
                new ITypeInfo("Coconut Oil", false),
                new ITypeInfo("Palm Oil", false),
                new ITypeInfo("Soybean Oil", false),
                new ITypeInfo("Canola Oil", false),
                new ITypeInfo("Olive Oil", false),
                new ITypeInfo("Sunflower Oil", false),
                new ITypeInfo("Vegetable Oil", false),
                new ITypeInfo("Soya Oil", true),
                new ITypeInfo("Semi-Skimmed Milk", true),
                new ITypeInfo("Whole Milk", true)
        );

        //Fresh Fruit & Veg
        List<ITypeInfo> fruitAndVeg = List.of(
                new ITypeInfo("Apples", false),
                new ITypeInfo("Bananas", false),
                new ITypeInfo("Blueberries", false),
                new ITypeInfo("Strawberries", false),
                new ITypeInfo("Raspberries", false),
                new ITypeInfo("Lemons", false),
                new ITypeInfo("Oranges", false),
                new ITypeInfo("Limes", false),
                new ITypeInfo("Pumpkin", false),
                new ITypeInfo("Carrots", false),
                new ITypeInfo("Zucchini", false),
                new ITypeInfo("Sweet Potatoes", false),
                new ITypeInfo("Pears", false),
                new ITypeInfo("Peaches", false),
                new ITypeInfo("Apricots", false),
                new ITypeInfo("Cherries", false),
                new ITypeInfo("Blackberries", false),
                new ITypeInfo("Mangoes", false),
                new ITypeInfo("Pineapple", false),
                new ITypeInfo("Cranberries", false),
                new ITypeInfo("Rhubarb", false),
                new ITypeInfo("Kiwifruit", false),
                new ITypeInfo("Grapes", false),
                new ITypeInfo("Figs", false),
                new ITypeInfo("Dates", false),
                new ITypeInfo("Coconut", false),
                new ITypeInfo("Avocado", false),
                new ITypeInfo("Beetroot", false)
        );

        //Butters
        List<ITypeInfo> buttersAndCream = List.of(
                new ITypeInfo("Salted Butter", true),
                new ITypeInfo("Unsalted Butter", true),
                new ITypeInfo("Sour Cream", true),
                new ITypeInfo("Cottage Cheese", true),
                new ITypeInfo("Cheddar Cheese", true)
        );

        //Chocolates
        List<ITypeInfo> chocolates = List.of(
                new ITypeInfo("Dark Chocolate", true),
                new ITypeInfo("White Chocolate", true),
                new ITypeInfo("Milk Chocolate", true)
        );

        int i = 1;
        for (Supplier supplier : suppliers){
            Long barcode  = 1000000000000L * i; i ++;
            List<Float> quantities = List.of(25F,10F, 5F, 2.5F, 1F);
            //Bulk Ingredients
            String unit = "kg";
            for (Float quantity : quantities){
                for (ITypeInfo info : flours){
                    barcode ++;
                    genTableRow(barcode, info, quantity, unit, supplier, (int) (unitPrice * quantity));
                }
                for (ITypeInfo info: sugars){
                    barcode ++;
                    genTableRow(barcode, info, quantity, unit, supplier, (int)(unitPrice * quantity));

                }
                for (ITypeInfo info: fruitAndVeg){
                    barcode ++;
                    genTableRow(barcode, info, quantity, unit, supplier,(int) (unitPrice * quantity));
                }
            }

            //Medium Bulk Ingredients
            quantities = List.of(5F,2.5F, 1F, 0.5F);
            unit = "kg";
            for (Float quantity : quantities){
                for (ITypeInfo info : buttersAndCream){
                    barcode ++;
                    genTableRow(barcode, info, quantity, unit, supplier, (int) (unitPrice * quantity));
                }
                for (ITypeInfo info: chocolates){
                    barcode ++;
                    genTableRow(barcode, info, quantity, unit, supplier, (int) (unitPrice * quantity));
                }
                for (ITypeInfo info: nuts){
                    barcode ++;
                    genTableRow(barcode, info, quantity, unit, supplier, (int) (unitPrice * quantity));
                }
            }

            //Liquids
            quantities = List.of(5F, 2.5F, 1F, 0.5F);
            unit = "L";
            for (Float quantity : quantities){
                for (ITypeInfo info: liquids){
                    barcode ++;
                    genTableRow(barcode, info, quantity, unit, supplier, (int) (unitPrice * quantity));
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
    @Transactional
    public void genTableRow(Long barcode, ITypeInfo info, Float quantity, String unit, Supplier supplier, int price){
        //Format label
        String label = String.format("%s-%s-%s", info.name.replace(" ","-").toLowerCase(), quantity, unit);
        String ingredientTypeName = info.name.replace(" ","-").toLowerCase();

        List<IngredientType> list = ingredientTypeRepository.findByName(ingredientTypeName);

        IngredientType ingredientType = null;
        if (list.isEmpty()){
            //Currently just setting all ingredients to be non allergen, vegetarian, and vegan
            ingredientType = new IngredientType(ingredientTypeName, false, false, Set.of());
            ingredientType = ingredientTypeRepository.save(ingredientType);
        } else {
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
    @Transactional
    public void generateMockProducts(){
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
        IngredientType iType = new IngredientType("irish cream cheesecake", false, false, Set.of("egg", "milk"));
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

        TimelineEvent creationEvent = new CreateEvent(ZonedDateTime.now(), cake, CreateEvent.CreateType.BAKED, "Kitchen 1", null);
        timelineService.save(creationEvent);

    }

    @Transactional
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
            TimelineEvent creationEvent = new CreateEvent(epochUTC, newProduct, CreateEvent.CreateType.DELIVERED, null, null);
            timelineService.save(creationEvent);
        }

        public List<TimelineEvent> addSomeUseEvents(Product product, int num){
        List<TimelineEvent> events = new ArrayList<>();
        for (int i = 0; i < num; i ++){
            events.add(new UseEvent(ZonedDateTime.now().minusDays(i), product, null, null, 1, "baker"));
        }
        return events;
    }

    @Generated
    public void generateMockRecipes(){
        //Generic recipe
        IngredientType plainFlour = ingredientTypeRepository.findByName("plain-flour").get(0);
        IngredientType granulatedSugar = ingredientTypeRepository.findByName("granulated-sugar").get(0);
        IngredientType unsaltedButter = ingredientTypeRepository.findByName("unsalted-butter").get(0);
        IngredientType almonds = ingredientTypeRepository.findByName("almonds").get(0);
        IngredientType darkChocolate = ingredientTypeRepository.findByName("dark-chocolate").get(0);

        //Assuming quantities are in kg
        IngredientQuantity IQ1 = new IngredientQuantity(plainFlour, 0.5F);
        IngredientQuantity IQ2 = new IngredientQuantity(granulatedSugar, 0.25F);
        IngredientQuantity IQ3 = new IngredientQuantity(unsaltedButter, 0.25F);
        IngredientQuantity IQ4 = new IngredientQuantity(almonds, 0.1F);
        IngredientQuantity IQ5 = new IngredientQuantity(darkChocolate, 0.1F);

        Set<IngredientQuantity> ingredientsSet = Set.of(IQ1, IQ2, IQ3, IQ4, IQ5);

        //Create several recipes with the same ingredients for simplicity’s sake
        Recipe recipe1 = new Recipe("Ultimate Pistachio", ingredientsSet, "Ultimate Pistachio Recipe");

        Recipe recipe2 = new Recipe("Double Chocolate Crookies", ingredientsSet, "Double Chocolate Crookies Recipe");

        Recipe recipe3 = new Recipe("Rhubarb and Custard Blondie", ingredientsSet, "Rhubarb and Custard Blondie Recipe");

        Recipe recipe4 = new Recipe("Blueberry Muffins", ingredientsSet, "Blueberry Muffins Recipe");

        Recipe recipe5 = new Recipe("Blood Orange & Raspberry Loaf", ingredientsSet, "Blood Orange & Raspberry Loaf Recipe");

        Recipe recipe6 = new Recipe("Truffle Mushroom Croissant", ingredientsSet, "Truffle Mushroom Croissant Recipe");

        //Save the recipes to the database
        List<Recipe> recipes = List.of(recipe1, recipe2, recipe3, recipe4, recipe5, recipe6);

        List<Recipe> addedRecipes = new ArrayList<>();
        for(Recipe recipe : recipes){
            addedRecipes.add(recipeService.addNewRecipe(recipe));
        }

        //Temp for debug
        System.out.println("Recipes added: " + addedRecipes);
    }

    public void generateMockFinalProducts(){
        //Use the stored recipes to generate final products
        List<Recipe> recipes = recipeService.getRecipes();

        List<Integer> quantities = List.of(6, 12, 24);

        Integer defaultPrice = 1000;

        for (Recipe recipe : recipes){
            for (int quantity : quantities){
                String label = String.format("%s x %s", quantity, recipe.getLabel());
                FinalProduct finalProduct = new FinalProduct(label, defaultPrice * quantity, recipe, quantity);
                finalProductRepository.save(finalProduct);
            }
        }
    }

    public void generateMockCustomerOrders(){
        //Order 1
        CustomerOrder order1 = new CustomerOrder("client1", ZonedDateTime.now(), ZonedDateTime.now().plusDays(7), new ArrayList<>());
        AddToOrder(order1, 4, "6 x Ultimate Pistachio");
        AddToOrder(order1, 6, "12 x Double Chocolate Crookies");
        AddToOrder(order1, 4, "24 x Rhubarb and Custard Blondie");
        AddToOrder(order1, 8, "6 x Blueberry Muffins");
        customerOrderRepository.save(order1);

        //Order 2
        CustomerOrder order2 = new CustomerOrder("client2", ZonedDateTime.now(), ZonedDateTime.now().plusDays(5), new ArrayList<>());
        AddToOrder(order2, 8, "12 x Ultimate Pistachio");
        AddToOrder(order2, 3, "24 x Double Chocolate Crookies");
        AddToOrder(order2, 7, "6 x Blueberry Muffins");
        AddToOrder(order2, 2, "12 x Truffle Mushroom Croissant");
        customerOrderRepository.save(order2);

        //Order 3
        CustomerOrder order3 = new CustomerOrder("client3", ZonedDateTime.now(), ZonedDateTime.now().plusDays(10), new ArrayList<>());
        AddToOrder(order3, 4, "6 x Ultimate Pistachio");
        AddToOrder(order3, 6, "12 x Rhubarb and Custard Blondie");
        AddToOrder(order3, 2, "24 x Blueberry Muffins");
        AddToOrder(order3, 11, "6 x Blood Orange & Raspberry Loaf");
        customerOrderRepository.save(order3);
    }

    public void AddToOrder(CustomerOrder order, Integer quantity, String label){
        List<FinalProduct> list =  finalProductRepository.findByLabel(label);

        if (list.size() > 1){
            throw new RuntimeException("Multiple final products with the same label found");
        } else if (list.isEmpty()){
            throw new RuntimeException("No final products with the label found");
        }

        FinalProduct FP = list.get(0);

        for (int i = 0; i < quantity; i++){
            order.getFinalProducts().add(FP);
        }
    }
}

