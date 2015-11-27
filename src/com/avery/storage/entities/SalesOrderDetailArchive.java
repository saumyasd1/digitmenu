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
import javax.ws.rs.Path;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.UriInfo;

import org.apache.commons.lang.exception.ExceptionUtils;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import com.avery.app.config.SpringConfig;
import com.avery.logging.AppLogger;
import com.avery.storage.MainAbstractEntity;
import com.avery.storage.service.SalesOrderDetailArchiveService;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;
import com.fasterxml.jackson.databind.SerializationFeature;

@Entity
@Table(name = "AR_SalesOrderDetail")
@Path("ar_salesorderdetail")
public class SalesOrderDetailArchive extends MainAbstractEntity {

	@Column(name = "SalesOrderDetailID")
	private String salesorderdetailid;

	@Column(name = "SalesOrderID")
	private String salesorderid;

	@Column(name = "ProcessQueueID")
	private String processqueueid;

	@Column(name = "SOnumber")
	private String sonumber;

	@Column(name = "Divison")
	private String divison;

	@Column(name = "SODetails")
	private String sodetails;

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
	 * @return the salesorderdetailid
	 */
	public String getSalesorderdetailid() {
		return salesorderdetailid;
	}

	/**
	 * @param salesorderdetailid the salesorderdetailid to set
	 */
	public void setSalesorderdetailid(String salesorderdetailid) {
		this.salesorderdetailid = salesorderdetailid;
	}

	/**
	 * @return the salesorderid
	 */
	public String getSalesorderid() {
		return salesorderid;
	}

	/**
	 * @param salesorderid the salesorderid to set
	 */
	public void setSalesorderid(String salesorderid) {
		this.salesorderid = salesorderid;
	}

	/**
	 * @return the processqueueid
	 */
	public String getProcessqueueid() {
		return processqueueid;
	}

	/**
	 * @param processqueueid the processqueueid to set
	 */
	public void setProcessqueueid(String processqueueid) {
		this.processqueueid = processqueueid;
	}

	/**
	 * @return the sonumber
	 */
	public String getSonumber() {
		return sonumber;
	}

	/**
	 * @param sonumber the sonumber to set
	 */
	public void setSonumber(String sonumber) {
		this.sonumber = sonumber;
	}

	/**
	 * @return the divison
	 */
	public String getDivison() {
		return divison;
	}

	/**
	 * @param divison the divison to set
	 */
	public void setDivison(String divison) {
		this.divison = divison;
	}

	/**
	 * @return the sodetails
	 */
	public String getSodetails() {
		return sodetails;
	}

	/**
	 * @param sodetails the sodetails to set
	 */
	public void setSodetails(String sodetails) {
		this.sodetails = sodetails;
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
		List<Partner> partner = null;
		Map entitiesMap = null;
		try {
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			MultivaluedMap<String, String> queryParamMap = ui
					.getQueryParameters();
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
			SalesOrderDetailArchiveService salesOrderDetailArchiveService = (SalesOrderDetailArchiveService) SpringConfig
					.getInstance().getBean("salesOrderDetailArchiveService");
			entitiesMap = salesOrderDetailArchiveService
					.readWithCriteria(queryParamMap);
			if (entitiesMap == null || entitiesMap.isEmpty())
				throw new Exception("Unable to find archives");
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
			SalesOrderDetailArchive archive = mapper.readValue(data,
					SalesOrderDetailArchive.class);
			SalesOrderDetailArchiveService salesOrderDetailArchiveService = (SalesOrderDetailArchiveService) SpringConfig
					.getInstance().getBean("salesOrderDetailArchiveService");

			id = salesOrderDetailArchiveService.create(archive);
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
			SalesOrderDetailArchiveService salesOrderDetailArchiveService = (SalesOrderDetailArchiveService) SpringConfig
					.getInstance().getBean("salesOrderDetailArchiveService");
			// read existing entity from database
			SalesOrderDetailArchive archive = salesOrderDetailArchiveService
					.read(Long.parseLong(id));
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
			salesOrderDetailArchiveService.update(archive);
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
			SalesOrderDetailArchiveService salesOrderDetailArchiveService = (SalesOrderDetailArchiveService) SpringConfig
					.getInstance().getBean("salesOrderDetailArchiveService");
			SalesOrderDetailArchive archive = salesOrderDetailArchiveService
					.read(entityId);
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
