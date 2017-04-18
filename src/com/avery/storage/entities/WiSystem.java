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
import com.avery.storage.MixIn.WiSystemInfoMixIn;
import com.avery.storage.MixIn.WiSystemMixIn;
import com.avery.storage.service.WiSystemService;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * @author Vishal
 *
 */
@Entity
@Table(name = "wi_system")
@Path("wisystem")
public class WiSystem extends MainAbstractEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public WiSystem() {

	}

	@Column(name = "splitByShipSet", length = 50)
	private String splitByShipSet;

	@Column(name = "manufacturing", length = 100)
	private String manufacturing;

	@Column(name = "packingInstruction", length = 100)
	private String packingInstruction;

	@Column(name = "csrName", length = 50)
	private String csrName;

	@Column(name = "artWorkHold", length = 50)
	private String artWorkHold;

	@Column(name = "shipMark", length = 50)
	private String shipMark;

	@Column(name = "invoiceLineInstruction", length = 100)
	private String invoiceLineInstruction;

	@Column(name = "variableDataBreakdown", length = 100)
	private String variableDataBreakdown;

	@Column(name = "defaultOrg", length = 50)
	private String defaultOrg;
	
	@Column(name = "defaultSelected")
	private boolean defaultSelected;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "wi_id")
	Wi varWi;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "wiSystemInfo_id")
	WiSystemInfo varWiSystemInfo;

	@Override
	public Response getEntities(UriInfo ui, HttpHeaders hh) {
		Response.ResponseBuilder rb = null;
		List<WiSystem> wiSystem = null;
		try {
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			mapper.addMixIn(WiSystem.class, WiSystemMixIn.class);
			WiSystemService wiSystemService = (WiSystemService) SpringConfig.getInstance().getBean("wiSystemService");
			wiSystem = wiSystemService.readAll();
			mapper.writeValue(writer, wiSystem);
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
	@Path("system")
	public Response getEntitiesByWiId(@Context UriInfo ui, @Context HttpHeaders hh, @QueryParam("id") String id){
		Map<?, ?> entitiesMap = null;
		Response.ResponseBuilder rb = null;
		try{
			Long entityId = Long.parseLong(id);
			ObjectMapper mapper = new ObjectMapper();
			StringWriter writer = new StringWriter();
			mapper.addMixIn(WiSystem.class, WiSystemMixIn.class);
			mapper.addMixIn(WiSystemInfo.class, WiSystemInfoMixIn.class);
			WiSystemService wiSystemService = (WiSystemService) SpringConfig.getInstance().getBean("wiSystemService");
			entitiesMap = wiSystemService.getEntitiesByWiId(entityId);
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
	
	////////////////////////////////////////////////////////////////////////////////////////////
	
	public String getSplitByShipSet() {
		return splitByShipSet;
	}

	public void setSplitByShipSet(String splitByShipSet) {
		this.splitByShipSet = splitByShipSet;
	}

	public String getManufacturing() {
		return manufacturing;
	}

	public void setManufacturing(String manufacturing) {
		this.manufacturing = manufacturing;
	}

	public String getPackingInstruction() {
		return packingInstruction;
	}

	public void setPackingInstruction(String packingInstruction) {
		this.packingInstruction = packingInstruction;
	}

	public String getCsrName() {
		return csrName;
	}

	public void setCsrName(String csrName) {
		this.csrName = csrName;
	}

	public String getArtWorkHold() {
		return artWorkHold;
	}

	public void setArtWorkHold(String artWorkHold) {
		this.artWorkHold = artWorkHold;
	}

	public String getShipMark() {
		return shipMark;
	}

	public void setShipMark(String shipMark) {
		this.shipMark = shipMark;
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

	public String getDefaultOrg() {
		return defaultOrg;
	}

	public void setDefaultOrg(String defaultOrg) {
		this.defaultOrg = defaultOrg;
	}

	public boolean isDefaultSelected() {
		return defaultSelected;
	}

	public void setDefaultSelected(boolean defaultSelected) {
		this.defaultSelected = defaultSelected;
	}

	public Wi getVarWi() {
		return varWi;
	}

	public void setVarWi(Wi varWi) {
		this.varWi = varWi;
	}

	public WiSystemInfo getVarWiSystemInfo() {
		return varWiSystemInfo;
	}

	public void setVarWiSystemInfo(WiSystemInfo varWiSystemInfo) {
		this.varWiSystemInfo = varWiSystemInfo;
	}
	
	@Transient
	private long parentId;
	
	@Transient
	private String systemName;

	public long getParentId() {
		return parentId;
	}

	public void setParentId(long parentId) {
		this.parentId = parentId;
	}

	public String getSystemName() {
		return systemName;
	}

	public void setSystemName(String systemName) {
		this.systemName = systemName;
	}

}
