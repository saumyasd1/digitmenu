package com.avery.storage.entities;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import javassist.expr.NewArray;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;



@Entity
@Table(name="ordersysteminfo")
public class OrderSystemInfo {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="id")
	long id;
	@Column(name="artworkHold",length=5)
	String artworkHold;
	@Column(name="csrName",length=250)
	String csrName;
	@Column(name="manufacturingNotes",length=500)
	String manufacturingNotes;
	@Column(name="packingInstruction",length=500)
	String packingInstruction;
	@Column(name="shippingMark",length=500)
	String shippingMark;
	@Column(name="discountOffer")
	boolean discountOffer;
	@Column(name="invoiceNote",length=500)
	String invoiceNote;
	@Column(name="splitShipSetBy",length=5)
	String splitShipSetBy;
	@Column(name="variableDataBreakdown",length=500)
	String variableDataBreakdown;
	@Column(name="createdBy",length=50)
	String createdBy;
	@Column(name="createdDate")
	Date createdDate;
	@Column(name="lastModifiedBy",length=50)
	String lastModifiedBy;
	@Column(name="lastModifiedDate")
	Date lastModifiedDate;
	@ManyToOne(cascade=CascadeType.ALL,fetch=FetchType.LAZY)
	@JoinColumn(name="productLineId")
	ProductLine varProductLine;
	@OneToOne(cascade=CascadeType.ALL,fetch=FetchType.LAZY)
	@JoinColumn(name="systemId")
	SystemInfo varSystem;
	@OneToMany(mappedBy="varOrderSystemInfo",cascade=CascadeType.ALL,fetch=FetchType.LAZY)
	List<OrgInfo> listOrgInfo=new ArrayList<OrgInfo>();
	
	
	public OrderSystemInfo() {}


	
	public long getId() {
		return id;
	}



	public void setId(long id) {
		this.id = id;
	}



	String getArtworkHold() {
		return artworkHold;
	}


	void setArtworkHold(String artworkHold) {
		this.artworkHold = artworkHold;
	}


	String getCsrName() {
		return csrName;
	}


	void setCsrName(String csrName) {
		this.csrName = csrName;
	}


	String getManufacturingNotes() {
		return manufacturingNotes;
	}


	void setManufacturingNotes(String manufacturingNotes) {
		this.manufacturingNotes = manufacturingNotes;
	}


	String getPackingInstruction() {
		return packingInstruction;
	}


	void setPackingInstruction(String packingInstruction) {
		this.packingInstruction = packingInstruction;
	}


	String getShippingMark() {
		return shippingMark;
	}


	void setShippingMark(String shippingMark) {
		this.shippingMark = shippingMark;
	}
	


	boolean isDiscountOffer() {
		return discountOffer;
	}


	void setDiscountOffer(boolean discountOffer) {
		this.discountOffer = discountOffer;
	}


	String getInvoiceNote() {
		return invoiceNote;
	}


	void setInvoiceNote(String invoiceNote) {
		this.invoiceNote = invoiceNote;
	}


	String getSplitShipSetBy() {
		return splitShipSetBy;
	}


	void setSplitShipSetBy(String splitShipSetBy) {
		this.splitShipSetBy = splitShipSetBy;
	}


	String getVariableDataBreakdown() {
		return variableDataBreakdown;
	}


	void setVariableDataBreakdown(String variableDataBreakdown) {
		this.variableDataBreakdown = variableDataBreakdown;
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


	ProductLine getVarProductLine() {
		return varProductLine;
	}


	void setVarProductLine(ProductLine varProductLine) {
		this.varProductLine = varProductLine;
	}


	SystemInfo getVarSystem() {
		return varSystem;
	}


	void setVarSystem(SystemInfo varSystem) {
		this.varSystem = varSystem;
	}


	List<OrgInfo> getListOrgInfo() {
		return listOrgInfo;
	}


	void setListOrgInfo(List<OrgInfo> listOrgInfo) {
		this.listOrgInfo = listOrgInfo;
	}
	
	
	
}
