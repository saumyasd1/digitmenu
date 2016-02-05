package com.avery.storage.entities;

import java.io.StringWriter;
import java.util.List;
import java.util.Map;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.ws.rs.Path;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.UriInfo;

import org.apache.commons.lang.exception.ExceptionUtils;

import com.avery.app.config.SpringConfig;
import com.avery.logging.AppLogger;
import com.avery.storage.MainAbstractEntity;
import com.avery.storage.service.OrderLineArchiveService;
import com.avery.utils.ApplicationUtils;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;
import com.fasterxml.jackson.databind.SerializationFeature;

@Entity
@Table(name = "AR_OrderLine")
@Path("ar_orderline")
public class OrderLineArchive extends MainAbstractEntity {

	private static final long serialVersionUID = -8487156716364715527L;

	@Column(name = "OrderLineID")
	private int orderlineid;

	@Column(name = "OrderFileAttchmentID")
	private int orderfileattchmentid;

	@Column(name = "OrderQueueID")
	private int orderqueueid;

	@Column(name = "PartnerID",length=50)
	private String partnerid;

	@Column(name = "RBOID",length=50)
	private String rboid;

	@Column(name = "ProductLineType",length=50)
	private String productlinetype;

	@Column(name = "CustomerPONumber",length=50)
	private String customerponumber;

	@Column(name = "OrderedDate")
	private String ordereddate;

	@Column(name = "PartnerCustomerName",length=250)
	private String partnercustomername;

	@Column(name = "Bulk")
	private Boolean isbulk;

	@Column(name = "PartnerVendorName",length=250)
	private String partnervendorname;

	@Column(name = "ShipToCustomer",length=250)
	private String shiptocustomer;

	@Column(name = "ShipToContact",length=250)
	private String shiptocontact;

	@Column(name = "ShipToAddress1",length=250)
	private String shiptoaddress1;

	@Column(name = "ShipToAddress2",length=250)
	private String shiptoaddress2;

	@Column(name = "ShipToAddress3",length=250)
	private String shiptoaddress3;

	@Column(name = "ShipToCity",length=100)
	private String shiptocity;

	@Column(name = "ShipToState",length=100)
	private String shiptostate;

	@Column(name = "ShipToZip",length=50)
	private String shiptozip;

	@Column(name = "ShipToCountry",length=100)
	private String shiptocountry;

	@Column(name = "ShipToTelephone",length=50)
	private String shiptotelephone;

	@Column(name = "ShipToFax",length=100)
	private String shiptofax;

	@Column(name = "ShipToEmail",length=100)
	private String shiptoemail;

	@Column(name = "BillToCustomer",length=250)
	private String billtocustomer;

	@Column(name = "BillToContact",length=250)
	private String billtocontact;

	@Column(name = "BillToAddress1",length=250)
	private String billtoaddress1;

	@Column(name = "BillToAddress2",length=250)
	private String billtoaddress2;

	@Column(name = "BillToAddress3",length=250)
	private String billtoaddress3;

	@Column(name = "BillToCity",length=100)
	private String billtocity;

	@Column(name = "BillToState",length=100)
	private String billtostate;

	@Column(name = "BillToZip",length=50)
	private String billtozip;

	@Column(name = "BillToCountry",length=100)
	private String billtocountry;

	@Column(name = "BillToTelephone",length=50)
	private String billtotelephone;

	@Column(name = "BillToFax",length=100)
	private String billtofax;

	@Column(name = "BillToEmail",length=100)
	private String billtoemail;

	@Column(name = "RequestedDevliveryDate")
	private String requesteddevliverydate;

	@Column(name = "ShippingMethod",length=100)
	private String shippingmethod;

	@Column(name = "SpecialInstruction",columnDefinition = "varchar(500)")
	private String specialinstruction;

	@Column(name = "OrderReceivedDate")
	private String orderreceiveddate;

	@Column(name = "SOLDTORBONumber",length=50)
	private String soldtorbonumber;

	@Column(name = "OracleBilltoSiteNumber",length=50)
	private String oraclebilltositenumber;

	@Column(name = "OracleShiptoSiteNumber",length=50)
	private String oracleshiptositenumber;

	@Column(name = "RetailerPO_CustomerJob",length=100)
	private String retailerpo_customerjob;

	@Column(name = "AveryItemNumber",length=50)
	private String averyitemnumber;

	@Column(name = "OracleItemNumber",length=50)
	private String oracleitemnumber;

	@Column(name = "CustomerItemNumber",length=50)
	private String customeritemnumber;

	@Column(name = "ItemDescription",length=200)
	private String itemdescription;

	@Column(name = "CustomerColorCode",length=50)
	private String customercolorcode;

	@Column(name = "CustomerColorDescription",length=200)
	private String customercolordescription;

	@Column(name = "CustomerSize",length=50)
	private String customersize;

	@Column(name = "CustomerUnitPrice",length=50)
	private String customerunitprice;

	@Column(name = "CustomerCost",length=50)
	private String customercost;

	@Column(name = "ContractNumber",length=50)
	private String contractnumber;

	@Column(name = "StyleNo",length=50)
	private String styleno;

	@Column(name = "CustomerItemNumber1",length=50)
	private String customeritemnumber1;

