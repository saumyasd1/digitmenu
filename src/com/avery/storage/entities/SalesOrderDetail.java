package com.avery.storage.entities;

import java.io.StringWriter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
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
import com.avery.storage.MixIn.SalesOrderDetailMixIn;
import com.avery.storage.service.OrderLineDetailService;
import com.avery.storage.service.SalesOrderDetailService;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;
import com.fasterxml.jackson.databind.SerializationFeature;

@Entity
@Table(name = "salesorderdetails")
@Path("salesorderdetails")
public class SalesOrderDetail extends MainAbstractEntity{
	
	public SalesOrderDetail(){
		
	}
	
	private static final long serialVersionUID = 5347331042125950674L;

	@Column(name="division" , length=100)
	String division;
	@Column(name="soNumber" , length=100)
	String soNumber;
	@Column(name="soDetails" , length=100)
	String soDetails;
	@Column(name="oracleItemNumber" , length=50)
	String oracleItemNumber;
	@Column(name="level" , length=100)
	String level;
	@Column(name="SKUno" , length=100)
	String SKUno;
	@Column(name="typeSetter" , length=100)
	String typeSetter;
	@Column(name="variableFieldName" , length=100)
	String variableFieldName;
	@Column(name="variableDataValue" , length=100)
	String variableDataValue;
	@Column(name="fiberPercent" )
	int fiberPercent;
	@Column(name="sumOfFiberPercentage" )
	int sumOfFiberPercentage ;
	@Column(name = "comment",length=250)
	String comment;
	@ManyToOne(cascade=CascadeType.ALL,fetch=FetchType.LAZY)
	@JoinColumn(name="salesOrderId")
	SalesOrder varSalesOrderLine;

	public SalesOrderDetail(String division, String sOnumber) {
		division = division;
		soNumber = sOnumber;
	}




	public String getDivision() {
		return division;
	}




	public void setDivision(String division) {
		this.division = division;
	}




	public String getSoNumber() {
		return soNumber;
	}




	public void setSoNumber(String soNumber) {
		this.soNumber = soNumber;
	}




	public String getSoDetails() {
		return soDetails;
	}




	public void setSoDetails(String soDetails) {
		this.soDetails = soDetails;
	}




	public String getOracleItemNumber() {
		return oracleItemNumber;
	}




	public void setOracleItemNumber(String oracleItemNumber) {
		this.oracleItemNumber = oracleItemNumber;
	}




	public String getLevel() {
		return level;
	}




	public void setLevel(String level) {
		this.level = level;
	}




	public String getSKUno() {
		return SKUno;
	}




	public void setSKUno(String sKUno) {
		SKUno = sKUno;
	}




	public String getTypeSetter() {
		return typeSetter;
	}




	public void setTypeSetter(String typeSetter) {
		this.typeSetter = typeSetter;
	}




	public String getVariableFieldName() {
		return variableFieldName;
	}




	public void setVariableFieldName(String variableFieldName) {
		this.variableFieldName = variableFieldName;
	}




	public String getVariableDataValue() {
		return variableDataValue;
	}




	public void setVariableDataValue(String variableDataValue) {
		this.variableDataValue = variableDataValue;
	}




	public int getFiberPercent() {
		return fiberPercent;
	}




	public void setFiberPercent(int fiberPercent) {
		this.fiberPercent = fiberPercent;
	}




	public int getSumOfFiberPercentage() {
		return sumOfFiberPercentage;
	}




	public void setSumOfFiberPercentage(int sumOfFiberPercentage) {
		this.sumOfFiberPercentage = sumOfFiberPercentage;
	}




	public String getComment() {
		return comment;
	}




	public void setComment(String comment) {
		this.comment = comment;
	}




	public SalesOrder getVarSalesOrderLine() {
		return varSalesOrderLine;
	}




	public void setVarSalesOrderLine(SalesOrder varSalesOrderLine) {
		this.varSalesOrderLine = varSalesOrderLine;
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
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
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
		Map salesOrderDetail = null;
		try{
			Long entityId = Long.parseLong(orderId);
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			mapper.addMixIn(SalesOrder.class, SalesOrderDetailMixIn.class);
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE,false);
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
	
	   @PUT
	   @Path("variablebulkupdate")
	   public Response updateEntities(@Context UriInfo ui,
	           @Context HttpHeaders hh, String data) {
	       Long currentObjId=0L;
	       ObjectReader updater=null;
	       try {
	           ObjectMapper mapper = new ObjectMapper();
	           mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
	           mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,
	                   false);
	           List<SalesOrderDetail> list =new ArrayList<SalesOrderDetail>();
	           SalesOrderDetailService salesOrderDetailService = (SalesOrderDetailService) SpringConfig
	                    .getInstance().getBean("salesOrderDetailService");
	           String[] objArray=data.split("@@@");
	           for(String t:objArray){
	               SalesOrderDetail salesOrderDetail = mapper.readValue(t,SalesOrderDetail.class);
	               currentObjId=salesOrderDetail.getId();
	               salesOrderDetail=salesOrderDetailService.read(currentObjId);
	               updater = mapper.readerForUpdating(salesOrderDetail);
	               salesOrderDetail = updater.readValue(t);
	               list.add(salesOrderDetail);
	           }
	           salesOrderDetailService.updateEntities(list);
	           return Response.ok().build();
	       } catch (WebApplicationException ex) {
	           AppLogger.getSystemLogger().error(
	                   "Error while Permorfing variable bulk update", ex);
	           throw ex;
	       } catch (Exception e) {
	           AppLogger.getSystemLogger().error(
	                   "Error while Permorfing variable bulk update", e);
	           throw new WebApplicationException(Response
	                   .status(Status.INTERNAL_SERVER_ERROR)
	                   .entity(ExceptionUtils.getRootCauseMessage(e))
	                   .type(MediaType.TEXT_PLAIN_TYPE).build());
	       }
	   }
	

}
