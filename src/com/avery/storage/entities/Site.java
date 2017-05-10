package com.avery.storage.entities;

import java.io.StringWriter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Iterator;
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
import javax.ws.rs.core.MultivaluedMap;
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
public class Site extends MainAbstractEntity {

	private static final long serialVersionUID = 1L;

	@Column(name = "name", length = 50, unique = true)
	private String name;
	@Column(name = "comment", length = 250)
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

	@OneToMany(mappedBy = "site", fetch = FetchType.LAZY)
	private List<SystemInfo> systemInfoList;

	@Override
	public Response getEntities(UriInfo ui, HttpHeaders hh) {
		Response.ResponseBuilder rb = null;
		List<Site> siteList = null;
		List<Site> modifiedSiteList = new ArrayList<Site>();
		MultivaluedMap<String, String> queryMap = ui.getQueryParameters();
		String siteId = null;
		siteId = queryMap.getFirst("siteId");
		try {
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, true);
			mapper.addMixIn(Site.class, SiteMixIn.class);
			SiteService siteService = (SiteService) SpringConfig.getInstance().getBean("siteService");
			siteList = siteService.readAll();
			Collections.sort(siteList, siteIdComparator);
			Iterator itr = siteList.iterator();
			if (siteId == null) {
				siteList.remove(0);
			} else {
				if (siteId.equals("1")) {
					siteList.remove(0);
				} else {
					while (itr.hasNext()) {
						Site site = (Site) itr.next();
						if (!siteId.isEmpty()) {
							if (Integer.parseInt(siteId) == (site.getId())) {
								modifiedSiteList.add(site);
							}
						}
					}
				}
			}
			if (siteList == null)
				throw new Exception("Unable to find order configuration");
			if (siteId == null || siteId.isEmpty() || siteId.equals("1")) {
				mapper.writeValue(writer, siteList);
			} else if (!siteId.isEmpty()) {
				if (Integer.parseInt(siteId) != 1) {
					mapper.writeValue(writer, modifiedSiteList);
				}
			} else {
				mapper.writeValue(writer, siteList);
			}
			rb = Response.ok(writer.toString());
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error("Error in fetching order configuration ", ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error("Error in fetching order configuration ", e);
			throw new WebApplicationException(Response.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e)).type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		return rb.build();

	}

	public static Comparator<Site> siteIdComparator = new Comparator<Site>() {
		@Override
		public int compare(Site site1, Site site2) {
			return (int) (site1.getId() - site2.getId());
		}
	};

}
