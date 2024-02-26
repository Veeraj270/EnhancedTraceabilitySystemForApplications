package com.example.ETSystem.suppliers;

import com.example.ETSystem.productData.SuppliedGood;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Supplier{
	
	@Id
	@GeneratedValue
	private long id;
	
	private String name;

	//Discussion need on whether suppliedGoods should be @ManyToOne or @ManyToMany
	@OneToMany(fetch = FetchType.EAGER)
	private List<SuppliedGood> suppliedGoods = new ArrayList<>();
	
	public Supplier(){}
	
	public Supplier(String name, List<SuppliedGood> goods){
		setName(name);
		setGoods(goods);
	}
	
	public long getId(){
		return id;
	}
	
	public String getName(){
		return name;
	}

	public List<SuppliedGood> getGoods(){
		return suppliedGoods;
	}
	
	public void setId(long id){
		this.id = id;
	}
	
	public void setName(String name){
		this.name = name;
	}
	
	public void setGoods(List<SuppliedGood> suppliedGoods){
		this.suppliedGoods = suppliedGoods;
	}

	//Utility
	//Should only be accessed via API or Service Layer
	public void addSuppliedGood(SuppliedGood good){
		this.suppliedGoods.add(good);
	}

}