package com.avery.storage.entities;

import java.io.StringWriter;
import java.util.ArrayList;
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
import javax.persistence.Transient;
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
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import com.avery.app.config.PropertiesConfig;
import com.avery.app.config.SpringConfig;
import com.avery.logging.AppLogger;
import com.avery.storage.MainAbstractEntity;
import com.avery.storage.MixIn.OrderLineMixIn;
import com.avery.storage.service.OrderLineService;
import com.avery.storage.service.SalesOrderService;
import com.avery.utils.ApplicationUtils;
import com.avery.utils.PropertiesConstants;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;
import com.fasterxml.jackson.databind.SerializationFeature;

@Entity
@Table(name = "orderline")
@Path("orderLines")
public class OrderLine extends MainAbstractEntity{
	
	public OrderLine(){
		
	}
	
	private static final long serialVersionUID = 6740793676369214590L;
	
	@Column(name = "additionalFileId", length = 100)
	private String additionalFileId; 
	
	@Column(name = "customerPONumber", length = 50)
	private String customerPONumber;
	
	@Column(name = "orderedDate")
	Date orderedDate;
	
	@Column(name = "partnerCustomerName", length = 250)
	private String partnerCustomerName;
	
	@Column(name = "bulk")
	Boolean bulk;
	
	@Column(name = "partnerVendorName", length = 250)
	private String partnerVendorName;
	
	@Column(name = "shipToCustomer", length = 250)
	private String shipToCustomer;
	
	@Column(name = "shipToContact", length = 250)
	private String shipToContact;
	
	@Column(name = "shipToAddress1", length = 250)
	private String shipToAddress1; 
	
	@Column(name = "shipToAddress2", length = 250)
	private String shipToAddress2;
	
	@Column(name = "shipToAddress3", length = 250)
	private String shipToAddress3;
	
	@Column(name = "shipToCity", length = 100)
	private String shipToCity;
	
	@Column(name = "shipToState", length = 100)
	private String shipToState;
	
	@Column(name = "shipToZip", length = 50)
	private String shipToZip;
	
	@Column(name = "shipToCountry", length = 100)
	private String shipToCountry;
	
	@Column(name = "shipToTelephone", length = 50)
	private String shipToTelephone;
	
	@Column(name = "shipToFax", length = 100)
	private String shipToFax;
	
	@Column(name = "shipToEmail", length = 100)
	private String shipToEmail;
	
	@Column(name = "billToCustomer", length = 250)
	private String billToCustomer;
	
	@Column(name = "billToContact", length = 250)
	private String billToContact;
	
	@Column(name = "billToAddress1", length = 250)
	private String billToAddress1;
	
	@Column(name = "billToAddress2", length = 250)
	private String billToAddress2;
	
	@Column(name = "billToAddress3", length = 250)
	private String billToAddress3;
	
	@Column(name = "billToCity", length = 100)
	private String billToCity;
	
	@Column(name = "billToState", length = 100)
	private String billToState;
	
	@Column(name = "billToZip", length = 50)
	private String billToZip;
	
	@Column(name = "billToCountry", length = 100)
	private String billToCountry;
	
	@Column(name = "billToTelephone", length = 50)
	private String billToTelephone;
	
	@Column(name = "billToFax", length = 100)
	private String billToFax;
	
	@Column(name = "billToEmail", length = 100)
	private String billToEmail;
	
	@Column(name = "requestedDevliveryDate")
	Date requestedDevliveryDate;
	
	@Column(name = "shippingMethod", length = 50)
	private String shippingMethod;
	
	@Column(name = "specialInstruction", length = 500)
	private String specialInstruction;
	
	@Column(name = "orderReceivedDate")
	Date orderReceivedDate;
	
	@Column(name = "soldToRBONumber", length = 50)
	private String soldToRBONumber;
	
	@Column(name = "oracleBillToSiteNumber", length = 50)
	private String oracleBillToSiteNumber;
	
