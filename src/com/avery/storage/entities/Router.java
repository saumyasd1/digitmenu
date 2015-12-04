package com.avery.storage.entities;

import java.io.StringWriter;

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

import com.avery.app.config.PropertiesConfig;
import com.avery.logging.AppLogger;
import com.avery.rest.RestClient;
import com.avery.utils.PropertiesConstants;


@Path("router")
public class Router {
	
	
	@GET
	@Path("/orderqueue/{id:[0-9]+}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response validate(@Context UriInfo ui,@Context HttpHeaders hh,@PathParam("id") String id) {
		Response.ResponseBuilder rb = null;
		Integer retryCount = null;
		Integer retryInterval = null;
		try {
			Long orderId = Long.parseLong(id);
			StringWriter writer = new StringWriter();
			String adeptiaServerURL=PropertiesConfig
					.getString(PropertiesConstants.ADEPTIA_SERVER_URL);
			String userName=PropertiesConfig
					.getString(PropertiesConstants.ADEPTIA_SERVER_USERNAME);
			String password=PropertiesConfig
					.getString(PropertiesConstants.ADEPTIA_SERVER_PASSWORD);
			String url = adeptiaServerURL+"/adeptia/publishProviderByRest/AV_WSP_Validator_Process/profile?FileQueueID="+orderId.intValue();
			Response response = RestClient.invoke(
					url,
					MediaType.APPLICATION_JSON, MediaType.APPLICATION_JSON,
					"get", null, null, null, null, userName, password,1,1,AppLogger.getSystemLogger());
			
			
			/*Response response = invoke(
					"http://www.espncricinfo.com",
					MediaType.APPLICATION_JSON, MediaType.APPLICATION_JSON,
					GET_OPERATION, null, null, null, null, null, null);*/
//			System.out.println(response.readEntity(String.class));
			
		//	mapper.writeValue(writer, String.class);
			rb = Response.ok(response.readEntity(String.class));
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error in calling validation flow with order queue id " + id, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error in calling validation flow with order queue id " + id, e);
			throw new WebApplicationException(Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e))
					.type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		return rb.build();

	}

	@GET
	@Path("/salesorder/{id:[0-9]+}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response salesOrder(@Context UriInfo ui,@Context HttpHeaders hh,@PathParam("id") String id) {
		Response.ResponseBuilder rb = null;
		Integer retryCount = null;
		Integer retryInterval = null;
		try {
			Long orderId = Long.parseLong(id);
			StringWriter writer = new StringWriter();
			String adeptiaServerURL=PropertiesConfig
					.getString(PropertiesConstants.ADEPTIA_SERVER_URL);
			String userName=PropertiesConfig
					.getString(PropertiesConstants.ADEPTIA_SERVER_USERNAME);
			String password=PropertiesConfig
					.getString(PropertiesConstants.ADEPTIA_SERVER_PASSWORD);
			//http://APDVADC283.na.averydennison.net:80/adeptia/publishProviderByRest/AV_Test_SalesOrder_Process/profile?FileQueueID=3
			String url = adeptiaServerURL+"/adeptia/publishProviderByRest/AV_Test_SalesOrder_Process/profile?FileQueueID="+orderId.intValue();
			Response response = RestClient.invoke(
					url,
					MediaType.APPLICATION_JSON, MediaType.APPLICATION_JSON,
					"get", null, null, null, null, userName, password,1,1,AppLogger.getSystemLogger());
			
			
			/*Response response = invoke(
					"http://www.espncricinfo.com",
					MediaType.APPLICATION_JSON, MediaType.APPLICATION_JSON,
					GET_OPERATION, null, null, null, null, null, null);*/
//			System.out.println(response.readEntity(String.class));
			
		//	mapper.writeValue(writer, String.class);
			rb = Response.ok(response.readEntity(String.class));
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error in calling validation flow with order queue id " + id, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error in calling validation flow with order queue id " + id, e);
			throw new WebApplicationException(Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e))
					.type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		return rb.build();

	}
	
	@GET
	@Path("/cancelsalesorder/{id:[0-9]+}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response cancelSalesOrder(@Context UriInfo ui,@Context HttpHeaders hh,@PathParam("id") String id) {
		Response.ResponseBuilder rb = null;
		Integer retryCount = null;
		Integer retryInterval = null;
		try {
			Long orderId = Long.parseLong(id);
			StringWriter writer = new StringWriter();
			String adeptiaServerURL=PropertiesConfig
					.getString(PropertiesConstants.ADEPTIA_SERVER_URL);
			String userName=PropertiesConfig
					.getString(PropertiesConstants.ADEPTIA_SERVER_USERNAME);
			String password=PropertiesConfig
					.getString(PropertiesConstants.ADEPTIA_SERVER_PASSWORD);
			//http://APDVADC283.na.averydennison.net:80/adeptia/publishProviderByRest/AV_Test_SalesOrder_Process/profile?FileQueueID=3
			String url = adeptiaServerURL+"/adeptia/publishProviderByRest/AV_Test_SalesOrderDelete/profile?FileQueueID="+orderId.intValue();
			Response response = RestClient.invoke(
					url,
					MediaType.APPLICATION_JSON, MediaType.APPLICATION_JSON,
					"get", null, null, null, null, userName, password,1,1,AppLogger.getSystemLogger());
			
			
			/*Response response = invoke(
					"http://www.espncricinfo.com",
					MediaType.APPLICATION_JSON, MediaType.APPLICATION_JSON,
					GET_OPERATION, null, null, null, null, null, null);*/
//			System.out.println(response.readEntity(String.class));
			
		//	mapper.writeValue(writer, String.class);
			rb = Response.ok(response.readEntity(String.class));
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error in calling validation flow with order queue id " + id, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error in calling validation flow with order queue id " + id, e);
			throw new WebApplicationException(Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e))
					.type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		return rb.build();

	}
}
