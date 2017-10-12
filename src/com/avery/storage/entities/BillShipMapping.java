package com.avery.storage.entities;

import java.io.StringWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.UriInfo;

import org.apache.commons.lang.exception.ExceptionUtils;

import com.avery.app.config.SpringConfig;
import com.avery.logging.AppLogger;
import com.avery.storage.MainAbstractEntity;
import com.avery.storage.MixIn.BillShipMappingMixIn;
import com.avery.storage.service.BillShipMappingService;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;
import com.fasterxml.jackson.databind.SerializationFeature;

/**
 * @author Vishal
 *
 */
@Entity
@Table(name = "billshipmapping")
@Path("billship")
public class BillShipMapping extends MainAbstractEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = -3299080944432147600L;

	public BillShipMapping() {

	}

	@Column(name = "addressEmailSubject", columnDefinition = "text")
	private String addressEmailSubject;

	@Column(name = "beginendwith", length = 50)
	private String beginendwith;

	@Column(name = "keywording", columnDefinition = "text")
	private String keywording;

	@Column(name = "orgCode", length = 50)
	private String orgCode;

	@Column(name = "billToCode", length = 100)
	private String billToCode;

	@Column(name = "shipToCode", length = 100)
	private String shipToCode;

	@Column(name = "shippingMethod", columnDefinition = "text")
	private String shippingMethod;

	@Column(name = "freightTerm", columnDefinition = "text")
	private String freightTerm;

	@Column(name = "packingInstruction", columnDefinition = "text")
	private String packingInstruction;

	@Column(name = "shippingInstruction", columnDefinition = "text")
	private String shippingInstruction;

	@Column(name = "endCustomer", length = 250)
	private String endCustomer;

	@Column(name = "manufacturingNote", columnDefinition = "text")
	private String manufacturingNote;

	@Column(name = "csr", length = 100)
	private String csr;

	@Column(name = "billToSite", length = 250)
	private String billToSite;

	@Column(name = "shipToSite", length = 250)
	private String shipToSite;

	@Column(name = "billToAddress", columnDefinition = "text")
	private String billToAddress;

	@Column(name = "shipToAddress", columnDefinition = "text")
	private String shipToAddress;

	@Column(name = "billToContact", columnDefinition = "text")
	private String billToContact;

	@Column(name = "shipToContact", columnDefinition = "text")
	private String shipToContact;

	@Column(name = "billToEmail", length = 250)
	private String billToEmail;

	@Column(name = "shipToEmail", length = 250)
	private String shipToEmail;

	@Column(name = "billToTelephone", length = 250)
	private String billToTelephone;

	@Column(name = "shipToTelephone", length = 250)
	private String shipToTelephone;

	@Column(name = "filePath", columnDefinition = "text")
	private String filePath;

	@Column(name = "fileName", columnDefinition = "text")
	private String fileName;
	
	@Column(name = "applyHold", length = 250)
	private String applyHold;

	@Column(name = "defaultId")
	private int defaultId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "productline_id")
	private ProductLine varProductLine;

	@Override
	public Response getEntities(UriInfo ui, HttpHeaders hh) {
		Response.ResponseBuilder rb = null;
		List<BillShipMapping> billShipMapping = null;
		Map<String, Object> responseMap = new HashMap<String, Object>();
		try {
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			mapper.addMixIn(BillShipMapping.class, BillShipMappingMixIn.class);
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
			BillShipMappingService billShipMappingService = (BillShipMappingService) SpringConfig.getInstance()
					.getBean("billShipMappingService");
			billShipMapping = billShipMappingService.readAll();
			if (billShipMapping == null)
				throw new Exception("Unable to find data list ");
			responseMap.put("success", "true");
			responseMap.put("data", billShipMapping);
			mapper.writeValue(writer, responseMap);
			rb = Response.ok(writer.toString());
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error("Error in fetching roles list ", ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error("Error in fetching roles list ", e);
			throw new WebApplicationException(Response.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e)).type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		return rb.build();
	}

	@Override
	public Response createEntity(UriInfo ui, HttpHeaders hh, String data) {
		Long id;
		try {
			ObjectMapper mapper = new ObjectMapper();
			mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
			mapper.configure(DeserializationFeature.UNWRAP_ROOT_VALUE, false);
			BillShipMapping billShipMapping = mapper.readValue(data, BillShipMapping.class);
			BillShipMappingService billShipMappingService = (BillShipMappingService) SpringConfig.getInstance()
					.getBean("billShipMappingService");
			id = billShipMappingService.create(billShipMapping);
			return Response.ok(id).build();
		} catch (Exception e) {
			e.printStackTrace();
			throw new WebApplicationException(Response.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e)).type(MediaType.TEXT_PLAIN_TYPE).build());
		}
	}

	@Override
	public Response updateEntity(UriInfo ui, HttpHeaders hh, String id, String data) {
		Response.ResponseBuilder rb = null;
		try {
			ObjectMapper mapper = new ObjectMapper();
			StringWriter writer = new StringWriter();
			// mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,false);
			// toggle this property value based on your input JSON data
			mapper.configure(DeserializationFeature.UNWRAP_ROOT_VALUE, false);
			BillShipMappingService billShipMappingService = (BillShipMappingService) SpringConfig.getInstance()
					.getBean("billShipMappingService");
			// read existing entity from database
			BillShipMapping billShipMapping = billShipMappingService.read(Long.parseLong(id));
			if (billShipMapping == null) {
				throw new WebApplicationException(
						Response.status(Status.BAD_REQUEST).entity("data entity with id \"" + id + "\" doesn't exist")
								.type(MediaType.TEXT_PLAIN_TYPE).build());
			}
			ObjectReader updater = mapper.readerForUpdating(billShipMapping);
			// build updated entity object from input data
			billShipMapping = updater.readValue(data);
			// update entity in database
			billShipMappingService.update(billShipMapping);
			// prepare response
			mapper.writeValue(writer, billShipMapping);
			rb = Response.ok(writer.toString());
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error("Error in updating data entity with id " + id, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error("Error in updating data entity with id " + id, e);
			throw new WebApplicationException(Response.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e)).type(MediaType.TEXT_PLAIN_TYPE).build());
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
			BillShipMappingService billShipMappingService = (BillShipMappingService) SpringConfig.getInstance()
					.getBean("billShipMappingService");
			BillShipMapping billShipMapping = billShipMappingService.read(entityId);
			if (billShipMapping == null)
				throw new WebApplicationException(
						Response.status(Status.BAD_REQUEST).entity("Data entity with id \"" + id + "\" doesn't exist")
								.type(MediaType.TEXT_PLAIN_TYPE).build());
			mapper.writeValue(writer, billShipMapping);
			rb = Response.ok(writer.toString());
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error("Error in fetching data entity with id " + id, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error("Error in fetching data entity with id " + id, e);
			throw new WebApplicationException(Response.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e)).type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		return rb.build();

	}

	@Override
	public Response deleteEntity(UriInfo ui, HttpHeaders hh, String id) {
		try {
			BillShipMappingService billShipMappingService = (BillShipMappingService) SpringConfig.getInstance()
					.getBean("billShipMappingService");
			// read existing entity from database
			BillShipMapping billShipMapping = billShipMappingService.read(Long.parseLong(id));
			if (billShipMapping == null) {
				throw new WebApplicationException(
						Response.status(Status.BAD_REQUEST).entity("Data entity with id \"" + id + "\" doesn't exist")
								.type(MediaType.TEXT_PLAIN_TYPE).build());
			}
			// prepare response
			billShipMappingService.delete(billShipMapping);
			return Response.ok(id).build();
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error("Error in deleting Data entity with id " + id, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error("Error in deleting data entity with id " + id, e);
			throw new WebApplicationException(Response.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e)).type(MediaType.TEXT_PLAIN_TYPE).build());
		}
	}
	
	@GET
	@Path("productline")
	public Response getEntitiesByProductlineId(@Context UriInfo ui, @Context HttpHeaders hh, @QueryParam("id") String id) {
		Response.ResponseBuilder rb = null;
		List<BillShipMapping> billShipMappingList = null;
		Map<String, Object> responseMap = new HashMap<String, Object>();
		try {
			Long productlineId = Long.parseLong(id);
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
			mapper.addMixIn(BillShipMapping.class, BillShipMappingMixIn.class);
			BillShipMappingService billShipMappingService = (BillShipMappingService) SpringConfig.getInstance()
					.getBean("billShipMappingService");
			billShipMappingList = billShipMappingService.getEntitiesByProductlineId(productlineId);
			if (billShipMappingList == null)
				throw new WebApplicationException(
						Response.status(Status.BAD_REQUEST).entity("Data entity with id \"" + id + "\" doesn't exist")
								.type(MediaType.TEXT_PLAIN_TYPE).build());
			responseMap.put("success", true);
			responseMap.put("data", billShipMappingList);
			mapper.writeValue(writer, responseMap);
			rb = Response.ok(writer.toString());
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error("Error in fetching data entity with id " + id, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error("Error in fetching data entity with id " + id, e);
			throw new WebApplicationException(Response.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e)).type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		return rb.build();

	}

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	public String getAddressEmailSubject() {
		return addressEmailSubject;
	}

	public void setAddressEmailSubject(String addressEmailSubject) {
		this.addressEmailSubject = addressEmailSubject;
	}

	public String getBeginendwith() {
		return beginendwith;
	}

	public void setBeginendwith(String beginendwith) {
		this.beginendwith = beginendwith;
	}

	public String getKeywording() {
		return keywording;
	}

	public void setKeywording(String keywording) {
		this.keywording = keywording;
	}

	public String getOrgCode() {
		return orgCode;
	}

	public void setOrgCode(String orgCode) {
		this.orgCode = orgCode;
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

	public String getShippingMethod() {
		return shippingMethod;
	}

	public void setShippingMethod(String shippingMethod) {
		this.shippingMethod = shippingMethod;
	}

	public String getFreightTerm() {
		return freightTerm;
	}

	public void setFreightTerm(String freightTerm) {
		this.freightTerm = freightTerm;
	}

	public String getPackingInstruction() {
		return packingInstruction;
	}

	public void setPackingInstruction(String packingInstruction) {
		this.packingInstruction = packingInstruction;
	}

	public String getShippingInstruction() {
		return shippingInstruction;
	}

	public void setShippingInstruction(String shippingInstruction) {
		this.shippingInstruction = shippingInstruction;
	}

	public String getEndCustomer() {
		return endCustomer;
	}

	public void setEndCustomer(String endCustomer) {
		this.endCustomer = endCustomer;
	}

	public String getManufacturingNote() {
		return manufacturingNote;
	}

	public void setManufacturingNote(String manufacturingNote) {
		this.manufacturingNote = manufacturingNote;
	}

	public String getCsr() {
		return csr;
	}

	public void setCsr(String csr) {
		this.csr = csr;
	}

	public String getBillToSite() {
		return billToSite;
	}

	public void setBillToSite(String billToSite) {
		this.billToSite = billToSite;
	}

	public String getShipToSite() {
		return shipToSite;
	}

	public void setShipToSite(String shipToSite) {
		this.shipToSite = shipToSite;
	}

	public String getBillToAddress() {
		return billToAddress;
	}

	public void setBillToAddress(String billToAddress) {
		this.billToAddress = billToAddress;
	}

	public String getShipToAddress() {
		return shipToAddress;
	}

	public void setShipToAddress(String shipToAddress) {
		this.shipToAddress = shipToAddress;
	}

	public String getBillToContact() {
		return billToContact;
	}

	public void setBillToContact(String billToContact) {
		this.billToContact = billToContact;
	}

	public String getShipToContact() {
		return shipToContact;
	}

	public void setShipToContact(String shipToContact) {
		this.shipToContact = shipToContact;
	}

	public String getBillToEmail() {
		return billToEmail;
	}

	public void setBillToEmail(String billToEmail) {
		this.billToEmail = billToEmail;
	}

	public String getShipToEmail() {
		return shipToEmail;
	}

	public void setShipToEmail(String shipToEmail) {
		this.shipToEmail = shipToEmail;
	}

	public String getBillToTelephone() {
		return billToTelephone;
	}

	public void setBillToTelephone(String billToTelephone) {
		this.billToTelephone = billToTelephone;
	}

	public String getShipToTelephone() {
		return shipToTelephone;
	}

	public void setShipToTelephone(String shipToTelephone) {
		this.shipToTelephone = shipToTelephone;
	}

	public String getFilePath() {
		return filePath;
	}

	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public int getDefaultId() {
		return defaultId;
	}

	public void setDefaultId(int defaultId) {
		this.defaultId = defaultId;
	}

	public ProductLine getVarProductLine() {
		return varProductLine;
	}

	public void setVarProductLine(ProductLine varProductLine) {
		this.varProductLine = varProductLine;
	}
	
	public String getApplyHold() {
		return applyHold;
	}

	public void setApplyHold(String applyHold) {
		this.applyHold = applyHold;
	}

}
