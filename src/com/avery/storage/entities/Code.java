package com.avery.storage.entities;

import java.io.StringWriter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.UriInfo;

import org.apache.commons.lang.exception.ExceptionUtils;

import com.avery.app.config.SpringConfig;
import com.avery.logging.AppLogger;
import com.avery.storage.MainAbstractEntity;
import com.avery.storage.service.CodeService;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;
import com.fasterxml.jackson.databind.SerializationFeature;

@Entity
@Table(name = "statuscode")
@Path("code")
public class Code extends MainAbstractEntity {
	
	private static final long serialVersionUID = -7583544833630759455L;

	@Column(name = "type", length = 50)
    private String type; 
	
	@Column(name = "code",columnDefinition = "varchar(1000)")
    private String code;  
	
	@Column(name = "value",columnDefinition = "varchar(1000)")
    private String value;  
	
	@Column(name = "comment",columnDefinition = "varchar(1000)")
    private String comment;  

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}
	
	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	@Override
	public Response getEntities(UriInfo ui, HttpHeaders hh) {
		Response.ResponseBuilder rb = null;
		List<Code> Code = null;
		try {
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, true);
			CodeService CodeService = (CodeService) SpringConfig
					.getInstance().getBean("codeService");
			Code = CodeService.readAll();
			if (Code == null)
				throw new Exception("Unable to find order configuration");
			mapper.writeValue(writer, Code);
			rb = Response.ok(writer.toString());
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error in fetching order configuration " , ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error in fetching order configuration " ,e);
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
			Code Code = mapper.readValue(data, Code.class);
			Code.setCreatedDate(new Date());
			CodeService CodeService = (CodeService) SpringConfig
					.getInstance().getBean("codeService");
			id = CodeService.create(Code);
			return Response.ok(id).build();
		}catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error in creating order configuration " , ex);
			throw ex;
		}
		catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error in creating order configuration " , e);
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
			mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,
					false);
			// toggle this property value based on your input JSON data
			mapper.configure(DeserializationFeature.UNWRAP_ROOT_VALUE, false);
			CodeService CodeService = (CodeService) SpringConfig
					.getInstance().getBean("codeService");
			// read existing entity from database
			Code Code = CodeService.read(Long.parseLong(id));
			if (Code == null) {
				throw new WebApplicationException(Response
						.status(Status.BAD_REQUEST)
						.entity("Order configuration entity with id \"" + id
								+ "\" doesn't exist")
						.type(MediaType.TEXT_PLAIN_TYPE).build());
			}
			ObjectReader updater = mapper.readerForUpdating(Code);
			// build updated entity object from input data
			Code = updater.readValue(data);
			// update entity in database
			CodeService.update(Code);
			// prepare response
			mapper.writeValue(writer, Code);
			rb = Response.ok(writer.toString());
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error in updating order configuration entity with id " + id, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error in updating order configuration entity with id " + id, e);
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
			CodeService CodeService = (CodeService) SpringConfig
					.getInstance().getBean("codeService");
			Code Code = CodeService.read(entityId);
			if (Code == null)
				throw new WebApplicationException(Response
						.status(Status.BAD_REQUEST)
						.entity("Order configuration entity with id \"" + id
								+ "\" doesn't exist")
						.type(MediaType.TEXT_PLAIN_TYPE).build());
			mapper.writeValue(writer, Code);
			rb = Response.ok(writer.toString());
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error in fetching Order configuration entity with id " + id, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error in fetching Order configuration entity with id " + id, e);
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
			CodeService CodeService = (CodeService) SpringConfig
					.getInstance().getBean("codeService");
			// read existing entity from database
			Code Code = CodeService.read(Long.parseLong(id));
			if (Code == null) {
				throw new WebApplicationException(Response
						.status(Status.BAD_REQUEST)
						.entity("Order Configuration entity with id \"" + id
								+ "\" doesn't exist")
						.type(MediaType.TEXT_PLAIN_TYPE).build());
			}
			// prepare response
			CodeService.delete(Code);
			return Response.ok(id).build();
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error in deleting Order Configuration entity with id " + id, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error in deleting Order Configuration entity with id " + id, e);
			throw new WebApplicationException(Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e))
					.type(MediaType.TEXT_PLAIN_TYPE).build());
		}
	}
	
	@GET
	@Path("/type/{type}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getListByType(@Context UriInfo ui,
			@Context HttpHeaders hh, @PathParam("type") String type) {
		Response.ResponseBuilder rb = null;
		List<Code> codeList = null;
		try{
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, true);
			CodeService CodeService = (CodeService) SpringConfig
					.getInstance().getBean("codeService");
			codeList = CodeService.readByType(type);
			if (codeList == null)
				throw new Exception("Unable to find values for type::"+type);
			
			mapper.writeValue(writer, codeList);
			rb = Response.ok(writer.toString());
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error in fetching values for type::"+type, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error in fetching values for type::"+type, e);
			throw new WebApplicationException(Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e))
					.type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		return rb.build();
	}
	

	}
