package com.avery.storage.entities;

import java.io.StringWriter;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
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

import com.avery.app.config.SpringConfig;
import com.avery.logging.AppLogger;
import com.avery.storage.MainAbstractEntity;
import com.avery.storage.MixIn.SalesOrderMixIn;
import com.avery.storage.service.SalesOrderService;
import com.avery.utils.ApplicationUtils;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;
import com.fasterxml.jackson.databind.SerializationFeature;

@Entity
@Table(name = "SalesOrder")
@Path("salesorders")
public class SalesOrder extends MainAbstractEntity{
	
	private static final long serialVersionUID = -6121468415641006948L;

	@Column(name = "OrderQueueID")
    private Long orderQueueID; 
	
	@Column(name = "OrderFileAttchmentID")
    private int orderFileAttchmentID; 
	
	@Column(name = "PartnerID",length = 50)
    private String partnerID; 
	
	@Column(name = "RBOID",length = 50)
    private String rboID; 
	
	@Column(name = "ProductLineType",length = 50)
    private String productLineType; 
	
	@Column(name = "OracleExportID")
    private Integer oracleExportID; 
	
	@Column(name = "Division",length = 10)
    private String division;
	
	@Column(name = "OrderSource",length = 50)
    private String orderSource;
	
	@Column(name = "SystemUniqueID",length = 50)
    private String systemUniqueID;
	
	
	@Column(name = "SystemUniqueIDLineNo",length = 50)
    private String systemUniqueIDLineNo;
	
	@Column(name = "SOLDTORBONumber",length = 50)
    private String soldTORBONumber;
	
	@Column(name = "OracleBilltoSiteNumber",length = 50)
    private String oracleBilltoSiteNumber;
	
	@Column(name = "OracleShiptoSiteNumber",length = 50)
    private String oracleShiptoSiteNumber;
	
	@Column(name = "ShippingMethod",length = 50)
    private String shippingMethod;
	
	@Column(name = "CustomerPONumber",length = 100)
    private String customerPONumber;
	
	@Column(name = "RetailerPO_CustomerJob",length = 100)
    private String retailerPO_CustomerJob;
	
	@Column(name = "OracleItemNumber",length = 50)
    private String oracleItemNumber;
	
	
	@Column(name = "CustomerItemNumber",length = 50)
    private String customerItemNumber;
	
	@Column(name = "ItemDescription",length = 50)
    private String itemDescription;
	
	@Column(name = "CustomerColorCode",length = 50)
    private String customerColorCode;
	
	@Column(name = "CustomerColorDescription",length = 50)
    private String customerColorDescription;
	
	@Column(name = "CustomerSize",length = 50)
    private String customerSize;
	
	@Column(name = "CustomerUnitPrice",length = 50)
    private String customerUnitPrice;
	
	@Column(name = "CustomerCost",length = 50)
    private String customerCost;
	
	@Column(name = "ContractNumber",length = 50)
    private String contractNumber;
	
	@Column(name = "Style",length = 50)
    private String style;
	
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
	
	@Column(name = "OrderdedQty",length = 10)
    private String orderdedQty;
	
	@Column(name = "DateOrdered")
    private Date dateOrdered;
	
	@Column(name = "CustomerRequestDate")
    private Date ustomerRequestDate;
	
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
	
	@Column(name = "BillToContact",length = 50)
    private String billToContact; 
	
	@Column(name = "BillToTEL",length = 50)
    private String billToTEL;
	
	@Column(name = "BillToFAX",length = 50)
    private String billToFAX;
	
	@Column(name = "BillToEMAIL",length = 50)
    private String billToEMAIL;
	
	
	@Column(name = "SHIPTOContact",length = 50)
    private String shipTOContact;
	
	@Column(name = "SHIPTOTEL",length = 50)
    private String shipTOTEL;
	
	@Column(name = "SHIPTOFAX",length = 50)
    private String shipTOFAX;
	
	@Column(name = "SHIPTOEMAIL",length = 50)
    private String shipTOEMAIL;
	
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
	
	@Column(name = "Status",length = 2000)
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
	
	@Column(name = "HTLSizePageValidationFlag",length = 250)
    private String htlSizePageValidationFlag; 
	
	@Column(name = "System_Status",length = 2000)
    private String systemstatus; 
	
	
	/*@OneToMany(mappedBy = "salesOrder", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private Set<SalesOrderDetail> salesOrderDetail;*/
	
