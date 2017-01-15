package com.avery.storage.entities;

import java.io.File;
import java.io.InputStream;
import java.io.StringWriter;
import java.sql.Blob;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
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

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang.exception.ExceptionUtils;
import org.glassfish.jersey.media.multipart.FormDataBodyPart;
import org.glassfish.jersey.media.multipart.FormDataMultiPart;

import com.avery.app.config.PropertiesConfig;
import com.avery.app.config.SpringConfig;
import com.avery.logging.AppLogger;
import com.avery.storage.MainAbstractEntity;
import com.avery.storage.MixIn.OrderFileAttachmentMixIn;
import com.avery.storage.MixIn.PartnerMixIn;
import com.avery.storage.MixIn.ProductLineMixIn;
import com.avery.storage.service.OrderEmailQueueService;
import com.avery.storage.service.OrderFileAttachmentService;
import com.avery.utils.ApplicationConstants;
import com.avery.utils.DateUtils;
import com.avery.utils.PropertiesConstants;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;
import com.fasterxml.jackson.databind.SerializationFeature;

@Entity
@Table(name = "orderemailqueue")
@Path("emailqueue")
public class OrderEmailQueue extends MainAbstractEntity{
	
	public OrderEmailQueue(){
		
	}
private static final long serialVersionUID = 3208431286041487210L;
	
	
	@Column(name = "processId", length = 100)
	private String processId;

	@Column(name = "senderEmailId", length = 100)
	private String senderEmailId;

	@Column(name = "subject", length = 250)
	private String subject;

	@Column(name = "mailBody", length = 500)
	private String mailBody;

	@Column(name = "orderMail")
	private Boolean orderMail;

	@Column(name = "assignee", length = 100)
	private String assignee;

	@Column(name = "status", length = 100)
	private String status;
	
	@JsonFormat(shape= JsonFormat.Shape.STRING, pattern="yyyy-MM-dd' 'HH:mm:ss")
	@Column(name = "receivedDate")
	private Date receivedDate;
	
	@JsonFormat(shape= JsonFormat.Shape.STRING, pattern="yyyy-MM-dd' 'HH:mm:ss")
	@Column(name = "readDate")
	private Date readDate;
	
	@JsonFormat(shape= JsonFormat.Shape.STRING, pattern="yyyy-MM-dd' 'HH:mm:ss")
	@Column(name = "acknowledgementDate")
	private Date acknowledgementDate;

	@Column(name = "toMailId", length = 100)
	private String toMailId;

	@Column(name = "ccMailId", length = 100)
	private String ccMailId;

	@Column(name = "assignCSR", length = 100)
	private String assignCSR;

	@Column(name = "comment", length = 250)
	private String comment;

	@Column(name = "orderSource", length = 50)
	private String orderSource;
	
	@Column(name = "emailSubjectProductLineMatch", length = 100)
	private String emailSubjectProductLineMatch;

	@Column(name = "emailSubjectRBOMatch", length = 100)
	private String emailSubjectRBOMatch;

	@Column(name = "emailBodyProductLineMatch", length = 100)
	private String emailBodyProductLineMatch;

	@Column(name = "emailBodyRBOMatch", length = 100)
	private String emailBodyRBOMatch;
	
	@OneToMany(mappedBy = "varOrderEmailQueue",  fetch = FetchType.EAGER)
	private List<OrderFileAttachment> listOrderFileAttachment;
	
	
	//transient variables added for getting colorCode and iconName
	@Transient
	private String iconName;
	
	@Transient
	private String colorCode;
	
	@Transient
	private String codeValue;

	@Transient
	private int orderQueueCount;

	//Adding partnerName and rboName to remove extra data that is not required
	@Transient
	private String partnerName;
	
	@Transient
	private String rboName;
	
	@Transient
	private String csrName;

	public int getOrderQueueCount() {
		return orderQueueCount;
	}

	public void setOrderQueueCount(int orderQueueCount) {
		this.orderQueueCount = orderQueueCount;
	}
	
	public String getPartnerName() {
		return partnerName;
	}

	public void setPartnerName(String partnerName) {
		this.partnerName = partnerName;
	}

