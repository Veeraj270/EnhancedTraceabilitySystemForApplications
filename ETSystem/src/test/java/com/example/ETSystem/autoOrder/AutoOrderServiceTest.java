package com.example.ETSystem.autoOrder;

import com.example.ETSystem.customerOrders.CustomerOrderService;
import com.example.ETSystem.finalProducts.FinalProduct;
import com.example.ETSystem.ingredientType.IngredientType;
import com.example.ETSystem.recipe.IngredientQuantity;
import com.example.ETSystem.recipe.Recipe;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

import java.util.List;
import java.util.Set;

@SpringBootTest
public class AutoOrderServiceTest {
    private final CustomerOrderService customerOrderService;
    private final AutoOrderService autoOrderService;

    @Autowired
    public AutoOrderServiceTest(
            CustomerOrderService customerOrderService,
            AutoOrderService autoOrderService
    ){
        this.customerOrderService = customerOrderService;
        this.autoOrderService = autoOrderService;
    }

    //Setup

    //UNIT TESTS
    @Test
    void testTotalIngredients(){
        //Setup
        IngredientType iType1 = new IngredientType("flour", false, false, false);
        iType1.setId(1);
        IngredientType iType2 = new IngredientType("sugar", false, false, false);
        iType2.setId(2);

        IngredientQuantity iQuantity1 = new IngredientQuantity(iType1, 100);
        iQuantity1.setId(1L);

        IngredientQuantity iQuantity2 = new IngredientQuantity(iType1, 200);
        iQuantity2.setId(2L);

        IngredientQuantity iQuantity3 = new IngredientQuantity(iType2, 100);
        iQuantity3.setId(3L);

        IngredientQuantity iQuantity4 = new IngredientQuantity(iType2, 200);
        iQuantity4.setId(4L);

        Recipe recipe1 = new Recipe("recipe-1", Set.of(iQuantity1, iQuantity3));
        Recipe recipe2 = new Recipe("recipe-2", Set.of(iQuantity2, iQuantity4));

        FinalProduct fProduct1 = new FinalProduct();
        fProduct1.setRecipe(recipe1);
        fProduct1.setQuantity(5);

        FinalProduct fProduct2 = new FinalProduct();
        fProduct2.setRecipe(recipe2);
        fProduct2.setQuantity(2);

        List<FinalProduct>  TFinalProducts = List.of(fProduct1,fProduct2);

        //Call method - (Total the required amount of each IngredientType)
        List<IngredientQuantity> result = autoOrderService.totalIngredients(TFinalProducts);

        assert result.size() == 2;
        assert result.get(0).getIngredientType().getName() == "flour";
        assert result.get(0).getQuantity() == 900;

        assert result.get(1).getIngredientType().getName() == "sugar";
        assert result.get(1).getQuantity() == 900;
    }
}
