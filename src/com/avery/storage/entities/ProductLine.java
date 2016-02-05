package com.avery.storage.entities;

import java.io.StringWriter;
import java.util.Date;
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
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Context;
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
import com.avery.storage.MixIn.PartnerMixIn;
import com.avery.storage.MixIn.ProductLineMixIn;
import com.avery.storage.service.ProductLineService;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;
import com.fasterxml.jackson.databind.SerializationFeature;

@Entity
@Table(name = "Partner_RBOProductLine")
@Path("productLines")
public class ProductLine extends MainAbstractEntity{
	
	private static final long serialVersionUID = -8487156716364715527L;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "PartnerID", nullable = true)
	private Partner partner;
	
	@Column(name = "RBOName",length = 50)
	private String rboName;
	
	@Column(name = "RBOID",length = 50)
	private String rboId;
	
	@Column(name = "ProductLineType",length = 50)
	private String productLineType;
	
	@Column(name = "CSRName",length = 100)
	private String csrName;
	
	@Column(name = "CSREmail",length = 250)
	private String csrEmail;
	
	@Column(name = "OrderEmailDomain",length = 100)
	private String orderEmailDomain;
	
	@Column(name = "PackingInstruction",columnDefinition = "varchar(500)")
	private String packingInstruction;
	
	@Column(name = "InvoiceLineInstruction",columnDefinition = "varchar(500)")
	private String invoiceLineInstruction;
	
	@Column(name = "VariableDataBreakdown",columnDefinition = "varchar(500)")
	private String variableDataBreakdown;
	
	@Column(name = "ManufacturingNotes",columnDefinition = "varchar(500)")
	private String manufacturingNotes;
	
	@Column(name = "ShippingOnlyNotes",columnDefinition = "varchar(500)")
	private String shippingOnlyNotes;

	@Column(name = "SplitShipSetBy",length = 5)
	private String splitShipSetBy;

	@Column(name = "OrderSchemaID",length = 50)
	private String orderSchemaID;
	
	@Column(name = "OrderSchemaType",length = 50)
	private String orderSchemaType;
	
	@Column(name = "OrderMappingID",length = 50)
	private String orderMappingID;
	
	@Column(name = "AttachmentRequired")
	private Boolean attachmentRequired;
	
	@Column(name = "AttachmentIdentifier_1",length = 50)
	private String attachmentIdentifier_1;
	
	@Column(name = "AttachmentSchemaType_1",length = 50)
	private String attachmentSchemaType_1;
	
	@Column(name = "AttachmentMappingID_1",length = 50)
	private String attachmentMappingID_1;
	
	@Column(name = "AttachmentIdentifier_2",length = 50)
	private String attachmentIdentifier_2;
	
	@Column(name = "AttachmentSchemaID_2",length = 50)
	private String attachmentSchemaID_2;

	@Column(name = "AttachmentSchemaType_2",length = 50)
	private String attachmentSchemaType_2;

	@Column(name = "AttachmentMappingID_2",length = 50)
	private String attachmentMappingID_2;

	@Column(name = "AttachmentIdentifier_3",length = 50)
	private String attachmentIdentifier_3;

	@Column(name = "AttachmentSchemaID_3",length = 50)
	private String attachmentSchemaID_3;

	@Column(name = "AttachmentSchemaType_3",length = 50)
	private String attachmentSchemaType_3;

	@Column(name = "AttachmentMappingID_3",length = 50)
	private String attachmentMappingID_3;

	@Column(name = "PreProcessPID",length = 50)
	private String preProcessPID;


	public Partner getPartner() {
		return partner;
	}

	public void setPartner(Partner partner) {
		this.partner = partner;
	}

	public String getRboName() {
		return rboName;
	}

	public void setRboName(String rboName) {
		this.rboName = rboName;
	}

	public String getProductLineType() {
		return productLineType;
	}

	public void setProductLineType(String productLineType) {
		this.productLineType = productLineType;
	}

	public String getCsrName() {
		return csrName;
	}

	public void setCsrName(String csrName) {
		this.csrName = csrName;
	}

	public String getCsrEmail() {
		return csrEmail;
	}

	public void setCsrEmail(String csrEmail) {
		this.csrEmail = csrEmail;
	}

	public String getOrderEmailDomain() {
		return orderEmailDomain;
	}

	public void setOrderEmailDomain(String orderEmailDomain) {
		this.orderEmailDomain = orderEmailDomain;
	}

	public String getPackingInstruction() {
		return packingInstruction;
	}

	public void setPackingInstruction(String packingInstruction) {
		this.packingInstruction = packingInstruction;
	}

	public String getInvoiceLineInstruction() {
		return invoiceLineInstruction;
	}

	public void setInvoiceLineInstruction(String invoiceLineInstruction) {
		this.invoiceLineInstruction = invoiceLineInstruction;
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

	public String getShippingOnlyNotes() {
		return shippingOnlyNotes;
	}

	public void setShippingOnlyNotes(String shippingOnlyNotes) {
		this.shippingOnlyNotes = shippingOnlyNotes;
	}

	public String getSplitShipSetBy() {
		return splitShipSetBy;
	}

	public void setSplitShipSetBy(String splitShipSetBy) {
		this.splitShipSetBy = splitShipSetBy;
	}

	public String getOrderSchemaID() {
		return orderSchemaID;
	}

	public void setOrderSchemaID(String orderSchemaID) {
		this.orderSchemaID = orderSchemaID;
	}

	public String getOrderSchemaType() {
		return orderSchemaType;
	}

	public void setOrderSchemaType(String orderSchemaType) {
		this.orderSchemaType = orderSchemaType;
	}

	public String getOrderMappingID() {
		return orderMappingID;
	}

	public void setOrderMappingID(String orderMappingID) {
		this.orderMappingID = orderMappingID;
	}

	public Boolean isAttachmentRequired() {
		return attachmentRequired;
	}

	public void setAttachmentRequired(Boolean attachmentRequired) {
		this.attachmentRequired = attachmentRequired;
	}

	public String getAttachmentIdentifier_1() {
		return attachmentIdentifier_1;
	}

	public void setAttachmentIdentifier_1(String attachmentIdentifier_1) {
		this.attachmentIdentifier_1 = attachmentIdentifier_1;
	}

	public String getAttachmentSchemaType_1() {
		return attachmentSchemaType_1;
	}

	public void setAttachmentSchemaType_1(String attachmentSchemaType_1) {
		this.attachmentSchemaType_1 = attachmentSchemaType_1;
	}

	public String getAttachmentMappingID_1() {
		return attachmentMappingID_1;
	}

	public void setAttachmentMappingID_1(String attachmentMappingID_1) {
		this.attachmentMappingID_1 = attachmentMappingID_1;
	}

	public String getAttachmentIdentifier_2() {
		return attachmentIdentifier_2;
	}

	public void setAttachmentIdentifier_2(String attachmentIdentifier_2) {
		this.attachmentIdentifier_2 = attachmentIdentifier_2;
	}

	public String getAttachmentSchemaID_2() {
		return attachmentSchemaID_2;
	}

	public void setAttachmentSchemaID_2(String attachmentSchemaID_2) {
		this.attachmentSchemaID_2 = attachmentSchemaID_2;
	}

	public String getAttachmentSchemaType_2() {
		return attachmentSchemaType_2;
	}

	public void setAttachmentSchemaType_2(String attachmentSchemaType_2) {
		this.attachmentSchemaType_2 = attachmentSchemaType_2;
	}

	public String getAttachmentMappingID_2() {
		return attachmentMappingID_2;
	}

	public void setAttachmentMappingID_2(String attachmentMappingID_2) {
		this.attachmentMappingID_2 = attachmentMappingID_2;
	}

	public String getAttachmentIdentifier_3() {
		return attachmentIdentifier_3;
	}

	public void setAttachmentIdentifier_3(String attachmentIdentifier_3) {
		this.attachmentIdentifier_3 = attachmentIdentifier_3;
	}

	public String getAttachmentSchemaID_3() {
		return attachmentSchemaID_3;
	}

	public void setAttachmentSchemaID_3(String attachmentSchemaID_3) {
		this.attachmentSchemaID_3 = attachmentSchemaID_3;
	}

	public String getAttachmentSchemaType_3() {
		return attachmentSchemaType_3;
	}

	public void setAttachmentSchemaType_3(String attachmentSchemaType_3) {
		this.attachmentSchemaType_3 = attachmentSchemaType_3;
	}

	public String getAttachmentMappingID_3() {
		return attachmentMappingID_3;
	}

	public void setAttachmentMappingID_3(String attachmentMappingID_3) {
		this.attachmentMappingID_3 = attachmentMappingID_3;
	}

	public String getPreProcessPID() {
		return preProcessPID;
	}

	public void setPreProcessPID(String preProcessPID) {
		this.preProcessPID = preProcessPID;
	}

	public String getRboId() {
		return rboId;
	}

	public void setRboId(String rboId) {
		this.rboId = rboId;
	}
	
	@Override
	public Response getEntities(UriInfo ui, HttpHeaders hh) {
		Response.ResponseBuilder rb = null;
		List<ProductLine> productline = null;
		try {
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			mapper.addMixInAnnotations(Partner.class,PartnerMixIn.class);
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, true);
			ProductLineService productLineService = (ProductLineService) SpringConfig
					.getInstance().getBean("productLineService");
			productline = productLineService.readAll();
			if (productline == null)
				throw new Exception("Unable to find Product Line");
			mapper.writeValue(writer, productline);
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
		Boolean valueExist=false;
		Map<String,Object> responseMap=new HashMap<String,Object>();
		try {
			ObjectMapper mapper = new ObjectMapper();
			ObjectMapper responseMapper = new ObjectMapper();
			StringWriter writer = new StringWriter();
			mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,
					false);
			mapper.configure(DeserializationFeature.UNWRAP_ROOT_VALUE, false);
			ProductLine productline = mapper.readValue(data, ProductLine.class);
			productline.setCreatedDate(new Date());
			ProductLineService productLineService = (ProductLineService) SpringConfig
					.getInstance().getBean("productLineService");
			valueExist = productLineService.checkDuplicateValues(productline);
			responseMapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
			if (valueExist) {
				responseMap.put("valueExist",true);
				responseMapper.writeValue(writer, responseMap);
			}else{
				id = productLineService.create(productline);
				responseMap.put("valueExist",false);
				responseMap.put("id",id);
				responseMapper.writeValue(writer, responseMap);
			}
			return Response.ok(writer.toString()).build();
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
		Map<String,Object> responseMap=new HashMap<String,Object>();
		try {
			ObjectMapper mapper = new ObjectMapper();
			StringWriter writer = new StringWriter();
			mapper.addMixIn(Partner.class,PartnerMixIn.class);
			mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,
					false);
			// toggle this property value based on your input JSON data
			mapper.configure(DeserializationFeature.UNWRAP_ROOT_VALUE, false);
			ProductLineService productLineService = (ProductLineService) SpringConfig
					.getInstance().getBean("productLineService");
			// read existing entity from database
			ProductLine productline = productLineService.read(Long.parseLong(id));
			if (productline == null) {
				throw new WebApplicationException(Response
						.status(Status.BAD_REQUEST)
						.entity("Product Line entity with id \"" + id
								+ "\" doesn't exist")
						.type(MediaType.TEXT_PLAIN_TYPE).build());
			}
			ObjectReader updater = mapper.readerForUpdating(productline);
			// build updated entity object from input data
			productline = updater.readValue(data);
			boolean valueExist = productLineService.checkDuplicateValues(productline);
			if (valueExist) {
				responseMap.put("valueExist",true);
				mapper.writeValue(writer, responseMap);
			}else{
				productLineService.update(productline);
				responseMap.put("valueExist",false);
				responseMap.put("productline",productline);
				mapper.writeValue(writer, responseMap);
			}
			rb = Response.ok(writer.toString());
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error in updating product line entity with id " + id, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error in updating product line entity with id " + id, e);
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
			ProductLineService productLineService = (ProductLineService) SpringConfig
					.getInstance().getBean("productLineService");
			ProductLine productline = productLineService.read(entityId);
			if (productline == null)
				throw new WebApplicationException(Response
						.status(Status.BAD_REQUEST)
						.entity("Product Line entity with id \"" + id
								+ "\" doesn't exist")
						.type(MediaType.TEXT_PLAIN_TYPE).build());
			mapper.writeValue(writer, productline);
			rb = Response.ok(writer.toString());
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error in fetching Product Line entity with id " + id, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error in fetching partner entity with id " + id, e);
			throw new WebApplicationException(Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e))
					.type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		return rb.build();

	}
	
	
	@GET
	@Path("/partner/{id:[0-9]+}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getByPartnerID(@Context UriInfo ui,
			@Context HttpHeaders hh, @PathParam("id") String partnerId) {
		Response.ResponseBuilder rb = null;
		Map<?,?> productline = null;
		try{
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			mapper.addMixIn(Partner.class,PartnerMixIn.class);
			MultivaluedMap<String, String> queryParamMap =ui.getQueryParameters();
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
			ProductLineService productLineService = (ProductLineService) SpringConfig
					.getInstance().getBean("productLineService");
			productline = productLineService.readAllByPartnerID(queryParamMap);
			if (productline == null)
				throw new Exception("Unable to find Product Line");
			mapper.writeValue(writer, productline);
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
	public Response deleteEntity(UriInfo ui, HttpHeaders hh, String id) {
		try {
			ProductLineService productLineService = (ProductLineService) SpringConfig
					.getInstance().getBean("productLineService");
			// read existing entity from database
			ProductLine productLine = productLineService.read(Long.parseLong(id));
			if (productLine == null) {
				throw new WebApplicationException(Response
						.status(Status.BAD_REQUEST)
						.entity("Product Line entity with id \"" + id
								+ "\" doesn't exist")
						.type(MediaType.TEXT_PLAIN_TYPE).build());
			}
			// prepare response
			productLineService.delete(productLine);
			return Response.ok(id).build();
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error in deleting Product Line entity with id " + id, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error in deleting Product Line entity with id " + id, e);
			throw new WebApplicationException(Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e))
					.type(MediaType.TEXT_PLAIN_TYPE).build());
		}
	}
	
	
	
	
}