	public String getRboName() {
		return rboName;
	}

	public void setRboName(String rboName) {
		this.rboName = rboName;
	}
	

	public String getIconName() {
		return iconName;
	}

	public void setIconName(String iconName) {
		this.iconName = iconName;
	}

	public String getColorCode() {
		return colorCode;
	}

	public void setColorCode(String colorCode) {
		this.colorCode = colorCode;
	}
	
	public String getCodeValue() {
		return codeValue;
	}

	public void setCodeValue(String codeValue) {
		this.codeValue = codeValue;
	}
	
	public String getCsrName() {
		return csrName;
	}

	public void setCsrName(String csrName) {
		this.csrName = csrName;
	}

	public String getProcessId() {
		return processId;
	}


	public void setProcessId(String processId) {
		this.processId = processId;
	}


	public String getSenderEmailId() {
		return senderEmailId;
	}


	public void setSenderEmailId(String senderEmailId) {
		this.senderEmailId = senderEmailId;
	}


	public String getSubject() {
		return subject;
	}


	public void setSubject(String subject) {
		this.subject = subject;
	}


	public String getMailBody() {
		return mailBody;
	}


	public void setMailBody(String mailBody) {
		this.mailBody = mailBody;
	}


	public Boolean isOrderMail() {
		return orderMail;
	}


	public void setOrderMail(Boolean orderMail) {
		this.orderMail = orderMail;
	}


	public String getAssignee() {
		return assignee;
	}


	public void setAssignee(String assignee) {
		this.assignee = assignee;
	}


	public String getStatus() {
		return status;
	}


	public void setStatus(String status) {
		this.status = status;
	}


	public Date getReceivedDate() {
		return receivedDate;
	}


	public void setReceivedDate(Date receivedDate) {
		this.receivedDate = receivedDate;
	}


	public Date getReadDate() {
		return readDate;
	}


	public void setReadDate(Date readDate) {
		this.readDate = readDate;
	}


	public Date getAcknowledgementDate() {
		return acknowledgementDate;
	}


	public void setAcknowledgementDate(Date acknowledgementDate) {
		this.acknowledgementDate = acknowledgementDate;
	}


	public String getToMailId() {
		return toMailId;
	}


	public void setToMailId(String toMailId) {
		this.toMailId = toMailId;
	}


	public String getCcMailId() {
		return ccMailId;
	}


	public void setCcMailId(String ccMailId) {
		this.ccMailId = ccMailId;
	}


	public String getAssignCSR() {
		return assignCSR;
	}


	public void setAssignCSR(String assignCSR) {
		this.assignCSR = assignCSR;
	}


	public String getComment() {
		return comment;
	}


	public void setComment(String comment) {
		this.comment = comment;
	}


	public String getOrderSource() {
		return orderSource;
	}


	public void setOrderSource(String orderSource) {
		this.orderSource = orderSource;
	}


	public String getEmailSubjectProductLineMatch() {
		return emailSubjectProductLineMatch;
	}


	public void setEmailSubjectProductLineMatch(String emailSubjectProductLineMatch) {
		this.emailSubjectProductLineMatch = emailSubjectProductLineMatch;
	}


	public String getEmailSubjectRBOMatch() {
		return emailSubjectRBOMatch;
	}


	public void setEmailSubjectRBOMatch(String emailSubjectRBOMatch) {
		this.emailSubjectRBOMatch = emailSubjectRBOMatch;
	}


	public String getEmailBodyProductLineMatch() {
		return emailBodyProductLineMatch;
	}


	public void setEmailBodyProductLineMatch(String emailBodyProductLineMatch) {
		this.emailBodyProductLineMatch = emailBodyProductLineMatch;
	}


	public String getEmailBodyRBOMatch() {
		return emailBodyRBOMatch;
	}


	public void setEmailBodyRBOMatch(String emailBodyRBOMatch) {
		this.emailBodyRBOMatch = emailBodyRBOMatch;
	}


	public List<OrderFileAttachment> getListOrderFileAttachment() {
		return listOrderFileAttachment;
	}


