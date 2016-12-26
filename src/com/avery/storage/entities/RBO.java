package com.avery.storage.entities;

import java.io.StringWriter;
import java.util.List;
import java.util.Set;

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
	String rboName;
	@Column(name = "comment", length = 250)
	String comment;
	
	@OneToMany(cascade = CascadeType.ALL,fetch = FetchType.LAZY,mappedBy = "rbo")
	Set<ProductLine> productLine;
//
//	public List<ProductLine> getVarProductLine() {
//		return varProductLine;
//	}
//
//	public void setVarProductLine(List<ProductLine> varProductLine) {
//		this.varProductLine = varProductLine;
//	}

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
	
	

}