	@Column(name = "CustomerItemNumber2",length=50)
	private String customeritemnumber2;

	@Column(name = "CustomerSeason",length=50)
	private String customerseason;

	@Column(name = "CustomerUOM",length=50)
	private String customeruom;

	@Column(name = "CustomerOrderedQty",length=50)
	private String customerorderedqty;

	@Column(name = "CalculatedOrderdedQty",length=10)
	private String calculatedorderdedqty;

	@Column(name = "OrderDate")
	private String orderdate;

	@Column(name = "CustomerRequestDate")
	private String customerrequestdate;

	@Column(name = "PromiseDate")
	private String promisedate;

	@Column(name = "FreightTerms",length=50)
	private String freightterms;

	@Column(name = "CSR",length=50)
	private String csr;

	@Column(name = "PackingInstruction",columnDefinition = "varchar(500)")
	private String packinginstruction;

	@Column(name = "ShippingInstructions",columnDefinition = "varchar(500)")
	private String shippinginstructions;

	@Column(name = "InvoicelineInstruction",columnDefinition = "varchar(500)")
	private String invoicelineinstruction;

	@Column(name = "DivisionforInterfaceERPORG",length=10)
	private String divisionforinterfaceerporg;

	@Column(name = "Artworkhold",length=5)
	private String artworkhold;

	@Column(name = "Artworkworkattachment",length=5)
	private String artworkworkattachment;

	@Column(name = "VariableDataBreakdown",columnDefinition = "varchar(500)")
	private String variabledatabreakdown;

	@Column(name = "Manufacturingnotes",columnDefinition = "varchar(500)")
	private String manufacturingnotes;

	@Column(name = "Ordertype",length=50)
	private String ordertype;

	@Column(name = "Orderby",length=50)
	private String orderby;

	@Column(name = "Endcustomer",length=50)
	private String endcustomer;

	@Column(name = "Shippingonlynotes",columnDefinition = "varchar(500)")
	private String shippingonlynotes;

	@Column(name = "BankCharge",length=10)
	private String bankcharge;

	@Column(name = "FreightCharge",length=10)
	private String freightcharge;

	@Column(name = "Shippinghold",length=5)
	private String shippinghold;

	@Column(name = "Productionhold",length=5)
	private String productionhold;

	@Column(name = "Splitshipset",length=5)
	private String splitshipset;

	@Column(name = "Agreement",length=50)
	private String agreement;

	@Column(name = "ModelSerialNumber",length=50)
	private String modelserialnumber;

	@Column(name = "WaiveMOQ",length=5)
	private String waivemoq;

	@Column(name = "APOType",length=5)
	private String apotype;

	@Column(name = "SentToOracleDate")
	private String senttooracledate;

	@Column(name = "Status",length=50)
	private String status;

	@Column(name = "DuplicatePOFlag",length=250)
	private String duplicatepoflag;

	@Column(name = "CustomerPOFlag",length=250)
	private String customerpoflag;

	@Column(name = "BulkSampleValidationFlag",length=250)
	private String bulksamplevalidationflag;

	@Column(name = "MOQValidationFlag",length=250)
	private String moqvalidationflag;

	@Column(name = "ATOValidationFlag",length=250)
	private String atovalidationflag;

	@Column(name = "MandatoryVariableDataFieldFlag",length=250)
	private String mandatoryvariabledatafieldflag;

	@Column(name = "HTLSizePageValidationFlag",length=250)
	private String htlsizepagevalidationflag;



	/**
	 * @return the orderlineid
	 */
	public int getOrderlineid() {
		return orderlineid;
	}

	/**
	 * @param orderlineid
	 *            the orderlineid to set
	 */
	public void setOrderlineid(int orderlineid) {
		this.orderlineid = orderlineid;
	}

	/**
	 * @return the orderfileattchmentid
	 */
	public int getOrderfileattchmentid() {
		return orderfileattchmentid;
	}

	/**
	 * @param orderfileattchmentid
	 *            the orderfileattchmentid to set
	 */
	public void setOrderfileattchmentid(int orderfileattchmentid) {
		this.orderfileattchmentid = orderfileattchmentid;
	}

	/**
	 * @return the orderqueueid
	 */
	public int getOrderqueueid() {
		return orderqueueid;
	}

	/**
	 * @param orderqueueid
	 *            the orderqueueid to set
	 */
	public void setOrderqueueid(int orderqueueid) {
		this.orderqueueid = orderqueueid;
	}

	/**
	 * @return the partnerid
	 */
	public String getPartnerid() {
		return partnerid;
	}

	/**
	 * @param partnerid
	 *            the partnerid to set
	 */
	public void setPartnerid(String partnerid) {
		this.partnerid = partnerid;
	}

	/**
	 * @return the rboid
	 */
	public String getRboid() {
		return rboid;
	}

	/**
	 * @param rboid
	 *            the rboid to set
	 */
	public void setRboid(String rboid) {
		this.rboid = rboid;
	}

	/**
	 * @return the productlinetype
	 */
	public String getProductlinetype() {
		return productlinetype;
	}

	/**
	 * @param productlinetype
	 *            the productlinetype to set
	 */
	public void setProductlinetype(String productlinetype) {
		this.productlinetype = productlinetype;
	}