	@Column(name = "oracleShipToSiteNumber", length = 50)
	private String oracleShipToSiteNumber; 
	
	@Column(name = "retailerPO_CustomerJob", length = 100)
	private String retailerPO_CustomerJob;
	
	@Column(name = "averyItemNumber", length = 50)
	private String averyItemNumber;
	
	@Column(name = "customerItemNumber", length = 50)
	private String customerItemNumber;
	
	@Column(name = "itemDescription", length = 50)
	private String itemDescription;
	
	@Column(name = "customerColorCode", length = 50)
	private String customerColorCode;
	
	@Column(name = "customerColorDescription", length = 50)
	private String customerColorDescription;
	
	@Column(name = "customerSize", length = 50)
	private String customerSize;
	
	@Column(name = "customerUnitPrice", length = 50)
	private String customerUnitPrice;
	
	@Column(name = "customerCost", length = 50)
	private String customerCost;
	
	@Column(name = "contractNumber", length = 50)
	private String contractNumber;
	
	@Column(name = "styleNo", length = 50)
	private String styleNo;
	
	@Column(name = "customerItemNumber1", length = 50)
	private String customerItemNumber1;
	
	@Column(name = "customerItemNumber2", length = 50)
	private String customerItemNumber2;
	
	@Column(name = "customerSeason", length = 50)
	private String customerSeason;
	
	@Column(name = "customerUOM", length = 50)
	private String customerUOM;
	
	@Column(name = "customerOrderedQty", length = 50)
	private String customerOrderedQty;
	
	@Column(name = "calculatedOrderdedQty", length = 10)
	private String calculatedOrderdedQty;
	
	@Column(name = "orderDate")
	Date orderDate;
	
	@Column(name = "customerRequestDate")
	Date customerRequestDate;
	
	@Column(name = "promiseDate")
	Date promiseDate;
	
	@Column(name = "freightTerms", length = 50)
	private String freightTerms;
	
	@Column(name = "csr", length = 50)
	private String csr;
	
	@Column(name = "packingInstruction", length = 500)
	private String packingInstruction;
	
	@Column(name = "shippingInstructions", length = 500)
	private String shippingInstructions;
	
	@Column(name = "invoicelineInstruction", length = 500)
	private String invoicelineInstruction;
	
	@Column(name = "divisionForInterfaceERPORG", length = 100)
	private String divisionForInterfaceERPORG;
	
	@Column(name = "artWorkhold", length = 5)
	private String artWorkhold;
	
	@Column(name = "artworkAttachment", length = 5)
	private String artworkAttachment;
	
	@Column(name = "variableDataBreakdown", length = 500)
	private String variableDataBreakdown;
	
	@Column(name = "manufacturingNotes", length = 500)
	private String manufacturingNotes;
	
	@Column(name = "orderType", length = 50)
	private String orderType;
	
	@Column(name = "orderBy", length = 50)
	private String orderBy;
	
	@Column(name = "endCustomer", length = 50)
	private String endCustomer;
	
	@Column(name = "shippingOnlyNotes", length = 500)
	private String shippingOnlyNotes;
	
	@Column(name = "bankCharge", length = 10)
	private String bankCharge;
	
	@Column(name = "freightCharge", length = 10)
	private String freightCharge;
	
	@Column(name = "shippingHold", length = 50)
	private String shippingHold;
	
	@Column(name = "productionHold", length = 5)
	private String productionHold;
	
	@Column(name = "splitShipset", length = 5)
	private String splitShipset;
	
	@Column(name = "agreement", length = 50)
	private String agreement;
	
	@Column(name = "modelSerialNumber", length = 50)
	private String modelSerialNumber;
	
	@Column(name = "waiveMOQ", length = 5)
	private String waiveMOQ;
	
	@Column(name = "targetSystem", length = 50)
	private String targetSystem;
	
	@Column(name = "APOType", length = 5)
	private String APOType;
	
	@Column(name = "sentToOracleDate")
	Date sentToOracleDate;
	
