package com.avery.storage.entities;

import java.io.StringWriter;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
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
import com.avery.storage.MixIn.AddressMixIn;
import com.avery.storage.MixIn.OrderQueueMixIn;
import com.avery.storage.MixIn.PartnerMixIn;
import com.avery.storage.service.PartnerService;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;
import com.fasterxml.jackson.databind.SerializationFeature;

/**
 * 20-Nov-2015
 * 
 * @author Shaifali
 */


@Entity
@Table(name = "Partner")
@Path("partners")
public class Partner extends MainAbstractEntity {
	
	private static final long serialVersionUID = -8487156716364715527L;
	
	
	@Column(name = "PartnerName",length = 250)
    private String partnerName; 
	
	@Column(name = "Address",length = 500)
    private String address;   
	
	@Column(name = "ContactPerson",length = 100)
    private String contactPerson; 
	
	@Column(name = "Phone",length = 100)
    private String phone; 
	
	@Column(name = "Active")
    private Boolean active;  
	
	private transient int productLineCount;
	
	private transient int orderQueueCount;
	
	private transient int addressCount;
	
	@OneToMany(cascade = CascadeType.ALL,fetch = FetchType.LAZY,mappedBy = "partner")
	private Set<ProductLine> productLine;
	
	@OneToMany(fetch = FetchType.LAZY,mappedBy = "partner")
	private Set<Address> adressObj;
	
	@OneToMany(fetch = FetchType.LAZY,mappedBy = "partner")
	private Set<OrderQueue> orderQueue;
	
	public Set<OrderQueue> getOrderQueue() {
		return orderQueue;
	}

	public void setOrderQueue(Set<OrderQueue> orderQueue) {
		this.orderQueue = orderQueue;
	}
	
	public Set<Address> getAdressObj() {
		return adressObj;
	}

	public void setAdressObj(Set<Address> adressObj) {
		this.adressObj = adressObj;
	}
	
	public Set<ProductLine> getProductLine() {
		return productLine;
	}

	public void setProductLine(Set<ProductLine> productLine) {
		this.productLine = productLine;
	}
	
	public int getProductLineCount() {
		return productLineCount;
	}
	
	public void setProductLineCount(int productLineCount) {
		this.productLineCount = productLineCount;
	}

	public int getAddressCount() {
		return addressCount;
	}
	
	public void setAddressCount(int addressCount) {
		this.addressCount = addressCount;
	}
	
	public int getOrderQueueCount() {
		return orderQueueCount;
	}
	
	public void setOrderQueueCount(int orderQueueCount) {
		this.orderQueueCount = orderQueueCount;
	}
	
	public String getPartnerName() {
		return partnerName;
	}

	public void setPartnerName(String partnerName) {
		this.partnerName = partnerName;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getContactPerson() {
		return contactPerson;
	}

	public void setContactPerson(String contactPerson) {
		this.contactPerson = contactPerson;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public Boolean isActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}



	
	@Override
	public Response getEntities(UriInfo ui, HttpHeaders hh) {
		Response.ResponseBuilder rb = null;
		List<Partner> partner = null;
		Map entitiesMap=null;
		try {
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			MultivaluedMap<String, String> queryParamMap =ui.getQueryParameters();
			mapper.addMixInAnnotations(Partner.class,PartnerMixIn.class);
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
			PartnerService partnerService = (PartnerService) SpringConfig
					.getInstance().getBean("partnerService");
			entitiesMap = partnerService.readWithCriteria( queryParamMap);
			if (entitiesMap == null || entitiesMap.isEmpty())
				throw new Exception("Unable to find partners");
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
		String partnerName="";
		Boolean partnerExist=false;
		try {
			ObjectMapper mapper = new ObjectMapper();
			mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,
					false);
			mapper.configure(DeserializationFeature.UNWRAP_ROOT_VALUE, false);
			Partner partner = mapper.readValue(data, Partner.class);
			partnerName=partner.getPartnerName();
			partner.setCreatedDate(new Date());
			PartnerService partnerService = (PartnerService) SpringConfig
					.getInstance().getBean("partnerService");
			partnerExist = partnerService.checkDuplicatePartnerName(partnerName);
			if (partnerExist == true) {
				throw new Exception("Partner already exist with Partner Name:"
						+partnerName);
			}
			id = partnerService.create(partner);
			return Response.ok(id).build();
		}catch (WebApplicationException ex) {
			throw ex;
		}
		catch (Exception e) {
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
			mapper.addMixInAnnotations(Partner.class,PartnerMixIn.class);
			mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,
					false);
			// toggle this property value based on your input JSON data
			mapper.configure(DeserializationFeature.UNWRAP_ROOT_VALUE, false);
			PartnerService partnerService = (PartnerService) SpringConfig
					.getInstance().getBean("partnerService");
			// read existing entity from database
			Partner partner = partnerService.read(Long.parseLong(id));
			if (partner == null) {
				throw new WebApplicationException(Response
						.status(Status.BAD_REQUEST)
						.entity("Partner entity with id \"" + id
								+ "\" doesn't exist")
						.type(MediaType.TEXT_PLAIN_TYPE).build());
			}
			ObjectReader updater = mapper.readerForUpdating(partner);
			// build updated entity object from input data
			partner = updater.readValue(data);
			// update entity in database
			partnerService.update(partner);
			// prepare response
			mapper.writeValue(writer, partner);
			rb = Response.ok(writer.toString());
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error in updating partner entity with id " + id, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error in updating partner entity with id " + id, e);
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
			PartnerService partnerService = (PartnerService) SpringConfig
					.getInstance().getBean("partnerService");
			Partner partner = partnerService.read(entityId);
			if (partner == null)
				throw new WebApplicationException(Response
						.status(Status.BAD_REQUEST)
						.entity("Partner entity with id \"" + id
								+ "\" doesn't exist")
						.type(MediaType.TEXT_PLAIN_TYPE).build());
			mapper.writeValue(writer, partner);
			rb = Response.ok(writer.toString());
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error in fetching partner entity with id " + id, ex);
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
	
	@Override
	public Response deleteEntity(UriInfo ui, HttpHeaders hh, String id) {
		Response.ResponseBuilder rb = null;
		try {
			PartnerService partnerService = (PartnerService) SpringConfig
					.getInstance().getBean("partnerService");
			// read existing entity from database
			Partner partner = partnerService.read(Long.parseLong(id));
			if (partner == null) {
				throw new WebApplicationException(Response
						.status(Status.BAD_REQUEST)
						.entity("Partner entity with id \"" + id
								+ "\" doesn't exist")
						.type(MediaType.TEXT_PLAIN_TYPE).build());
			}
			// prepare response
			partnerService.delete(partner);
			return Response.ok(id).build();
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error in deleting partner entity with id " + id, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error in deleting partner entity with id " + id, e);
			throw new WebApplicationException(Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e))
					.type(MediaType.TEXT_PLAIN_TYPE).build());
		}
	}
	

	}
