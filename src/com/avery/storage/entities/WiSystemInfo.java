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
import com.avery.storage.MainAbstractEntity;
import com.avery.storage.MixIn.WiSystemInfoMixIn;
import com.avery.storage.service.WiSystemInfoService;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * @author Vishal
 *
 */
@Entity
@Table(name = "wi_systeminfo")
@Path("wisysteminfo")
public class WiSystemInfo extends MainAbstractEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public WiSystemInfo() {

	}

	@Column(name = "systemName", length = 50)
	private String systemName;

	@OneToMany(mappedBy = "varWiSystemInfo", fetch = FetchType.LAZY)
	private List<WiSystem> listWiSystem;

	public String getSystemName() {
		return systemName;
	}

	public void setSystemName(String systemName) {
		this.systemName = systemName;
	}

	public List<WiSystem> getListWiSystem() {
		return listWiSystem;
	}

	public void setListWiSystem(List<WiSystem> listWiSystem) {
		this.listWiSystem = listWiSystem;
	}

	@Override
	public Response getEntities(UriInfo ui, HttpHeaders hh) {
		Response.ResponseBuilder rb = null;
		List<WiSystemInfo> wiSystemInfo = null;
		try {
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			mapper.addMixIn(WiSystemInfo.class, WiSystemInfoMixIn.class);
			WiSystemInfoService wiSystemInfoService = (WiSystemInfoService) SpringConfig.getInstance()
					.getBean("wiSystemInfoService");
			wiSystemInfo = wiSystemInfoService.readAll();
			mapper.writeValue(writer, wiSystemInfo);
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

}
