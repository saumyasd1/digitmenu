package com.avery.storage.entities;

import java.io.StringWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.UriInfo;

import org.apache.commons.lang.exception.ExceptionUtils;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import com.avery.app.config.SpringConfig;
import com.avery.logging.AppLogger;
import com.avery.storage.MainAbstractEntity;
import com.avery.storage.MixIn.OrgMixIn;
import com.avery.storage.service.CodeService;
import com.avery.storage.service.OrgService;
import com.avery.utils.ApplicationUtils;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
	
	@LazyCollection(LazyCollectionOption.FALSE)
	@OneToMany(mappedBy = "varOrgCode", fetch = FetchType.LAZY)
	List<Address> addressList = new ArrayList<Address>();
	
	@OneToMany(mappedBy = "varOrg", fetch = FetchType.LAZY)
	private List<Org> varOrg;
	
	@Transient
	private Long siteId;
	
	@Transient
	private Long systemId;

	public List<Address> getAddressList() {
		return addressList;
	}

	public void setAddressList(List<Address> addressList) {
		this.addressList = addressList;
	}

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
	
	public List<Org> getVarOrg() {
		return varOrg;
	}

	public void setVarOrg(List<Org> varOrg) {
		this.varOrg = varOrg;
	}
	
	public Long getSiteId() {
		return siteId;
	}

	public void setSiteId(Long siteId) {
		this.siteId = siteId;
	}

	public Long getSystemId() {
		return systemId;
	}

	public void setSystemId(Long systemId) {
		this.systemId = systemId;
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
	
	@GET
	@Path("/productline/{id:[0-9]+}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getOrgByProductLineId(@Context UriInfo ui,
			@Context HttpHeaders hh, @PathParam("id") String productline) {
		Response.ResponseBuilder rb = null;
		List<Org> orgs = null;
		try{
			Long productlineId = Long.parseLong(productline);
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
			mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
			mapper.addMixIn(Org.class, OrgMixIn.class);
			OrgService orgService = (OrgService) SpringConfig
					.getInstance().getBean("orgService");
			orgs = orgService.getOrgByProductLineId(productlineId);
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
	
	@GET
	@Path("/ordersysteminfo/{id:[0-9]+}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getOrgByOrderSystemInfoId(@Context UriInfo ui,
			@Context HttpHeaders hh, @PathParam("id") String ordersysteminfo) {
		Response.ResponseBuilder rb = null;
		List<Org> orgs = null;
		try{
			Long orderSystemInfoId = Long.parseLong(ordersysteminfo);
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
			mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
			mapper.addMixIn(Org.class, OrgMixIn.class);
			OrgService orgService = (OrgService) SpringConfig
					.getInstance().getBean("orgService");
			orgs = orgService.getOrgByOrderSystemInfoId(orderSystemInfoId);
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
	
	@Override
	public Response getEntities(UriInfo ui, HttpHeaders hh) {
		Response.ResponseBuilder rb = null;
		Map<?, ?> OrgMap = null;
		List<Org> Org=null;
		try {
			MultivaluedMap<String, String> queryParamMap = ui.getQueryParameters();
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
			mapper.addMixIn(Org.class, OrgMixIn.class);
			OrgService OrgService = (OrgService) SpringConfig
					.getInstance().getBean("orgService");
			OrgMap = OrgService.readWithCriteria(queryParamMap);
			Org=(List) OrgMap.get("org");
			if (Org == null)
				throw new Exception("Unable to find order configuration");
			mapper.writeValue(writer, Org);
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
