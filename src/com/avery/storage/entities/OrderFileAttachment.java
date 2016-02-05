package com.avery.storage.entities;

import java.io.InputStream;
import java.io.StringWriter;
import java.sql.Blob;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
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

import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.exception.ExceptionUtils;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import com.avery.app.config.SpringConfig;
import com.avery.logging.AppLogger;
import com.avery.storage.MainAbstractEntity;
import com.avery.storage.service.OrderFileAttachmentService;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;
import com.fasterxml.jackson.databind.SerializationFeature;

@Entity
@Table(name = "OrderFileAttachment")
@Path("orderattachements")
public class OrderFileAttachment extends MainAbstractEntity {

	private static final long serialVersionUID = -5438437762230204443L;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "OrderQueueID", nullable = true)
	private OrderQueue orderQueue;
	
	@NotFound(action=NotFoundAction.IGNORE)
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "PartnerID", nullable = true)
	private Partner partnerObj;
	
	@Column(name = "RBOID",length = 50)
    private String rboID; 
	
	@Column(name = "ReceivedDate")
    private Date receivedDate;
	
	@Column(name = "FileName",length = 250)
    private String fileName;
	
	@Column(name = "FileExtension",length = 50)
    private String fileExtension;
	
	@Column(name = "FileData")
	@Lob
    private Blob fileData;
	
	
	@Column(name = "FileContentType",length = 50)
    private String fileContentType;
	
	@Column(name = "StyleNo",length = 50)
    private String styleNo;
	
	@Column(name = "Status",length = 50)
    private String status;
	
	@Column(name = "Error",length = 50)
    private String error;

	public OrderQueue getOrderQueue() {
		return orderQueue;
	}

	public void setOrderQueue(OrderQueue orderQueue) {
		this.orderQueue = orderQueue;
	}

	public Partner getPartnerObj() {
		return partnerObj;
	}

	public void setPartnerObj(Partner partnerObj) {
		this.partnerObj = partnerObj;
	}


	public String getRboID() {
		return rboID;
	}

	public void setRboID(String rboID) {
		this.rboID = rboID;
	}

	public Date getReceivedDate() {
		return receivedDate;
	}

	public void setReceivedDate(Date receivedDate) {
		this.receivedDate = receivedDate;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getFileExtension() {
		return fileExtension;
	}

	public void setFileExtension(String fileExtension) {
		this.fileExtension = fileExtension;
	}

	public Blob getFileData() {
		return fileData;
	}

	public void setFileData(Blob fileData) {
		this.fileData = fileData;
	}

	public String getFileContentType() {
		return fileContentType;
	}

	public void setFileContentType(String fileContentType) {
		this.fileContentType = fileContentType;
	}

	public String getStyleNo() {
		return styleNo;
	}

	public void setStyleNo(String styleNo) {
		this.styleNo = styleNo;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getError() {
		return error;
	}

	public void setError(String error) {
		this.error = error;
	}
	
	@Override
	public Response getEntities(UriInfo ui, HttpHeaders hh) {
		Response.ResponseBuilder rb = null;
		List<OrderFileAttachment> orderFileAttachment = null;
		try {
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, true);
			OrderFileAttachmentService orderFileAttachmentService = (OrderFileAttachmentService) SpringConfig
					.getInstance().getBean("orderFileAttachmentService");
			orderFileAttachment = orderFileAttachmentService.readAll();
			if (orderFileAttachment == null)
				throw new Exception("Unable to find Order Attachments");
			mapper.writeValue(writer, orderFileAttachment);
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
	public Response createEntity(UriInfo ui, HttpHeaders hh, String data) {
		Long id;
		try {
			ObjectMapper mapper = new ObjectMapper();
			mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,
					false);
			mapper.configure(DeserializationFeature.UNWRAP_ROOT_VALUE, false);
			OrderFileAttachment orderFileAttachment = mapper.readValue(data, OrderFileAttachment.class);
			OrderFileAttachmentService orderFileAttachmentService = (OrderFileAttachmentService) SpringConfig
					.getInstance().getBean("orderFileAttachmentService");
			
			id = orderFileAttachmentService.create(orderFileAttachment);
			return Response.ok(id).build();
		} catch (Exception e) {
			e.printStackTrace();
			throw new WebApplicationException(Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e))
					.type(MediaType.TEXT_PLAIN_TYPE).build());
		}
	}
	
	@Override
	public Response updateEntity(UriInfo ui, HttpHeaders hh, String id,
			String data) {
		Response.ResponseBuilder rb = null;
		try {
			ObjectMapper mapper = new ObjectMapper();
			StringWriter writer = new StringWriter();
			mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,
					false);
			// toggle this property value based on your input JSON data
			mapper.configure(DeserializationFeature.UNWRAP_ROOT_VALUE, false);
			OrderFileAttachmentService orderFileAttachmentService = (OrderFileAttachmentService) SpringConfig
					.getInstance().getBean("orderFileAttachmentService");
			// read existing entity from database
			OrderFileAttachment orderFileAttachment = orderFileAttachmentService.read(Long.parseLong(id));
			if (orderFileAttachment == null) {
				throw new WebApplicationException(Response
						.status(Status.BAD_REQUEST)
						.entity("File Attachment entity with id \"" + id
								+ "\" doesn't exist")
						.type(MediaType.TEXT_PLAIN_TYPE).build());
			}
			ObjectReader updater = mapper.readerForUpdating(orderFileAttachment);
			// build updated entity object from input data
			orderFileAttachment = updater.readValue(data);
			// update entity in database
			orderFileAttachmentService.update(orderFileAttachment);
			// prepare response
			mapper.writeValue(writer, orderFileAttachment);
			rb = Response.ok(writer.toString());
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error in updating file attachment entity with id " + id, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error in updating file attachment entity with id " + id, e);
			throw new WebApplicationException(Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e))
					.type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		return rb.build();
	}


	@Override
	public Response getEntity(UriInfo ui, HttpHeaders hh, String id) {
		Response.ResponseBuilder rb = null;
		try {
			Long entityId = Long.parseLong(id);
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, true);
			OrderFileAttachmentService orderFileAttachmentService = (OrderFileAttachmentService) SpringConfig
					.getInstance().getBean("orderFileAttachmentService");
			OrderFileAttachment orderFileAttachment = orderFileAttachmentService.read(entityId);
			if (orderFileAttachment == null)
				throw new WebApplicationException(Response
						.status(Status.BAD_REQUEST)
						.entity("File Attachment entity with id \"" + id
								+ "\" doesn't exist")
						.type(MediaType.TEXT_PLAIN_TYPE).build());
			mapper.writeValue(writer, orderFileAttachment);
			rb = Response.ok(writer.toString());
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error in fetching file attachment entity with id " + id, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error in fetching file attachment with id " + id, e);
			throw new WebApplicationException(Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e))
					.type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		return rb.build();

	}
	
	
	@GET
	@Path("/order/{id:[0-9]+}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getByOrderID(@Context UriInfo ui,
			@Context HttpHeaders hh, @PathParam("id") String orderId) {
		Response.ResponseBuilder rb = null;
		List<OrderFileAttachment> orderFileAttachment = null;
		try{
			Long entityId = Long.parseLong(orderId);
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, true);
			OrderFileAttachmentService orderFileAttachmentService = (OrderFileAttachmentService) SpringConfig
					.getInstance().getBean("orderFileAttachmentService");
			orderFileAttachment = orderFileAttachmentService.readAllByOrderID(entityId);
			if (orderFileAttachment == null)
				throw new Exception("Unable to find order attachments");
			mapper.writeValue(writer, orderFileAttachment);
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
	@Path("/download/{id:[0-9]+}")
	@Produces(MediaType.MULTIPART_FORM_DATA)
	public Response getFileByID(@Context UriInfo ui,
			@Context HttpHeaders hh, @PathParam("id") String fileId) {
		OrderFileAttachment orderFileAttachment = null;
		try{
			Long entityId = Long.parseLong(fileId);
			ObjectMapper mapper = new ObjectMapper();
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, true);
			OrderFileAttachmentService orderFileAttachmentService = (OrderFileAttachmentService) SpringConfig
					.getInstance().getBean("orderFileAttachmentService");
			
			orderFileAttachment = orderFileAttachmentService.read(entityId);
			//orderFileAttachment = orderFileAttachmentService.readFileByID(entityId);
			if (orderFileAttachment == null)
				throw new Exception("Unable to find order attachments");
			//FormDataMultiPart form = new FormDataMultiPart();
			
			InputStream is = orderFileAttachment.getFileData().getBinaryStream();
			byte[] bytes = IOUtils.toByteArray(is);
			String fileName = "\""+orderFileAttachment.getFileName()+"\"";
			//FormDataBodyPart bodyPart = new FormDataBodyPart("file", is, MediaType.APPLICATION_OCTET_STREAM_TYPE);

			//bodyPart.setContentDisposition(FormDataContentDisposition.name("file")
              //                                             .fileName(orderFileAttachment.getFileName()).build());
			//form.bodyPart(bodyPart);
			//mapper.writeValue(writer, orderFileAttachment);
			//rb = Response.ok(form,MediaType.MULTIPART_FORM_DATA);
			return Response
		            .ok(bytes, MediaType.APPLICATION_OCTET_STREAM)
		            .header("content-disposition","attachment; filename = "+fileName)
		            .build();
		} catch (WebApplicationException ex) {
			throw ex;
		} catch (Exception e) {
			e.printStackTrace();
			throw new WebApplicationException(Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e))
					.type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		//return rb.build();
	}


}
