package com.avery.storage.entities;

import java.io.StringWriter;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Context;
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
import com.avery.storage.MixIn.MenuRoleMixIn;
import com.avery.storage.service.RoleService;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;
import com.fasterxml.jackson.databind.SerializationFeature;

@SuppressWarnings("serial")
@Entity
@Table(name = "rolemaster")
@Path("role")

public class Role extends MainAbstractEntity {

	@Column(name = "roleName", length = 45)
	private String roleName;

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	@Override
	public Response updateEntity(UriInfo ui, HttpHeaders hh, String id, String data) {
		Response.ResponseBuilder rb = null;
		try {
			ObjectMapper mapper = new ObjectMapper();
			StringWriter writer = new StringWriter();
			mapper.configure(DeserializationFeature.UNWRAP_ROOT_VALUE, false);
			RoleService roleService = (RoleService) SpringConfig.getInstance().getBean("roleService");
			Role role = roleService.read(Long.parseLong(id));
			if (role == null) {
				throw new WebApplicationException(
						Response.status(Status.BAD_REQUEST).entity("data entity with id \"" + id + "\" doesn't exist")
								.type(MediaType.TEXT_PLAIN_TYPE).build());
			}
			ObjectReader updater = mapper.readerForUpdating(role);
			role = updater.readValue(data);
			roleService.update(role);
			mapper.writeValue(writer, role);
			rb = Response.ok(writer.toString());
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error("Error in updating data entity with id " + id, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error("Error in updating data entity with id " + id, e);
			throw new WebApplicationException(Response.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e)).type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		return rb.build();
	}

	@Override
	public Response getEntities(UriInfo ui, HttpHeaders hh) {
		Response.ResponseBuilder rb = null;
		List<Role> role = null;
		MultivaluedMap<String, String> queryMap = ui.getQueryParameters();
		String roleId = null;
		roleId = queryMap.getFirst("role");
		try {
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			RoleService roleService = (RoleService) SpringConfig.getInstance().getBean("roleService");
			role = roleService.readAll();
			Collections.sort(role, roleIdComparator);
			if (roleId == null) {
				role.remove(0);
			} else {
				if (!roleId.isEmpty() || roleId != null) {
					if (roleId.trim().equals("1")) {
						role.remove(0);
					} else if (roleId.trim().equals("2")) {
						role.remove(1);
						role.remove(0);
					}
				}
			}
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


	@GET
	@Path("/users/{roleid}")
	public Response getUserList(@Context UriInfo ui, @Context HttpHeaders hh, @PathParam("roleid") String roleid) {
		Long roleUniqueId = Long.parseLong(roleid);
		Response.ResponseBuilder rb = null;
		List<User> entitiesList = null;
		try {
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, true);
			RoleService roleService = (RoleService) SpringConfig.getInstance().getBean("roleService");
			entitiesList = roleService.getUsers(roleUniqueId);
			if (entitiesList == null || entitiesList.isEmpty())
				throw new Exception("Unable to find any data");
			mapper.writeValue(writer, entitiesList);
			rb = Response.ok(writer.toString());

		} catch (Exception e) {
			// TODO Auto-generated catch block
			throw new WebApplicationException(Response.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e)).type(MediaType.TEXT_PLAIN_TYPE).build());
		}

		return rb.build();
	}

	@GET
	@Path("/menuroles/{roleid}")
	public Response getMenuRoleList(@Context UriInfo ui, @Context HttpHeaders hh, @PathParam("roleid") String roleid) {
		Long roleUniqueId = Long.parseLong(roleid);
		Response.ResponseBuilder rb = null;
		Map responseMap = new HashMap();
		try {
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
			mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
			RoleService roleService = (RoleService) SpringConfig.getInstance().getBean("roleService");
			Map entitiesList = roleService.getMenuRoles(roleUniqueId);
			responseMap.put("data", entitiesList);
			if (entitiesList == null || entitiesList.isEmpty())
				throw new Exception("Unable to find any data");
			mapper.writeValue(writer, responseMap);
			rb = Response.ok(writer.toString());

		} catch (Exception e) {
			// TODO Auto-generated catch block
			throw new WebApplicationException(Response.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e)).type(MediaType.TEXT_PLAIN_TYPE).build());
		}

		return rb.build();
	}

	@POST
	@Path("/editpermissions/{roleid}")
	public Response getPermissionList(@Context UriInfo ui, @Context HttpHeaders hh, @PathParam("roleid") String roleid,
			String data) {
		Long roleUniqueId = Long.parseLong(roleid);
		Map<String, Object> responseMap = new HashMap<String, Object>();
		try {
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, true);
			mapper.addMixIn(MenuRole.class, MenuRoleMixIn.class);
			RoleService roleService = (RoleService) SpringConfig.getInstance().getBean("roleService");
			roleService.editMenuRole(data, roleUniqueId);
			responseMap.put("id", roleUniqueId);
			mapper.writeValue(writer, responseMap);

		} catch (Exception e) {
			throw new WebApplicationException(Response.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e)).type(MediaType.TEXT_PLAIN_TYPE).build());
		}

		return Response.ok(roleUniqueId).build();
	}

	public static Comparator<Role> roleIdComparator = new Comparator<Role>() {
		@Override
		public int compare(Role e1, Role e2) {
			return (int) (e1.getId() - e2.getId());
		}
	};

}
