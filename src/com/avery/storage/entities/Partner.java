package com.avery.storage.entities;

import java.io.StringWriter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Context;
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
import com.avery.storage.MixIn.PartnerMixIn;
import com.avery.storage.service.PartnerService;
import com.avery.utils.ApplicationUtils;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;
import com.fasterxml.jackson.databind.SerializationFeature;



@Entity
@Table(name = "partner")
@Path("partners")
public class Partner extends MainAbstractEntity {
	
	private static final long serialVersionUID = -8487156716364715527L;

	@Column(name = "partnerName", length = 250)
	private String partnerName;
	
//	@Column(name = "emailDomain", length = 100)
//	private String emailDomain;
//	
//	@Column(name = "emailId", length = 100)
//	private String emailId;
//	
//	@Column(name = "address1", length = 250)
//	private String address1;
//	
//	@Column(name = "address2", length = 250)
//	private String address2;
//	
//	@Column(name = "address3", length = 250)
//	private String address3;
//	
//	@Column(name = "city", length = 250)
//	private String city;
//	
//	@Column(name = "state", length = 250)
//	private String state;
//	
//	@Column(name = "country", length = 250)
//	private String country;
//	
//	@Column(name = "phone", length = 250)
//	private String phone;
//	
//	@Column(name = "alternatePhone", length = 250)
//	private String alternatePhone;
//	
//	@Column(name = "fax", length = 250)
//	private String fax;
//	
//	@Column(name = "contactPerson", length = 250)
//	private String contactPerson;
//	
	@Column(name = "active")
	private Boolean active;
	
//	@Column(name = "comment", length = 250)
//	private String comment;
//	
//	@Column(name = "siteId")
//	private Integer siteId;
//	
//	@Column(name="zip",length=50)
//	private String zip;
//	
//	@Column(name = "orgCode", length = 50)
//	private String orgCode;
	
//	@Transient
//	private String siteName;
	
