package com.avery.storage.entities;

import java.io.StringWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

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

import com.avery.app.config.PropertiesConfig;
import com.avery.app.config.SpringConfig;
import com.avery.logging.AppLogger;
import com.avery.storage.MainAbstractEntity;
import com.avery.storage.MixIn.OrderLineDetailMixIn;
import com.avery.storage.service.OrderLineDetailService;
import com.avery.storage.service.OrderLineService;
import com.avery.utils.ApplicationUtils;
import com.avery.utils.PropertiesConstants;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;
import com.fasterxml.jackson.databind.SerializationFeature;

@Entity
@Table(name = "OrderLineDetail")
@Path("orderlinedetails")
public class OrderLineDetail extends MainAbstractEntity{
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "OrderLineID", nullable = true)
	private OrderLine orderLineForVariableData;
	
	@Column(name = "OrderQueueID")
    private int orderQueueID; 
	
	@Column(name = "Oracleitemnumber",length = 50)
    private String Oracleitemnumber;
	
	@Column(name = "Level",length = 50)
    private String level;
	
	@Column(name = "SKUno",length = 50)
    private String skuno;
	
	
	@Column(name = "typesetter",length = 50)
    private String typesetter;
	
	@Column(name = "Variablefieldname",length = 100)
    private String variablefieldname;
	
	@Column(name = "variabledatavalue",length = 250)
    private String variabledatavalue;
	
	@Column(name = "FiberPercent",length = 250)
    private String fiberPercent;
	
	@Column(name = "SentToOracleDate")
    private String sentToOracleDate;
	
	@Column(name = "Mandatory",length = 50)
    private String mandatory; 
	
	@Column(name = "DivisionforInterfaceERPORG",length = 50)
    private String divisionforInterfaceERPORG; 
	
	public OrderLine getOrderLineForVariableData() {
		return orderLineForVariableData;
	}

	public void setOrderLineForVariableData(OrderLine orderLineForVariableData) {
		this.orderLineForVariableData = orderLineForVariableData;
	}

	public int getOrderQueueID() {
		return orderQueueID;
	}

	public void setOrderQueueID(int orderQueueID) {
		this.orderQueueID = orderQueueID;
	}

	public String getOracleitemnumber() {
		return Oracleitemnumber;
	}

	public void setOracleitemnumber(String oracleitemnumber) {
		Oracleitemnumber = oracleitemnumber;
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

	public String getSentToOracleDate() {
		return sentToOracleDate;
	}

	public void setSentToOracleDate(String sentToOracleDate) {
		this.sentToOracleDate = sentToOracleDate;
	}

	public String getMandatory() {
		return mandatory;
	}

	public void setMandatory(String mandatory) {
		this.mandatory = mandatory;
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
		List<OrderLineDetail> orderLineDetail = null;
		try{
			Long entityId = Long.parseLong(orderId);
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
			OrderLineDetailService orderLineDetailService = (OrderLineDetailService) SpringConfig
					.getInstance().getBean("orderLineDetailService");
			orderLineDetail = orderLineDetailService.readAllVariableByOrderID(entityId);
			if (orderLineDetail == null)
				throw new Exception("Unable to find Order Line variable data");
			mapper.writeValue(writer, orderLineDetail);
			rb = Response.ok(writer.toString());
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error in fetching order line variable for order queue id " + orderId, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error in fetching order line variable for order queue id " + orderId, e);
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
		Map orderLineDetail = null;
		try{
			Long entityId = Long.parseLong(orderId);
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			mapper.addMixInAnnotations(OrderLine.class, OrderLineDetailMixIn.class);
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
			OrderLineDetailService orderLineDetailService = (OrderLineDetailService) SpringConfig
					.getInstance().getBean("orderLineDetailService");
			orderLineDetail = orderLineDetailService.readByVariableName(entityId,variablfieldename);
			if (orderLineDetail == null)
				throw new Exception("Unable to find Order Line variable data");
			mapper.writeValue(writer, orderLineDetail);
			rb = Response.ok(writer.toString());
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error in fetching order line variable for order queue id " + orderId, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error in fetching order line variable for order queue id " + orderId, e);
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
		String jsonData="";
		Map<String,String> jsonMap=null;
		try {
			OrderLineDetailService orderLineDetailService = (OrderLineDetailService) SpringConfig
					.getInstance().getBean("orderLineDetailService");
			jsonMap=ApplicationUtils.convertJSONtoMaps(data);
			jsonData=(String)jsonMap.get("data");
			orderLineDetailService.bulkUpdate(jsonData);
			boolean triggerValidationFlow = PropertiesConfig
					.getBoolean(PropertiesConstants.TRIGGER_VALIDATION_ON_SAVE_FLAG);
			if(triggerValidationFlow){
				Router router=new Router();
				router.validateOrder(Long.parseLong((String)jsonMap.get("orderQueueId")));
			}
			return Response.ok().build();
		}  catch (WebApplicationException ex) {
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
	@PUT
	@Path("/variablebulkupdate/{variablename}")
    public Response updateAllEntitiesByOrderId(@Context UriInfo ui,
            @Context HttpHeaders hh, String data,@PathParam("variablename") String variablfieldename) {
		String jsonData="";
		Long bulkUpdateAllById=0L;
		Map<String,String> jsonMap=null;
		try {
			OrderLineDetailService orderLineDetailService = (OrderLineDetailService) SpringConfig
					.getInstance().getBean("orderLineDetailService");
			jsonMap=ApplicationUtils.convertJSONtoMaps(data);
			jsonData=(String)jsonMap.get("data");
			bulkUpdateAllById = Long.parseLong((String)jsonMap.get("orderQueueId"));
			orderLineDetailService.bulkUpdateAll(jsonData,bulkUpdateAllById,variablfieldename);
			boolean triggerValidationFlow = PropertiesConfig
					.getBoolean(PropertiesConstants.TRIGGER_VALIDATION_ON_SAVE_FLAG);
			if(triggerValidationFlow){
				Router router=new Router();
				router.validateOrder(bulkUpdateAllById);
			}
			return Response.ok().build();
		}  catch (WebApplicationException ex) {
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
