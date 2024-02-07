package com.example.ETSystem.suppliers;

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
	private List<SuppliedGood> goods = new ArrayList<>();
	
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
		return goods;
	}
	
	public void setId(long id){
		this.id = id;
	}
	
	public void setName(String name){
		this.name = name;
	}
	
	public void setGoods(List<SuppliedGood> goods){
		this.goods = goods;
	}
}