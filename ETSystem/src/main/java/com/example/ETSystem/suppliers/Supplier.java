package com.example.ETSystem.suppliers;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

import java.util.List;

@Entity
public class Supplier{
	
	@Id
	@GeneratedValue
	private long id;
	
	private String name;
	
	@OneToMany
	private List<SuppliedGood> goods;
	
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