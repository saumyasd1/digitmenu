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
import com.avery.storage.MixIn.WiAocFieldMixIn;
import com.avery.storage.service.WiAocFieldService;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * @author Vishal
 *
 */
@Entity
@Table(name = "wi_aocfield")
@Path("aocfield")
public class WiAocField extends MainAbstractEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public WiAocField() {

	}

	@Column(name = "validation", length = 500)
	private String validation;

	@Column(name = "fieldValueExample", length = 500)
	private String fieldValueExample;

	@Column(name = "logic", length = 500)
	private String logic;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "wi_Id")
	Wi varWi;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "wiAOCFieldNameInfo_id")
	WiAocFieldNameInfo varWiAocFieldNameInfo;

	public String getValidation() {
		return validation;
	}

	public void setValidation(String validation) {
		this.validation = validation;
	}

	public String getAocFieldName() {
		return aocFieldName;
	}

	public void setAocFieldName(String aocFieldName) {
		this.aocFieldName = aocFieldName;
	}

	public String getFieldValueExample() {
		return fieldValueExample;
	}

	public void setFieldValueExample(String fieldValueExample) {
		this.fieldValueExample = fieldValueExample;
	}

	public String getLogic() {
		return logic;
	}

	public void setLogic(String logic) {
		this.logic = logic;
	}

	public Wi getVarWi() {
		return varWi;
	}

	public void setVarWi(Wi varWi) {
		this.varWi = varWi;
	}

	public WiAocFieldNameInfo getVarWiAocFieldNameInfo() {
		return varWiAocFieldNameInfo;
	}

	public void setVarWiAocFieldNameInfo(WiAocFieldNameInfo varWiAocFieldNameInfo) {
		this.varWiAocFieldNameInfo = varWiAocFieldNameInfo;
	}

	@Transient
	private long parentId;

	@Transient
	private String aocFieldName;

	public long getParentId() {
		return parentId;
	}

	public void setParentId(long parentId) {
		this.parentId = parentId;
	}

	@Override
	public Response getEntities(UriInfo ui, HttpHeaders hh) {
		Response.ResponseBuilder rb = null;
		List<WiAocField> wiAocField = null;
		try {
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			mapper.addMixIn(WiAocField.class, WiAocFieldMixIn.class);
			WiAocFieldService wiAocFieldService = (WiAocFieldService) SpringConfig.getInstance()
					.getBean("wiAocFieldService");
			wiAocField = wiAocFieldService.readAll();
			mapper.writeValue(writer, wiAocField);
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
	@Path("fielddata")
	public Response getEntitiesByWiId(@Context UriInfo ui, @Context HttpHeaders hh, @QueryParam("id") String id) {
		Map<?, ?> entitiesMap = null;
		Response.ResponseBuilder rb = null;
		try {
			Long entityId = Long.parseLong(id);
			ObjectMapper mapper = new ObjectMapper();
			StringWriter writer = new StringWriter();
			mapper.addMixIn(WiAocField.class, WiAocFieldMixIn.class);
			WiAocFieldService wiAocFieldService = (WiAocFieldService) SpringConfig.getInstance()
					.getBean("wiAocFieldService");
			entitiesMap = wiAocFieldService.getEntitiesByWiId(entityId);
			mapper.writeValue(writer, entitiesMap);
			rb = Response.ok(writer.toString());
		} catch (Exception e) {
			e.printStackTrace();
			throw new WebApplicationException(Response.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e)).type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		return rb.build();
	}

}
