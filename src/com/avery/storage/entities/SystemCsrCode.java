package com.avery.storage.entities;

import java.io.StringWriter;
import java.util.Map;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.UriInfo;

import org.apache.commons.lang.math.NumberUtils;

import com.avery.app.config.SpringConfig;
import com.avery.logging.AppLogger;
import com.avery.storage.MainAbstractEntity;
import com.avery.storage.service.SystemCsrCodeService;
import com.fasterxml.jackson.databind.ObjectMapper;

@Entity
@Table(name = "systemcsrcode")
@Path("systemcsrcode")
public class SystemCsrCode extends MainAbstractEntity {

	private static final long serialVersionUID = 1833552362987121156L;

	@Column(name = "systemId")
	private int systemId;

	@Column(name = "orgId")
	private int orgId;
	
	@Column(name = "csrCode", length = 45)
	private String csrCode;
	
	@Column(name = "isActive", length = 10)
	private String isActive;

	/* Business Logic Starts */

	@GET
	@Path("/list")
	public Response getBySystemAndOrgCodeId(@Context UriInfo ui, @Context HttpHeaders hh,
			@QueryParam("system") String system, @QueryParam("org") String org) {
		Response.ResponseBuilder rb = null;
		Map<String, Object> responseMap = null;
		if(!NumberUtils.isNumber(system) | !NumberUtils.isNumber(org))
			return Response.ok("Invalid Input", MediaType.TEXT_HTML).status(Status.NOT_ACCEPTABLE).build();
		int systemId = Integer.parseInt(system);
		int orgId = Integer.parseInt(org);
		try {
			ObjectMapper mapper = new ObjectMapper();
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
	
	/* Business Logic Ends */

	// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	public int getSystemId() {
		return systemId;
	}

	public void setSystemId(int systemId) {
		this.systemId = systemId;
	}

	public int getOrgId() {
		return orgId;
	}

	public void setOrgId(int orgId) {
		this.orgId = orgId;
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
	
}