	/**
	 * @return the customerponumber
	 */
	public String getCustomerponumber() {
		return customerponumber;
	}

	/**
	 * @param customerponumber
	 *            the customerponumber to set
	 */
	public void setCustomerponumber(String customerponumber) {
		this.customerponumber = customerponumber;
	}

	/**
	 * @return the ordereddate
	 */
	public String getOrdereddate() {
		return ordereddate;
	}

	/**
	 * @param ordereddate
	 *            the ordereddate to set
	 */
	public void setOrdereddate(String ordereddate) {
		this.ordereddate = ordereddate;
	}

	/**
	 * @return the partnercustomername
	 */
	public String getPartnercustomername() {
		return partnercustomername;
	}

	/**
	 * @param partnercustomername
	 *            the partnercustomername to set
	 */
	public void setPartnercustomername(String partnercustomername) {
		this.partnercustomername = partnercustomername;
	}

	/**
	 * @return the isbulk
	 */
	public Boolean getIsbulk() {
		return isbulk;
	}

	/**
	 * @param isbulk
	 *            the isbulk to set
	 */
	public void setIsbulk(Boolean isbulk) {
		this.isbulk = isbulk;
	}

	/**
	 * @return the partnervendorname
	 */
	public String getPartnervendorname() {
		return partnervendorname;
	}

	/**
	 * @param partnervendorname
	 *            the partnervendorname to set
	 */
	public void setPartnervendorname(String partnervendorname) {
		this.partnervendorname = partnervendorname;
	}

	/**
	 * @return the shiptocustomer
	 */
	public String getShiptocustomer() {
		return shiptocustomer;
	}

	/**
	 * @param shiptocustomer
	 *            the shiptocustomer to set
	 */
	public void setShiptocustomer(String shiptocustomer) {
		this.shiptocustomer = shiptocustomer;
	}

	/**
	 * @return the shiptocontact
	 */
	public String getShiptocontact() {
		return shiptocontact;
	}

	/**
	 * @param shiptocontact
	 *            the shiptocontact to set
	 */
	public void setShiptocontact(String shiptocontact) {
		this.shiptocontact = shiptocontact;
	}

	/**
	 * @return the shiptoaddress1
	 */
	public String getShiptoaddress1() {
		return shiptoaddress1;
	}

	/**
	 * @param shiptoaddress1
	 *            the shiptoaddress1 to set
	 */
	public void setShiptoaddress1(String shiptoaddress1) {
		this.shiptoaddress1 = shiptoaddress1;
	}

	/**
	 * @return the shiptoaddress2
	 */
	public String getShiptoaddress2() {
		return shiptoaddress2;
	}

	/**
	 * @param shiptoaddress2
	 *            the shiptoaddress2 to set
	 */
	public void setShiptoaddress2(String shiptoaddress2) {
		this.shiptoaddress2 = shiptoaddress2;
	}

	/**
	 * @return the shiptoaddress3
	 */
	public String getShiptoaddress3() {
		return shiptoaddress3;
	}

	/**
	 * @param shiptoaddress3
	 *            the shiptoaddress3 to set
	 */
	public void setShiptoaddress3(String shiptoaddress3) {
		this.shiptoaddress3 = shiptoaddress3;
	}

	/**
	 * @return the shiptocity
	 */
	public String getShiptocity() {
		return shiptocity;
	}

	/**
	 * @param shiptocity
	 *            the shiptocity to set
	 */
	public void setShiptocity(String shiptocity) {
		this.shiptocity = shiptocity;
	}

	/**
	 * @return the shiptostate
	 */
	public String getShiptostate() {
		return shiptostate;
	}

	/**
	 * @param shiptostate
	 *            the shiptostate to set
	 */
	public void setShiptostate(String shiptostate) {
		this.shiptostate = shiptostate;
	}

	/**
	 * @return the shiptozip
	 */
	public String getShiptozip() {
		return shiptozip;
	}

	/**
	 * @param shiptozip
	 *            the shiptozip to set
	 */
	public void setShiptozip(String shiptozip) {
		this.shiptozip = shiptozip;
	}

	/**
	 * @return the shiptocountry
	 */
	public String getShiptocountry() {
		return shiptocountry;
	}

	/**
	 * @param shiptocountry
	 *            the shiptocountry to set
	 */
	public void setShiptocountry(String shiptocountry) {
		this.shiptocountry = shiptocountry;
	}

	/**
	 * @return the shiptotelephone
	 */
	public String getShiptotelephone() {
		return shiptotelephone;
	}

	/**
	 * @param shiptotelephone
	 *            the shiptotelephone to set
	 */
	public void setShiptotelephone(String shiptotelephone) {
		this.shiptotelephone = shiptotelephone;
	}

	/**
	 * @return the shiptofax
	 */
	public String getShiptofax() {
		return shiptofax;
	}

	/**
	 * @param shiptofax
	 *            the shiptofax to set
	 */
	public void setShiptofax(String shiptofax) {
		this.shiptofax = shiptofax;
	}

	/**
	 * @return the shiptoemail
	 */
	public String getShiptoemail() {
		return shiptoemail;
	}

