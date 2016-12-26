package com.avery.storage.entities;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.avery.storage.MainAbstractEntity;



@Entity
@Table(name="orginfo")
public class OrgInfo extends MainAbstractEntity{
	/**
	 * 
	 */
	private static final long serialVersionUID = -2757286170711042719L;
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
	@ManyToOne(cascade=CascadeType.ALL,fetch=FetchType.LAZY)
	@JoinColumn(name="orderSystemInfoId")
	OrderSystemInfo varOrderSystemInfo;



	public  int getOrgCodeId() {
		return orgCodeId;
	}
	public void setOrgCodeId(int orgCodeId) {
		this.orgCodeId = orgCodeId;
	}
	public boolean isDefault() {
		return isDefault;
	}
	public void setDefault(boolean isDefault) {
		this.isDefault = isDefault;
	}
	public String getBillToCode() {
		return billToCode;
	}
	public void setBillToCode(String billToCode) {
		this.billToCode = billToCode;
	}
	public String getShipToCode() {
		return shipToCode;
	}
	public void setShipToCode(String shipToCode) {
		this.shipToCode = shipToCode;
	}
	public String getFreightTerm() {
		return freightTerm;
	}
	public void setFreightTerm(String freightTerm) {
		this.freightTerm = freightTerm;
	}
	public String getShippingMethod() {
		return shippingMethod;
	}
	public void setShippingMethod(String shippingMethod) {
		this.shippingMethod = shippingMethod;
	}
	public String getShippingInstruction() {
		return shippingInstruction;
	}
	public void setShippingInstruction(String shippingInstruction) {
		this.shippingInstruction = shippingInstruction;
	}
	public OrderSystemInfo getVarOrderSystemInfo() {
		return varOrderSystemInfo;
	}
	public void setVarOrderSystemInfo(OrderSystemInfo varOrderSystemInfo) {
		this.varOrderSystemInfo = varOrderSystemInfo;
	}
	
	
	
	
}
