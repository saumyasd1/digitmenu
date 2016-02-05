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
import com.avery.storage.service.OrderConfigurationService;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;
import com.fasterxml.jackson.databind.SerializationFeature;




@Entity
@Table(name = "AOC_OrderConfiguration")
@Path("orderconfigurations")
public class OrderConfiguration extends MainAbstractEntity {
	
	private static final long serialVersionUID = -7583544833630759455L;

	@Column(name = "PropertyName", length = 50)
    private String propertyName; 
	
	@Column(name = "PropertyValue", length = 1000)
    private String propertyValue;   
	
	public String getPropertyName() {
		return propertyName;
	}

	public void setPropertyName(String propertyName) {
		this.propertyName = propertyName;
	}

	public String getPropertyValue() {
		return propertyValue;
	}

	public void setPropertyValue(String propertyValue) {
		this.propertyValue = propertyValue;
	}

	@Override
	public Response getEntities(UriInfo ui, HttpHeaders hh) {
		Response.ResponseBuilder rb = null;
		List<OrderConfiguration> orderConfiguration = null;
		try {
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
			OrderConfigurationService orderConfigurationService = (OrderConfigurationService) SpringConfig
					.getInstance().getBean("orderConfigurationService");
			orderConfiguration = orderConfigurationService.readAll();
			if (orderConfiguration == null)
				throw new Exception("Unable to find order configuration");
			mapper.writeValue(writer, orderConfiguration);
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
			OrderConfiguration orderConfiguration = mapper.readValue(data, OrderConfiguration.class);
			orderConfiguration.setCreatedDate(new Date());
			OrderConfigurationService orderConfigurationService = (OrderConfigurationService) SpringConfig
					.getInstance().getBean("orderConfigurationService");
			id = orderConfigurationService.create(orderConfiguration);
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
			OrderConfigurationService orderConfigurationService = (OrderConfigurationService) SpringConfig
					.getInstance().getBean("orderConfigurationService");
			// read existing entity from database
			OrderConfiguration orderConfiguration = orderConfigurationService.read(Long.parseLong(id));
			if (orderConfiguration == null) {
				throw new WebApplicationException(Response
						.status(Status.BAD_REQUEST)
						.entity("Order configuration entity with id \"" + id
								+ "\" doesn't exist")
						.type(MediaType.TEXT_PLAIN_TYPE).build());
			}
			ObjectReader updater = mapper.readerForUpdating(orderConfiguration);
			// build updated entity object from input data
			orderConfiguration = updater.readValue(data);
			// update entity in database
			orderConfigurationService.update(orderConfiguration);
			// prepare response
			mapper.writeValue(writer, orderConfiguration);
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
			OrderConfigurationService orderConfigurationService = (OrderConfigurationService) SpringConfig
					.getInstance().getBean("orderConfigurationService");
			OrderConfiguration orderConfiguration = orderConfigurationService.read(entityId);
			if (orderConfiguration == null)
				throw new WebApplicationException(Response
						.status(Status.BAD_REQUEST)
						.entity("Order configuration entity with id \"" + id
								+ "\" doesn't exist")
						.type(MediaType.TEXT_PLAIN_TYPE).build());
			mapper.writeValue(writer, orderConfiguration);
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
			OrderConfigurationService orderConfigurationService = (OrderConfigurationService) SpringConfig
					.getInstance().getBean("orderConfigurationService");
			// read existing entity from database
			OrderConfiguration orderConfiguration = orderConfigurationService.read(Long.parseLong(id));
			if (orderConfiguration == null) {
				throw new WebApplicationException(Response
						.status(Status.BAD_REQUEST)
						.entity("Order Configuration entity with id \"" + id
								+ "\" doesn't exist")
						.type(MediaType.TEXT_PLAIN_TYPE).build());
			}
			// prepare response
			orderConfigurationService.delete(orderConfiguration);
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
	@Path("/variable/{variablename}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getListByPropertyName(@Context UriInfo ui,
			@Context HttpHeaders hh, @PathParam("variablename") String variablfieldename) {
		Response.ResponseBuilder rb = null;
		List<String> valuesList = new ArrayList<String>();
		List<OrderConfiguration> propertyValues = null;
		try{
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			OrderConfigurationService orderConfigurationService = (OrderConfigurationService) SpringConfig
					.getInstance().getBean("orderConfigurationService");
			propertyValues = orderConfigurationService.readByPropertyName(variablfieldename);
			if (propertyValues == null)
				throw new Exception("Unable to find values for propert name::"+variablfieldename);
			
			if(propertyValues.size() != 0){
				String properties = propertyValues.get(0).getPropertyValue();
				String[] values = properties.split("\\|");
				for(int i = 0; i < values.length; i++){
					valuesList.add(values[i]);
				}
			}
			
			mapper.writeValue(writer, valuesList);
			rb = Response.ok(writer.toString());
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error in fetching values for propert name::"+variablfieldename, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error in fetching values for propert name::"+variablfieldename, e);
			throw new WebApplicationException(Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e))
					.type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		return rb.build();
	}
	

	}
