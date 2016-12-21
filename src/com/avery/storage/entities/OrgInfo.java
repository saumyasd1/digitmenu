package com.avery.storage.entities;

import java.sql.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;



@Entity
@Table(name="orginfo")
public class OrgInfo {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="id")
	long id;
	@Column(name="orgCodeId")
    int orgCodeId;
	@Column(name="isDefault")
	boolean isDefault;
	@Column(name="billToCode",length=250)
	String billToCode;
	@Column(name="shipToCode",length=250)
	String shipToCode;
	@Column(name="freightTerm",length=250)
	String freightTerm;
	@Column(name="shippingMethod",length=255)
	String shippingMethod;
	@Column(name="shippingInstruction",length=255)
	String shippingInstruction;
	@Column(name="shippingOnlyNotes",length=500)
	String shippingOnlyNotes;
	@Column(name="createdBy",length=50)
	String createdBy;
	@Column(name="createdDate")
	Date createdDate;
	@Column(name="lastModifiedBy",length=50)
	String lastModifiedBy;
	@Column(name="lastModifiedDate")
	Date lastModifiedDate;
	@ManyToOne(cascade=CascadeType.ALL,fetch=FetchType.LAZY)
	@JoinColumn(name="orderSystemInfoId")
	OrderSystemInfo varOrderSystemInfo;
	
	
	
	public OrgInfo() {}
	
	

	public long getId() {
		return id;
	}



	public void setId(long id) {
		this.id = id;
	}



	int getOrgCodeId() {
		return orgCodeId;
	}
	void setOrgCodeId(int orgCodeId) {
		this.orgCodeId = orgCodeId;
	}
	boolean isDefault() {
		return isDefault;
	}
	void setDefault(boolean isDefault) {
		this.isDefault = isDefault;
	}
	String getBillToCode() {
		return billToCode;
	}
	void setBillToCode(String billToCode) {
		this.billToCode = billToCode;
	}
	String getShipToCode() {
		return shipToCode;
	}
	void setShipToCode(String shipToCode) {
		this.shipToCode = shipToCode;
	}
	String getFreightTerm() {
		return freightTerm;
	}
	void setFreightTerm(String freightTerm) {
		this.freightTerm = freightTerm;
	}
	String getShippingMethod() {
		return shippingMethod;
	}
	void setShippingMethod(String shippingMethod) {
		this.shippingMethod = shippingMethod;
	}
	String getShippingInstruction() {
		return shippingInstruction;
	}
	void setShippingInstruction(String shippingInstruction) {
		this.shippingInstruction = shippingInstruction;
	}
	
	String getShippingOnlyNotes() {
		return shippingOnlyNotes;
	}
	void setShippingOnlyNotes(String shippingOnlyNotes) {
		this.shippingOnlyNotes = shippingOnlyNotes;
	}
	String getCreatedBy() {
		return createdBy;
	}
	void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}
	Date getCreatedDate() {
		return createdDate;
	}
	void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}
	String getLastModifiedBy() {
		return lastModifiedBy;
	}
	void setLastModifiedBy(String lastModifiedBy) {
		this.lastModifiedBy = lastModifiedBy;
	}
	Date getLastModifiedDate() {
		return lastModifiedDate;
	}
	void setLastModifiedDate(Date lastModifiedDate) {
		this.lastModifiedDate = lastModifiedDate;
	}
	OrderSystemInfo getVarOrderSystemInfo() {
		return varOrderSystemInfo;
	}
	void setVarOrderSystemInfo(OrderSystemInfo varOrderSystemInfo) {
		this.varOrderSystemInfo = varOrderSystemInfo;
	}
	
	
	
	
}