	/**
	 * @param shiptoemail
	 *            the shiptoemail to set
	 */
	public void setShiptoemail(String shiptoemail) {
		this.shiptoemail = shiptoemail;
	}

	/**
	 * @return the billtocustomer
	 */
	public String getBilltocustomer() {
		return billtocustomer;
	}

	/**
	 * @param billtocustomer
	 *            the billtocustomer to set
	 */
	public void setBilltocustomer(String billtocustomer) {
		this.billtocustomer = billtocustomer;
	}

	/**
	 * @return the billtocontact
	 */
	public String getBilltocontact() {
		return billtocontact;
	}

	/**
	 * @param billtocontact
	 *            the billtocontact to set
	 */
	public void setBilltocontact(String billtocontact) {
		this.billtocontact = billtocontact;
	}

	/**
	 * @return the billtoaddress1
	 */
	public String getBilltoaddress1() {
		return billtoaddress1;
	}

	/**
	 * @param billtoaddress1
	 *            the billtoaddress1 to set
	 */
	public void setBilltoaddress1(String billtoaddress1) {
		this.billtoaddress1 = billtoaddress1;
	}

	/**
	 * @return the billtoaddress2
	 */
	public String getBilltoaddress2() {
		return billtoaddress2;
	}

	/**
	 * @param billtoaddress2
	 *            the billtoaddress2 to set
	 */
	public void setBilltoaddress2(String billtoaddress2) {
		this.billtoaddress2 = billtoaddress2;
	}

	/**
	 * @return the billtoaddress3
	 */
	public String getBilltoaddress3() {
		return billtoaddress3;
	}

	/**
	 * @param billtoaddress3
	 *            the billtoaddress3 to set
	 */
	public void setBilltoaddress3(String billtoaddress3) {
		this.billtoaddress3 = billtoaddress3;
	}

	/**
	 * @return the billtocity
	 */
	public String getBilltocity() {
		return billtocity;
	}

	/**
	 * @param billtocity
	 *            the billtocity to set
	 */
	public void setBilltocity(String billtocity) {
		this.billtocity = billtocity;
	}

	/**
	 * @return the billtostate
	 */
	public String getBilltostate() {
		return billtostate;
	}

	/**
	 * @param billtostate
	 *            the billtostate to set
	 */
	public void setBilltostate(String billtostate) {
		this.billtostate = billtostate;
	}

	/**
	 * @return the billtozip
	 */
	public String getBilltozip() {
		return billtozip;
	}

	/**
	 * @param billtozip
	 *            the billtozip to set
	 */
	public void setBilltozip(String billtozip) {
		this.billtozip = billtozip;
	}

	/**
	 * @return the billtocountry
	 */
	public String getBilltocountry() {
		return billtocountry;
	}

	/**
	 * @param billtocountry
	 *            the billtocountry to set
	 */
	public void setBilltocountry(String billtocountry) {
		this.billtocountry = billtocountry;
	}

	/**
	 * @return the billtotelephone
	 */
	public String getBilltotelephone() {
		return billtotelephone;
	}

	/**
	 * @param billtotelephone
	 *            the billtotelephone to set
	 */
	public void setBilltotelephone(String billtotelephone) {
		this.billtotelephone = billtotelephone;
	}

	/**
	 * @return the billtofax
	 */
	public String getBilltofax() {
		return billtofax;
	}

	/**
	 * @param billtofax
	 *            the billtofax to set
	 */
	public void setBilltofax(String billtofax) {
		this.billtofax = billtofax;
	}

	/**
	 * @return the billtoemail
	 */
	public String getBilltoemail() {
		return billtoemail;
	}

	/**
	 * @param billtoemail
	 *            the billtoemail to set
	 */
	public void setBilltoemail(String billtoemail) {
		this.billtoemail = billtoemail;
	}

	/**
	 * @return the requesteddevliverydate
	 */
	public String getRequesteddevliverydate() {
		return requesteddevliverydate;
	}

	/**
	 * @param requesteddevliverydate
	 *            the requesteddevliverydate to set
	 */
	public void setRequesteddevliverydate(String requesteddevliverydate) {
		this.requesteddevliverydate = requesteddevliverydate;
	}

	/**
	 * @return the shippingmethod
	 */
	public String getShippingmethod() {
		return shippingmethod;
	}

	/**
	 * @param shippingmethod
	 *            the shippingmethod to set
	 */
	public void setShippingmethod(String shippingmethod) {
		this.shippingmethod = shippingmethod;
	}

	/**
	 * @return the specialinstruction
	 */
	public String getSpecialinstruction() {
		return specialinstruction;
	}

	/**
	 * @param specialinstruction
	 *            the specialinstruction to set
	 */
	public void setSpecialinstruction(String specialinstruction) {
		this.specialinstruction = specialinstruction;
	}

	/**
	 * @return the orderreceiveddate
	 */
	public String getOrderreceiveddate() {
		return orderreceiveddate;
	}

	/**
	 * @param orderreceiveddate
	 *            the orderreceiveddate to set
	 */
	public void setOrderreceiveddate(String orderreceiveddate) {
		this.orderreceiveddate = orderreceiveddate;
	}

