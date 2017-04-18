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
import com.avery.storage.MixIn.WiSystemLevelMixIn;
import com.avery.storage.service.WiSystemLevelService;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * @author Vishal
 *
 */
@Entity
@Table(name = "wi_systemlevel")
@Path("wisystemlevel")
public class WiSystemLevel extends MainAbstractEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public WiSystemLevel() {

	}

	@Column(name = "rboFactStrucSpecific", length = 250)
	private String rboFactStrucSpecific;

	@Column(name = "productLine", length = 50)
	private String productLine;

	@Column(name = "systemOrderLineFiberLevel", length = 100)
	private String systemOrderLineFiberLevel;

	@Column(name = "defaultValueFieldLocation", length = 250)
	private String defaultValueFieldLocation;

	@Column(name = "fieldName", length = 50)
	private String fieldName;

	@Column(name = "additionalLogicValidation", length = 250)
	private String additionalLogicValidation;

	@Column(name = "reference", length = 500)
	private String reference;

	@Column(name = "defaultCaptureComplicatedLogic", length = 250)
	private String defaultCaptureComplicatedLogic;
	
	@Column(name = "legacyFieldName", length = 100)
	private String legacyFieldName;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "wi_Id")
	Wi varWi;

	@Override
	public Response getEntities(UriInfo ui, HttpHeaders hh) {
		Response.ResponseBuilder rb = null;
		List<WiSystemLevel> wiSystemLevel = null;
		try {
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			mapper.addMixIn(WiSystemLevel.class, WiSystemLevelMixIn.class);
			WiSystemLevelService wiSystemLevelService = (WiSystemLevelService) SpringConfig.getInstance()
					.getBean("wiSystemLevelService");
			wiSystemLevel = wiSystemLevelService.readAll();
			mapper.writeValue(writer, wiSystemLevel);
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
	@Path("systemlevel")
	public Response getEntitiesByWiId(@Context UriInfo ui, @Context HttpHeaders hh, @QueryParam("id") String id) {
		Map<?, ?> entitiesMap = null;
		Response.ResponseBuilder rb = null;
		try {
			Long entityId = Long.parseLong(id);
			ObjectMapper mapper = new ObjectMapper();
			StringWriter writer = new StringWriter();
			mapper.addMixIn(WiSystemLevel.class, WiSystemLevelMixIn.class);
			WiSystemLevelService wiSystemLevelService = (WiSystemLevelService) SpringConfig.getInstance()
					.getBean("wiSystemLevelService");
			entitiesMap = wiSystemLevelService.getEntitiesByWiId(entityId);
			mapper.writeValue(writer, entitiesMap);
			rb = Response.ok(writer.toString());
		} catch (Exception e) {
			e.printStackTrace();
			throw new WebApplicationException(Response.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e)).type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		return rb.build();
	}
	
	//////////////////////////////////////////////////////////////////////////////////////////////
	
	public String getRboFactStrucSpecific() {
		return rboFactStrucSpecific;
	}

	public void setRboFactStrucSpecific(String rboFactStrucSpecific) {
		this.rboFactStrucSpecific = rboFactStrucSpecific;
	}

	public String getProductLine() {
		return productLine;
	}

	public void setProductLine(String productLine) {
		this.productLine = productLine;
	}

	public String getSystemOrderLineFiberLevel() {
		return systemOrderLineFiberLevel;
	}

	public void setSystemOrderLineFiberLevel(String systemOrderLineFiberLevel) {
		this.systemOrderLineFiberLevel = systemOrderLineFiberLevel;
	}

	public String getDefaultValueFieldLocation() {
		return defaultValueFieldLocation;
	}

	public void setDefaultValueFieldLocation(String defaultValueFieldLocation) {
		this.defaultValueFieldLocation = defaultValueFieldLocation;
	}

	public String getFieldName() {
		return fieldName;
	}

	public void setFieldName(String fieldName) {
		this.fieldName = fieldName;
	}

	public String getAdditionalLogicValidation() {
		return additionalLogicValidation;
	}

	public void setAdditionalLogicValidation(String additionalLogicValidation) {
		this.additionalLogicValidation = additionalLogicValidation;
	}

	public String getReference() {
		return reference;
	}

	public void setReference(String reference) {
		this.reference = reference;
	}

	public String getDefaultCaptureComplicatedLogic() {
		return defaultCaptureComplicatedLogic;
	}

	public void setDefaultCaptureComplicatedLogic(String defaultCaptureComplicatedLogic) {
		this.defaultCaptureComplicatedLogic = defaultCaptureComplicatedLogic;
	}

	public String getLegacyFieldName() {
		return legacyFieldName;
	}

	public void setLegacyFieldName(String legacyFieldName) {
		this.legacyFieldName = legacyFieldName;
	}

	public Wi getVarWi() {
		return varWi;
	}

	public void setVarWi(Wi varWi) {
		this.varWi = varWi;
	}
}
