package com.avery.storage.entities;

import java.io.StringWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.ws.rs.core.MultivaluedMap;
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
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.UriInfo;

import org.apache.commons.lang.exception.ExceptionUtils;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import com.avery.app.config.SpringConfig;
import com.avery.logging.AppLogger;
import com.avery.storage.MainAbstractEntity;
import com.avery.storage.MixIn.OrgMixIn;
import com.avery.storage.MixIn.PartnerMixIn;
import com.avery.storage.MixIn.SiteMixIn;
import com.avery.storage.MixIn.SystemInfoMixIn;
import com.avery.storage.service.AddressService;
import com.avery.storage.service.SiteService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

@Entity
@Table(name = "site")
@Path("site")
public class Site extends MainAbstractEntity{
	
	private static final long serialVersionUID = 1L;

	@Column(name = "name",length=50,unique=true)
	private String name;
	@Column(name = "comment",length=250)
	private String comment;


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
	
	@OneToMany(mappedBy="site",cascade=CascadeType.ALL,fetch=FetchType.EAGER)
	@Fetch(value = FetchMode.SUBSELECT)
	private List<SystemInfo> systemInfoList;
	

	public List<SystemInfo> getSystemInfoList() {
		return systemInfoList;
	}
	public void setSystemInfoList(List<SystemInfo> systemInfoList) {
		this.systemInfoList = systemInfoList;
	}
	@Override
	public Response getEntities(UriInfo ui, HttpHeaders hh) {
		Response.ResponseBuilder rb = null;
		Map<?,?> entitiesMap=null;
		try {
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			MultivaluedMap<String, String> queryParamMap =ui.getQueryParameters();
			mapper.addMixIn(Partner.class,PartnerMixIn.class);
			//mapper.addMixIn(Org.class, OrgMixIn.class);
			mapper.addMixIn(SystemInfo.class, SystemInfoMixIn.class);
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
			SiteService siteService = (SiteService) SpringConfig
					.getInstance().getBean("siteService");
			entitiesMap = siteService.readWithCriteria( queryParamMap);
			if (entitiesMap == null || entitiesMap.isEmpty())
				throw new Exception("Unable to find addresses");
			mapper.writeValue(writer, entitiesMap);
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
