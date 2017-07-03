package com.avery.storage.entities;

import java.io.StringWriter;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
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
import com.avery.storage.MainAbstractEntity;
import com.avery.storage.MixIn.SystemInfoMixIn;
import com.avery.storage.service.SystemInfoService;
import com.avery.utils.ApplicationUtils;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;


@Entity
@Table(name="system")
@Path("system")
public class SystemInfo extends MainAbstractEntity{

	
	/**
	 * 
	 */
	private static final long serialVersionUID = 3946547049807497262L;

	@Column(name = "name",length=50,unique=true)
	private String name;
	
	@Column(name = "comment",length=250)
	private String comment;
	

	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="siteId",nullable=false)
	private Site site;
	
	@OneToMany(mappedBy="system",fetch=FetchType.LAZY)
	private List<Org> orgList;
	
	@OneToMany(mappedBy = "varSystemInfo", fetch = FetchType.LAZY)
	private List<SystemCsrCode> varSystemCsrCode;
	
	public List<Org> getOrgList() {
		return orgList;
	}

	public void setOrgList(List<Org> orgList) {
		this.orgList = orgList;
	}

	public Site getSite() {
		return site;
	}

	public void setSite(Site site) {
		this.site = site;
	}

	public SystemInfo() {}

	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public String getComment() {
		return comment;
	}


	public void setComment(String comment) {
		this.comment = comment;
	}

	public List<SystemCsrCode> getVarSystemCsrCode() {
		return varSystemCsrCode;
	}

	public void setVarSystemCsrCode(List<SystemCsrCode> varSystemCsrCode) {
		this.varSystemCsrCode = varSystemCsrCode;
	}

	@GET
	@Path("/site/{id:[0-9]+}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getSystemInfoBySiteId(@Context UriInfo ui,
			@Context HttpHeaders hh, @PathParam("id") String siteId) {
		Response.ResponseBuilder rb = null;
		List<SystemInfo> systems = null;
		try{
			Long entityId = Long.parseLong(siteId);
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			mapper.addMixIn(SystemInfo.class, SystemInfoMixIn.class);
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
			SystemInfoService systemInfoService = (SystemInfoService) SpringConfig
					.getInstance().getBean("systemInfoService");
			systems = systemInfoService.readAllBySiteId(entityId);
			if (systems == null)
				throw new Exception("Unable to find Systems");
			mapper.setDateFormat(ApplicationUtils.df);
			mapper.writeValue(writer, systems);
			rb = Response.ok(writer.toString());
		} catch (WebApplicationException ex) {
			throw ex;
		} catch (Exception e) {
			e.printStackTrace();
			throw new WebApplicationException(Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e))
					.type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		return rb.build();
	}
}
