package com.avery.storage.entities;

import java.io.StringWriter;
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
import com.avery.logging.AppLogger;
import com.avery.storage.MainAbstractEntity;
import com.avery.storage.service.SizeChartTableService;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;
import com.fasterxml.jackson.databind.SerializationFeature;

/**
 * @author Vishal
 *
 */
@Entity
@Table(name = "Size_Chart_Table")
@Path("sizecharttable")
public class SizeChartTable extends MainAbstractEntity {
	
	private static final long serialVersionUID = -8487156716364715527L;
	
	@Column(name = "Size",length = 50)
    private String size;  

	@Column(name = "Size_Page",length = 50)
    private String sizePage;

	public String getSize() {
		return size;
	}

	public void setSize(String size) {
		this.size = size;
	}

	public String getSizePage() {
		return sizePage;
	}

	public void setSizePage(String sizePage) {
		this.sizePage = sizePage;
	} 
	
	@Override
	public Response getEntities(UriInfo ui, HttpHeaders hh) {
		Response.ResponseBuilder rb = null;
		Map<?,?> entitiesMap=null;
		try {
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			MultivaluedMap<String, String> queryParamMap =ui.getQueryParameters();
			SizeChartTableService sizeChartTableService = (SizeChartTableService) SpringConfig
					.getInstance().getBean("sizeChartTableService");
			entitiesMap = sizeChartTableService.readWithCriteria( queryParamMap);
			if (entitiesMap == null || entitiesMap.isEmpty())
				throw new Exception("Unable to find size charts");
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
	
	@Override
	public Response createEntity(UriInfo ui, HttpHeaders hh, String data) {
		Long id;
		try {
			ObjectMapper mapper = new ObjectMapper();
			mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,
					false);
			mapper.configure(DeserializationFeature.UNWRAP_ROOT_VALUE, false);
			SizeChartTable sizeChartTable = mapper.readValue(data, SizeChartTable.class);
			//sizeChartTable.setCreatedDate(new Date());
			SizeChartTableService sizeChartTableService = (SizeChartTableService) SpringConfig
					.getInstance().getBean("sizeChartTableService");
			id = sizeChartTableService.create(sizeChartTable);
			return Response.ok(id).build();
		} catch (Exception e) {
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
		try {
			ObjectMapper mapper = new ObjectMapper();
			StringWriter writer = new StringWriter();
			//mapper.addMixIn(Partner.class,PartnerMixIn.class);
			//mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,false);
			// toggle this property value based on your input JSON data
			mapper.configure(DeserializationFeature.UNWRAP_ROOT_VALUE, false);
			SizeChartTableService sizeChartTableService = (SizeChartTableService) SpringConfig
					.getInstance().getBean("sizeChartTableService");
			// read existing entity from database
			SizeChartTable sizeChartTable = sizeChartTableService.read(Long.parseLong(id));
			if (sizeChartTable == null) {
				throw new WebApplicationException(Response
						.status(Status.BAD_REQUEST)
						.entity("data entity with id \"" + id
								+ "\" doesn't exist")
						.type(MediaType.TEXT_PLAIN_TYPE).build());
			}
			ObjectReader updater = mapper.readerForUpdating(sizeChartTable);
			// build updated entity object from input data
			sizeChartTable = updater.readValue(data);
			// update entity in database
			sizeChartTableService.update(sizeChartTable);
			// prepare response
			mapper.writeValue(writer, sizeChartTable);
			rb = Response.ok(writer.toString());
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error in updating data entity with id " + id, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error in updating data entity with id " + id, e);
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
			SizeChartTableService sizeChartTableService = (SizeChartTableService) SpringConfig
					.getInstance().getBean("sizeChartTableService");
			SizeChartTable sizeChartTable = sizeChartTableService.read(entityId);
			if (sizeChartTable == null)
				throw new WebApplicationException(Response
						.status(Status.BAD_REQUEST)
						.entity("Data entity with id \"" + id
								+ "\" doesn't exist")
						.type(MediaType.TEXT_PLAIN_TYPE).build());
			mapper.writeValue(writer, sizeChartTable);
			rb = Response.ok(writer.toString());
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error in fetching data entity with id " + id, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error in fetching data entity with id " + id, e);
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
			SizeChartTableService sizeChartTableService = (SizeChartTableService) SpringConfig
					.getInstance().getBean("sizeChartTableService");
			// read existing entity from database
			SizeChartTable sizeChartTable = sizeChartTableService.read(Long.parseLong(id));
			if (sizeChartTable == null) {
				throw new WebApplicationException(Response
						.status(Status.BAD_REQUEST)
						.entity("Data entity with id \"" + id
								+ "\" doesn't exist")
						.type(MediaType.TEXT_PLAIN_TYPE).build());
			}
			// prepare response
			sizeChartTableService.delete(sizeChartTable);
			return Response.ok(id).build();
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error in deleting Data entity with id " + id, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error in deleting data entity with id " + id, e);
			throw new WebApplicationException(Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e))
					.type(MediaType.TEXT_PLAIN_TYPE).build());
		}
	}

}