	@Column(name = "status", length = 100,nullable=false)
	private String status;
	
	@Column(name="reviseOrderFlag",length=50)
	private String reviseOrderFlag;
	
	@Column(name="cooTranslationFlag",length=50)
	private String cooTranslationFlag;
	
	@Column(name="febricPercentageFlag",length=50)
	private String febricPercentageFlag;
	
	@Column(name = "duplicatePOFlag",length=50)
	private String duplicatePOFlag;
	
	@Column(name = "customerPOFlag",length=50)
	private String customerPOFlag;
	
	@Column(name = "bulkSampleValidationFlag",length=50)
	private String bulkSampleValidationFlag;
	
	@Column(name = "MOQValidationFlag",length=50)
	private String MOQValidationFlag;
	
	@Column(name = "ATOValidationFlag",length=50)
	private String ATOValidationFlag;
	
	@Column(name = "mandatoryVariableDataFieldFlag",length=50)
	private String mandatoryVariableDataFieldFlag;
	
	@Column(name = "HTLSizePageValidationFlag",length=50)
	private String HTLSizePageValidationFlag;
	
	@Column(name = "region", length = 100)
	private String region;
	
	@Column(name = "PONumber", length = 100)
	private String PONumber;
	
	@Column(name = "comment", length = 250)
	private String comment;
	
	@Column(name = "roundQty", length = 100)
	private String roundQty;
	
	@Column(name = "MOQDiffQty", length = 100)
	private String MOQDiffQty;
	
	@Column(name = "updateMOQ", length = 100)
	private String updateMOQ;
	
	@Column(name = "customerNumber", length = 100)
	private String customerNumber;
	
	@Column(name = "rushOrderCheck", length = 100)
	private String rushOrderCheck;
	
	@Column(name = "FOO", length = 100)
	private String FOO;
	
	@Column(name = "sample", length = 100)
	private String sample;
	
	@Column(name = "qtyUnit", length = 100)
	private String qtyUnit;
	
	@Column(name = "remark", length = 100)
	private String remark;
	
	@Column(name = "pageSize", length = 100)
	private String pageSize;
	
	@Column(name = "fabricCode", length = 100)
	private String fabricCode;
	
	@Column(name = "carrier", length = 100)
	private String carrier;
	
	@Column(name = "account", length = 100)
	private String account;
	
	@Column(name = "shipVia", length = 100)
	private String shipVia;
	
	@Column(name = "productLineType", length = 50)
	private String productLineType;
	
	@ManyToOne(cascade=CascadeType.ALL,fetch=FetchType.LAZY)
	@JoinColumn(name="orderQueueId",nullable=false)
	OrderQueue varOrderFileQueue;
	
	@LazyCollection(LazyCollectionOption.FALSE)
	@OneToMany(mappedBy="varOrderLine",cascade=CascadeType.ALL,fetch=FetchType.LAZY)
	List<OrderLineDetail> listOrderlineDetails=new ArrayList<OrderLineDetail>();
//	@LazyCollection(LazyCollectionOption.FALSE)
//	@OneToMany(mappedBy="varOrderLine",cascade=CascadeType.ALL,fetch=FetchType.LAZY)
//	List<SalesOrder> listSalesOrderLine=new ArrayList<SalesOrder>();
	/*Not in use currently*/
	@Column(name = "averyMOQ", length = 50)
	private String averyMOQ;
	
	@Column(name = "averyRoundupQty", length = 50)
	private String averyRoundupQty;
	
	@Column(name = "averyATO", length = 50)
	private String averyATO;
	
	@Column(name = "averyRegion", length = 50)
	private String averyRegion;
	
	@Column(name = "averyProductLineType", length = 50)
	private String averyProductLineType;
	
	@Column(name = "averyBulk", length = 50)
	private String averyBulk;
	
	//transient variables added for getting colorCode and iconName
	@Transient
	private String iconName;
	
	@Transient
	private String colorCode;
	
	@Transient
	private String codeValue;
	