	/**
	 * @return the soldtorbonumber
	 */
	public String getSoldtorbonumber() {
		return soldtorbonumber;
	}

	/**
	 * @param soldtorbonumber
	 *            the soldtorbonumber to set
	 */
	public void setSoldtorbonumber(String soldtorbonumber) {
		this.soldtorbonumber = soldtorbonumber;
	}

	/**
	 * @return the oraclebilltositenumber
	 */
	public String getOraclebilltositenumber() {
		return oraclebilltositenumber;
	}

	/**
	 * @param oraclebilltositenumber
	 *            the oraclebilltositenumber to set
	 */
	public void setOraclebilltositenumber(String oraclebilltositenumber) {
		this.oraclebilltositenumber = oraclebilltositenumber;
	}

	/**
	 * @return the oracleshiptositenumber
	 */
	public String getOracleshiptositenumber() {
		return oracleshiptositenumber;
	}

	/**
	 * @param oracleshiptositenumber
	 *            the oracleshiptositenumber to set
	 */
	public void setOracleshiptositenumber(String oracleshiptositenumber) {
		this.oracleshiptositenumber = oracleshiptositenumber;
	}

	/**
	 * @return the retailerpo_customerjob
	 */
	public String getRetailerpo_customerjob() {
		return retailerpo_customerjob;
	}

	/**
	 * @param retailerpo_customerjob
	 *            the retailerpo_customerjob to set
	 */
	public void setRetailerpo_customerjob(String retailerpo_customerjob) {
		this.retailerpo_customerjob = retailerpo_customerjob;
	}

	/**
	 * @return the averyitemnumber
	 */
	public String getAveryitemnumber() {
		return averyitemnumber;
	}

	/**
	 * @param averyitemnumber
	 *            the averyitemnumber to set
	 */
	public void setAveryitemnumber(String averyitemnumber) {
		this.averyitemnumber = averyitemnumber;
	}

	/**
	 * @return the oracleitemnumber
	 */
	public String getOracleitemnumber() {
		return oracleitemnumber;
	}

	/**
	 * @param oracleitemnumber
	 *            the oracleitemnumber to set
	 */
	public void setOracleitemnumber(String oracleitemnumber) {
		this.oracleitemnumber = oracleitemnumber;
	}

	/**
	 * @return the customeritemnumber
	 */
	public String getCustomeritemnumber() {
		return customeritemnumber;
	}

	/**
	 * @param customeritemnumber
	 *            the customeritemnumber to set
	 */
	public void setCustomeritemnumber(String customeritemnumber) {
		this.customeritemnumber = customeritemnumber;
	}

	/**
	 * @return the itemdescription
	 */
	public String getItemdescription() {
		return itemdescription;
	}

	/**
	 * @param itemdescription
	 *            the itemdescription to set
	 */
	public void setItemdescription(String itemdescription) {
		this.itemdescription = itemdescription;
	}

	/**
	 * @return the customercolorcode
	 */
	public String getCustomercolorcode() {
		return customercolorcode;
	}

	/**
	 * @param customercolorcode
	 *            the customercolorcode to set
	 */
	public void setCustomercolorcode(String customercolorcode) {
		this.customercolorcode = customercolorcode;
	}

	/**
	 * @return the customercolordescription
	 */
	public String getCustomercolordescription() {
		return customercolordescription;
	}

	/**
	 * @param customercolordescription
	 *            the customercolordescription to set
	 */
	public void setCustomercolordescription(String customercolordescription) {
		this.customercolordescription = customercolordescription;
	}

	/**
	 * @return the customersize
	 */
	public String getCustomersize() {
		return customersize;
	}

	/**
	 * @param customersize
	 *            the customersize to set
	 */
	public void setCustomersize(String customersize) {
		this.customersize = customersize;
	}

	/**
	 * @return the customerunitprice
	 */
	public String getCustomerunitprice() {
		return customerunitprice;
	}

	/**
	 * @param customerunitprice
	 *            the customerunitprice to set
	 */
	public void setCustomerunitprice(String customerunitprice) {
		this.customerunitprice = customerunitprice;
	}

	/**
	 * @return the customercost
	 */
	public String getCustomercost() {
		return customercost;
	}

	/**
	 * @param customercost
	 *            the customercost to set
	 */
	public void setCustomercost(String customercost) {
		this.customercost = customercost;
	}

	/**
	 * @return the contractnumber
	 */
	public String getContractnumber() {
		return contractnumber;
	}

	/**
	 * @param contractnumber
	 *            the contractnumber to set
	 */
	public void setContractnumber(String contractnumber) {
		this.contractnumber = contractnumber;
	}

	/**
	 * @return the styleno
	 */
	public String getStyleno() {
		return styleno;
	}

	/**
	 * @param styleno
	 *            the styleno to set
	 */
	public void setStyleno(String styleno) {
		this.styleno = styleno;
	}

	/**
	 * @return the customeritemnumber1
	 */
	public String getCustomeritemnumber1() {
		return customeritemnumber1;
	}

	/**
	 * @param customeritemnumber1
	 *            the customeritemnumber1 to set
	 */
	public void setCustomeritemnumber1(String customeritemnumber1) {
		this.customeritemnumber1 = customeritemnumber1;
	}

