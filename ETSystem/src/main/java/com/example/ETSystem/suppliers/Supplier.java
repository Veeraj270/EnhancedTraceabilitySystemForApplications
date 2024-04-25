package com.example.ETSystem.suppliers;

import com.example.ETSystem.productData.SuppliedGood;
import com.example.ETSystem.util.Generated;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Supplier{
	
	@Id
	@GeneratedValue
	private long id;
	
	private String name;

	@OneToMany(fetch = FetchType.EAGER)
	private List<SuppliedGood> suppliedGoods = new ArrayList<>();
	
	public Supplier(){}
	
	public Supplier(String name, List<SuppliedGood> goods){
		setName(name);
		setGoods(goods);
	}
	
	public @Generated long getId(){
		return id;
	}
	
	public @Generated String getName(){
		return name;
	}

	public @Generated List<SuppliedGood> getGoods(){
		return suppliedGoods;
	}
	
	public @Generated void setId(long id){
		this.id = id;
	}
	
	public @Generated void setName(String name){
		this.name = name;
	}
	
	public @Generated void setGoods(List<SuppliedGood> suppliedGoods){
		this.suppliedGoods = suppliedGoods;
	}


	//Utility
	//Should only be accessed via API or Service Layer
	public void addSuppliedGood(SuppliedGood good){
		this.suppliedGoods.add(good);
	}

}