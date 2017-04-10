package com.avery.storage.entities;

import java.io.StringWriter;
import java.util.List;
import java.util.Map;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;
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
import com.avery.storage.MainAbstractEntity;
import com.avery.storage.MixIn.WiOrgInfoMixIn;
import com.avery.storage.MixIn.WiOrgMixIn;
import com.avery.storage.service.WiOrgService;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * @author Vishal
 *
 */
@Entity
@Table(name = "wi_org")
@Path("wiorg")
public class WiOrg extends MainAbstractEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public WiOrg() {

	}

	@Column(name = "shippingInstruction", length = 100)
	private String shippingInstruction;

	@Column(name = "shippingMethod", length = 100)
	private String shippingMethod;

	@Column(name = "freightTerm", length = 100)
	private String freightTerm;

	@Column(name = "billToCode", length = 50)
	private String billToCode;

	@Column(name = "shipToCode", length = 50)
	private String shipToCode;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "wi_id")
	Wi varWi;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "wiOrgInfo_id")
	WiOrgInfo varWiOrgInfo;

	public String getShippingInstruction() {
		return shippingInstruction;
	}

	public void setShippingInstruction(String shippingInstruction) {
		this.shippingInstruction = shippingInstruction;
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

	public Wi getVarWi() {
		return varWi;
	}

	public void setVarWi(Wi varWi) {
		this.varWi = varWi;
	}

	public WiOrgInfo getVarWiOrgInfo() {
		return varWiOrgInfo;
	}

	public void setVarWiOrgInfo(WiOrgInfo varWiOrgInfo) {
		this.varWiOrgInfo = varWiOrgInfo;
	}
	
	@Transient
	private long parentId;
	
	@Transient
	private String orgName;
	
	@Transient
	private String siteName;
	
	@Transient
	private String systemName;

	public String getOrgName() {
		return orgName;
	}

	public void setOrgName(String orgName) {
		this.orgName = orgName;
	}

	public String getSiteName() {
		return siteName;
	}

	public void setSiteName(String siteName) {
		this.siteName = siteName;
	}

	public String getSystemName() {
		return systemName;
	}

	public void setSystemName(String systemName) {
		this.systemName = systemName;
	}

	public long getParentId() {
		return parentId;
	}

	public void setParentId(long parentId) {
		this.parentId = parentId;
	}

	@Override
	public Response getEntities(UriInfo ui, HttpHeaders hh) {
		Response.ResponseBuilder rb = null;
		List<WiOrg> wiOrg = null;
		try {
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			mapper.addMixIn(WiOrg.class, WiOrgMixIn.class);
			WiOrgService wiOrgService = (WiOrgService) SpringConfig.getInstance().getBean("wiOrgService");
			wiOrg = wiOrgService.readAll();
			mapper.writeValue(writer, wiOrg);
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
	
	@GET
	@Path("org")
	public Response getEntitiesByWiId(@Context UriInfo ui, @Context HttpHeaders hh, @QueryParam("id") String id){
		Map<?, ?> entitiesMap = null;
		Response.ResponseBuilder rb = null;
		try{
			Long entityId = Long.parseLong(id);
			ObjectMapper mapper = new ObjectMapper();
			StringWriter writer = new StringWriter();
			mapper.addMixIn(WiOrg.class, WiOrgMixIn.class);
			mapper.addMixIn(WiOrgInfo.class, WiOrgInfoMixIn.class);
			WiOrgService wiOrgService = (WiOrgService) SpringConfig.getInstance().getBean("wiOrgService");
			entitiesMap = wiOrgService.getEntitiesByWiId(entityId);
			mapper.writeValue(writer, entitiesMap);
			rb = Response.ok(writer.toString());
		}
		catch(Exception e){
			e.printStackTrace();
			throw new WebApplicationException(Response.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e)).type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		return rb.build();
	}

}
