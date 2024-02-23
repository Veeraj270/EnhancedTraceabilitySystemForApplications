package com.example.ETSystem.suppliers;

import com.example.ETSystem.productData.SuppliedGood;
import com.example.ETSystem.productData.SuppliedGoodRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class SupplierService {
    final private SupplierRepository supplierRepository;
    final private SuppliedGoodRepository suppliedGoodRepository;

    @Autowired
    public SupplierService(SupplierRepository supplierRepository, SuppliedGoodRepository suppliedGoodRepository){
        this.supplierRepository = supplierRepository;
        this.suppliedGoodRepository = suppliedGoodRepository;
    }

    //This should be the only way that SuppliedGoods are added to the suppliedGoodRepository
    @Transactional
    public SuppliedGood AddGoodToSupplier(Supplier supplier, SuppliedGood good){
        //If good IngredientType is not yet saved, save it.


        //Save the good to the SuppliedGoodRepository
        SuppliedGood ret = suppliedGoodRepository.save(good);

        //Add reference of good to Supplier's suppliedGoods array
        supplier.addSuppliedGood(ret);
        supplierRepository.save(supplier);
        return ret;
    }
}
