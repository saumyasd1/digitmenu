package com.avery.storage.entities;

import java.io.StringWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
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
import com.avery.storage.MixIn.WiStatusMixIn;
import com.avery.storage.service.WiStatusService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

/**
 * @author Vishal
 *
 */
@Entity
@Table(name = "wi_status")
@Path("wistatus")
public class WiStatus extends MainAbstractEntity {

	private static final long serialVersionUID = -7583544833630759455L;

	@Column(name = "type", length = 50)
	private String type;

	@Column(name = "code", length = 100)
	private String code;

	@Column(name = "value", length = 100)
	private String value;

	@Column(name = "comment", length = 1000)
	private String comment;

	@Column(name = "colorCode", length = 100)
	private String colorCode;

	@Column(name = "iconName", length = 100)
	private String iconName;

	@OneToMany(mappedBy = "varWiStatus", fetch = FetchType.LAZY)
	private List<WiPermissions> listWiPermissions;

	public String getColorCode() {
		return colorCode;
	}

	public void setColorCode(String colorCode) {
		this.colorCode = colorCode;
	}

	public String getIconName() {
		return iconName;
	}

	public void setIconName(String iconName) {
		this.iconName = iconName;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public List<WiPermissions> getListWiPermissions() {
		return listWiPermissions;
	}

	public void setListWiPermissions(List<WiPermissions> listWiPermissions) {
		this.listWiPermissions = listWiPermissions;
	}

	@Override
	public Response getEntities(UriInfo ui, HttpHeaders hh) {
		Response.ResponseBuilder rb = null;
		List<WiStatus> wiStatus = null;
		try {
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			mapper.addMixIn(WiStatus.class, WiStatusMixIn.class);
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
			WiStatusService wiStatusService = (WiStatusService) SpringConfig.getInstance().getBean("wiStatusService");
			wiStatus = wiStatusService.readAll();
			if (wiStatus == null)
				throw new Exception("Unable to find wi status");
			mapper.writeValue(writer, wiStatus);
			rb = Response.ok(writer.toString());
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error("Error in fetching wi status ", ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error("Error in fetching wi status ", e);
			throw new WebApplicationException(Response.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e)).type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		return rb.build();

	}
	
	@GET
	@Path("status")
	public Response getStatusListByRoleId(@Context UriInfo ui, @Context HttpHeaders hh, @QueryParam("roleId") String roleId){
		Map responseMap = new HashMap();
		Response.ResponseBuilder rb = null;
		ObjectMapper mapper = new ObjectMapper();
		StringWriter writer = new StringWriter();
		mapper.addMixIn(WiStatus.class, WiStatusMixIn.class);
		try {
			WiStatusService wiStatusService = (WiStatusService) SpringConfig.getInstance().getBean("wiStatusService");
			responseMap = wiStatusService.getStatusListByRoleId(roleId);
			mapper.writeValue(writer, responseMap);
			rb = Response.ok(writer.toString());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			AppLogger.getSystemLogger().error("Error in loading the data -> ", e);
			e.printStackTrace();
			return Response.ok("There was some problem while loading the data").status(Status.INTERNAL_SERVER_ERROR).build();
		}
		return rb.build();
	}
}