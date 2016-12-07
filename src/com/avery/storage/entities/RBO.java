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

@Entity
@Table(name = "rbo")
public class RBO {

	@Id
	@GeneratedValue
	@Column(name = "id",nullable=false)
	int ID;
	@Column(name = "RBOName", length = 250)
	String RBOName;
	@Column(name = "comment", length = 250)
	String comment;
	@Column(name = "createdBy", length = 50)
	String createdBy;
	@Column(name = "createdDate")
	Date createdDate;
	@Column(name = "lastModifiedBy", length = 50)
	String lastModifiedBy;
	@Column(name = "lastModifiedDate")
	Date lastModifiedDate;
	@LazyCollection(LazyCollectionOption.FALSE)
	@OneToMany(mappedBy = "varRbo", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	List<ProductLine> varProductLine = new ArrayList<ProductLine>();
	@LazyCollection(LazyCollectionOption.FALSE)
	@OneToMany(mappedBy = "varRbo", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	List<SalesOrderLine> varSalesOrderLine = new ArrayList<SalesOrderLine>();
	
	
	public RBO() {}
	
	public RBO(int iD, String rBOName) {
		super();
		ID = iD;
		RBOName = rBOName;
	}
	public int getID() {
		return ID;
	}
	public void setID(int iD) {
		ID = iD;
	}
	public String getRBOName() {
		return RBOName;
	}
	public void setRBOName(String rBOName) {
		RBOName = rBOName;
	}
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	public String getCreatedBy() {
		return createdBy;
	}
	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}
	public Date getCreatedDate() {
		return createdDate;
	}
	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}
	public String getLastModifiedBy() {
		return lastModifiedBy;
	}
	public void setLastModifiedBy(String lastModifiedBy) {
		this.lastModifiedBy = lastModifiedBy;
	}

	public Date getLastModifiedDate() {
		return lastModifiedDate;
	}

	public void setLastModifiedDate(Date lastModifiedDate) {
		this.lastModifiedDate = lastModifiedDate;
	}

	public List<ProductLine> getVarProductLine() {
		return varProductLine;
	}
	public void setVarProductLine(List<ProductLine> varProductLine) {
		this.varProductLine = varProductLine;
	}
	public List<SalesOrderLine> getVarSalesOrderLine() {
		return varSalesOrderLine;
	}
	public void setVarSalesOrderLine(List<SalesOrderLine> varSalesOrderLine) {
		this.varSalesOrderLine = varSalesOrderLine;
	}
	
	
	

}