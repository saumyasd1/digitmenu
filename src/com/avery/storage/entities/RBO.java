package com.avery.storage.entities;

import java.io.StringWriter;
import java.util.List;
import java.util.Map;
import java.util.Set;

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
import com.avery.storage.MixIn.RboMixIn;
import com.avery.storage.service.RboService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

@Entity
@Table(name = "rbo")
@Path("rbo")
public class RBO extends MainAbstractEntity{
	
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 322002883506576261L;
	public RBO() {
		
	}

	@Column(name = "rboName", length = 250)
	private String rboName;
	
	@Column(name = "comment", length = 250)
	private String comment;
	
	@OneToMany(fetch = FetchType.LAZY,mappedBy = "rbo")
	Set<ProductLine> productLine;
//
//	public List<ProductLine> getVarProductLine() {
//		return varProductLine;
//	}
//
//	public void setVarProductLine(List<ProductLine> varProductLine) {
//		this.varProductLine = varProductLine;
//	}
	private transient Integer site;

	public String getRboName() {
		return rboName;
	}

	public void setRboName(String rboName) {
		this.rboName = rboName;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public Set<ProductLine> getProductLine() {
		return productLine;
	}

	public void setProductLine(Set<ProductLine> productLine) {
		this.productLine = productLine;
	}
	
	public Integer getSite() {
		return site;
	}

	public void setSite(Integer site) {
		this.site = site;
	}

	@Override
	public Response getEntities(UriInfo ui, HttpHeaders hh) {
		Response.ResponseBuilder rb = null;
		List<RBO> rboList = null;
		try {
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, true);
			mapper.addMixIn(RBO.class, RboMixIn.class);
			RboService rBOService = (RboService) SpringConfig
					.getInstance().getBean("rboService");
			rboList = rBOService.readAll();
			if (rboList == null)
				throw new Exception("Unable to find order configuration");
			mapper.writeValue(writer, rboList);
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
	
	@GET
	@Path("partner")
	public Response getRboByPartnerId(@Context UriInfo ui, @Context HttpHeaders hh, @QueryParam("id") String id) {
		Response.ResponseBuilder rb = null;
		List<RBO> rboList = null;
		Map entitiesMap = null;
		Long partnerId = null;
		try {
			partnerId = Long.parseLong(id);
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
			mapper.addMixIn(RBO.class, RboMixIn.class);
			RboService rboService = (RboService) SpringConfig.getInstance().getBean("rboService");
			entitiesMap = rboService.getRboByPartnerId(partnerId);
			if (entitiesMap == null)
				throw new Exception("Unable to find rbo");
			mapper.writeValue(writer, entitiesMap);
			rb = Response.ok(writer.toString());
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error("Error in fetching rbo list -> ", ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error("Error in fetching rbo list -> ", e);
			throw new WebApplicationException(Response.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e)).type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		return rb.build();

	}

}
