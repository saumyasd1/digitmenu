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
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.UriInfo;

import org.apache.commons.lang.exception.ExceptionUtils;
import org.apache.commons.lang.math.NumberUtils;

import com.avery.app.config.SpringConfig;
import com.avery.exception.CsrCodeNotFoundException;
import com.avery.logging.AppLogger;
import com.avery.storage.MainAbstractEntity;
import com.avery.storage.MixIn.OrgMixIn;
import com.avery.storage.MixIn.SystemCsrCodeMixIn;
import com.avery.storage.MixIn.SystemInfoMixIn;
import com.avery.storage.service.SystemCsrCodeService;
import com.avery.utils.MessageUtils;
import com.fasterxml.jackson.databind.ObjectMapper;

@Entity
@Table(name = "systemcsrcode")
@Path("systemcsrcode")
public class SystemCsrCode extends MainAbstractEntity {

	private static final long serialVersionUID = 1833552362987121156L;

	@Column(name = "csrCode", length = 45)
	private String csrCode;
	
	@Column(name = "isActive", length = 10)
	private String isActive;
	
	@Column(name = "hasOwner", length = 10)
	private String hasOwner;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="systemId")
	private SystemInfo varSystemInfo;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="orgId")
	private Org varOrg;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="ownerId")
	private User varUser;
		
	private transient long systemId;
	
	private transient int siteId;
		
	private transient long orgCodeId;
	
	private transient String systemName;
	
	private transient String orgCode;
	
	private transient String firstName;
	
	private transient String middleName;
	
	private transient String lastName;
	
	private transient long userId;
	
	
	/* Business Logic Starts */
	
	

	@GET
	@Path("/list")
	public Response getBySystemAndOrgCodeId(@Context UriInfo ui, @Context HttpHeaders hh
		, @QueryParam("system") String system, @QueryParam("org") String org) {
		Response.ResponseBuilder rb = null;
		Map<String, Object> responseMap = null;
		if(!NumberUtils.isNumber(system) | !NumberUtils.isNumber(org))
			return Response.ok("Invalid Input", MediaType.TEXT_HTML).status(Status.NOT_ACCEPTABLE).build();
		long systemId = Long.parseLong(system);
		long orgId = Long.parseLong(org);
		try {
			ObjectMapper mapper = new ObjectMapper();
			mapper.addMixIn(SystemCsrCode.class, SystemCsrCodeMixIn.class);
			StringWriter writer = new StringWriter();
			SystemCsrCodeService systemCsrCodeService = (SystemCsrCodeService) SpringConfig.getInstance()
					.getBean("systemCsrCodeService");
			responseMap = systemCsrCodeService.getBySystemAndOrgCodeId(systemId, orgId);
			if(responseMap == null)
				return Response.ok("Unable to fetch any data", MediaType.TEXT_HTML).status(Status.INTERNAL_SERVER_ERROR).build();
			mapper.writeValue(writer, responseMap);
			rb = Response.ok(writer.toString());
		} catch (Exception e) {
			AppLogger.getSystemLogger().error("Some error occured while fetching the data -> "+e);
			return Response.ok("Some error occured while fetching the data", MediaType.TEXT_HTML).status(Status.INTERNAL_SERVER_ERROR).build();
		}
		return rb.build();
	}
	
	@Override
	public Response getEntities(UriInfo ui, HttpHeaders hh) {
		Response.ResponseBuilder rb = null;
		MultivaluedMap queryMap = ui.getQueryParameters();
		Map entitiesMap = new HashMap();
		try {
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			mapper.addMixIn(SystemCsrCode.class, SystemCsrCodeMixIn.class);
			SystemCsrCodeService systemCsrCodeService = (SystemCsrCodeService) SpringConfig.getInstance()
					.getBean("systemCsrCodeService");
			entitiesMap = systemCsrCodeService.readWithCriteria(queryMap);
			if(entitiesMap == null)
				return Response.ok("Error in fetching Data", MediaType.TEXT_HTML).status(Status.INTERNAL_SERVER_ERROR).build();
			mapper.writeValue(writer, entitiesMap);
			rb = Response.ok(writer.toString());
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error("Error in fetching Data ", ex);
			throw ex;
		} catch(NumberFormatException nfe){
			return Response.ok("Wrong data entered", MediaType.TEXT_HTML).status(Status.BAD_REQUEST).build();
		}catch (Exception e) {
			AppLogger.getSystemLogger().error("Error in fetching Data ", e);
			throw new WebApplicationException(Response.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e)).type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		return rb.build();
	}
	
	@GET
	@Path("/codelist")
	public Response getAllCsrCodeList(@Context UriInfo ui, @Context HttpHeaders hh) {
		Response.ResponseBuilder rb = null;
		Map<String, Object> responseMap = new HashMap<String, Object>();
		List<SystemCsrCode> systemCsrCodeList = null;
		try {
			ObjectMapper mapper = new ObjectMapper();
			mapper.addMixIn(SystemCsrCode.class, SystemCsrCodeMixIn.class);
			mapper.addMixIn(SystemInfo.class, SystemInfoMixIn.class);
			mapper.addMixIn(Org.class, OrgMixIn.class);
			StringWriter writer = new StringWriter();
			SystemCsrCodeService systemCsrCodeService = (SystemCsrCodeService) SpringConfig.getInstance()
					.getBean("systemCsrCodeService");
			systemCsrCodeList = systemCsrCodeService.readAll();
			if(systemCsrCodeList == null)
				return Response.ok("Unable to fetch any data", MediaType.TEXT_HTML).status(Status.INTERNAL_SERVER_ERROR).build();
			responseMap.put("data", systemCsrCodeList);
			mapper.writeValue(writer, responseMap);
			rb = Response.ok(writer.toString());
		} catch (Exception e) {
			AppLogger.getSystemLogger().error("Some error occured while fetching the data -> "+e);
			return Response.ok("Some error occured while fetching the data", MediaType.TEXT_HTML).status(Status.INTERNAL_SERVER_ERROR).build();
		}
		return rb.build();
	}
	
	@GET
	@Path("/remove/csrcode")
	public Response removeCSRCode(@Context UriInfo ui, @Context HttpHeaders hh, @QueryParam("id") String id) {
		Response.ResponseBuilder rb = null;
		Map<String, Object> responseMap = new HashMap<String, Object>();
		if(!NumberUtils.isNumber(id.trim()))
			return Response.ok("Wrong input", MediaType.TEXT_HTML).status(Status.BAD_REQUEST).build();
		try {
			ObjectMapper mapper = new ObjectMapper();
			StringWriter writer = new StringWriter();
			SystemCsrCodeService systemCsrCodeService = (SystemCsrCodeService) SpringConfig.getInstance()
					.getBean("systemCsrCodeService");
			boolean flag = systemCsrCodeService.removeCSRCode(id.trim());
			responseMap.put("success", flag);
			if(flag){
				responseMap.put("message", MessageUtils.CSRCODE_REMOVE_SUCCESS);
			}
			else{
				responseMap.put("message", MessageUtils.CSRCODE_REMOVE_FAILURE);
			}
			mapper.writeValue(writer, responseMap);
			rb = Response.ok(writer.toString());
		} catch(CsrCodeNotFoundException e){
			AppLogger.getSystemLogger().error(MessageUtils.CSRCODE_REMOVE_FAILURE+" -> "+e);
			return Response.ok("No CSR Code found", MediaType.TEXT_HTML).status(Status.NOT_FOUND).build();
		}
		catch (Exception e) {
			AppLogger.getSystemLogger().error(MessageUtils.CSRCODE_REMOVE_FAILURE+" -> "+e);
			return Response.ok(MessageUtils.CSRCODE_REMOVE_FAILURE, MediaType.TEXT_HTML).status(Status.INTERNAL_SERVER_ERROR).build();
		}
		return rb.build();
	}
	
	/* Business Logic Ends */
	
	////////////////////////////////////////////////////////////////////////////////////
	
	public long getUserId() {
		return userId;
	}

	public void setUserId(long userId) {
		this.userId = userId;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getMiddleName() {
		return middleName;
	}

	public void setMiddleName(String middleName) {
		this.middleName = middleName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public int getSiteId() {
		return siteId;
	}

	public void setSiteId(int siteId) {
		this.siteId = siteId;
	}

	public String getCsrCode() {
		return csrCode;
	}

	public void setCsrCode(String csrCode) {
		this.csrCode = csrCode;
	}

	public String getIsActive() {
		return isActive;
	}

	public void setIsActive(String isActive) {
		this.isActive = isActive;
	}
	
	public String getHasOwner() {
		return hasOwner;
	}

	public void setHasOwner(String hasOwner) {
		this.hasOwner = hasOwner;
	}
	
	public SystemInfo getVarSystemInfo() {
		return varSystemInfo;
	}

	public User getVarUser() {
		return varUser;
	}

	public void setVarUser(User varUser) {
		this.varUser = varUser;
	}

	public void setVarSystemInfo(SystemInfo varSystemInfo) {
		this.varSystemInfo = varSystemInfo;
	}

	public Org getVarOrg() {
		return varOrg;
	}

	public void setVarOrg(Org varOrg) {
		this.varOrg = varOrg;
	}

	public long getSystemId() {
		return systemId;
	}

	public void setSystemId(long systemId) {
		this.systemId = systemId;
	}

	public long getOrgCodeId() {
		return orgCodeId;
	}

	public void setOrgCodeId(long orgCodeId) {
		this.orgCodeId = orgCodeId;
	}

	public String getSystemName() {
		return systemName;
	}

	public void setSystemName(String systemName) {
		this.systemName = systemName;
	}

	public String getOrgCode() {
		return orgCode;
	}

	public void setOrgCode(String orgCode) {
		this.orgCode = orgCode;
	}

}
