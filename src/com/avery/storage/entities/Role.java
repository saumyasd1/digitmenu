package com.avery.storage.entities;


import java.io.StringWriter;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
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
import com.avery.storage.service.RoleService;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;
import com.fasterxml.jackson.databind.SerializationFeature;





@SuppressWarnings("serial")
@Entity
@Table(name = "rolemaster")
@Path("role")

public class Role extends MainAbstractEntity{
	
	
	@Column(name="roleName",length=45)
	private String roleName;

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	
	@Override
	public Response createEntity(UriInfo ui, HttpHeaders hh, String data) {
		Long id;
		Map<String,Object> responseMap=new HashMap<String,Object>();
		try {
			ObjectMapper mapper = new ObjectMapper();
			StringWriter writer = new StringWriter();
			mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,
					false);
			mapper.configure(DeserializationFeature.UNWRAP_ROOT_VALUE, false);
			Role role = mapper.readValue(data, Role.class);
			role.setCreatedDate(new Date());
			RoleService roleService = (RoleService) SpringConfig
					.getInstance().getBean("roleService");
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
			id = roleService.create(role);
			roleService.addMenuRole(data, id);
			responseMap.put("id",id);
			mapper.writeValue(writer, responseMap);
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
			mapper.configure(DeserializationFeature.UNWRAP_ROOT_VALUE, false);
			RoleService roleService = (RoleService) SpringConfig
					.getInstance().getBean("roleService");
			Role role = roleService.read(Long.parseLong(id));
			if (role == null) {
				throw new WebApplicationException(Response
						.status(Status.BAD_REQUEST)
						.entity("data entity with id \"" + id
								+ "\" doesn't exist")
						.type(MediaType.TEXT_PLAIN_TYPE).build());
			}
			ObjectReader updater = mapper.readerForUpdating(role);
			role = updater.readValue(data);
			roleService.update(role);
			mapper.writeValue(writer, role);
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
	public Response getEntities(UriInfo ui, HttpHeaders hh) {
		Response.ResponseBuilder rb = null;
		List<Role> role = null;
		try {
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			RoleService roleService = (RoleService) SpringConfig.getInstance()
					.getBean("roleService");
			role = roleService.readAll();
			mapper.writeValue(writer, role);
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
	
	@Override
	public Response deleteEntity(UriInfo ui, HttpHeaders hh, String id) {
		Response.ResponseBuilder rb = null;
		try {
			RoleService roleService = (RoleService) SpringConfig
					.getInstance().getBean("roleService");
			// read existing entity from database
			Role role = roleService.read(Long.parseLong(id));
			if (role == null) {
				throw new WebApplicationException(Response
						.status(Status.BAD_REQUEST)
						.entity("Data entity with id \"" + id
								+ "\" doesn't exist")
						.type(MediaType.TEXT_PLAIN_TYPE).build());
			}
			// prepare response
			roleService.delete(role);
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
	
	@GET
	@Path("/users/{roleid}")
    public Response getUserList(@Context UriInfo ui,
    @Context HttpHeaders hh,@PathParam("roleid") String roleid) {
    	Long roleUniqueId = Long.parseLong(roleid);
    	Response.ResponseBuilder rb = null;
    	List<User> entitiesList = null;
    	try {
    		StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, true);
			RoleService roleService = (RoleService) SpringConfig
					.getInstance().getBean("roleService");
			entitiesList = roleService.getUsers(roleUniqueId);
			if (entitiesList == null || entitiesList.isEmpty())
				throw new Exception("Unable to find any data");
			mapper.writeValue(writer, entitiesList);
			rb = Response.ok(writer.toString());
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			throw new WebApplicationException(Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e))
					.type(MediaType.TEXT_PLAIN_TYPE).build());
		}
    	
    	return rb.build();
    }
}
