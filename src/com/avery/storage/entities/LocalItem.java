package com.avery.storage.entities;

import java.io.StringWriter;
import java.util.HashMap;
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
import com.avery.storage.MainAbstractEntity;
import com.avery.storage.service.LocalItemService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

/**
 * @author Vishal
 *
 */
@Entity
@Table(name = "localitem")
@Path("localitem")
public class LocalItem extends MainAbstractEntity {
	/**
	 * 
	 */

	public LocalItem() {

	}

	private static final long serialVersionUID = -2512073737961840032L;

	@Column(name = "system", length = 500)
	private String system;

//	@Column(name = "site", length = 50)
//	private String site;

	@Column(name = "partnerName", length = 500)
	private String partnerName;

	@Column(name = "rboName", length = 500)
	private String rboName;

	@Column(name = "customerItemNO", length = 250)
	private String customerItemNO;

	@Column(name = "identifierValue", length = 250)
	private String identifierValue;

//	@Column(name = "identifierVariable", length = 250)
//	private String identifierVariable;

//	@Column(name = "internalItemNo", length = 250)
//	private String internalItemNo;

//	@Column(name = "cancelItem")
//	private Boolean cancelItem;

	@Column(name = "glid", length = 100)
	private String glid;

	@Column(name = "orgCode", length = 50)
	private String orgCode;

	@Override
	public Response getEntities(UriInfo ui, HttpHeaders hh) {
		Response.ResponseBuilder rb = null;
		Map<?, ?> entitiesMap = new HashMap();
		try {
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			MultivaluedMap<String, String> queryParamMap = ui.getQueryParameters();
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
			LocalItemService localItemService = (LocalItemService) SpringConfig.getInstance()
					.getBean("localItemService");
			entitiesMap = localItemService.readWithCriteria(queryParamMap);
			if (entitiesMap == null || entitiesMap.isEmpty())
				throw new Exception("Unable to find any data");
			mapper.writeValue(writer, entitiesMap);
			rb = Response.ok(writer.toString());
		} catch (WebApplicationException ex) {
			throw ex;
		} catch (Exception e) {
			e.printStackTrace();
			throw new WebApplicationException(Response.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e)).type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		return rb.build();

	}

	/////////////////////////////////////////////////////////////////////////////////////////////////////////

	public String getSystem() {
		return system;
	}

	public void setSystem(String system) {
		this.system = system;
	}

//	public String getSite() {
//		return site;
//	}
//
//	public void setSite(String site) {
//		this.site = site;
//	}

	public String getPartnerName() {
		return partnerName;
	}

	public void setPartnerName(String partnerName) {
		this.partnerName = partnerName;
	}

	public String getRboName() {
		return rboName;
	}

	public void setRboName(String rboName) {
		this.rboName = rboName;
	}

	public String getCustomerItemNO() {
		return customerItemNO;
	}

	public void setCustomerItemNO(String customerItemNO) {
		this.customerItemNO = customerItemNO;
	}

	public String getIdentifierValue() {
		return identifierValue;
	}

	public void setIdentifierValue(String identifierValue) {
		this.identifierValue = identifierValue;
	}

//	public String getIdentifierVariable() {
//		return identifierVariable;
//	}
//
//	public void setIdentifierVariable(String identifierVariable) {
//		this.identifierVariable = identifierVariable;
//	}
//
//	public String getInternalItemNo() {
//		return internalItemNo;
//	}
//
//	public void setInternalItemNo(String internalItemNo) {
//		this.internalItemNo = internalItemNo;
//	}
//
//	public Boolean getCancelItem() {
//		return cancelItem;
//	}
//
//	public void setCancelItem(Boolean cancelItem) {
//		this.cancelItem = cancelItem;
//	}

	public String getGlid() {
		return glid;
	}

	public void setGlid(String glid) {
		this.glid = glid;
	}

	public String getOrgCode() {
		return orgCode;
	}

	public void setOrgCode(String orgCode) {
		this.orgCode = orgCode;
	}

}
