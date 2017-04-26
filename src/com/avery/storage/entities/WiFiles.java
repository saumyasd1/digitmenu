package com.avery.storage.entities;

import java.io.File;
import java.io.IOException;
import java.io.StringWriter;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URLDecoder;
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
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
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
import com.avery.logging.AppLogger;
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

	@GET
	@Path("/download")
	@Produces(MediaType.MULTIPART_FORM_DATA)
	public Response getFileByID(@Context UriInfo ui, @Context HttpHeaders hh, @QueryParam("filePath") String filePath) {
		OrderFileAttachment orderFileAttachment = null;
		try {

			filePath = URLDecoder.decode(filePath, "UTF-8");

			File file = new File(filePath);
			if (!file.exists()) {
				return Response.ok("The file is not available", MediaType.TEXT_PLAIN).status(Status.NOT_FOUND).build();
			}

			String fileName = filePath.substring(filePath.lastIndexOf("/") + 1);

			return Response.ok(file, MediaType.APPLICATION_OCTET_STREAM)
					.header("content-disposition", "attachment; filename=\"" + getEncoded(fileName) + "\"").build();
		} catch (WebApplicationException ex) {
			throw ex;
		} catch (Exception e) {
			e.printStackTrace();
			throw new WebApplicationException(Response.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e)).type(MediaType.TEXT_PLAIN_TYPE).build());
		}
	}

	private String getEncoded(String fileName) throws URISyntaxException {
		URI uri = new URI(null, null, fileName, null);
		return uri.toASCIIString();
	}

	@GET
	@Path("/delete")
	public Response deleteFile(@Context UriInfo ui, @Context HttpHeaders hh, @QueryParam("filePath") String filePath){
		Response.ResponseBuilder rb = null;
		Map responseMap = new HashMap();
		boolean fileExist = false;
		boolean fileDeleted = false;
		ObjectMapper mapper = new ObjectMapper();
		StringWriter writer = new StringWriter();
		try {
			File file = new File(filePath);
			fileExist = file.exists();
			if(fileExist == false)
				return Response.ok("The specified file does not exist", MediaType.TEXT_PLAIN).status(Status.NOT_FOUND).build();
			fileDeleted = file.delete();
			responseMap.put("success", fileDeleted);
			mapper.writeValue(writer, responseMap);
			rb = Response.ok(writer.toString());
		} catch (Exception e) {
			e.printStackTrace();
			AppLogger.getSystemLogger().error("There was some problem while deleting the file -> "+e);
			return Response.ok("Ërror while deleting the file", MediaType.TEXT_PLAIN).status(Status.INTERNAL_SERVER_ERROR).build();
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
