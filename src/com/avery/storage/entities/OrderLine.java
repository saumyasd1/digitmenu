package com.avery.storage.entities;

import java.io.StringWriter;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.UriInfo;

import org.apache.commons.lang.exception.ExceptionUtils;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import com.avery.app.config.PropertiesConfig;
import com.avery.app.config.SpringConfig;
import com.avery.logging.AppLogger;
import com.avery.storage.MainAbstractEntity;
import com.avery.storage.MixIn.OrderLineMixIn;
import com.avery.storage.MixIn.OrderQueueMixIn;
import com.avery.storage.service.OrderLineService;
import com.avery.storage.service.SalesOrderService;
import com.avery.utils.ApplicationUtils;
import com.avery.utils.PropertiesConstants;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;
import com.fasterxml.jackson.databind.SerializationFeature;

@Entity
@Table(name = "OrderLine")
@Path("orderLines")
public class OrderLine extends MainAbstractEntity{
	
/*	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "OrderFileAttchmentID", nullable = true)
	private OrderFileAttachment orderFileAttchment;*/
	
	@Column(name = "OrderFileAttchmentID")
    private int orderFileAttchmentID; 
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "OrderQueueID", nullable = true)
	private OrderQueue orderQueueForOrderLine;
	
	@Column(name = "PartnerID",length = 50)
    private String partnerID; 
	
	@Column(name = "RBOID",length = 50)
    private String rboID; 
	
	@Column(name = "ProductLineType",length = 50)
    private String productLineType; 
	
	@Column(name = "CustomerPONumber",length = 100)
    private String customerPONumber; 
	
	@Column(name = "OrderedDate")
    private Date orderedDate; 
	
	@Column(name = "PartnerCustomerName",length = 250)
    private String partnerCustomerName; 
	
	@Column(name = "Bulk")
    private Boolean bulk; 
	
	@Column(name = "PartnerVendorName",length = 250)
    private String partnerVendorName; 
	
	@Column(name = "ShipToCustomer",length = 250)
    private String shipToCustomer; 
	
	@Column(name = "ShipToContact",length = 250)
    private String shipToContact; 
	
	@Column(name = "ShipToAddress1",length = 250)
    private String shipToAddress1; 

	@Column(name = "ShipToAddress2",length = 250)
    private String shipToAddress2; 
	
	@Column(name = "ShipToAddress3",length = 250)
    private String shipToAddress3; 
	
	@Column(name = "ShipToCity",length = 100)
    private String shipToCity; 
	
	@Column(name = "ShipToState",length = 100)
    private String shipToState; 
	
	@Column(name = "ShipToZip",length = 50)
    private String shipToZip; 
	
	@Column(name = "ShipToCountry",length = 100)
    private String shipToCountry; 
	
	@Column(name = "ShipToTelephone",length = 50)
    private String shipToTelephone; 
	
	@Column(name = "ShipToFax",length = 100)
    private String shipToFax; 
	
	@Column(name = "ShipToEmail",length = 100)
    private String shipToEmail; 
	
	@Column(name = "BillToCustomer",length = 250)
    private String billToCustomer; 
	
	@Column(name = "BillToContact",length = 250)
    private String billToContact; 

	@Column(name = "BillToAddress1",length = 250)
    private String billToAddress1; 
	
	@Column(name = "BillToAddress2",length = 250)
    private String billToAddress2; 
	
	@Column(name = "BillToAddress3",length = 250)
    private String billToAddress3; 
	
	@Column(name = "BillToCity",length = 100)
    private String billToCity; 
	
	@Column(name = "BillToState",length = 100)
    private String billToState; 
	
	@Column(name = "BillToZip",length = 50)
    private String billToZip; 
	
	@Column(name = "BillToCountry",length = 100)
    private String billToCountry; 
	
	@Column(name = "BillToTelephone",length = 50)
    private String billToTelephone; 
	
	@Column(name = "BillToFax",length = 100)
    private String billToFax; 
	
	@Column(name = "BillToEmail",length = 100)
    private String billToEmail; 
	
	@Column(name = "RequestedDevliveryDate")
    private Date requestedDevliveryDate; 

	@Column(name = "ShippingMethod",length = 100)
    private String shippingMethod; 
	
	@Column(name = "SpecialInstruction",length = 500)
    private String specialInstruction; 
	
	@Column(name = "OrderReceivedDate")
    private Date orderReceivedDate; 
	
	@Column(name = "SOLDTORBONumber",length = 50)
    private String soldTORBONumber; 
	
	@Column(name = "OracleBilltoSiteNumber",length = 50)
    private String oracleBilltoSiteNumber; 
	
	@Column(name = "OracleShiptoSiteNumber",length = 50)
    private String oracleShiptoSiteNumber; 
	
	@Column(name = "RetailerPO_CustomerJob",length = 100)
    private String retailerPO_CustomerJob; 
	
	@Column(name = "AveryItemNumber",length = 50)
    private String averyItemNumber; 
	
	@Column(name = "OracleItemNumber",length = 50)
    private String oracleItemNumber; 
	
	@Column(name = "CustomerItemNumber",length = 50)
    private String customerItemNumber; 
	
	@Column(name = "ItemDescription",length = 200)
    private String itemDescription; 

	@Column(name = "CustomerColorCode",length = 50)
    private String customerColorCode; 
	
	@Column(name = "CustomerColorDescription",length = 200)
    private String customerColorDescription; 
	
	@Column(name = "CustomerSize",length = 50)
    private String customerSize; 
	
	@Column(name = "CustomerUnitPrice",length = 50)
    private String customerUnitPrice; 
	
	@Column(name = "CustomerCost",length = 50)
    private String customerCost; 
	
	@Column(name = "ContractNumber",length = 50)
    private String contractNumber; 
	
	@Column(name = "StyleNo",length = 50)
    private String styleNo; 

	@Column(name = "CustomerItemNumber1",length = 50)
    private String customerItemNumber1; 
	
	@Column(name = "CustomerItemNumber2",length = 50)
    private String customerItemNumber2; 
	
	@Column(name = "CustomerSeason",length = 50)
    private String customerSeason; 
	
	@Column(name = "CustomerUOM",length = 50)
    private String customerUOM; 
	
	@Column(name = "CustomerOrderedQty",length = 50)
    private String customerOrderedQty; 
	
	@Column(name = "CalculatedOrderdedQty",length = 10)
    private String calculatedOrderdedQty; 
	
	@Column(name = "OrderDate")
    private Date orderDate; 

	@Column(name = "CustomerRequestDate")
    private Date customerRequestDate; 
	
	@Column(name = "PromiseDate")
    private Date promiseDate; 
	
	@Column(name = "FreightTerms",length = 50)
    private String freightTerms; 
	
	@Column(name = "CSR",length = 50)
    private String csr; 
	
	@Column(name = "PackingInstruction",length = 500)
    private String packingInstruction; 
	
	@Column(name = "ShippingInstructions",length = 500)
    private String shippingInstructions; 
	
	@Column(name = "InvoicelineInstruction",length = 500)
    private String invoicelineInstruction; 

	@Column(name = "DivisionforInterfaceERPORG",length = 10)
    private String divisionforInterfaceERPORG; 
	
	@Column(name = "Artworkhold",length = 5)
    private String artworkhold; 
	
	@Column(name = "Artworkworkattachment",length = 5)
    private String artworkworkattachment; 
	
	@Column(name = "VariableDataBreakdown",length = 500)
    private String variableDataBreakdown; 
	
	@Column(name = "Manufacturingnotes",length = 500)
    private String manufacturingnotes; 
	
	@Column(name = "Ordertype",length = 50)
    private String ordertype; 
	
	@Column(name = "Orderby",length = 50)
    private String orderby; 

	@Column(name = "Endcustomer",length = 50)
    private String endcustomer; 
	
	@Column(name = "Shippingonlynotes",length = 500)
    private String shippingonlynotes; 
	
	@Column(name = "BankCharge",length = 10)
    private String bankCharge; 
	
	@Column(name = "FreightCharge",length = 10)
    private String freightCharge; 
	
	@Column(name = "Shippinghold",length = 5)
    private String shippinghold; 
	
	@Column(name = "Productionhold",length = 5)
    private String productionhold; 
	
	@Column(name = "Splitshipset",length = 5)
    private String splitshipset; 

	@Column(name = "Agreement",length = 50)
    private String agreement; 
	
	@Column(name = "ModelSerialNumber",length = 50)
    private String modelSerialNumber; 
	
	@Column(name = "WaiveMOQ",length = 5)
    private String waiveMOQ; 
	
	@Column(name = "APOType",length = 5)
    private String apoType; 
	
	@Column(name = "SentToOracleDate")
    private Date sentToOracleDate; 
	
	@Column(name = "Status",length = 50)
    private String status; 
	
	@Column(name = "DuplicatePOFlag",length = 250)
    private String duplicatePOFlag; 

	@Column(name = "CustomerPOFlag",length = 250)
    private String customerPOFlag; 
	
	@Column(name = "BulkSampleValidationFlag",length = 250)
    private String bulkSampleValidationFlag; 
	
	@Column(name = "MOQValidationFlag",length = 250)
    private String moqValidationFlag; 
	
	@Column(name = "ATOValidationFlag",length = 250)
    private String atoValidationFlag; 
	
	@Column(name = "MandatoryVariableDataFieldFlag",length = 250)
    private String mandatoryVariableDataFieldFlag; 
	
	@Column(name = "Comment",length = 255)
    private String comment; 
	
	@Column(name = "PONumber",length = 100)
    private String poNumber;

	@Column(name = "RoundQty",length = 50)
    private String roundQty; 
	
	@Column(name = "MOQDiffQty",length = 50)
    private String moqDiffQty;
	
	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public String getPoNumber() {
		return poNumber;
	}

	public void setPoNumber(String poNumber) {
		this.poNumber = poNumber;
	}
	@Column(name = "HTLSizePageValidationFlag",length = 250)
    private String htlSizePageValidationFlag;
	
	@Fetch(FetchMode.SELECT)
	@OneToMany(mappedBy = "orderLineForVariableData", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	private Set<OrderLineDetail> orderLineDetail;

	
	public Set<OrderLineDetail> getOrderLineDetail() {
		return orderLineDetail;
	}

	public void setOrderLineDetail(Set<OrderLineDetail> orderLineDetail) {
		this.orderLineDetail = orderLineDetail;
	}

	public int getOrderFileAttchmentID() {
		return orderFileAttchmentID;
	}

	public void setOrderFileAttchmentID(int orderFileAttchmentID) {
		this.orderFileAttchmentID = orderFileAttchmentID;
	}

	public OrderQueue getOrderQueueForOrderLine() {
		return orderQueueForOrderLine;
	}

	public void setOrderQueueForOrderLine(OrderQueue orderQueueForOrderLine) {
		this.orderQueueForOrderLine = orderQueueForOrderLine;
	}

	public String getPartnerID() {
		return partnerID;
	}

	public void setPartnerID(String partnerID) {
		this.partnerID = partnerID;
	}

	public String getRboID() {
		return rboID;
	}

	public void setRboID(String rboID) {
		this.rboID = rboID;
	}

	public String getProductLineType() {
		return productLineType;
	}

	public void setProductLineType(String productLineType) {
		this.productLineType = productLineType;
	}

	public String getCustomerPONumber() {
		return customerPONumber;
	}

	public void setCustomerPONumber(String customerPONumber) {
		this.customerPONumber = customerPONumber;
	}

	public Date getOrderedDate() {
		return orderedDate;
	}

	public void setOrderedDate(Date orderedDate) {
		this.orderedDate = orderedDate;
	}

	public String getPartnerCustomerName() {
		return partnerCustomerName;
	}

	public void setPartnerCustomerName(String partnerCustomerName) {
		this.partnerCustomerName = partnerCustomerName;
	}

	public Boolean isBulk() {
		return bulk;
	}

	public void setBulk(Boolean bulk) {
		this.bulk = bulk;
	}

	public String getPartnerVendorName() {
		return partnerVendorName;
	}

	public void setPartnerVendorName(String partnerVendorName) {
		this.partnerVendorName = partnerVendorName;
	}

	public String getShipToCustomer() {
		return shipToCustomer;
	}

	public void setShipToCustomer(String shipToCustomer) {
		this.shipToCustomer = shipToCustomer;
	}

	public String getShipToContact() {
		return shipToContact;
	}

	public void setShipToContact(String shipToContact) {
		this.shipToContact = shipToContact;
	}

	public String getShipToAddress1() {
		return shipToAddress1;
	}

	public void setShipToAddress1(String shipToAddress1) {
		this.shipToAddress1 = shipToAddress1;
	}

	public String getShipToAddress2() {
		return shipToAddress2;
	}

	public void setShipToAddress2(String shipToAddress2) {
		this.shipToAddress2 = shipToAddress2;
	}

	public String getShipToAddress3() {
		return shipToAddress3;
	}

	public void setShipToAddress3(String shipToAddress3) {
		this.shipToAddress3 = shipToAddress3;
	}

	public String getShipToCity() {
		return shipToCity;
	}

	public void setShipToCity(String shipToCity) {
		this.shipToCity = shipToCity;
	}

	public String getShipToState() {
		return shipToState;
	}

	public void setShipToState(String shipToState) {
		this.shipToState = shipToState;
	}

	public String getShipToZip() {
		return shipToZip;
	}

	public void setShipToZip(String shipToZip) {
		this.shipToZip = shipToZip;
	}

	public String getShipToCountry() {
		return shipToCountry;
	}

	public void setShipToCountry(String shipToCountry) {
		this.shipToCountry = shipToCountry;
	}

	public String getShipToTelephone() {
		return shipToTelephone;
	}

	public void setShipToTelephone(String shipToTelephone) {
		this.shipToTelephone = shipToTelephone;
	}

	public String getShipToFax() {
		return shipToFax;
	}

	public void setShipToFax(String shipToFax) {
		this.shipToFax = shipToFax;
	}

	public String getShipToEmail() {
		return shipToEmail;
	}

	public void setShipToEmail(String shipToEmail) {
		this.shipToEmail = shipToEmail;
	}

	public String getBillToCustomer() {
		return billToCustomer;
	}

	public void setBillToCustomer(String billToCustomer) {
		this.billToCustomer = billToCustomer;
	}

	public String getBillToContact() {
		return billToContact;
	}

	public void setBillToContact(String billToContact) {
		this.billToContact = billToContact;
	}

	public String getBillToAddress1() {
		return billToAddress1;
	}

	public void setBillToAddress1(String billToAddress1) {
		this.billToAddress1 = billToAddress1;
	}

	public String getBillToAddress2() {
		return billToAddress2;
	}

	public void setBillToAddress2(String billToAddress2) {
		this.billToAddress2 = billToAddress2;
	}

	public String getBillToAddress3() {
		return billToAddress3;
	}

	public void setBillToAddress3(String billToAddress3) {
		this.billToAddress3 = billToAddress3;
	}

	public String getBillToCity() {
		return billToCity;
	}

	public void setBillToCity(String billToCity) {
		this.billToCity = billToCity;
	}

	public String getBillToState() {
		return billToState;
	}

	public void setBillToState(String billToState) {
		this.billToState = billToState;
	}

	public String getBillToZip() {
		return billToZip;
	}

	public void setBillToZip(String billToZip) {
		this.billToZip = billToZip;
	}

	public String getBillToCountry() {
		return billToCountry;
	}

	public void setBillToCountry(String billToCountry) {
		this.billToCountry = billToCountry;
	}

	public String getBillToTelephone() {
		return billToTelephone;
	}

	public void setBillToTelephone(String billToTelephone) {
		this.billToTelephone = billToTelephone;
	}

	public String getBillToFax() {
		return billToFax;
	}

	public void setBillToFax(String billToFax) {
		this.billToFax = billToFax;
	}

	public String getBillToEmail() {
		return billToEmail;
	}

	public void setBillToEmail(String billToEmail) {
		this.billToEmail = billToEmail;
	}

	public Date getRequestedDevliveryDate() {
		return requestedDevliveryDate;
	}

	public void setRequestedDevliveryDate(Date requestedDevliveryDate) {
		this.requestedDevliveryDate = requestedDevliveryDate;
	}

	public String getShippingMethod() {
		return shippingMethod;
	}

	public void setShippingMethod(String shippingMethod) {
		this.shippingMethod = shippingMethod;
	}

	public String getSpecialInstruction() {
		return specialInstruction;
	}

	public void setSpecialInstruction(String specialInstruction) {
		this.specialInstruction = specialInstruction;
	}

	public Date getOrderReceivedDate() {
		return orderReceivedDate;
	}

	public void setOrderReceivedDate(Date orderReceivedDate) {
		this.orderReceivedDate = orderReceivedDate;
	}

	public String getSoldTORBONumber() {
		return soldTORBONumber;
	}

	public void setSoldTORBONumber(String soldTORBONumber) {
		this.soldTORBONumber = soldTORBONumber;
	}

	public String getOracleBilltoSiteNumber() {
		return oracleBilltoSiteNumber;
	}

	public void setOracleBilltoSiteNumber(String oracleBilltoSiteNumber) {
		this.oracleBilltoSiteNumber = oracleBilltoSiteNumber;
	}

	public String getOracleShiptoSiteNumber() {
		return oracleShiptoSiteNumber;
	}

	public void setOracleShiptoSiteNumber(String oracleShiptoSiteNumber) {
		this.oracleShiptoSiteNumber = oracleShiptoSiteNumber;
	}

	public String getRetailerPO_CustomerJob() {
		return retailerPO_CustomerJob;
	}

	public void setRetailerPO_CustomerJob(String retailerPO_CustomerJob) {
		this.retailerPO_CustomerJob = retailerPO_CustomerJob;
	}

	public String getAveryItemNumber() {
		return averyItemNumber;
	}

	public void setAveryItemNumber(String averyItemNumber) {
		this.averyItemNumber = averyItemNumber;
	}

	public String getOracleItemNumber() {
		return oracleItemNumber;
	}

	public void setOracleItemNumber(String oracleItemNumber) {
		this.oracleItemNumber = oracleItemNumber;
	}

	public String getCustomerItemNumber() {
		return customerItemNumber;
	}

	public void setCustomerItemNumber(String customerItemNumber) {
		this.customerItemNumber = customerItemNumber;
	}

	public String getItemDescription() {
		return itemDescription;
	}

	public void setItemDescription(String itemDescription) {
		this.itemDescription = itemDescription;
	}

	public String getCustomerColorCode() {
		return customerColorCode;
	}

	public void setCustomerColorCode(String customerColorCode) {
		this.customerColorCode = customerColorCode;
	}

	public String getCustomerColorDescription() {
		return customerColorDescription;
	}

	public void setCustomerColorDescription(String customerColorDescription) {
		this.customerColorDescription = customerColorDescription;
	}

	public String getCustomerSize() {
		return customerSize;
	}

	public void setCustomerSize(String customerSize) {
		this.customerSize = customerSize;
	}

	public String getCustomerUnitPrice() {
		return customerUnitPrice;
	}

	public void setCustomerUnitPrice(String customerUnitPrice) {
		this.customerUnitPrice = customerUnitPrice;
	}

	public String getCustomerCost() {
		return customerCost;
	}

	public void setCustomerCost(String customerCost) {
		this.customerCost = customerCost;
	}

	public String getContractNumber() {
		return contractNumber;
	}

	public void setContractNumber(String contractNumber) {
		this.contractNumber = contractNumber;
	}

	public String getStyleNo() {
		return styleNo;
	}

	public void setStyleNo(String styleNo) {
		this.styleNo = styleNo;
	}

	public String getCustomerItemNumber1() {
		return customerItemNumber1;
	}

	public void setCustomerItemNumber1(String customerItemNumber1) {
		this.customerItemNumber1 = customerItemNumber1;
	}

	public String getCustomerItemNumber2() {
		return customerItemNumber2;
	}

	public void setCustomerItemNumber2(String customerItemNumber2) {
		this.customerItemNumber2 = customerItemNumber2;
	}

	public String getCustomerSeason() {
		return customerSeason;
	}

	public void setCustomerSeason(String customerSeason) {
		this.customerSeason = customerSeason;
	}

	public String getCustomerUOM() {
		return customerUOM;
	}

	public void setCustomerUOM(String customerUOM) {
		this.customerUOM = customerUOM;
	}

	public String getCustomerOrderedQty() {
		return customerOrderedQty;
	}

	public void setCustomerOrderedQty(String customerOrderedQty) {
		this.customerOrderedQty = customerOrderedQty;
	}

	public String getCalculatedOrderdedQty() {
		return calculatedOrderdedQty;
	}

	public void setCalculatedOrderdedQty(String calculatedOrderdedQty) {
		this.calculatedOrderdedQty = calculatedOrderdedQty;
	}

	public Date getOrderDate() {
		return orderDate;
	}

	public void setOrderDate(Date orderDate) {
		this.orderDate = orderDate;
	}

	public Date getCustomerRequestDate() {
		return customerRequestDate;
	}

	public void setCustomerRequestDate(Date customerRequestDate) {
		this.customerRequestDate = customerRequestDate;
	}

	public Date getPromiseDate() {
		return promiseDate;
	}

	public void setPromiseDate(Date promiseDate) {
		this.promiseDate = promiseDate;
	}

	public String getFreightTerms() {
		return freightTerms;
	}

	public void setFreightTerms(String freightTerms) {
		this.freightTerms = freightTerms;
	}

	public String getCsr() {
		return csr;
	}

	public void setCsr(String csr) {
		this.csr = csr;
	}

	public String getPackingInstruction() {
		return packingInstruction;
	}

	public void setPackingInstruction(String packingInstruction) {
		this.packingInstruction = packingInstruction;
	}

	public String getShippingInstructions() {
		return shippingInstructions;
	}

	public void setShippingInstructions(String shippingInstructions) {
		this.shippingInstructions = shippingInstructions;
	}

	public String getInvoicelineInstruction() {
		return invoicelineInstruction;
	}

	public void setInvoicelineInstruction(String invoicelineInstruction) {
		this.invoicelineInstruction = invoicelineInstruction;
	}

	public String getDivisionforInterfaceERPORG() {
		return divisionforInterfaceERPORG;
	}

	public void setDivisionforInterfaceERPORG(String divisionforInterfaceERPORG) {
		this.divisionforInterfaceERPORG = divisionforInterfaceERPORG;
	}

	public String getArtworkhold() {
		return artworkhold;
	}

	public void setArtworkhold(String artworkhold) {
		this.artworkhold = artworkhold;
	}

	public String getArtworkworkattachment() {
		return artworkworkattachment;
	}

	public void setArtworkworkattachment(String artworkworkattachment) {
		this.artworkworkattachment = artworkworkattachment;
	}

	public String getVariableDataBreakdown() {
		return variableDataBreakdown;
	}

	public void setVariableDataBreakdown(String variableDataBreakdown) {
		this.variableDataBreakdown = variableDataBreakdown;
	}

	public String getManufacturingnotes() {
		return manufacturingnotes;
	}

	public void setManufacturingnotes(String manufacturingnotes) {
		this.manufacturingnotes = manufacturingnotes;
	}

	public String getOrdertype() {
		return ordertype;
	}

	public void setOrdertype(String ordertype) {
		this.ordertype = ordertype;
	}

	public String getOrderby() {
		return orderby;
	}

	public void setOrderby(String orderby) {
		this.orderby = orderby;
	}

	public String getEndcustomer() {
		return endcustomer;
	}

	public void setEndcustomer(String endcustomer) {
		this.endcustomer = endcustomer;
	}

	public String getShippingonlynotes() {
		return shippingonlynotes;
	}

	public void setShippingonlynotes(String shippingonlynotes) {
		this.shippingonlynotes = shippingonlynotes;
	}

	public String getBankCharge() {
		return bankCharge;
	}

	public void setBankCharge(String bankCharge) {
		this.bankCharge = bankCharge;
	}

	public String getFreightCharge() {
		return freightCharge;
	}

	public void setFreightCharge(String freightCharge) {
		this.freightCharge = freightCharge;
	}

	public String getShippinghold() {
		return shippinghold;
	}

	public void setShippinghold(String shippinghold) {
		this.shippinghold = shippinghold;
	}

	public String getProductionhold() {
		return productionhold;
	}

	public void setProductionhold(String productionhold) {
		this.productionhold = productionhold;
	}

	public String getSplitshipset() {
		return splitshipset;
	}

	public void setSplitshipset(String splitshipset) {
		this.splitshipset = splitshipset;
	}

	public String getAgreement() {
		return agreement;
	}

	public void setAgreement(String agreement) {
		this.agreement = agreement;
	}

	public String getModelSerialNumber() {
		return modelSerialNumber;
	}

	public void setModelSerialNumber(String modelSerialNumber) {
		this.modelSerialNumber = modelSerialNumber;
	}

	public String getWaiveMOQ() {
		return waiveMOQ;
	}

	public void setWaiveMOQ(String waiveMOQ) {
		this.waiveMOQ = waiveMOQ;
	}

	public String getApoType() {
		return apoType;
	}

	public void setApoType(String apoType) {
		this.apoType = apoType;
	}

	public Date getSentToOracleDate() {
		return sentToOracleDate;
	}

	public void setSentToOracleDate(Date sentToOracleDate) {
		this.sentToOracleDate = sentToOracleDate;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getDuplicatePOFlag() {
		return duplicatePOFlag;
	}

	public void setDuplicatePOFlag(String duplicatePOFlag) {
		this.duplicatePOFlag = duplicatePOFlag;
	}

	public String getCustomerPOFlag() {
		return customerPOFlag;
	}

	public void setCustomerPOFlag(String customerPOFlag) {
		this.customerPOFlag = customerPOFlag;
	}

	public String getBulkSampleValidationFlag() {
		return bulkSampleValidationFlag;
	}

	public void setBulkSampleValidationFlag(String bulkSampleValidationFlag) {
		this.bulkSampleValidationFlag = bulkSampleValidationFlag;
	}

	public String getMoqValidationFlag() {
		return moqValidationFlag;
	}

	public void setMoqValidationFlag(String moqValidationFlag) {
		this.moqValidationFlag = moqValidationFlag;
	}

	public String getAtoValidationFlag() {
		return atoValidationFlag;
	}

	public void setAtoValidationFlag(String atoValidationFlag) {
		this.atoValidationFlag = atoValidationFlag;
	}

	public String getMandatoryVariableDataFieldFlag() {
		return mandatoryVariableDataFieldFlag;
	}

	public void setMandatoryVariableDataFieldFlag(
			String mandatoryVariableDataFieldFlag) {
		this.mandatoryVariableDataFieldFlag = mandatoryVariableDataFieldFlag;
	}

	public String getHtlSizePageValidationFlag() {
		return htlSizePageValidationFlag;
	}

	public void setHtlSizePageValidationFlag(String htlSizePageValidationFlag) {
		this.htlSizePageValidationFlag = htlSizePageValidationFlag;
	}
	public String getRoundQty() {
		return roundQty;
	}

	public void setRoundQty(String roundQty) {
		this.roundQty = roundQty;
	}
	public String getMoqDiffQty() {
		return moqDiffQty;
	}

	public void setMoqDiffQty(String moqDiffQty) {
		this.moqDiffQty = moqDiffQty;
	}

	@Override
	public Response getEntities(UriInfo ui, HttpHeaders hh) {
		Response.ResponseBuilder rb = null;
		List<OrderLine> orderLine = null;
		try {
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			mapper.addMixInAnnotations(OrderLine.class, OrderLineMixIn.class);
			mapper.addMixInAnnotations(OrderLineDetail.class, OrderLineMixIn.class);
			mapper.addMixInAnnotations(MainAbstractEntity.class, OrderLineMixIn.class);//added mixIn
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, true);
			OrderLineService orderLineService = (OrderLineService) SpringConfig
					.getInstance().getBean("orderLineService");
			orderLine = orderLineService.readAll();
			if (orderLine == null)
				throw new Exception("Unable to find Order Line");
			mapper.setDateFormat(ApplicationUtils.df);
			mapper.writeValue(writer, orderLine);
			rb = Response.ok(writer.toString());
		} catch (WebApplicationException ex) {
			throw ex;
		} catch (Exception e) {
			e.printStackTrace();
			throw new WebApplicationException(Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e))
					.type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		return rb.build();

	}
	
	@Override
	public Response createEntity(UriInfo ui, HttpHeaders hh, String data) {
		Long id;
		try {
			ObjectMapper mapper = new ObjectMapper();
			mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,
					false);
			mapper.configure(DeserializationFeature.UNWRAP_ROOT_VALUE, false);
			OrderLine orderLine = mapper.readValue(data, OrderLine.class);
			OrderLineService orderLineService = (OrderLineService) SpringConfig
					.getInstance().getBean("orderLineService");
			
			id = orderLineService.create(orderLine);
			return Response.ok(id).build();
		} catch (Exception e) {
			e.printStackTrace();
			throw new WebApplicationException(Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e))
					.type(MediaType.TEXT_PLAIN_TYPE).build());
		}
	}
	
	@Override
	public Response updateEntity(UriInfo ui, HttpHeaders hh, String id,
			String data) {
		Response.ResponseBuilder rb = null;
		try {
			ObjectMapper mapper = new ObjectMapper();
			StringWriter writer = new StringWriter();
			mapper.addMixInAnnotations(OrderLine.class, OrderLineMixIn.class);
			mapper.addMixInAnnotations(OrderLineDetail.class, OrderLineMixIn.class);
			mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,
					false);
			// toggle this property value based on your input JSON data
			mapper.configure(DeserializationFeature.UNWRAP_ROOT_VALUE, false);
			OrderLineService orderLineService = (OrderLineService) SpringConfig
					.getInstance().getBean("orderLineService");
			// read existing entity from database
			OrderLine orderLine = orderLineService.read(Long.parseLong(id));
			if (orderLine == null) {
				throw new WebApplicationException(Response
						.status(Status.BAD_REQUEST)
						.entity("Order Line entity with id \"" + id
								+ "\" doesn't exist")
						.type(MediaType.TEXT_PLAIN_TYPE).build());
			}
			ObjectReader updater = mapper.readerForUpdating(orderLine);
			// build updated entity object from input data
			orderLine = updater.readValue(data);
			// update entity in database
			orderLineService.update(orderLine);
			// prepare response
			mapper.writeValue(writer, orderLine);
			rb = Response.ok(writer.toString());
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error in updating order line entity with id " + id, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error in updating order line entity with id " + id, e);
			throw new WebApplicationException(Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e))
					.type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		return rb.build();
	}


	@Override
	public Response getEntity(UriInfo ui, HttpHeaders hh, String id) {
		Response.ResponseBuilder rb = null;
		try {
			Long entityId = Long.parseLong(id);
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			mapper.addMixInAnnotations(OrderLine.class, OrderLineMixIn.class);
			mapper.addMixInAnnotations(OrderLineDetail.class, OrderLineMixIn.class);
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, true);
			OrderLineService orderLineService = (OrderLineService) SpringConfig
					.getInstance().getBean("orderLineService");
			OrderLine orderLine = orderLineService.read(entityId);
			if (orderLine == null)
				throw new WebApplicationException(Response
						.status(Status.BAD_REQUEST)
						.entity("Order Line entity with id \"" + id
								+ "\" doesn't exist")
						.type(MediaType.TEXT_PLAIN_TYPE).build());
			mapper.writeValue(writer, orderLine);
			rb = Response.ok(writer.toString());
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error in fetching Order Line entity with id " + id, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error in fetching order entity with id " + id, e);
			throw new WebApplicationException(Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e))
					.type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		return rb.build();

	}
	
	
	@GET
	@Path("/order/{id:[0-9]+}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getOrderLineByOrderID(@Context UriInfo ui,
			@Context HttpHeaders hh, @PathParam("id") String orderId) {
		Response.ResponseBuilder rb = null;
		List<OrderLine> orderLine = null;
		Map orderLineMap=new HashMap();
		int salesOrderCount=0;
		try{
			Long entityId = Long.parseLong(orderId);
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			mapper.addMixInAnnotations(OrderLine.class, OrderLineMixIn.class);
			mapper.addMixInAnnotations(OrderLineDetail.class, OrderLineMixIn.class);
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
			OrderLineService orderLineService = (OrderLineService) SpringConfig
					.getInstance().getBean("orderLineService");
			orderLine = orderLineService.readAllByOrderID(entityId);
			if (orderLine == null)
				throw new Exception("Unable to find Order Line");
			SalesOrderService salesOrderService = (SalesOrderService) SpringConfig
						.getInstance().getBean("salesOrderService");
			salesOrderCount=salesOrderService.getCountByOrderID(entityId);
			orderLineMap.put("orderLine", orderLine);
			orderLineMap.put("salesOrderCount", salesOrderCount);
			mapper.setDateFormat(ApplicationUtils.df);
			mapper.writeValue(writer, orderLineMap);
			rb = Response.ok(writer.toString());
		} catch (WebApplicationException ex) {
			throw ex;
		} catch (Exception e) {
			e.printStackTrace();
			throw new WebApplicationException(Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e))
					.type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		return rb.build();
	}
	@PUT
	@Path("bulkupdate")
	public Response updateEntities(@Context UriInfo ui,
			@Context HttpHeaders hh, String data) {
		String jsonData="";
		boolean insertShipAddress=false;
		boolean insertBillAddress=false;
		boolean updateAll=true;
		Map<String,Boolean> flagMap=new HashMap<String,Boolean>();
		Long bulkUpdateAllById=0L;
		Map<String,String> jsonMap=null;
		try {
			OrderLineService orderLineService = (OrderLineService) SpringConfig
					.getInstance().getBean("orderLineService");
			jsonMap=ApplicationUtils.convertJSONtoMaps(data);
			insertShipAddress=Boolean.parseBoolean((String)jsonMap.get("insertShipAddress"));
			insertBillAddress=Boolean.parseBoolean((String)jsonMap.get("insertBillAddress"));
			jsonData=(String)jsonMap.get("data");
			flagMap.put("insertBillAddress", insertBillAddress);
			flagMap.put("insertShipAddress", insertShipAddress);
			updateAll=Boolean.parseBoolean((String)jsonMap.get("updateAll"));
			if(updateAll){
				if((String)jsonMap.get("orderQueueId")!=null){
					bulkUpdateAllById = Long.parseLong((String)jsonMap.get("orderQueueId"));
					orderLineService.bulkUpdateAll(jsonData, flagMap,bulkUpdateAllById);
				}else{
					throw new Exception("Unable to update all records as the Order Queue Id is not present");
				}
			}
			else
				orderLineService.bulkUpdate(jsonData, flagMap);
			boolean triggerValidationFlow = PropertiesConfig
					.getBoolean(PropertiesConstants.TRIGGER_VALIDATION_ON_SAVE_FLAG);
			if(triggerValidationFlow){
				Router router=new Router();
				router.validateOrder(Long.parseLong((String)jsonMap.get("orderQueueId")));
			}
			return Response.ok().build();
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error while Permorfing bulk update", ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error while Permorfing bulk update", e);
			throw new WebApplicationException(Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e))
					.type(MediaType.TEXT_PLAIN_TYPE).build());
		}
	}


}
