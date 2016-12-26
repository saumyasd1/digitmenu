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
@Table(name="ordersysteminfo")
public class OrderSystemInfo extends MainAbstractEntity {
	/**
	 * 
	 */
	private static final long serialVersionUID = 4788222987397974679L;
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
	@ManyToOne(cascade=CascadeType.ALL,fetch=FetchType.LAZY)
	@JoinColumn(name="productLineId")
	ProductLine varProductLine;
	@ManyToOne(cascade=CascadeType.ALL,fetch=FetchType.LAZY)
	@JoinColumn(name="systemId")
	SystemInfo varSystem;
//	@OneToMany(mappedBy="varOrderSystemInfo",cascade=CascadeType.ALL,fetch=FetchType.LAZY)
//	List<OrgInfo> listOrgInfo=new ArrayList<OrgInfo>();
	
	
	public OrderSystemInfo() {}


	public String getArtworkHold() {
		return artworkHold;
	}


	public void setArtworkHold(String artworkHold) {
		this.artworkHold = artworkHold;
	}


	public String getCsrName() {
		return csrName;
	}


	public void setCsrName(String csrName) {
		this.csrName = csrName;
	}


	public String getManufacturingNotes() {
		return manufacturingNotes;
	}


	public void setManufacturingNotes(String manufacturingNotes) {
		this.manufacturingNotes = manufacturingNotes;
	}


	public String getPackingInstruction() {
		return packingInstruction;
	}


	public void setPackingInstruction(String packingInstruction) {
		this.packingInstruction = packingInstruction;
	}


	public String getShippingMark() {
		return shippingMark;
	}


	public void setShippingMark(String shippingMark) {
		this.shippingMark = shippingMark;
	}
	


	public boolean isDiscountOffer() {
		return discountOffer;
	}


	public void setDiscountOffer(boolean discountOffer) {
		this.discountOffer = discountOffer;
	}


	public String getInvoiceNote() {
		return invoiceNote;
	}


	public void setInvoiceNote(String invoiceNote) {
		this.invoiceNote = invoiceNote;
	}


	public String getSplitShipSetBy() {
		return splitShipSetBy;
	}


	public void setSplitShipSetBy(String splitShipSetBy) {
		this.splitShipSetBy = splitShipSetBy;
	}


	public String getVariableDataBreakdown() {
		return variableDataBreakdown;
	}


	public void setVariableDataBreakdown(String variableDataBreakdown) {
		this.variableDataBreakdown = variableDataBreakdown;
	}


	public ProductLine getVarProductLine() {
		return varProductLine;
	}


	public void setVarProductLine(ProductLine varProductLine) {
		this.varProductLine = varProductLine;
	}


	public SystemInfo getVarSystem() {
		return varSystem;
	}


	public void setVarSystem(SystemInfo varSystem) {
		this.varSystem = varSystem;
	}


//	List<OrgInfo> getListOrgInfo() {
//		return listOrgInfo;
//	}
//
//
//	void setListOrgInfo(List<OrgInfo> listOrgInfo) {
//		this.listOrgInfo = listOrgInfo;
//	}
	
	
	
}