	public String getAveryBulk() {
		return averyBulk;
	}

	public void setAveryBulk(String averyBulk) {
		this.averyBulk = averyBulk;
	}

	public String getAdditionalFileId() {
		return additionalFileId;
	}

	public void setAdditionalFileId(String additionalFileId) {
		this.additionalFileId = additionalFileId;
	}
	
	public String getIconName() {
		return iconName;
	}

	public void setIconName(String iconName) {
		this.iconName = iconName;
	}

	public String getColorCode() {
		return colorCode;
	}

	public void setColorCode(String colorCode) {
		this.colorCode = colorCode;
	}
	
	public String getCodeValue() {
		return codeValue;
	}

	public void setCodeValue(String codeValue) {
		this.codeValue = codeValue;
	}

	
	
	public String getAveryMOQ() {
		return averyMOQ;
	}

	public void setAveryMOQ(String averyMOQ) {
		this.averyMOQ = averyMOQ;
	}

	public String getAveryRoundupQty() {
		return averyRoundupQty;
	}

	public void setAveryRoundupQty(String averyRoundupQty) {
		this.averyRoundupQty = averyRoundupQty;
	}

	public String getAveryATO() {
		return averyATO;
	}

	public void setAveryATO(String averyATO) {
		this.averyATO = averyATO;
	}

	public String getAveryRegion() {
		return averyRegion;
	}

	public void setAveryRegion(String averyRegion) {
		this.averyRegion = averyRegion;
	}

	public String getAveryProductLineType() {
		return averyProductLineType;
	}

