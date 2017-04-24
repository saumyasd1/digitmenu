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
import javax.persistence.Table;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.core.Response.Status;

import org.apache.commons.lang.exception.ExceptionUtils;

import com.avery.app.config.SpringConfig;
import com.avery.storage.MainAbstractEntity;
import com.avery.storage.MixIn.WiFilesMixIn;
import com.avery.storage.service.WiFilesService;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * @author Vishal
 *
 */
@Entity
@Table(name = "wi_files")
@Path("wifiles")
public class WiFiles extends MainAbstractEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public WiFiles() {

	}

	@Column(name = "filePath", length = 500)
	private String filePath;

	@Column(name = "fileName", length = 100)
	private String fileName;

	@Column(name = "fileType", length = 100)
	private String fileType;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "wi_id")
	Wi varWi;

	@GET
	@Path("list")
	public Response getFilesListByWiId(@Context UriInfo ui, @Context HttpHeaders hh, @QueryParam("id") String id) {
		Map entitiesMap = new HashMap();
		Response.ResponseBuilder rb = null;
		ObjectMapper mapper = new ObjectMapper();
		StringWriter writer = new StringWriter();
		List<WiFiles> wiFilesList = new ArrayList();

		long wiId = Long.parseLong(id);

		WiFilesService wiFilesService;
		try {
			mapper.addMixIn(WiFiles.class, WiFilesMixIn.class);
			wiFilesService = (WiFilesService) SpringConfig.getInstance().getBean("wiFilesService");
			wiFilesList = wiFilesService.getFilesListByWiId(wiId);
			entitiesMap.put("files", wiFilesList);
			mapper.writeValue(writer, entitiesMap);
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
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	public String getFilePath() {
		return filePath;
	}

	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getFileType() {
		return fileType;
	}

	public void setFileType(String fileType) {
		this.fileType = fileType;
	}

	public Wi getVarWi() {
		return varWi;
	}

	public void setVarWi(Wi varWi) {
		this.varWi = varWi;
	}

}