	@LazyCollection(LazyCollectionOption.FALSE)
	@OneToMany(mappedBy = "varPartner", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<ProductLine> varProductLine = new ArrayList<ProductLine>();

	public Partner(){
		
	}

	public String getPartnerName() {
		return partnerName;
	}

	public void setPartnerName(String partnerName) {
		this.partnerName = partnerName;
	}

//	public String getEmailDomain() {
//		return emailDomain;
//	}
//
//	public void setEmailDomain(String emailDomain) {
//		this.emailDomain = emailDomain;
//	}
//
//	public String getEmailId() {
//		return emailId;
//	}
//
//	public void setEmailId(String emailId) {
//		this.emailId = emailId;
//	}
//
//	public String getAddress1() {
//		return address1;
//	}
//
//	public void setAddress1(String address1) {
//		this.address1 = address1;
//	}
//
//	public String getAddress2() {
//		return address2;
//	}
//
//	public void setAddress2(String address2) {
//		this.address2 = address2;
//	}
//
//	public String getAddress3() {
//		return address3;
//	}
//
//	public void setAddress3(String address3) {
//		this.address3 = address3;
//	}
//
//	public String getCity() {
//		return city;
//	}
//
//	public void setCity(String city) {
//		this.city = city;
//	}
//
//	public String getState() {
//		return state;
//	}
//
//	public void setState(String state) {
//		this.state = state;
//	}
//
//	public String getCountry() {
//		return country;
//	}
//
//	public void setCountry(String country) {
//		this.country = country;
//	}
//
//	public String getPhone() {
//		return phone;
//	}
//
//	public void setPhone(String phone) {
//		this.phone = phone;
//	}
//
//	public String getAlternatePhone() {
//		return alternatePhone;
//	}
//
//	public void setAlternatePhone(String alternatePhone) {
//		this.alternatePhone = alternatePhone;
//	}
//
//	public String getFax() {
//		return fax;
//	}
//
//	public void setFax(String fax) {
//		this.fax = fax;
//	}
//
//	public String getContactPerson() {
//		return contactPerson;
//	}
//
//	public void setContactPerson(String contactPerson) {
//		this.contactPerson = contactPerson;
//	}

	public Boolean isActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

//	public String getComment() {
//		return comment;
//	}
//
//	public void setComment(String comment) {
//		this.comment = comment;
//	}
//
//	public Integer getSiteId() {
//		return siteId;
//	}
//
//	public void setSiteId(Integer siteId) {
//		this.siteId = siteId;
//	}
//
//	public String getZip() {
//		return zip;
//	}
//
//	public void setZip(String zip) {
//		this.zip = zip;
//	}
//
//	public String getOrgCode() {
//		return orgCode;
//	}
//
//	public void setOrgCode(String orgCode) {
//		this.orgCode = orgCode;
//	}

	
	public List<ProductLine> getVarProductLine() {
		return varProductLine;
	}

	public void setVarProductLine(List<ProductLine> varProductLine) {
		this.varProductLine = varProductLine;
	}
	
	private transient int productLineCount;
	private transient int addressCount;
	
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


	@Override
	public Response getEntities(UriInfo ui, HttpHeaders hh) {
		Response.ResponseBuilder rb = null;
		Map<?, ?> entitiesMap=null;
		try {
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			MultivaluedMap<String, String> queryParamMap =ui.getQueryParameters();
			mapper.addMixIn(Partner.class,PartnerMixIn.class);
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
	
	@GET
	@Path("/all")
	public Response getAllPartnerList(@Context UriInfo ui, @Context HttpHeaders hh) {
		Response.ResponseBuilder rb = null;
		Map<String, Object> responseMap = new HashMap<String, Object>();
		List<Partner> partnerList = null;
		try {
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			mapper.addMixIn(Partner.class,PartnerMixIn.class);
			mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
			PartnerService partnerService = (PartnerService) SpringConfig
					.getInstance().getBean("partnerService");
			partnerList = partnerService.readAll();
			/**if (siteId == null || siteId.isEmpty() || siteId.equals("1")) {	*/			
			if (partnerList == null || partnerList.isEmpty())
				throw new Exception("Unable to find partners");
			Collections.sort(partnerList,new PartnerComprator());
			responseMap.put("partners", partnerList);
			mapper.writeValue(writer, responseMap);
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
		Boolean partnerExist=false;
		Map<String,Object> responseMap=new HashMap<String,Object>();
		try {
			ObjectMapper mapper = new ObjectMapper();
			StringWriter writer = new StringWriter();
			mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,
					false);
			mapper.configure(DeserializationFeature.UNWRAP_ROOT_VALUE, false);
			Partner partner = mapper.readValue(data, Partner.class);
			partner.setCreatedDate(new Date());
			PartnerService partnerService = (PartnerService) SpringConfig
					.getInstance().getBean("partnerService");
			partnerExist = partnerService.checkDuplicatePartnerName(partner);
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
			if (partnerExist) {
				responseMap.put("valueExist",true);
				mapper.writeValue(writer, responseMap);
			}else{
				id = partnerService.create(partner);
				responseMap.put("valueExist",false);
				responseMap.put("id",id);
				mapper.writeValue(writer, responseMap);
			}
			return Response.ok(writer.toString()).build();
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
		Map<String,Object> responseMap=new HashMap<String,Object>();
		String userId="";
		try {
			Map<String, String> jsonMap = ApplicationUtils.convertJSONtoMaps(data);
			ObjectMapper mapper = new ObjectMapper();
			StringWriter writer = new StringWriter();
			mapper.addMixIn(Partner.class,PartnerMixIn.class);
			mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,
					false);
			mapper.configure(DeserializationFeature.UNWRAP_ROOT_VALUE, false);
			PartnerService partnerService = (PartnerService) SpringConfig
					.getInstance().getBean("partnerService");
			Partner partner = partnerService.read(Long.parseLong(id));
			if (partner == null) {
				throw new WebApplicationException(Response
						.status(Status.BAD_REQUEST)
						.entity("Partner entity with id \"" + id
								+ "\" doesn't exist")
						.type(MediaType.TEXT_PLAIN_TYPE).build());
			}
			ObjectReader updater = mapper.readerForUpdating(partner);
			partner = updater.readValue(data);
			boolean valueExist = partnerService.checkDuplicatePartnerName(partner);
			if (valueExist) {
				responseMap.put("valueExist",true);
				mapper.writeValue(writer, responseMap);
			}else{
				userId=jsonMap.get("userId");
				partner.setLastModifiedBy(userId);
				partnerService.update(partner);
				responseMap.put("valueExist",false);
				responseMap.put("productline",partner);
				mapper.writeValue(writer, responseMap);
			}
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