	/**
	 * @return the customeritemnumber2
	 */
	public String getCustomeritemnumber2() {
		return customeritemnumber2;
	}

	/**
	 * @param customeritemnumber2
	 *            the customeritemnumber2 to set
	 */
	public void setCustomeritemnumber2(String customeritemnumber2) {
		this.customeritemnumber2 = customeritemnumber2;
	}

	/**
	 * @return the customerseason
	 */
	public String getCustomerseason() {
		return customerseason;
	}

	/**
	 * @param customerseason
	 *            the customerseason to set
	 */
	public void setCustomerseason(String customerseason) {
		this.customerseason = customerseason;
	}

	/**
	 * @return the customeruom
	 */
	public String getCustomeruom() {
		return customeruom;
	}

	/**
	 * @param customeruom
	 *            the customeruom to set
	 */
	public void setCustomeruom(String customeruom) {
		this.customeruom = customeruom;
	}

	/**
	 * @return the customerorderedqty
	 */
	public String getCustomerorderedqty() {
		return customerorderedqty;
	}

	/**
	 * @param customerorderedqty
	 *            the customerorderedqty to set
	 */
	public void setCustomerorderedqty(String customerorderedqty) {
		this.customerorderedqty = customerorderedqty;
	}

	/**
	 * @return the calculatedorderdedqty
	 */
	public String getCalculatedorderdedqty() {
		return calculatedorderdedqty;
	}

	/**
	 * @param calculatedorderdedqty
	 *            the calculatedorderdedqty to set
	 */
	public void setCalculatedorderdedqty(String calculatedorderdedqty) {
		this.calculatedorderdedqty = calculatedorderdedqty;
	}

	/**
	 * @return the orderdate
	 */
	public String getOrderdate() {
		return orderdate;
	}

	/**
	 * @param orderdate
	 *            the orderdate to set
	 */
	public void setOrderdate(String orderdate) {
		this.orderdate = orderdate;
	}

	/**
	 * @return the customerrequestdate
	 */
	public String getCustomerrequestdate() {
		return customerrequestdate;
	}

	/**
	 * @param customerrequestdate
	 *            the customerrequestdate to set
	 */
	public void setCustomerrequestdate(String customerrequestdate) {
		this.customerrequestdate = customerrequestdate;
	}

	/**
	 * @return the promisedate
	 */
	public String getPromisedate() {
		return promisedate;
	}

	/**
	 * @param promisedate
	 *            the promisedate to set
	 */
	public void setPromisedate(String promisedate) {
		this.promisedate = promisedate;
	}

	/**
	 * @return the freightterms
	 */
	public String getFreightterms() {
		return freightterms;
	}

	/**
	 * @param freightterms
	 *            the freightterms to set
	 */
	public void setFreightterms(String freightterms) {
		this.freightterms = freightterms;
	}

	/**
	 * @return the csr
	 */
	public String getCsr() {
		return csr;
	}

	/**
	 * @param csr
	 *            the csr to set
	 */
	public void setCsr(String csr) {
		this.csr = csr;
	}

	/**
	 * @return the packinginstruction
	 */
	public String getPackinginstruction() {
		return packinginstruction;
	}

	/**
	 * @param packinginstruction
	 *            the packinginstruction to set
	 */
	public void setPackinginstruction(String packinginstruction) {
		this.packinginstruction = packinginstruction;
	}

	/**
	 * @return the shippinginstructions
	 */
	public String getShippinginstructions() {
		return shippinginstructions;
	}

	/**
	 * @param shippinginstructions
	 *            the shippinginstructions to set
	 */
	public void setShippinginstructions(String shippinginstructions) {
		this.shippinginstructions = shippinginstructions;
	}

	/**
	 * @return the invoicelineinstruction
	 */
	public String getInvoicelineinstruction() {
		return invoicelineinstruction;
	}

	/**
	 * @param invoicelineinstruction
	 *            the invoicelineinstruction to set
	 */
	public void setInvoicelineinstruction(String invoicelineinstruction) {
		this.invoicelineinstruction = invoicelineinstruction;
	}

	/**
	 * @return the divisionforinterfaceerporg
	 */
	public String getDivisionforinterfaceerporg() {
		return divisionforinterfaceerporg;
	}

	/**
	 * @param divisionforinterfaceerporg
	 *            the divisionforinterfaceerporg to set
	 */
	public void setDivisionforinterfaceerporg(String divisionforinterfaceerporg) {
		this.divisionforinterfaceerporg = divisionforinterfaceerporg;
	}

	/**
	 * @return the artworkhold
	 */
	public String getArtworkhold() {
		return artworkhold;
	}

	/**
	 * @param artworkhold
	 *            the artworkhold to set
	 */
	public void setArtworkhold(String artworkhold) {
		this.artworkhold = artworkhold;
	}

	/**
	 * @return the artworkworkattachment
	 */
	public String getArtworkworkattachment() {
		return artworkworkattachment;
	}

	/**
	 * @param artworkworkattachment
	 *            the artworkworkattachment to set
	 */
	public void setArtworkworkattachment(String artworkworkattachment) {
		this.artworkworkattachment = artworkworkattachment;
	}

