package com.avery.storage.entities;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import com.avery.storage.MainAbstractEntity;

@Entity
@Table(name = "rbo")
public class RBO extends MainAbstractEntity{
	
	
	public RBO() {
		
	}

	@Column(name = "rboName", length = 250)
	String rboName;
	@Column(name = "comment", length = 250)
	String comment;
//	@LazyCollection(LazyCollectionOption.FALSE)
//	@OneToMany(mappedBy = "varRbo", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//	List<ProductLine> listProductLine = new ArrayList<ProductLine>();
//	@LazyCollection(LazyCollectionOption.FALSE)
//	@OneToMany(mappedBy = "varRbo", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//	List<SalesOrder> listSalesOrderLine = new ArrayList<SalesOrder>();
	
	public RBO(int id, String rboName) {
		super();
		id = id;
		rboName = rboName;
	}

	public String getRboName() {
		return rboName;
	}

	public void setRboName(String rboName) {
		this.rboName = rboName;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

//	public List<ProductLine> getListProductLine() {
//		return listProductLine;
//	}
//
//	public void setListProductLine(List<ProductLine> listProductLine) {
//		this.listProductLine = listProductLine;
//	}
//
//	public List<SalesOrder> getListSalesOrderLine() {
//		return listSalesOrderLine;
//	}
//
//	public void setListSalesOrderLine(List<SalesOrder> listSalesOrderLine) {
//		this.listSalesOrderLine = listSalesOrderLine;
//	}
//	
//	
	
	

}
