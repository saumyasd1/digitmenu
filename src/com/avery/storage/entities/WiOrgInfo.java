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
import com.avery.storage.MixIn.WiOrgInfoMixIn;
import com.avery.storage.service.WiOrgInfoService;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * @author Vishal
 *
 */
@Entity
@Table(name = "wi_orginfo")
@Path("wiorginfo")
public class WiOrgInfo extends MainAbstractEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public WiOrgInfo() {

	}

	@Column(name = "systemName", length = 50)
	private String systemName;

	@Column(name = "siteName", length = 50)
	private String siteName;

	@Column(name = "orgName", length = 50)
	private String orgName;

	@OneToMany(mappedBy = "varWiOrgInfo", fetch = FetchType.LAZY)
	private List<WiOrg> listWiOrg;

	public String getSystemName() {
		return systemName;
	}

	public void setSystemName(String systemName) {
		this.systemName = systemName;
	}

	public String getSiteName() {
		return siteName;
	}

	public void setSiteName(String siteName) {
		this.siteName = siteName;
	}

	public String getOrgName() {
		return orgName;
	}

	public void setOrgName(String orgName) {
		this.orgName = orgName;
	}

	public List<WiOrg> getListWiOrg() {
		return listWiOrg;
	}

	public void setListWiOrg(List<WiOrg> listWiOrg) {
		this.listWiOrg = listWiOrg;
	}

	@Override
	public Response getEntities(UriInfo ui, HttpHeaders hh) {
		Response.ResponseBuilder rb = null;
		List<WiOrgInfo> wiOrgInfo = null;
		try {
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			mapper.addMixIn(WiOrgInfo.class, WiOrgInfoMixIn.class);
			WiOrgInfoService wiOrgInfoService = (WiOrgInfoService) SpringConfig.getInstance()
					.getBean("wiOrgInfoService");
			wiOrgInfo = wiOrgInfoService.readAll();
			mapper.writeValue(writer, wiOrgInfo);
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