	public void setListOrderFileAttachment(List<OrderFileAttachment> listOrderFileAttachment) {
		this.listOrderFileAttachment = listOrderFileAttachment;
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
            mapper.addMixIn(ProductLine.class,ProductLineMixIn.class);
            mapper.addMixIn(OrderFileAttachment.class, OrderFileAttachmentMixIn.class);
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
			OrderEmailQueueService orderEmailQueueService = (OrderEmailQueueService) SpringConfig
					.getInstance().getBean("orderEmailQueueService");
			entitiesMap = orderEmailQueueService.readWithCriteria( queryParamMap);
			if (entitiesMap == null || entitiesMap.isEmpty())
				throw new Exception("Unable to find any data");
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
	
	
	@GET
	@Path("/unidentified")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getUnidentified(@Context UriInfo ui, @Context HttpHeaders hh) throws Exception{
		Response.ResponseBuilder rb = null;
		Map<?,?> entitiesMap=null;
		try {
			MultivaluedMap<String, String> queryParamMap =ui.getQueryParameters();
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			mapper.addMixIn(Partner.class,PartnerMixIn.class);
			mapper.addMixIn(ProductLine.class,ProductLineMixIn.class);
			mapper.addMixIn(OrderFileAttachment.class, OrderFileAttachmentMixIn.class);
			OrderEmailQueueService orderEmailQueueService = (OrderEmailQueueService) SpringConfig
					.getInstance().getBean("orderEmailQueueService");
			entitiesMap = orderEmailQueueService.getWithUnidentifiedStatus(queryParamMap);
			if (entitiesMap == null || entitiesMap.isEmpty())
				throw new Exception("Unable to find any data");
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
	
	@Override
	public Response createEntity(UriInfo ui, HttpHeaders hh, String data) {
		Long id;
		try {
			ObjectMapper mapper = new ObjectMapper();
			mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,
					false);
			mapper.configure(DeserializationFeature.UNWRAP_ROOT_VALUE, false);
			OrderEmailQueue orderEmailQueue = mapper.readValue(data, OrderEmailQueue.class);
			//orderEmailQueue.setCreatedDate(new Date());
			OrderEmailQueueService orderEmailQueueService = (OrderEmailQueueService) SpringConfig
					.getInstance().getBean("orderEmailQueueService");
			id = orderEmailQueueService.create(orderEmailQueue);
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
			//mapper.addMixIn(Partner.class,PartnerMixIn.class);
			//mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,false);
			// toggle this property value based on your input JSON data
			mapper.configure(DeserializationFeature.UNWRAP_ROOT_VALUE, false);
			OrderEmailQueueService orderEmailQueueService = (OrderEmailQueueService) SpringConfig
					.getInstance().getBean("orderEmailQueueService");
			// read existing entity from database
			OrderEmailQueue orderEmailQueue = orderEmailQueueService.read(Long.parseLong(id));
			if (orderEmailQueue == null) {
				throw new WebApplicationException(Response
						.status(Status.BAD_REQUEST)
						.entity("data entity with id \"" + id
								+ "\" doesn't exist")
						.type(MediaType.TEXT_PLAIN_TYPE).build());
			}
			ObjectReader updater = mapper.readerForUpdating(orderEmailQueue);
			// build updated entity object from input data
			orderEmailQueue = updater.readValue(data);
			// update entity in database
			orderEmailQueueService.update(orderEmailQueue);
			// prepare response
			mapper.writeValue(writer, orderEmailQueue);
			rb = Response.ok(writer.toString());
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error in updating data entity with id " + id, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error in updating data entity with id " + id, e);
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
			OrderEmailQueueService orderEmailQueueService = (OrderEmailQueueService) SpringConfig
					.getInstance().getBean("orderEmailQueueService");
			OrderEmailQueue orderEmailQueue = orderEmailQueueService.read(entityId);
			if (orderEmailQueue == null)
				throw new WebApplicationException(Response
						.status(Status.BAD_REQUEST)
						.entity("Data entity with id \"" + id
								+ "\" doesn't exist")
						.type(MediaType.TEXT_PLAIN_TYPE).build());
			mapper.writeValue(writer, orderEmailQueue);
			rb = Response.ok(writer.toString());
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error in fetching data entity with id " + id, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error in fetching data entity with id " + id, e);
			throw new WebApplicationException(Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e))
					.type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		return rb.build();

	}
	@Override
	public Response deleteEntity(UriInfo ui, HttpHeaders hh, String id) {
		Response.ResponseBuilder rb = null;
		try {
			OrderEmailQueueService orderEmailQueueService = (OrderEmailQueueService) SpringConfig
					.getInstance().getBean("orderEmailQueueService");
			// read existing entity from database
			OrderEmailQueue orderEmailQueue = orderEmailQueueService.read(Long.parseLong(id));
			if (orderEmailQueue == null) {
				throw new WebApplicationException(Response
						.status(Status.BAD_REQUEST)
						.entity("Data entity with id \"" + id
								+ "\" doesn't exist")
						.type(MediaType.TEXT_PLAIN_TYPE).build());
			}
			// prepare response
			orderEmailQueueService.delete(orderEmailQueue);
			return Response.ok(id).build();
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error in deleting Data entity with id " + id, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error in deleting data entity with id " + id, e);
			throw new WebApplicationException(Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e))
					.type(MediaType.TEXT_PLAIN_TYPE).build());
		}
	}
	
	@PUT
	@Path("cancelemail/{id:[0-9]+}")
	public Response cancelEmail(@Context UriInfo ui,
			@Context HttpHeaders hh, String data, @PathParam("id") String orderEmailQueueId) {
		Long orderEmailQueueEntityId = Long.parseLong(orderEmailQueueId);
		try {
			OrderEmailQueueService orderQueueService = (OrderEmailQueueService) SpringConfig
					.getInstance().getBean("orderEmailQueueService");
			orderQueueService.cancelEmail(data,orderEmailQueueEntityId);
			   return Response.ok().build();
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error while cancelling email", ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error while cancelling email", e);
			throw new WebApplicationException(Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e))
					.type(MediaType.TEXT_PLAIN_TYPE).build());
		}
	}

    @PUT
	@Path("disregardemail/{id:[0-9]+}")
	public Response disregardEmail(@Context UriInfo ui,
			@Context HttpHeaders hh, String data, @PathParam("id") String orderEmailQueueId) {
		Long orderEmailQueueEntityId = Long.parseLong(orderEmailQueueId);
		try {
			OrderEmailQueueService orderEmailQueueService = (OrderEmailQueueService) SpringConfig
					.getInstance().getBean("orderEmailQueueService");
			orderEmailQueueService.disregardEmail(data,orderEmailQueueEntityId);
			   return Response.ok().build();
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error while disregarding email", ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error while disregarding email", e);
			throw new WebApplicationException(Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e))
					.type(MediaType.TEXT_PLAIN_TYPE).build());
		}
	}

    
    @PUT
  	@Path("identified/{id:[0-9]+}")
  	public Response identifyEmail(@Context UriInfo ui,
  			@Context HttpHeaders hh, String data, @PathParam("id") String orderEmailQueueId) {
  		Long orderEmailQueueEntityId = Long.parseLong(orderEmailQueueId);
  		Response.ResponseBuilder rb = null;
  		try {
  			
  			ObjectMapper mapper = new ObjectMapper();
			mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,
					false);
			// toggle this property value based on your input JSON dataR
			mapper.configure(DeserializationFeature.UNWRAP_ROOT_VALUE, false);
  			OrderEmailQueueService orderEmailQueueService = (OrderEmailQueueService) SpringConfig
  					.getInstance().getBean("orderEmailQueueService");
  			orderEmailQueueService.identifyEmail(data,orderEmailQueueEntityId);
  			Map entitiesMap = new HashMap();
			StringWriter writer = new StringWriter();
			entitiesMap.put("success", true);
			mapper.writeValue(writer, entitiesMap);
			rb = Response.ok(writer.toString());
  		} catch (WebApplicationException ex) {
  			AppLogger.getSystemLogger().error(
  					"Error while processing order", ex);
  			throw ex;
  		} catch (Exception e) {
  			AppLogger.getSystemLogger().error(
  					"Error while processing order", e);
  			throw new WebApplicationException(Response
  					.status(Status.INTERNAL_SERVER_ERROR)
  					.entity(ExceptionUtils.getRootCauseMessage(e))
  					.type(MediaType.TEXT_PLAIN_TYPE).build());
  		}
		return rb.build();
  	}
    
    @GET
    @Path("/assigncsr/{id:[0-9]+}/{csrid}")
    @Produces(MediaType.APPLICATION_JSON)
  	public Response assignCsr(@Context UriInfo ui,
  			@Context HttpHeaders hh, @PathParam("id") String orderEmailQueueId, 
  									 @PathParam("csrid") String csrId) {
  		Long orderEmailQueueEntityId = Long.parseLong(orderEmailQueueId);
  		Response.ResponseBuilder rb = null;
  		try {
  			
  			ObjectMapper mapper = new ObjectMapper();
			mapper.configure(DeserializationFeature.UNWRAP_ROOT_VALUE, false);
  			OrderEmailQueueService orderEmailQueueService = (OrderEmailQueueService) SpringConfig
  					.getInstance().getBean("orderEmailQueueService");
  			orderEmailQueueService.assignCsrByEmailQueueId(orderEmailQueueEntityId, csrId);
  			Map entitiesMap = new HashMap();
			StringWriter writer = new StringWriter();
			entitiesMap.put("success", true);
			mapper.writeValue(writer, entitiesMap);
			rb = Response.ok(writer.toString());
  		} catch (WebApplicationException ex) {
  			AppLogger.getSystemLogger().error(
  					"Error while processing Request", ex);
  			throw ex;
  		} catch (Exception e) {
  			AppLogger.getSystemLogger().error(
  					"Error while processing order", e);
  			throw new WebApplicationException(Response
  					.status(Status.INTERNAL_SERVER_ERROR)
  					.entity(ExceptionUtils.getRootCauseMessage(e))
  					.type(MediaType.TEXT_PLAIN_TYPE).build());
  		}
		return rb.build();
  	}
    @POST
    @Path("/createweborder")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
  	public Response createWebOrder(@Context UriInfo uriInfo,
            @Context HttpHeaders hh, FormDataMultiPart formParams) {
  		Response.ResponseBuilder rb = null;
  		OrderEmailQueue orderemailQueueObj=new OrderEmailQueue();
  		Long OrderEmailQueueId;
  		String filePath;
  		try {
  			Date date = DateUtils.getDefaultCurrentDateTime();
  			String emailid = formParams.getField("email").getValue();
  			String emailBody = formParams.getField("emailBody").getValue();
  			orderemailQueueObj.setSenderEmailId(emailid);
  			String subject=formParams.getField("subject").getValue();
  			orderemailQueueObj.setSubject(subject);
  			orderemailQueueObj.setStatus(ApplicationConstants.NEW_WEB_ORDER_STATUS);
  			orderemailQueueObj.setCreatedDate(date);
  			ObjectMapper mapper = new ObjectMapper();
			mapper.configure(DeserializationFeature.UNWRAP_ROOT_VALUE, false);
  			OrderEmailQueueService orderEmailQueueService = (OrderEmailQueueService) SpringConfig
  					.getInstance().getBean("orderEmailQueueService");
  			OrderEmailQueueId=orderEmailQueueService.create(orderemailQueueObj);
  			OrderEmailQueue orderEmailQueue=new OrderEmailQueue(); 
  			orderEmailQueue.setId(OrderEmailQueueId);
  			String productLineId = formParams.getField("dataStructureName").getValue();
  			ProductLine productLineObj=new ProductLine();
  			productLineObj.setId(Long.parseLong(productLineId));
  			OrderFileAttachmentService orderFileAttachmentService = (OrderFileAttachmentService) SpringConfig
  					.getInstance().getBean("orderFileAttachmentService");
  			Map<String, List<FormDataBodyPart>> fieldsByName = formParams.getFields();
  			orderFileAttachmentService.insertEmailBody(orderEmailQueue, emailBody, productLineObj);
  			String defaultFilePath = PropertiesConfig
					.getString(PropertiesConstants.FILEATTACHMENT_PATH);
  			 UUID uniqueUUId=UUID.randomUUID();
  			String uniqueString=uniqueUUId.toString();
  			filePath=defaultFilePath+File.separator+uniqueString;
  			new File(filePath).mkdir();
  			addAttachments(orderEmailQueue,productLineObj,fieldsByName,formParams,filePath);
  			Map entitiesMap = new HashMap();
			StringWriter writer = new StringWriter();
			entitiesMap.put("success", true);
			mapper.writeValue(writer, entitiesMap);
			rb = Response.ok(writer.toString());
  		} catch (WebApplicationException ex) {
  			AppLogger.getSystemLogger().error(
  					"Error while processing order", ex);
  			throw ex;
  		} catch (Exception e) {
  			AppLogger.getSystemLogger().error(
  					"Error while processing order", e);
  			throw new WebApplicationException(Response
  					.status(Status.INTERNAL_SERVER_ERROR)
  					.entity(ExceptionUtils.getRootCauseMessage(e))
  					.type(MediaType.TEXT_PLAIN_TYPE).build());
  		}
		return rb.build();
  	}
    
    private void addAttachments(OrderEmailQueue orderemailQueue,ProductLine productLineObj,
    		Map<String, List<FormDataBodyPart>> fieldsByName,FormDataMultiPart formParams,String filePath) throws Exception{
    		 String fileExtension = null,fileName,type;
			String fileContentType = null,additionalDataFileKey=null;
			Blob blob =null;InputStream stream=null;
			OrderFileAttachment orderFileAttachment=null;
			OrderFileAttachmentService orderFileAttachmentService = (OrderFileAttachmentService) SpringConfig
  					.getInstance().getBean("orderFileAttachmentService");
			String count="0";
		for (Map.Entry<String, List<FormDataBodyPart>> entry : fieldsByName.entrySet()) {
		    String field = entry.getKey();
		    FormDataBodyPart formdata = entry.getValue().get(0);
				if (formdata != null && (field.equals("orderFileType") || field.startsWith("attachment"))) {
					 stream = ((FormDataBodyPart) formParams
							.getField(field)).getEntityAs(InputStream.class);
					 fileName = ((FormDataBodyPart) formParams.getField(field))
							.getContentDisposition().getFileName();
					type = ((FormDataBodyPart) formParams.getField(field))
							.getMediaType().toString();
					
					if(!type.equalsIgnoreCase(MediaType.TEXT_PLAIN)){
					
					fileExtension = fileName.substring(fileName.lastIndexOf(".")+1, fileName.length());
					
					if (field.equalsIgnoreCase("orderFileType"))
					{
						fileContentType = ApplicationConstants.DEFAULT_ORDER_CONTENT_TYPE;
						additionalDataFileKey=null;
					} else {
						count=field.replace("attachment", "");
						//additionalDataFileKey
						if(formParams.getField("additionalDataFileKey"+count)!=null)
							additionalDataFileKey = formParams.getField("additionalDataFileKey"+count).getValue();
						else
							additionalDataFileKey=null;
						fileContentType = ApplicationConstants.DEFAULT_ADDITIONAL_CONTENT_TYPE;
					}
					orderFileAttachment= new OrderFileAttachment();
					File targetFile = new File(filePath+File.separator+fileName);
				    FileUtils.copyInputStreamToFile(stream, targetFile);
					orderFileAttachment.setFileName(fileName);
					orderFileAttachment.setFileExtension(fileExtension);
					orderFileAttachment.setFileContentType(fileContentType);
					orderFileAttachment.setCreatedDate(new Date());
					orderFileAttachment.setAdditionalDataFileKey(additionalDataFileKey);
					orderFileAttachment.setVarProductLine(productLineObj);
					orderFileAttachment.setVarOrderEmailQueue(orderemailQueue);
					orderFileAttachment.setFilePath(filePath);
					orderFileAttachment.setStatus(ApplicationConstants.NEW_ATTACHMENT_STATUS);
					orderFileAttachmentService.create(orderFileAttachment);
					}
				}
		    }
		}
}
