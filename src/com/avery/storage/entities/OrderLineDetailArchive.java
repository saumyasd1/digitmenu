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
import com.avery.storage.service.OrderLineDetailArchiveService;
import com.avery.utils.ApplicationUtils;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;
import com.fasterxml.jackson.databind.SerializationFeature;

@Entity
@Table(name = "AR_OrderLineDetail")
@Path("ar_orderlinedetail")
public class OrderLineDetailArchive extends MainAbstractEntity {

	private static final long serialVersionUID = 1540709779068393475L;

	@Column(name = "OrderLineDetailID")
	private String orderlinedetailid;

	@Column(name = "OrderLineID")
	private String orderlineid;

	@Column(name = "OrderQueueID")
	private String orderqueueid;

	@Column(name = "Oracleitemnumber")
	private String oracleitemnumber;

	@Column(name = "Level")
	private String level;

	@Column(name = "SKUno")
	private String skuno;

	@Column(name = "typesetter")
	private String typesetter;

	@Column(name = "Variablefieldname")
	private String variablefieldname;

	@Column(name = "variabledatavalue")
	private String variabledatavalue;

	@Column(name = "FiberPercent")
	private String fiberpercent;

	@Column(name = "SentToOracleDate")
	private String senttooracledate;


	/**
	 * @return the orderlinedetailid
	 */
	public String getOrderlinedetailid() {
		return orderlinedetailid;
	}

	/**
	 * @param orderlinedetailid the orderlinedetailid to set
	 */
	public void setOrderlinedetailid(String orderlinedetailid) {
		this.orderlinedetailid = orderlinedetailid;
	}

	/**
	 * @return the orderlineid
	 */
	public String getOrderlineid() {
		return orderlineid;
	}

	/**
	 * @param orderlineid the orderlineid to set
	 */
	public void setOrderlineid(String orderlineid) {
		this.orderlineid = orderlineid;
	}

	/**
	 * @return the orderqueueid
	 */
	public String getOrderqueueid() {
		return orderqueueid;
	}

	/**
	 * @param orderqueueid the orderqueueid to set
	 */
	public void setOrderqueueid(String orderqueueid) {
		this.orderqueueid = orderqueueid;
	}

	/**
	 * @return the oracleitemnumber
	 */
	public String getOracleitemnumber() {
		return oracleitemnumber;
	}

	/**
	 * @param oracleitemnumber the oracleitemnumber to set
	 */
	public void setOracleitemnumber(String oracleitemnumber) {
		this.oracleitemnumber = oracleitemnumber;
	}

	/**
	 * @return the level
	 */
	public String getLevel() {
		return level;
	}

	/**
	 * @param level the level to set
	 */
	public void setLevel(String level) {
		this.level = level;
	}

	/**
	 * @return the skuno
	 */
	public String getSkuno() {
		return skuno;
	}

	/**
	 * @param skuno the skuno to set
	 */
	public void setSkuno(String skuno) {
		this.skuno = skuno;
	}

	/**
	 * @return the typesetter
	 */
	public String getTypesetter() {
		return typesetter;
	}

	/**
	 * @param typesetter the typesetter to set
	 */
	public void setTypesetter(String typesetter) {
		this.typesetter = typesetter;
	}

	/**
	 * @return the variablefieldname
	 */
	public String getVariablefieldname() {
		return variablefieldname;
	}

	/**
	 * @param variablefieldname the variablefieldname to set
	 */
	public void setVariablefieldname(String variablefieldname) {
		this.variablefieldname = variablefieldname;
	}

	/**
	 * @return the variabledatavalue
	 */
	public String getVariabledatavalue() {
		return variabledatavalue;
	}

	/**
	 * @param variabledatavalue the variabledatavalue to set
	 */
	public void setVariabledatavalue(String variabledatavalue) {
		this.variabledatavalue = variabledatavalue;
	}

	/**
	 * @return the fiberpercent
	 */
	public String getFiberpercent() {
		return fiberpercent;
	}

	/**
	 * @param fiberpercent the fiberpercent to set
	 */
	public void setFiberpercent(String fiberpercent) {
		this.fiberpercent = fiberpercent;
	}

	/**
	 * @return the senttooracledate
	 */
	public String getSenttooracledate() {
		return senttooracledate;
	}

	/**
	 * @param senttooracledate the senttooracledate to set
	 */
	public void setSenttooracledate(String senttooracledate) {
		this.senttooracledate = senttooracledate;
	}

	@Override
	public Response getEntities(UriInfo ui, HttpHeaders hh) {
		Response.ResponseBuilder rb = null;
		Map entitiesMap = null;
		try {
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			MultivaluedMap<String, String> queryParamMap = ui
					.getQueryParameters();
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
			OrderLineDetailArchiveService orderLineDetailArchiveService = (OrderLineDetailArchiveService) SpringConfig
					.getInstance().getBean("orderLineDetailArchiveService");
			entitiesMap = orderLineDetailArchiveService
					.readWithCriteria(queryParamMap);
			if (entitiesMap == null || entitiesMap.isEmpty())
				throw new Exception("Unable to find archives");
			mapper.setDateFormat(ApplicationUtils.df);
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
			OrderLineDetailArchive archive = mapper.readValue(data,
					OrderLineDetailArchive.class);
			OrderLineDetailArchiveService orderLineDetailArchiveService = (OrderLineDetailArchiveService) SpringConfig
					.getInstance().getBean("orderLineDetailArchiveService");

			id = orderLineDetailArchiveService.create(archive);
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
			mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,
					false);
			// toggle this property value based on your input JSON data
			mapper.configure(DeserializationFeature.UNWRAP_ROOT_VALUE, false);
			OrderLineDetailArchiveService orderLineDetailArchiveService = (OrderLineDetailArchiveService) SpringConfig
					.getInstance().getBean("orderLineDetailArchiveService");
			// read existing entity from database
			OrderLineDetailArchive archive = orderLineDetailArchiveService.read(Long.parseLong(id));
			if (archive == null) {
				throw new WebApplicationException(Response
						.status(Status.BAD_REQUEST)
						.entity("archive entity with id \"" + id
								+ "\" doesn't exist")
						.type(MediaType.TEXT_PLAIN_TYPE).build());
			}
			ObjectReader updater = mapper.readerForUpdating(archive);
			// build updated entity object from input data
			archive = updater.readValue(data);
			// update entity in database
			orderLineDetailArchiveService.update(archive);
			// prepare response
			mapper.writeValue(writer, archive);
			rb = Response.ok(writer.toString());
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error in updating archive entity with id " + id, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error in updating archive entity with id " + id, e);
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
			OrderLineDetailArchiveService orderLineDetailArchiveService = (OrderLineDetailArchiveService) SpringConfig
					.getInstance().getBean("orderLineDetailArchiveService");
			OrderLineDetailArchive archive = orderLineDetailArchiveService.read(entityId);
			if (archive == null)
				throw new WebApplicationException(Response
						.status(Status.BAD_REQUEST)
						.entity("Archive entity with id \"" + id
								+ "\" doesn't exist")
						.type(MediaType.TEXT_PLAIN_TYPE).build());
			mapper.writeValue(writer, archive);
			rb = Response.ok(writer.toString());
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error in fetching archive entity with id " + id, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error in fetching archive entity with id " + id, e);
			throw new WebApplicationException(Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e))
					.type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		return rb.build();

	}

}
