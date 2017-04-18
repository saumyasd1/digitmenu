package com.avery.storage.entities;

import java.io.StringWriter;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.ws.rs.Path;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.UriInfo;

import org.apache.commons.lang.exception.ExceptionUtils;

import com.avery.app.config.SpringConfig;
import com.avery.logging.AppLogger;
import com.avery.storage.MainAbstractEntity;
import com.avery.storage.MixIn.WiRolesMixIn;
import com.avery.storage.service.WiRolesService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

/**
 * @author Vishal
 *
 */
@Entity
@Table(name = "wi_roles")
@Path("wiroles")
public class WiRoles extends MainAbstractEntity {

	public WiRoles() {

	}

	private static final long serialVersionUID = -7583544833630759455L;

	@Column(name = "roleName", length = 50)
	private String roleName;

	@OneToMany(mappedBy = "varWiRoles", fetch = FetchType.LAZY)
	private List<WiPermissions> listWiPermissions;

	@Override
	public Response getEntities(UriInfo ui, HttpHeaders hh) {
		Response.ResponseBuilder rb = null;
		List<WiRoles> wiRoles = null;
		try {
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			mapper.addMixIn(WiRoles.class, WiRolesMixIn.class);
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
			WiRolesService wiRolesService = (WiRolesService) SpringConfig.getInstance().getBean("wiRolesService");
			wiRoles = wiRolesService.readAll();
			if (wiRoles == null)
				throw new Exception("Unable to find roles list ");
			mapper.writeValue(writer, wiRoles);
			rb = Response.ok(writer.toString());
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error("Error in fetching roles list ", ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error("Error in fetching roles list ", e);
			throw new WebApplicationException(Response.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e)).type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		return rb.build();
	}

	///////////////////////////////////////////////////////////////////////////////////////////////

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	public List<WiPermissions> getListWiPermissions() {
		return listWiPermissions;
	}

	public void setListWiPermissions(List<WiPermissions> listWiPermissions) {
		this.listWiPermissions = listWiPermissions;
	}

}