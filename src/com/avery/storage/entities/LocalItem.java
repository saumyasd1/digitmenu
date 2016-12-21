package com.avery.storage.entities;

import java.sql.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name="localitem")
public class LocalItem {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="id")
	long id;
	@Column(name="system",length=500)
	String system;
	@Column(name="site",length=50)
	String site;
	@Column(name="partnerName",length=500)
	String partnerName;
	@Column(name="rboName",length=500)
	String rboName;
	@Column(name="customerItemNO",length=250)
	String customerItemNO;
	@Column(name="identifier",length=255)
	String identifier;
	@Column(name="identifierVariable",length=250)
	String identifierVariable;
	@Column(name="internalItemNo",length=250)
	String internalItemNo;
	@Column(name="cancelItem")
	boolean cancelItem;
	@Column(name="glid")
	long glid;
	@Column(name="createdBy",length=50)
	String createdBy;
	@Column(name="createdDate")
	Date createdDate;
	@Column(name="lastModifiedBy",length=50)
	String lastModifiedBy;
	@Column(name="lastModifiedDate")
	Date lastModifiedDate;
	
	
	
	public LocalItem() {}
	

	public long getId() {
		return id;
	}


	public void setId(long id) {
		this.id = id;
	}


	String getSystem() {
		return system;
	}
	void setSystem(String system) {
		this.system = system;
	}
	String getSite() {
		return site;
	}
	void setSite(String site) {
		this.site = site;
	}
	String getPartnerName() {
		return partnerName;
	}
	void setPartnerName(String partnerName) {
		this.partnerName = partnerName;
	}
	String getRboName() {
		return rboName;
	}
	void setRboName(String rboName) {
		this.rboName = rboName;
	}
	String getCustomerItemNO() {
		return customerItemNO;
	}
	void setCustomerItemNO(String customerItemNO) {
		this.customerItemNO = customerItemNO;
	}
	String getIdentifier() {
		return identifier;
	}
	void setIdentifier(String identifier) {
		this.identifier = identifier;
	}
	String getIdentifierVariable() {
		return identifierVariable;
	}
	void setIdentifierVariable(String identifierVariable) {
		this.identifierVariable = identifierVariable;
	}
	String getInternalItemNo() {
		return internalItemNo;
	}
	void setInternalItemNo(String internalItemNo) {
		this.internalItemNo = internalItemNo;
	}
	boolean isCancelItem() {
		return cancelItem;
	}
	void setCancelItem(boolean cancelItem) {
		this.cancelItem = cancelItem;
	}
	long getGlid() {
		return glid;
	}
	void setGlid(long glid) {
		this.glid = glid;
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
	
	
}