	@Fetch(FetchMode.SELECT)
	@OneToMany(mappedBy = "salesOrderForVariableData", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	private Set<SalesOrderDetail> salesOrderDetail;


	public Set<SalesOrderDetail> getSalesOrderDetail() {
		return salesOrderDetail;
	}

	public void setSalesOrderDetail(Set<SalesOrderDetail> salesOrderDetail) {
	this.salesOrderDetail = salesOrderDetail;
	}

	public Long getOrderQueueID() {
		return orderQueueID;
	}

	public void setOrderQueueID(Long orderQueueID) {
		this.orderQueueID = orderQueueID;
	}

	public int getOrderFileAttchmentID() {
		return orderFileAttchmentID;
	}

	public void setOrderFileAttchmentID(int orderFileAttchmentID) {
		this.orderFileAttchmentID = orderFileAttchmentID;
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

	public Integer getOracleExportID() {
		return oracleExportID;
	}

	public void setOracleExportID(Integer oracleExportID) {
		this.oracleExportID = oracleExportID;
	}

	public String getDivision() {
		return division;
	}

	public void setDivision(String division) {
		this.division = division;
	}

	public String getOrderSource() {
		return orderSource;
	}

	public void setOrderSource(String orderSource) {
		this.orderSource = orderSource;
	}

	public String getSystemUniqueID() {
		return systemUniqueID;
	}

	public void setSystemUniqueID(String systemUniqueID) {
		this.systemUniqueID = systemUniqueID;
	}

	public String getSystemUniqueIDLineNo() {
		return systemUniqueIDLineNo;
	}

	public void setSystemUniqueIDLineNo(String systemUniqueIDLineNo) {
		this.systemUniqueIDLineNo = systemUniqueIDLineNo;
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

	public String getShippingMethod() {
		return shippingMethod;
	}

	public void setShippingMethod(String shippingMethod) {
		this.shippingMethod = shippingMethod;
	}

	public String getCustomerPONumber() {
		return customerPONumber;
	}

	public void setCustomerPONumber(String customerPONumber) {
		this.customerPONumber = customerPONumber;
	}

	public String getRetailerPO_CustomerJob() {
		return retailerPO_CustomerJob;
	}

	public void setRetailerPO_CustomerJob(String retailerPO_CustomerJob) {
		this.retailerPO_CustomerJob = retailerPO_CustomerJob;
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

	public String getStyle() {
		return style;
	}

	public void setStyle(String style) {
		this.style = style;
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

	public String getOrderdedQty() {
		return orderdedQty;
	}

	public void setOrderdedQty(String orderdedQty) {
		this.orderdedQty = orderdedQty;
	}

	public Date getDateOrdered() {
		return dateOrdered;
	}

	public void setDateOrdered(Date dateOrdered) {
		this.dateOrdered = dateOrdered;
	}

	public Date getUstomerRequestDate() {
		return ustomerRequestDate;
	}

	public void setUstomerRequestDate(Date ustomerRequestDate) {
		this.ustomerRequestDate = ustomerRequestDate;
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

	public String getBillToContact() {
		return billToContact;
	}

	public void setBillToContact(String billToContact) {
		this.billToContact = billToContact;
	}

	public String getBillToTEL() {
		return billToTEL;
	}

	public void setBillToTEL(String billToTEL) {
		this.billToTEL = billToTEL;
	}

	public String getBillToFAX() {
		return billToFAX;
	}

	public void setBillToFAX(String billToFAX) {
		this.billToFAX = billToFAX;
	}

	public String getBillToEMAIL() {
		return billToEMAIL;
	}

	public void setBillToEMAIL(String billToEMAIL) {
		this.billToEMAIL = billToEMAIL;
	}

	public String getShipTOContact() {
		return shipTOContact;
	}

	public void setShipTOContact(String shipTOContact) {
		this.shipTOContact = shipTOContact;
	}

	public String getShipTOTEL() {
		return shipTOTEL;
	}

	public void setShipTOTEL(String shipTOTEL) {
		this.shipTOTEL = shipTOTEL;
	}

	public String getShipTOFAX() {
		return shipTOFAX;
	}

	public void setShipTOFAX(String shipTOFAX) {
		this.shipTOFAX = shipTOFAX;
	}

	public String getShipTOEMAIL() {
		return shipTOEMAIL;
	}

	public void setShipTOEMAIL(String shipTOEMAIL) {
		this.shipTOEMAIL = shipTOEMAIL;
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

	public String getSystemstatus() {
		return systemstatus;
	}

	public void setSystemstatus(String systemstatus) {
		this.systemstatus = systemstatus;
	}

	@Override
	public Response getEntities(UriInfo ui, HttpHeaders hh) {
		Response.ResponseBuilder rb = null;
		List<SalesOrder> salesOrder = null;
		try {
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			mapper.addMixIn(SalesOrderDetail.class, SalesOrderMixIn.class);
			mapper.addMixIn(MainAbstractEntity.class, SalesOrderMixIn.class);
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, true);
			SalesOrderService salesOrderService = (SalesOrderService) SpringConfig
					.getInstance().getBean("salesOrderService");
			salesOrder = salesOrderService.readAll();
			if (salesOrder == null)
				throw new Exception("Unable to find Sales Orders");
			mapper.writeValue(writer, salesOrder);
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
			SalesOrder salesOrder = mapper.readValue(data, SalesOrder.class);
			SalesOrderService salesOrderService = (SalesOrderService) SpringConfig
					.getInstance().getBean("salesOrderService");
			
			id = salesOrderService.create(salesOrder);
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
			mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,
					false);
			// toggle this property value based on your input JSON data
			mapper.configure(DeserializationFeature.UNWRAP_ROOT_VALUE, false);
			SalesOrderService salesOrderService = (SalesOrderService) SpringConfig
					.getInstance().getBean("salesOrderService");
			// read existing entity from database
			SalesOrder salesOrder = salesOrderService.read(Long.parseLong(id));
			if (salesOrder == null) {
				throw new WebApplicationException(Response
						.status(Status.BAD_REQUEST)
						.entity("Sales Order entity with id \"" + id
								+ "\" doesn't exist")
						.type(MediaType.TEXT_PLAIN_TYPE).build());
			}
			ObjectReader updater = mapper.readerForUpdating(salesOrder);
			// build updated entity object from input data
			salesOrder = updater.readValue(data);
			// update entity in database
			salesOrderService.update(salesOrder);
			// prepare response
			mapper.writeValue(writer, salesOrder);
			rb = Response.ok(writer.toString());
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error in updating sales order entity with id " + id, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error in updating sales order entity with id " + id, e);
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
			mapper.addMixIn(SalesOrderDetail.class, SalesOrderMixIn.class);
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, true);
			SalesOrderService salesOrderService = (SalesOrderService) SpringConfig
					.getInstance().getBean("salesOrderService");
			SalesOrder salesOrder = salesOrderService.read(entityId);
			if (salesOrder == null)
				throw new WebApplicationException(Response
						.status(Status.BAD_REQUEST)
						.entity("Sales Order entity with id \"" + id
								+ "\" doesn't exist")
						.type(MediaType.TEXT_PLAIN_TYPE).build());
			mapper.writeValue(writer, salesOrder);
			rb = Response.ok(writer.toString());
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error in fetching Sales Order entity with id " + id, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error in fetching Sales Order entity with id " + id, e);
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
		List<SalesOrder> salesOrder = null;
		try{
			Long entityId = Long.parseLong(orderId);
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			mapper.addMixIn(SalesOrderDetail.class, SalesOrderMixIn.class);
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, true);
			SalesOrderService salesOrderService = (SalesOrderService) SpringConfig
					.getInstance().getBean("salesOrderService");
			salesOrder = salesOrderService.readAllByOrderID(entityId);
			if (salesOrder == null)
				throw new Exception("Unable to find Sales Order");
			mapper.setDateFormat(ApplicationUtils.df);
			mapper.writeValue(writer, salesOrder); 
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
		boolean updateAll=true;
		Long bulkUpdateAllById=0L;
		Map<String,String> jsonMap=null;
		try {
			SalesOrderService salesOrderService = (SalesOrderService) SpringConfig
					.getInstance().getBean("salesOrderService");
			jsonMap=ApplicationUtils.convertJSONtoMaps(data);
			jsonData=(String)jsonMap.get("data");
			updateAll=Boolean.parseBoolean((String)jsonMap.get("updateAll"));
			if(updateAll){
				if((String)jsonMap.get("orderQueueId")!=null){
					bulkUpdateAllById = Long.parseLong((String)jsonMap.get("orderQueueId"));
					salesOrderService.bulkUpdateAll(jsonData,bulkUpdateAllById);
				}else{
					throw new Exception("Unable to update all records as the Order Queue Id is not present");
				}
			}
			else
			    salesOrderService.bulkUpdate(jsonData);
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
