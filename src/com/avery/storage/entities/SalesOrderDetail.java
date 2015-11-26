package com.avery.storage.entities;

import java.io.StringWriter;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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
import com.avery.storage.MixIn.OrderLineDetailMixIn;
import com.avery.storage.service.OrderLineDetailService;
import com.avery.storage.service.SalesOrderDetailService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

@Entity
@Table(name = "SalesOrderDetail")
@Path("salesorderdetails")
public class SalesOrderDetail extends MainAbstractEntity{
	
	private static final long serialVersionUID = 5347331042125950674L;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "SalesOrderID", nullable = true)
	private SalesOrder salesOrder;
	
	@Column(name = "ProcessQueueID")
    private int processQueueID; 
	
	@Column(name = "SOnumber")
    private String sonumber;
	
	@Column(name = "Divison")
    private String divison;
	
	@Column(name = "SODetails")
    private String soDetails;
	
	
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
    private String fiberPercent;
	
	@Column(name = "SentToOracleDate")
    private Date sentToOracleDate;
	
	@Column(name = "DivisionforInterfaceERPORG")
    private String divisionforInterfaceERPORG;
	
	
	public SalesOrder getSalesOrder() {
		return salesOrder;
	}

	public void setSalesOrder(SalesOrder salesOrder) {
		this.salesOrder = salesOrder;
	}

	public int getProcessQueueID() {
		return processQueueID;
	}

	public void setProcessQueueID(int processQueueID) {
		this.processQueueID = processQueueID;
	}

	public String getSonumber() {
		return sonumber;
	}

	public void setSonumber(String sonumber) {
		this.sonumber = sonumber;
	}

	public String getDivison() {
		return divison;
	}

	public void setDivison(String divison) {
		this.divison = divison;
	}

	public String getSoDetails() {
		return soDetails;
	}

	public void setSoDetails(String soDetails) {
		this.soDetails = soDetails;
	}

	public String getOracleitemnumber() {
		return oracleitemnumber;
	}

	public void setOracleitemnumber(String oracleitemnumber) {
		this.oracleitemnumber = oracleitemnumber;
	}

	public String getLevel() {
		return level;
	}

	public void setLevel(String level) {
		this.level = level;
	}

	public String getSkuno() {
		return skuno;
	}

	public void setSkuno(String skuno) {
		this.skuno = skuno;
	}

	public String getTypesetter() {
		return typesetter;
	}

	public void setTypesetter(String typesetter) {
		this.typesetter = typesetter;
	}

	public String getVariablefieldname() {
		return variablefieldname;
	}

	public void setVariablefieldname(String variablefieldname) {
		this.variablefieldname = variablefieldname;
	}

	public String getVariabledatavalue() {
		return variabledatavalue;
	}

	public void setVariabledatavalue(String variabledatavalue) {
		this.variabledatavalue = variabledatavalue;
	}

	public String getFiberPercent() {
		return fiberPercent;
	}

	public void setFiberPercent(String fiberPercent) {
		this.fiberPercent = fiberPercent;
	}

	public Date getSentToOracleDate() {
		return sentToOracleDate;
	}

	public void setSentToOracleDate(Date sentToOracleDate) {
		this.sentToOracleDate = sentToOracleDate;
	}
	
	public String getDivisionforInterfaceERPORG() {
		return divisionforInterfaceERPORG;
	}

	public void setDivisionforInterfaceERPORG(String divisionforInterfaceERPORG) {
		this.divisionforInterfaceERPORG = divisionforInterfaceERPORG;
	}


	@GET
	@Path("/order/{id:[0-9]+}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getVariableByOrderID(@Context UriInfo ui,
			@Context HttpHeaders hh, @PathParam("id") String orderId) {
		Response.ResponseBuilder rb = null;
		List<SalesOrderDetail> salesOrderDetail = null;
		try{
			Long entityId = Long.parseLong(orderId);
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, true);
			SalesOrderDetailService salesOrderDetailService = (SalesOrderDetailService) SpringConfig
					.getInstance().getBean("salesOrderDetailService");
			salesOrderDetail = salesOrderDetailService.readAllVariableByOrderID(entityId);
			if (salesOrderDetail == null)
				throw new Exception("Unable to find Order Line variable data");
			mapper.writeValue(writer, salesOrderDetail);
			rb = Response.ok(writer.toString());
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error in fetching sales order line variable for order queue id " + orderId, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error in fetching sales order line variable for order queue id " + orderId, e);
			throw new WebApplicationException(Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e))
					.type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		return rb.build();
	}
	
	@GET
	@Path("/order/{id:[0-9]+}/{variablename}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getByVariableName(@Context UriInfo ui,
			@Context HttpHeaders hh, @PathParam("id") String orderId,@PathParam("variablename") String variablfieldename) {
		Response.ResponseBuilder rb = null;
		List<SalesOrderDetail> salesOrderDetail = null;
		try{
			Long entityId = Long.parseLong(orderId);
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			SalesOrderDetailService salesOrderDetailService = (SalesOrderDetailService) SpringConfig
					.getInstance().getBean("salesOrderDetailService");
			salesOrderDetail = salesOrderDetailService.readByVariableName(entityId,variablfieldename);
			if (salesOrderDetail == null)
				throw new Exception("Unable to find sales Order Line variable data");
			mapper.writeValue(writer, salesOrderDetail);
			rb = Response.ok(writer.toString());
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error in fetching sales order line variable for order queue id " + orderId, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error in fetching sales order line variable for order queue id " + orderId, e);
			throw new WebApplicationException(Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e))
					.type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		return rb.build();
	}
	

}
