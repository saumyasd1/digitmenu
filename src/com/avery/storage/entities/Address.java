package com.avery.storage.entities;

import java.io.StringWriter;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.ws.rs.Path;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.UriInfo;

import org.apache.commons.lang.exception.ExceptionUtils;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import com.avery.app.config.SpringConfig;
import com.avery.logging.AppLogger;
import com.avery.storage.MainAbstractEntity;
import com.avery.storage.MixIn.AddressMixIn;
import com.avery.storage.MixIn.OrgMixIn;
import com.avery.storage.MixIn.PartnerMixIn;
import com.avery.storage.MixIn.SystemInfoMixIn;
import com.avery.storage.service.AddressService;
import com.avery.storage.service.PartnerService;
import com.avery.storage.service.SiteService;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;
import com.fasterxml.jackson.databind.SerializationFeature;


@Entity
@Table(name = "address")
@Path("address")
public class Address extends MainAbstractEntity {
	
	public Address(){
		
	}

	private static final long serialVersionUID = 3208431286041487210L;
	
	@Column(name = "description", length = 500)
	String description;
	@Column(name = "address1", length = 500)
	String address1;
	@Column(name = "address2", length = 500)
	String address2;
	@Column(name = "address3", length = 500)
	String address3;
	@Column(name = "address4", length = 500)
	String address4;
	@Column(name = "city", length = 250)
	String city;
	@Column(name = "state", length = 250)
	String state;
	@Column(name = "country", length = 250)
	String country;
	@Column(name = "contact", length = 255)
	String contact;
	@Column(name = "email", length = 255)
	String email;
	@Column(name = "fax", length = 255)
	String fax;
	@Column(name = "phone1", length = 255)
	String phone1;
	@Column(name = "phone2", length = 255)
	String phone2;
	@Column(name = "siteNumber",length=255)
	String siteNumber;
	@Column(name = "siteType", length = 255)
	String siteType;
	@Column(name = "comment", length = 250)
	String comment;
	@Column(name = "siteId")
	int siteId;
	@Column(name="zip",length=250)
	String zip;
	@Column(name = "orgCode")
	String orgCode;
	@LazyCollection(LazyCollectionOption.FALSE)
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="orgCodeId")
	Org varOrgCode;
	@LazyCollection(LazyCollectionOption.FALSE)
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="partnerId")
	Partner varPartner;
	public Partner getVarPartner() {
		return varPartner;
	}

	public void setVarPartner(Partner varPartner) {
		this.varPartner = varPartner;
	}

	@Transient
	private String orgCodeName;
	@Transient
	private Long orgCodeId;
	public Long getOrgCodeId() {
		return orgCodeId;
	}

	public void setOrgCodeId(Long orgCodeId) {
		this.orgCodeId = orgCodeId;
	}

	@Transient
	private String siteName;
	public String getSiteName() {
		return siteName;
	}

	public void setSiteName(String siteName) {
		this.siteName = siteName;
	}

	@Transient
	private Long partnerId;
	

	public Long getPartnerId() {
		return partnerId;
	}

	public void setPartnerId(Long partnerId) {
		this.partnerId = partnerId;
	}

	@Transient
	private String partnerName;

	public String getPartnerName() {
		return partnerName;
	}

	public void setPartnerName(String partnerName) {
		this.partnerName = partnerName;
	}

	public String getOrgCodeName() {
		return orgCodeName;
	}

	public void setOrgCodeName(String orgCodeName) {
		this.orgCodeName = orgCodeName;
	}

	

	public Org getVarOrgCode() {
		return varOrgCode;
	}

	public void setVarOrgCode(Org varOrgCode) {
		this.varOrgCode = varOrgCode;
	}

	@Column(name = "system")
	int system;
	@Column(name = "freightTerm", length = 250)
	String freightTerms;
	@Column(name = "shippingMethod", length = 255)
	String shippingMethod;
	@Column(name = "shippingInstruction", length = 255)
	String shippingInstructions;
	
	
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

	public String getContact() {
		return contact;
	}

	public void setContact(String contact) {
		this.contact = contact;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getFax() {
		return fax;
	}

	public void setFax(String fax) {
		this.fax = fax;
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

	public String getSiteNumber() {
		return siteNumber;
	}

	public void setSiteNumber(String siteNumber) {
		this.siteNumber = siteNumber;
	}

	public String getSiteType() {
		return siteType;
	}

	public void setSiteType(String siteType) {
		this.siteType = siteType;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public int getSiteId() {
		return siteId;
	}

	public void setSiteId(int siteId) {
		this.siteId = siteId;
	}

	public String getZip() {
		return zip;
	}

	public void setZip(String zip) {
		this.zip = zip;
	}

	
	public int getSystem() {
		return system;
	}

	
	public String getOrgCode() {
		return orgCode;
	}

	public void setOrgCode(String orgCode) {
		this.orgCode = orgCode;
	}

	public void setSystem(int system) {
		this.system = system;
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

	public String getShippingMethod() {
		return shippingMethod;
	}

	public void setShippingMethod(String shippingMethod) {
		this.shippingMethod = shippingMethod;
	}


	@Override
	public Response getEntities(UriInfo ui, HttpHeaders hh) {
		Response.ResponseBuilder rb = null;
		Map<?,?> entitiesMap=null;
		Map<String, Object> responseMap = new HashMap<String, Object>();
		List<Address> addressList = null;
		try {
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			MultivaluedMap<String, String> queryParamMap =ui.getQueryParameters();
			String siteId = null;
			siteId = queryParamMap.getFirst("siteId");
			mapper.addMixIn(Partner.class,PartnerMixIn.class);
			mapper.addMixIn(Org.class, OrgMixIn.class);
			mapper.addMixIn(SystemInfo.class, SystemInfoMixIn.class);
			mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
			AddressService addressService = (AddressService) SpringConfig
					.getInstance().getBean("addressService");
			entitiesMap = addressService.readWithCriteria( queryParamMap);
			if (entitiesMap == null || entitiesMap.isEmpty())
				throw new Exception("Unable to find addresses");
			SiteService siteService = (SiteService) SpringConfig.getInstance().getBean("siteService");
			
			List listOfTask=(List) entitiesMap.get("address");
			for (int i = 0; i < listOfTask.size(); i++) {
				Address addresh = (Address) listOfTask.get(i);
				if(addresh.getSiteId() > 0)
				{
					int siteId1=addresh.getSiteId();
					Site site = siteService.read((long)siteId1);
					if(site != null)
					addresh.setSiteName(site.getName());
				}
			}
			Map responceMap=new HashMap();;
			responceMap.put("address", listOfTask);
			responceMap.put("totalCount", entitiesMap.get("totalCount"));
			mapper.setTimeZone(TimeZone.getDefault());
				mapper.writeValue(writer, responceMap);
			
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
			mapper.addMixIn(Partner.class,PartnerMixIn.class);
			mapper.addMixIn(Org.class, OrgMixIn.class);
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
	
	public static Comparator<Address> addressIdComparator = new Comparator<Address>() {
		@Override
		public int compare(Address address1, Address address2) {
			return (int) (address1.getId() - address2.getId());
		}
	};
}
