package com.avery.storage.entities;

import java.io.StringWriter;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
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
import com.avery.storage.MixIn.SiteMixIn;
import com.avery.storage.service.SiteService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

@Entity
@Table(name = "site")
@Path("site")
public class Site extends MainAbstractEntity{
	
	private static final long serialVersionUID = 1L;

	@Column(name = "name",length=50,unique=true)
	String name;
	@Column(name = "comment",length=250)
	String comment;


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
	
	@OneToMany(mappedBy="site",cascade=CascadeType.ALL,fetch=FetchType.LAZY)
	List<SystemInfo> systemInfoList=new ArrayList<SystemInfo>();
	
	@Override
	public Response getEntities(UriInfo ui, HttpHeaders hh) {
		Response.ResponseBuilder rb = null;
		List<Site> siteList = null;
		try {
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, true);
			mapper.addMixIn(Site.class, SiteMixIn.class);
			SiteService siteService = (SiteService) SpringConfig
					.getInstance().getBean("siteService");
			siteList = siteService.readAll();
			if (siteList == null)
				throw new Exception("Unable to find order configuration");
			mapper.writeValue(writer, siteList);
			rb = Response.ok(writer.toString());
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error in fetching order configuration " , ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error in fetching order configuration " ,e);
			throw new WebApplicationException(Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e))
					.type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		return rb.build();

	}
	
	
}