	/**
	 * @return the variabledatabreakdown
	 */
	public String getVariabledatabreakdown() {
		return variabledatabreakdown;
	}

	/**
	 * @param variabledatabreakdown
	 *            the variabledatabreakdown to set
	 */
	public void setVariabledatabreakdown(String variabledatabreakdown) {
		this.variabledatabreakdown = variabledatabreakdown;
	}

	/**
	 * @return the manufacturingnotes
	 */
	public String getManufacturingnotes() {
		return manufacturingnotes;
	}

	/**
	 * @param manufacturingnotes
	 *            the manufacturingnotes to set
	 */
	public void setManufacturingnotes(String manufacturingnotes) {
		this.manufacturingnotes = manufacturingnotes;
	}

	/**
	 * @return the ordertype
	 */
	public String getOrdertype() {
		return ordertype;
	}

	/**
	 * @param ordertype
	 *            the ordertype to set
	 */
	public void setOrdertype(String ordertype) {
		this.ordertype = ordertype;
	}

	/**
	 * @return the orderby
	 */
	public String getOrderby() {
		return orderby;
	}

	/**
	 * @param orderby
	 *            the orderby to set
	 */
	public void setOrderby(String orderby) {
		this.orderby = orderby;
	}

	/**
	 * @return the endcustomer
	 */
	public String getEndcustomer() {
		return endcustomer;
	}

	/**
	 * @param endcustomer
	 *            the endcustomer to set
	 */
	public void setEndcustomer(String endcustomer) {
		this.endcustomer = endcustomer;
	}

	/**
	 * @return the shippingonlynotes
	 */
	public String getShippingonlynotes() {
		return shippingonlynotes;
	}

	/**
	 * @param shippingonlynotes
	 *            the shippingonlynotes to set
	 */
	public void setShippingonlynotes(String shippingonlynotes) {
		this.shippingonlynotes = shippingonlynotes;
	}

	/**
	 * @return the bankcharge
	 */
	public String getBankcharge() {
		return bankcharge;
	}

	/**
	 * @param bankcharge
	 *            the bankcharge to set
	 */
	public void setBankcharge(String bankcharge) {
		this.bankcharge = bankcharge;
	}

	/**
	 * @return the freightcharge
	 */
	public String getFreightcharge() {
		return freightcharge;
	}

	/**
	 * @param freightcharge
	 *            the freightcharge to set
	 */
	public void setFreightcharge(String freightcharge) {
		this.freightcharge = freightcharge;
	}

	/**
	 * @return the shippinghold
	 */
	public String getShippinghold() {
		return shippinghold;
	}

	/**
	 * @param shippinghold
	 *            the shippinghold to set
	 */
	public void setShippinghold(String shippinghold) {
		this.shippinghold = shippinghold;
	}

	/**
	 * @return the productionhold
	 */
	public String getProductionhold() {
		return productionhold;
	}

	/**
	 * @param productionhold
	 *            the productionhold to set
	 */
	public void setProductionhold(String productionhold) {
		this.productionhold = productionhold;
	}

	/**
	 * @return the splitshipset
	 */
	public String getSplitshipset() {
		return splitshipset;
	}

	/**
	 * @param splitshipset
	 *            the splitshipset to set
	 */
	public void setSplitshipset(String splitshipset) {
		this.splitshipset = splitshipset;
	}

	/**
	 * @return the agreement
	 */
	public String getAgreement() {
		return agreement;
	}

	/**
	 * @param agreement
	 *            the agreement to set
	 */
	public void setAgreement(String agreement) {
		this.agreement = agreement;
	}

	/**
	 * @return the modelserialnumber
	 */
	public String getModelserialnumber() {
		return modelserialnumber;
	}

	/**
	 * @param modelserialnumber
	 *            the modelserialnumber to set
	 */
	public void setModelserialnumber(String modelserialnumber) {
		this.modelserialnumber = modelserialnumber;
	}

	/**
	 * @return the waivemoq
	 */
	public String getWaivemoq() {
		return waivemoq;
	}

	/**
	 * @param waivemoq
	 *            the waivemoq to set
	 */
	public void setWaivemoq(String waivemoq) {
		this.waivemoq = waivemoq;
	}

	/**
	 * @return the apotype
	 */
	public String getApotype() {
		return apotype;
	}

	/**
	 * @param apotype
	 *            the apotype to set
	 */
	public void setApotype(String apotype) {
		this.apotype = apotype;
	}

	/**
	 * @return the senttooracledate
	 */
	public String getSenttooracledate() {
		return senttooracledate;
	}

	/**
	 * @param senttooracledate
	 *            the senttooracledate to set
	 */
	public void setSenttooracledate(String senttooracledate) {
		this.senttooracledate = senttooracledate;
	}

	/**
	 * @return the status
	 */
	public String getStatus() {
		return status;
	}

	/**
	 * @param status
	 *            the status to set
	 */
	public void setStatus(String status) {
		this.status = status;
	}

	/**
	 * @return the duplicatepoflag
	 */
	public String getDuplicatepoflag() {
		return duplicatepoflag;
	}

	/**
	 * @param duplicatepoflag
	 *            the duplicatepoflag to set
	 */
	public void setDuplicatepoflag(String duplicatepoflag) {
		this.duplicatepoflag = duplicatepoflag;
	}