	public void setAveryProductLineType(String averyProductLineType) {
		this.averyProductLineType = averyProductLineType;
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

	public boolean isBulk() {
		return bulk;
	}

	public void setBulk(boolean bulk) {
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

	public String getSoldToRBONumber() {
		return soldToRBONumber;
	}

	public void setSoldToRBONumber(String soldToRBONumber) {
		this.soldToRBONumber = soldToRBONumber;
	}

	public String getOracleBillToSiteNumber() {
		return oracleBillToSiteNumber;
	}

	public void setOracleBillToSiteNumber(String oracleBillToSiteNumber) {
		this.oracleBillToSiteNumber = oracleBillToSiteNumber;
	}

	public String getOracleShipToSiteNumber() {
		return oracleShipToSiteNumber;
	}

	public void setOracleShipToSiteNumber(String oracleShipToSiteNumber) {
		this.oracleShipToSiteNumber = oracleShipToSiteNumber;
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

	public String getDivisionForInterfaceERPORG() {
		return divisionForInterfaceERPORG;
	}

	public void setDivisionForInterfaceERPORG(String divisionForInterfaceERPORG) {
		this.divisionForInterfaceERPORG = divisionForInterfaceERPORG;
	}

	public String getArtWorkhold() {
		return artWorkhold;
	}

	public void setArtWorkhold(String artWorkhold) {
		this.artWorkhold = artWorkhold;
	}

	public String getArtworkAttachment() {
		return artworkAttachment;
	}

	public void setArtworkAttachment(String artworkAttachment) {
		this.artworkAttachment = artworkAttachment;
	}

	public String getVariableDataBreakdown() {
		return variableDataBreakdown;
	}

	public void setVariableDataBreakdown(String variableDataBreakdown) {
		this.variableDataBreakdown = variableDataBreakdown;
	}

	public String getManufacturingNotes() {
		return manufacturingNotes;
	}

	public void setManufacturingNotes(String manufacturingNotes) {
		this.manufacturingNotes = manufacturingNotes;
	}

	public String getOrderType() {
		return orderType;
	}

	public void setOrderType(String orderType) {
		this.orderType = orderType;
	}

	public String getOrderBy() {
		return orderBy;
	}

	public void setOrderBy(String orderBy) {
		this.orderBy = orderBy;
	}

	public String getEndCustomer() {
		return endCustomer;
	}

	public void setEndCustomer(String endCustomer) {
		this.endCustomer = endCustomer;
	}

	public String getShippingOnlyNotes() {
		return shippingOnlyNotes;
	}

	public void setShippingOnlyNotes(String shippingOnlyNotes) {
		this.shippingOnlyNotes = shippingOnlyNotes;
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

	public String getShippingHold() {
		return shippingHold;
	}

	public void setShippingHold(String shippingHold) {
		this.shippingHold = shippingHold;
	}

	public String getProductionHold() {
		return productionHold;
	}

	public void setProductionHold(String productionHold) {
		this.productionHold = productionHold;
	}

	public String getSplitShipset() {
		return splitShipset;
	}

	public void setSplitShipset(String splitShipset) {
		this.splitShipset = splitShipset;
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

	public String getTargetSystem() {
		return targetSystem;
	}

	public void setTargetSystem(String targetSystem) {
		this.targetSystem = targetSystem;
	}

	public String getAPOType() {
		return APOType;
	}

	public void setAPOType(String aPOType) {
		APOType = aPOType;
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

	public String getReviseOrderFlag() {
		return reviseOrderFlag;
	}

	public void setReviseOrderFlag(String reviseOrderFlag) {
		this.reviseOrderFlag = reviseOrderFlag;
	}

	public String getCooTranslationFlag() {
		return cooTranslationFlag;
	}

	public void setCooTranslationFlag(String cooTranslationFlag) {
		this.cooTranslationFlag = cooTranslationFlag;
	}

	public String getFebricPercentageFlag() {
		return febricPercentageFlag;
	}

	public void setFebricPercentageFlag(String febricPercentageFlag) {
		this.febricPercentageFlag = febricPercentageFlag;
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

	public String getMOQValidationFlag() {
		return MOQValidationFlag;
	}

	public void setMOQValidationFlag(String mOQValidationFlag) {
		MOQValidationFlag = mOQValidationFlag;
	}

	public String getATOValidationFlag() {
		return ATOValidationFlag;
	}

	public void setATOValidationFlag(String aTOValidationFlag) {
		ATOValidationFlag = aTOValidationFlag;
	}

	public String getMandatoryVariableDataFieldFlag() {
		return mandatoryVariableDataFieldFlag;
	}

	public void setMandatoryVariableDataFieldFlag(String mandatoryVariableDataFieldFlag) {
		this.mandatoryVariableDataFieldFlag = mandatoryVariableDataFieldFlag;
	}

	public String getHTLSizePageValidationFlag() {
		return HTLSizePageValidationFlag;
	}

	public void setHTLSizePageValidationFlag(String hTLSizePageValidationFlag) {
		HTLSizePageValidationFlag = hTLSizePageValidationFlag;
	}

	public String getRegion() {
		return region;
	}

	public void setRegion(String region) {
		this.region = region;
	}

	public String getPONumber() {
		return PONumber;
	}

	public void setPONumber(String pONumber) {
		PONumber = pONumber;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public String getRoundQty() {
		return roundQty;
	}

	public void setRoundQty(String roundQty) {
		this.roundQty = roundQty;
	}

	public String getMOQDiffQty() {
		return MOQDiffQty;
	}

	public void setMOQDiffQty(String mOQDiffQty) {
		MOQDiffQty = mOQDiffQty;
	}

	public String getUpdateMOQ() {
		return updateMOQ;
	}

	public void setUpdateMOQ(String updateMOQ) {
		this.updateMOQ = updateMOQ;
	}

	public String getCustomerNumber() {
		return customerNumber;
	}

	public void setCustomerNumber(String customerNumber) {
		this.customerNumber = customerNumber;
	}

	public String getRushOrderCheck() {
		return rushOrderCheck;
	}

	public void setRushOrderCheck(String rushOrderCheck) {
		this.rushOrderCheck = rushOrderCheck;
	}

	public String getFOO() {
		return FOO;
	}

	public void setFOO(String fOO) {
		FOO = fOO;
	}

	public String getSample() {
		return sample;
	}

	public void setSample(String sample) {
		this.sample = sample;
	}

	public String getQtyUnit() {
		return qtyUnit;
	}

	public void setQtyUnit(String qtyUnit) {
		this.qtyUnit = qtyUnit;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getPageSize() {
		return pageSize;
	}

	public void setPageSize(String pageSize) {
		this.pageSize = pageSize;
	}

	public String getFabricCode() {
		return fabricCode;
	}

	public void setFabricCode(String fabricCode) {
		this.fabricCode = fabricCode;
	}

	public String getCarrier() {
		return carrier;
	}

	public void setCarrier(String carrier) {
		this.carrier = carrier;
	}

	public String getAccount() {
		return account;
	}

	public void setAccount(String account) {
		this.account = account;
	}

	public String getShipVia() {
		return shipVia;
	}

	public void setShipVia(String shipVia) {
		this.shipVia = shipVia;
	}

	public String getProductLineType() {
		return productLineType;
	}

	public void setProductLineType(String productLineType) {
		this.productLineType = productLineType;
	}

	public OrderQueue getVarOrderFileQueue() {
		return varOrderFileQueue;
	}

	public void setVarOrderFileQueue(OrderQueue varOrderFileQueue) {
		this.varOrderFileQueue = varOrderFileQueue;
	}

	public List<OrderLineDetail> getListOrderlineDetails() {
		return listOrderlineDetails;
	}

	public void setListOrderlineDetails(List<OrderLineDetail> listOrderlineDetails) {
		this.listOrderlineDetails = listOrderlineDetails;
	}
//
//	public List<SalesOrder> getListSalesOrderLine() {
//		return listSalesOrderLine;
//	}
//
//	public void setListSalesOrderLine(List<SalesOrder> listSalesOrderLine) {
//		this.listSalesOrderLine = listSalesOrderLine;
//	}

	@Override
	public Response getEntities(UriInfo ui, HttpHeaders hh) {
		Response.ResponseBuilder rb = null;
		List<OrderLine> orderLine = null;
		try {
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			mapper.addMixIn(OrderLine.class, OrderLineMixIn.class);
			mapper.addMixIn(OrderLineDetail.class, OrderLineMixIn.class);
			mapper.addMixIn(MainAbstractEntity.class, OrderLineMixIn.class);//added mixIn
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
			mapper.addMixIn(OrderLine.class, OrderLineMixIn.class);
			mapper.addMixIn(OrderLineDetail.class, OrderLineMixIn.class);
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
			mapper.addMixIn(OrderLine.class, OrderLineMixIn.class);
			mapper.addMixIn(OrderLineDetail.class, OrderLineMixIn.class);
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
		Map<String,Object> orderLineMap=new HashMap<String,Object>();
		int salesOrderCount=0;
		try{
			Long entityId = Long.parseLong(orderId);
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			mapper.addMixIn(OrderLine.class, OrderLineMixIn.class);
			mapper.addMixIn(OrderLineDetail.class, OrderLineMixIn.class);
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
			OrderLineService orderLineService = (OrderLineService) SpringConfig
					.getInstance().getBean("orderLineService");
			orderLine = orderLineService.readAllByOrderID(entityId);
			if (orderLine == null)
				throw new Exception("Unable to find Order Line");
			/*SalesOrderService salesOrderService = (SalesOrderService) SpringConfig
						.getInstance().getBean("salesOrderService");
			salesOrderCount=salesOrderService.getCountByOrderID(entityId);
			orderLineMap.put("salesOrderCount", salesOrderCount);
			*/
			orderLineMap.put("orderLine", orderLine);
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
		Response.ResponseBuilder rb = null;
		try {
			ObjectMapper mapper = new ObjectMapper();
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
			Map entitiesMap = new HashMap();
			StringWriter writer = new StringWriter();
			entitiesMap.put("success", true);
			mapper.writeValue(writer, entitiesMap);
			rb = Response.ok(writer.toString());
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
		return rb.build();
	}


}
