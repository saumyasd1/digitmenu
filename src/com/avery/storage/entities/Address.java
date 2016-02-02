package com.avery.storage.entities;

import java.io.StringWriter;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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
import com.avery.storage.MixIn.PartnerMixIn;
import com.avery.storage.service.AddressService;
import com.avery.storage.service.PartnerService;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;
import com.fasterxml.jackson.databind.SerializationFeature;


@Entity
@Table(name = "Address")
@Path("address")
public class Address extends MainAbstractEntity {

	
	@Column(name = "OrgCode",length = 50)
    private String orgCode; 
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "PartnerID", nullable = true)
	private Partner partner;
	
	@Column(name = "BillToSiteNumber",length = 50)
    private String billToSiteNumber; 
	
	@Column(name = "ShipToSiteNumber",length = 50)
    private String shipToSiteNumber; 
	
	@Column(name = "Description",length = 500)
    private String description;  
	
	@Column(name = "Address1",length = 500)
    private String address1;  
	
	@Column(name = "Address2",length = 500)
    private String address2;  
	
	@Column(name = "Address3",length = 500)
    private String address3;  
	
	@Column(name = "Address4",length = 500)
    private String address4;  
	
	@Column(name = "City",length = 250)
    private String city;  

	@Column(name = "State",length = 250)
    private String state;  
	
	@Column(name = "Country",length = 250)
    private String country;  
	
	@Column(name = "Zip",length = 250)
    private String zip;  
	
	@Column(name = "BillToContact",length = 250)
    private String billToContact;  
	
	@Column(name = "BillToPhone1",length = 250)
    private String billToPhone1;  
	
	@Column(name = "BillToPhone2",length = 250)
    private String billToPhone2;  
	
	@Column(name = "BillToFax",length = 250)
    private String billToFax;  
	
	@Column(name = "BillToEmail",length = 250)
    private String billToEmail;  
	
	@Column(name = "ShipToContact",length = 250)
    private String shipToContact;  
	
	@Column(name = "ShipToPhone1",length = 250)
    private String shipToPhone1;  
	
	@Column(name = "ShipToPhone2",length = 250)
    private String shipToPhone2;  
	
	@Column(name = "ShippingMethod",length = 100)
    private String shippingMethod;  
	
	@Column(name = "FreightTerms",length = 50)
    private String freightTerms;  
	
	@Column(name = "ShippingInstructions",length = 500)
    private String shippingInstructions;  
	
	@Column(name = "SiteNumber",length = 255)
    private String siteNumber; 
	
	public String getSiteNumber() {
		return siteNumber;
	}

	public void setSiteNumber(String siteNumber) {
		this.siteNumber = siteNumber;
	}
	@Column(name = "Contact",length = 255)
    private String contact;  
	
	@Column(name = "Phone1",length = 255)
    private String phone1;  
	
	@Column(name = "Phone2",length = 255)
    private String phone2;  
	
	@Column(name = "Fax",length = 255)
    private String fax;  
	
	@Column(name = "Email",length = 255)
    private String email; 
	
	@Column(name = "SiteType",length = 255)
    private String siteType; 

	public String getContact() {
		return contact;
	}

	public void setContact(String contact) {
		this.contact = contact;
	}

	public String getPhone1() {
		return phone1;
	}

	public void setPhone1(String phone1) {
		this.phone1 = phone1;
	}

	public String getPhone2() {
		return phone2;
	}

	public void setPhone2(String phone2) {
		this.phone2 = phone2;
	}

	public String getFax() {
		return fax;
	}

	public void setFax(String fax) {
		this.fax = fax;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getSiteType() {
		return siteType;
	}

	public void setSiteType(String siteType) {
		this.siteType = siteType;
	}

	public String getOrgCode() {
		return orgCode;
	}

	public void setOrgCode(String orgCode) {
		this.orgCode = orgCode;
	}

	public Partner getPartner() {
		return partner;
	}

	public void setPartner(Partner partner) {
		this.partner = partner;
	}

	public String getBillToSiteNumber() {
		return billToSiteNumber;
	}

	public void setBillToSiteNumber(String billToSiteNumber) {
		this.billToSiteNumber = billToSiteNumber;
	}

	public String getShipToSiteNumber() {
		return shipToSiteNumber;
	}

	public void setShipToSiteNumber(String shipToSiteNumber) {
		this.shipToSiteNumber = shipToSiteNumber;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getAddress1() {
		return address1;
	}

	public void setAddress1(String address1) {
		this.address1 = address1;
	}

	public String getAddress2() {
		return address2;
	}

	public void setAddress2(String address2) {
		this.address2 = address2;
	}

	public String getAddress3() {
		return address3;
	}

	public void setAddress3(String address3) {
		this.address3 = address3;
	}

	public String getAddress4() {
		return address4;
	}

	public void setAddress4(String address4) {
		this.address4 = address4;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getZip() {
		return zip;
	}

	public void setZip(String zip) {
		this.zip = zip;
	}

	public String getBillToContact() {
		return billToContact;
	}

	public void setBillToContact(String billToContact) {
		this.billToContact = billToContact;
	}

	public String getBillToPhone1() {
		return billToPhone1;
	}

	public void setBillToPhone1(String billToPhone1) {
		this.billToPhone1 = billToPhone1;
	}

	public String getBillToPhone2() {
		return billToPhone2;
	}

	public void setBillToPhone2(String billToPhone2) {
		this.billToPhone2 = billToPhone2;
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

	public String getShipToContact() {
		return shipToContact;
	}

	public void setShipToContact(String shipToContact) {
		this.shipToContact = shipToContact;
	}

	public String getShipToPhone1() {
		return shipToPhone1;
	}

	public void setShipToPhone1(String shipToPhone1) {
		this.shipToPhone1 = shipToPhone1;
	}

	public String getShipToPhone2() {
		return shipToPhone2;
	}

	public void setShipToPhone2(String shipToPhone2) {
		this.shipToPhone2 = shipToPhone2;
	}

	public String getShippingMethod() {
		return shippingMethod;
	}

	public void setShippingMethod(String shippingMethod) {
		this.shippingMethod = shippingMethod;
	}

	public String getFreightTerms() {
		return freightTerms;
	}

	public void setFreightTerms(String freightTerms) {
		this.freightTerms = freightTerms;
	}

	public String getShippingInstructions() {
		return shippingInstructions;
	}

	public void setShippingInstructions(String shippingInstructions) {
		this.shippingInstructions = shippingInstructions;
	}

	
	@Override
	public Response getEntities(UriInfo ui, HttpHeaders hh) {
		Response.ResponseBuilder rb = null;
		Map entitiesMap=null;
		try {
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			MultivaluedMap<String, String> queryParamMap =ui.getQueryParameters();
			mapper.addMixInAnnotations(Partner.class,PartnerMixIn.class);
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
			AddressService addressService = (AddressService) SpringConfig
					.getInstance().getBean("addressService");
			entitiesMap = addressService.readWithCriteria( queryParamMap);
			if (entitiesMap == null || entitiesMap.isEmpty())
				throw new Exception("Unable to find addresses");
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
			Address address = mapper.readValue(data, Address.class);
			address.setCreatedDate(new Date());
			AddressService addressService = (AddressService) SpringConfig
					.getInstance().getBean("addressService");
			id = addressService.create(address);
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
			mapper.addMixInAnnotations(Partner.class,PartnerMixIn.class);
			mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,
					false);
			// toggle this property value based on your input JSON data
			mapper.configure(DeserializationFeature.UNWRAP_ROOT_VALUE, false);
			AddressService addressService = (AddressService) SpringConfig
					.getInstance().getBean("addressService");
			// read existing entity from database
			Address address = addressService.read(Long.parseLong(id));
			if (address == null) {
				throw new WebApplicationException(Response
						.status(Status.BAD_REQUEST)
						.entity("address entity with id \"" + id
								+ "\" doesn't exist")
						.type(MediaType.TEXT_PLAIN_TYPE).build());
			}
			ObjectReader updater = mapper.readerForUpdating(address);
			// build updated entity object from input data
			address = updater.readValue(data);
			// update entity in database
			addressService.update(address);
			// prepare response
			mapper.writeValue(writer, address);
			rb = Response.ok(writer.toString());
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error in updating address entity with id " + id, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error in updating address entity with id " + id, e);
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
			AddressService addressService = (AddressService) SpringConfig
					.getInstance().getBean("addressService");
			Address address = addressService.read(entityId);
			if (address == null)
				throw new WebApplicationException(Response
						.status(Status.BAD_REQUEST)
						.entity("Address entity with id \"" + id
								+ "\" doesn't exist")
						.type(MediaType.TEXT_PLAIN_TYPE).build());
			mapper.writeValue(writer, address);
			rb = Response.ok(writer.toString());
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error in fetching address entity with id " + id, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error in fetching address entity with id " + id, e);
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
			AddressService addressService = (AddressService) SpringConfig
					.getInstance().getBean("addressService");
			// read existing entity from database
			Address address = addressService.read(Long.parseLong(id));
			if (address == null) {
				throw new WebApplicationException(Response
						.status(Status.BAD_REQUEST)
						.entity("Address entity with id \"" + id
								+ "\" doesn't exist")
						.type(MediaType.TEXT_PLAIN_TYPE).build());
			}
			// prepare response
			addressService.delete(address);
			return Response.ok(id).build();
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error in deleting Address entity with id " + id, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error in deleting Address entity with id " + id, e);
			throw new WebApplicationException(Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e))
					.type(MediaType.TEXT_PLAIN_TYPE).build());
		}
	}
	
}