	/**
	 * @return the customerpoflag
	 */
	public String getCustomerpoflag() {
		return customerpoflag;
	}

	/**
	 * @param customerpoflag
	 *            the customerpoflag to set
	 */
	public void setCustomerpoflag(String customerpoflag) {
		this.customerpoflag = customerpoflag;
	}

	/**
	 * @return the bulksamplevalidationflag
	 */
	public String getBulksamplevalidationflag() {
		return bulksamplevalidationflag;
	}

	/**
	 * @param bulksamplevalidationflag
	 *            the bulksamplevalidationflag to set
	 */
	public void setBulksamplevalidationflag(String bulksamplevalidationflag) {
		this.bulksamplevalidationflag = bulksamplevalidationflag;
	}

	/**
	 * @return the moqvalidationflag
	 */
	public String getMoqvalidationflag() {
		return moqvalidationflag;
	}

	/**
	 * @param moqvalidationflag
	 *            the moqvalidationflag to set
	 */
	public void setMoqvalidationflag(String moqvalidationflag) {
		this.moqvalidationflag = moqvalidationflag;
	}

	/**
	 * @return the atovalidationflag
	 */
	public String getAtovalidationflag() {
		return atovalidationflag;
	}

	/**
	 * @param atovalidationflag
	 *            the atovalidationflag to set
	 */
	public void setAtovalidationflag(String atovalidationflag) {
		this.atovalidationflag = atovalidationflag;
	}

	/**
	 * @return the mandatoryvariabledatafieldflag
	 */
	public String getMandatoryvariabledatafieldflag() {
		return mandatoryvariabledatafieldflag;
	}

	/**
	 * @param mandatoryvariabledatafieldflag
	 *            the mandatoryvariabledatafieldflag to set
	 */
	public void setMandatoryvariabledatafieldflag(
			String mandatoryvariabledatafieldflag) {
		this.mandatoryvariabledatafieldflag = mandatoryvariabledatafieldflag;
	}

	/**
	 * @return the htlsizepagevalidationflag
	 */
	public String getHtlsizepagevalidationflag() {
		return htlsizepagevalidationflag;
	}

	/**
	 * @param htlsizepagevalidationflag
	 *            the htlsizepagevalidationflag to set
	 */
	public void setHtlsizepagevalidationflag(String htlsizepagevalidationflag) {
		this.htlsizepagevalidationflag = htlsizepagevalidationflag;
	}


	@SuppressWarnings("rawtypes")
	@Override
	public Response getEntities(UriInfo ui, HttpHeaders hh) {
		Response.ResponseBuilder rb = null;
		Map entitiesMap = null;
		try {
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			MultivaluedMap<String, String> queryParamMap = ui
					.getQueryParameters();
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
			OrderLineArchiveService orderLineArchiveService = (OrderLineArchiveService) SpringConfig
					.getInstance().getBean("orderLineArchiveService");
			entitiesMap = orderLineArchiveService
					.readWithCriteria(queryParamMap);
			if (entitiesMap == null || entitiesMap.isEmpty())
				throw new Exception("Unable to find archives");
			mapper.setDateFormat(ApplicationUtils.df);
			mapper.writeValue(writer, entitiesMap);
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
			OrderLineArchive archive = mapper.readValue(data,
					OrderLineArchive.class);
			OrderLineArchiveService orderLineArchiveService = (OrderLineArchiveService) SpringConfig
					.getInstance().getBean("orderLineArchiveService");

			id = orderLineArchiveService.create(archive);
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
			OrderLineArchiveService orderLineArchiveService = (OrderLineArchiveService) SpringConfig
					.getInstance().getBean("orderLineArchiveService");
			// read existing entity from database
			OrderLineArchive archive = orderLineArchiveService.read(Long.parseLong(id));
			if (archive == null) {
				throw new WebApplicationException(Response
						.status(Status.BAD_REQUEST)
						.entity("archive entity with id \"" + id
								+ "\" doesn't exist")
						.type(MediaType.TEXT_PLAIN_TYPE).build());
			}
			ObjectReader updater = mapper.readerForUpdating(archive);
			// build updated entity object from input data
			archive = updater.readValue(data);
			// update entity in database
			orderLineArchiveService.update(archive);
			// prepare response
			mapper.writeValue(writer, archive);
			rb = Response.ok(writer.toString());
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error in updating archive entity with id " + id, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error in updating archive entity with id " + id, e);
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
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, true);
			OrderLineArchiveService orderLineArchiveService = (OrderLineArchiveService) SpringConfig
					.getInstance().getBean("orderLineArchiveService");
			OrderLineArchive archive = orderLineArchiveService.read(entityId);
			if (archive == null)
				throw new WebApplicationException(Response
						.status(Status.BAD_REQUEST)
						.entity("Archive entity with id \"" + id
								+ "\" doesn't exist")
						.type(MediaType.TEXT_PLAIN_TYPE).build());
			mapper.writeValue(writer, archive);
			rb = Response.ok(writer.toString());
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error in fetching archive entity with id " + id, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error in fetching archive entity with id " + id, e);
			throw new WebApplicationException(Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e))
					.type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		return rb.build();

	}

}
