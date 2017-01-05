package com.avery.storage.entities;

import java.io.StringWriter;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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
import com.avery.storage.MixIn.OrgMixIn;
import com.avery.storage.service.OrgService;
import com.avery.utils.ApplicationUtils;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;


@Entity
@Table(name="org")
@Path("org")
public class Org extends MainAbstractEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = 738382022130142163L;

	@Column(name = "name",length=50,unique=true)
	private String name;
	
	@Column(name = "comment",length=250)
	private String comment;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="systemId",nullable=false)
	private SystemInfo system;
	
	public Org() {}

	public SystemInfo getSystem() {
		return system;
	}

	public void setSystem(SystemInfo system) {
		this.system = system;
	}

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
	
	@GET
	@Path("/system/{id:[0-9]+}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getOrgBySystemId(@Context UriInfo ui,
			@Context HttpHeaders hh, @PathParam("id") String systemId) {
		Response.ResponseBuilder rb = null;
		List<Org> orgs = null;
		try{
			Long entityId = Long.parseLong(systemId);
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
			mapper.addMixIn(Org.class, OrgMixIn.class);
			OrgService orgService = (OrgService) SpringConfig
					.getInstance().getBean("orgService");
			orgs = orgService.readAllBySystemId(entityId);
			if (orgs == null)
				throw new Exception("Unable to find Org.");
			mapper.setDateFormat(ApplicationUtils.df);
			mapper.writeValue(writer, orgs);
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
