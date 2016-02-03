package com.avery.storage.entities;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.StringWriter;
import java.sql.Blob;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.sql.rowset.serial.SerialBlob;
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

import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.exception.ExceptionUtils;
import org.glassfish.jersey.media.multipart.FormDataBodyPart;
import org.glassfish.jersey.media.multipart.FormDataMultiPart;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.Formula;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import com.avery.app.config.SpringConfig;
import com.avery.logging.AppLogger;
import com.avery.storage.MainAbstractEntity;
import com.avery.storage.MixIn.OrderQueueMixIn;
import com.avery.storage.MixIn.PartnerMixIn;
import com.avery.storage.service.CodeService;
import com.avery.storage.service.OrderFileAttachmentService;
import com.avery.storage.service.OrderQueueService;
import com.avery.utils.ApplicationUtils;
import com.avery.utils.DateUtils;
import com.avery.utils.ExcelUtils;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;
import com.fasterxml.jackson.databind.SerializationFeature;



@Entity
@Table(name = "OrderFileQueue")
@Path("orders")
public class OrderQueue extends MainAbstractEntity{
	
	private static Map<String,String> codeMap;
	static{
			
			try {
				codeMap=getOrderQueueSatusMap();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	
	
	private static final long serialVersionUID = -8487156716364715576L;
	
	@Column(name = "PID",length = 50)
	private String pid;
	
	@NotFound(action=NotFoundAction.IGNORE)
	@ManyToOne
	@JoinColumn(name = "PartnerID")
	private Partner partner;
	
	@Column(name = "RBOName",length = 50)
	private String rboName;
	
	@NotFound(action=NotFoundAction.IGNORE)
	@ManyToOne
	@JoinColumn(name = "ProductLineId")
	private ProductLine productLine;
	
	@Column(name = "SenderEmailID",length = 50)
	private String senderEmailID;
	
	@Column(name = "Subject",length = 200)
	private String subject;
	
	@Column(name = "EmailBody")
	private String emailBody;
	
	@JsonFormat(shape= JsonFormat.Shape.STRING, pattern="yyyy-MM-dd' 'HH:mm:ss")
	@Column(name = "ReceivedDate")
	private Date receivedDate;
	
	@Column(name = "OrderSource",length = 50)
	private String orderSource;
	
	@Column(name = "SubmittedBy",length = 50)
	private String submittedBy;
	
	@JsonFormat(shape= JsonFormat.Shape.STRING, pattern="yyyy-MM-dd' 'HH:mm:ss")
	@Column(name = "SubmittedDate")
	private Date submittedDate;
	
	@Column(name = "PrvOrderQueueID")
	private Long prvOrderQueueID;
	
	@JsonFormat(shape= JsonFormat.Shape.STRING, pattern="yyyy-MM-dd' 'HH:mm:ss")
	@Column(name = "AcknowledgementDate")
	private Date acknowledgementDate;
	
	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public void setProductLine(ProductLine productLine) {
		this.productLine = productLine;
	}
    

	public Long getPrvOrderQueueID() {
		return prvOrderQueueID;
	}

	public void setPrvOrderQueueID(Long prvOrderQueueID) {
		this.prvOrderQueueID = prvOrderQueueID;
	}


	@Column(name = "Status",length = 50)
	private String status;
	
	@Column(name = "Error",length = 1000)
	private String error;
	
	@Column(name = "Comment")
	private String comment;
	
	@Column(name = "PONumber",length = 50)
	private String ponumber;
	
	@Fetch(FetchMode.SELECT)
	@OneToMany(mappedBy = "orderQueue", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	private Set<OrderFileAttachment> orderFileAttachment;
	
	private transient int orderLineCount;
	
	private transient int salesOrderCount;
	
	private transient String subEmailBody;
	
	public int getOrderLineCount() {
		return orderLineCount;
	}

	public String getSubEmailBody() {
		return subEmailBody;
	}

	public void setSubEmailBody(String subEmailBody) {
		this.subEmailBody = subEmailBody;
	}

	public void setOrderLineCount(int orderLineCount) {
		this.orderLineCount = orderLineCount;
	}

	public int getSalesOrderCount() {
		return salesOrderCount;
	}

	public void setSalesOrderCount(int salesOrderCount) {
		this.salesOrderCount = salesOrderCount;
	}

	public Set<OrderFileAttachment> getOrderFileAttachment() {
		return orderFileAttachment;
	}

	public void setOrderFIleAttachment(Set<OrderFileAttachment> orderFIleAttachment) {
		this.orderFileAttachment = orderFIleAttachment;
	}
	

	public String getPid() {
		return pid;
	}

	public void setPid(String pid) {
		this.pid = pid;
	}

	public Partner getPartner() {
		return partner;
	}

	public void setPartner(Partner partner) {
		this.partner = partner;
	}


	public String getRboName() {
		return rboName;
	}

	public void setRboName(String rboName) {
		this.rboName = rboName;
	}

	public ProductLine getProductLine() {
		return productLine;
	}

	public String getSenderEmailID() {
		return senderEmailID;
	}

	public void setSenderEmailID(String senderEmailID) {
		this.senderEmailID = senderEmailID;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}
	
	
	public String getEmailBody() {
		return emailBody;
	}

	public void setEmailBody(String emailBody) {
		this.emailBody = emailBody;
	}

	public Date getReceivedDate() {
		return receivedDate;
	}

	public void setReceivedDate(Date receivedDate) {
		this.receivedDate = receivedDate;
	}

	public String getOrderSource() {
		return orderSource;
	}

	public void setOrderSource(String orderSource) {
		this.orderSource = orderSource;
	}

	public String getSubmittedBy() {
		return submittedBy;
	}

	public void setSubmittedBy(String submittedBy) {
		this.submittedBy = submittedBy;
	}

	public Date getSubmittedDate() {
		return submittedDate;
	}

	public void setSubmittedDate(Date submittedDate) {
		this.submittedDate = submittedDate;
	}
	public Date getAcknowledgementDate() {
		return acknowledgementDate;
	}

	public void setAcknowledgementDate(Date acknowledgementDate) {
		this.acknowledgementDate = acknowledgementDate;
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
	public String getPONumber() {
		return ponumber;
	}

	public void setPONumber(String ponumber) {
		this.ponumber = ponumber;
	}

	@Override
	public Response getEntities(UriInfo ui, HttpHeaders hh) {
		Response.ResponseBuilder rb = null;
		Map orderQueue = null;
		try {
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			MultivaluedMap<String, String> queryParamMap =ui.getQueryParameters();
			mapper.addMixInAnnotations(OrderQueue.class, OrderQueueMixIn.class);
			mapper.addMixInAnnotations(OrderFileAttachment.class, OrderQueueMixIn.class);
			mapper.addMixInAnnotations(Partner.class, OrderQueueMixIn.class);//added mixIn
			mapper.addMixInAnnotations(MainAbstractEntity.class, OrderQueueMixIn.class);//added mixIn
			mapper.addMixInAnnotations(Partner.class,PartnerMixIn.class);//added
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
			OrderQueueService orderQueueService = (OrderQueueService) SpringConfig
					.getInstance().getBean("orderQueueService");
			orderQueue = orderQueueService.readWithCriteria(queryParamMap);
			if (orderQueue == null)
				throw new Exception("Unable to find Orders");
			mapper.setDateFormat(ApplicationUtils.df);
			mapper.writeValue(writer, orderQueue);
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
			OrderQueue orderQueue = mapper.readValue(data, OrderQueue.class);
			OrderQueueService orderQueueService = (OrderQueueService) SpringConfig
					.getInstance().getBean("orderQueueService");
			
			id = orderQueueService.create(orderQueue);
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
			mapper.addMixInAnnotations(OrderQueue.class, OrderQueueMixIn.class);
			mapper.addMixInAnnotations(OrderFileAttachment.class, OrderQueueMixIn.class);
			// toggle this property value based on your input JSON data
			mapper.configure(DeserializationFeature.UNWRAP_ROOT_VALUE, false);
			OrderQueueService orderQueueService = (OrderQueueService) SpringConfig
					.getInstance().getBean("orderQueueService");
			// read existing entity from database
			OrderQueue orderQueue = orderQueueService.read(Long.parseLong(id));
			if (orderQueue == null) {
				throw new WebApplicationException(Response
						.status(Status.BAD_REQUEST)
						.entity("Order entity with id \"" + id
								+ "\" doesn't exist")
						.type(MediaType.TEXT_PLAIN_TYPE).build());
			}
			ObjectReader updater = mapper.readerForUpdating(orderQueue);
			// build updated entity object from input data
			orderQueue = updater.readValue(data);
			// update entity in database
			orderQueueService.update(orderQueue);
			// prepare response
			mapper.writeValue(writer, orderQueue);
			rb = Response.ok(writer.toString());
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error in updating order entity with id " + id, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error in updating order entity with id " + id, e);
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
			mapper.addMixInAnnotations(OrderQueue.class, OrderQueueMixIn.class);
			mapper.addMixInAnnotations(OrderFileAttachment.class, OrderQueueMixIn.class);
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, true);
			OrderQueueService orderQueueService = (OrderQueueService) SpringConfig
					.getInstance().getBean("orderQueueService");
			OrderQueue orderQueue = orderQueueService.read(entityId);
			if (orderQueue == null)
				throw new WebApplicationException(Response
						.status(Status.BAD_REQUEST)
						.entity("Order entity with id \"" + id
								+ "\" doesn't exist")
						.type(MediaType.TEXT_PLAIN_TYPE).build());
			mapper.writeValue(writer, orderQueue);
			rb = Response.ok(writer.toString());
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error in fetching order entity with id " + id, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error in fetching order entity with id " + id, e);
			throw new WebApplicationException(Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e))
					.type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		return rb.build();

	}
	@PUT
	@Path("submittosystem/{orderqueueid:[0-9]+}")
	public Response submitToSystem(@Context UriInfo ui,
			@Context HttpHeaders hh, String data, @PathParam("orderqueueid") String orderQueueId) {
		Long orderQueueEntityId = Long.parseLong(orderQueueId);
		try {
			OrderQueueService orderQueueService = (OrderQueueService) SpringConfig
					.getInstance().getBean("orderQueueService");
			orderQueueService.submitOrderToSystem(data,orderQueueEntityId);
			   return Response.ok().build();
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error while submitting order to system", ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error while submitting order to system", e);
			throw new WebApplicationException(Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e))
					.type(MediaType.TEXT_PLAIN_TYPE).build());
		}
	}
	
	@PUT
	@Path("cancelorder/{id:[0-9]+}")
	public Response cancelOrder(@Context UriInfo ui,
			@Context HttpHeaders hh, String data, @PathParam("id") String orderQueueId) {
		Long orderQueueEntityId = Long.parseLong(orderQueueId);
		try {
			OrderQueueService orderQueueService = (OrderQueueService) SpringConfig
					.getInstance().getBean("orderQueueService");
			orderQueueService.cancelOrder(data,orderQueueEntityId);
			   return Response.ok().build();
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error while cancelling order", ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error while cancelling order", e);
			throw new WebApplicationException(Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e))
					.type(MediaType.TEXT_PLAIN_TYPE).build());
		}
	}
	@POST
    @Path("/attachments/{orderid}")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public Response callServicePostMultipart(@Context UriInfo uriInfo,
            @Context HttpHeaders hh,@PathParam("orderid") String orderid, FormDataMultiPart formParams) {
        try {
            return Response.ok(
                    processRequest(uriInfo.getQueryParameters(),
                            uriInfo.getPathParameters(), formParams, hh))
                    .build();

        }catch(WebApplicationException wae){
            throw wae;
        } catch (Exception e) {
            e.printStackTrace();
            throw new WebApplicationException(Response
                    .status(Status.INTERNAL_SERVER_ERROR)
                    .entity(e.getMessage()).type(MediaType.TEXT_PLAIN).build());
        }
    }
    
	public String processRequest(MultivaluedMap<String, String> queryMap,
			MultivaluedMap<String, String> pathParamMap,
			FormDataMultiPart formParams, HttpHeaders headers) throws Exception {

		// fetch transaction id which we will execute and a custom
		// transactionPID will be used
		String transactionId = pathParamMap.getFirst("orderid");
		Long partnerid = Long.parseLong(formParams.getField("partnerName").getValue());
		String emailid = formParams.getField("email").getValue();
		String emailBody = formParams.getField("emailBody").getValue();
		String subjectline = formParams.getField("subject").getValue();
		String productLineType = formParams.getField("productLineType").getValue();
		String rboName = formParams.getField("rboName").getValue();
		String oldFileIds = (formParams.getField("oldFileIds")!=null)?formParams.getField("oldFileIds").getValue():null;
		String oldOrderId= (formParams.getField("oldOrderId")!=null)?formParams.getField("oldOrderId").getValue():null;
		Date date = DateUtils.getDefaultCurrentDateTime();
		
		
		Map<String, List<FormDataBodyPart>> fieldsByName = formParams.getFields();
		Long productLineTypeId = Long.parseLong(productLineType);
		OrderQueue orderQueue = new OrderQueue();
		Partner partner = new Partner();
		partner.setId(partnerid);
		ProductLine productLine = new ProductLine();
		productLine.setId(productLineTypeId);
		orderQueue.setPartner(partner);
		orderQueue.setSenderEmailID(emailid);
		orderQueue.setSubject(subjectline);
		orderQueue.setRboName(rboName);
		orderQueue.setProductLine(productLine);
		orderQueue.setOrderSource("Web");
		orderQueue.setCreatedDate(date);
		orderQueue.setStatus("16");
		orderQueue.setEmailBody(emailBody);
		orderQueue.setReceivedDate(date);
		if(oldOrderId!=null && !"".equals(oldOrderId)){
		orderQueue.setPrvOrderQueueID(Long.parseLong(oldOrderId));
		}
		OrderQueueService orderQueueService = (OrderQueueService) SpringConfig
				.getInstance().getBean("orderQueueService");
		
		Long orderqueueid = orderQueueService.create(orderQueue);
		
		orderQueue.setId(orderqueueid);
		
	
	    // Usually each value in fieldsByName will be a list of length 1.
	    // Assuming each field in the form is a file, just loop through them.

		String baseLocation = null;
		FileOutputStream outstream = null;
		String fileName = null;
		String type = null;
		String fileExtension = null;
		String fileContentType = null;
		OrderFileAttachmentService orderFileAttachmentService = (OrderFileAttachmentService) SpringConfig
				.getInstance().getBean("orderFileAttachmentService");
		OrderFileAttachment orderFileAttachment=null;
		Blob blob =null;InputStream stream=null;String value=null;
		for (Map.Entry<String, List<FormDataBodyPart>> entry : fieldsByName.entrySet()) {
		    String field = entry.getKey();
		    FormDataBodyPart formdata = entry.getValue().get(0);
		    try {
				if (formdata != null && (field.equals("orderFileType") || field.startsWith("attachment"))) {
					 stream = ((FormDataBodyPart) formParams
							.getField(field)).getEntityAs(InputStream.class);
					 value = ((FormDataBodyPart) formParams
							.getField(field)).getValueAs(String.class);
					fileName = ((FormDataBodyPart) formParams.getField(field))
							.getContentDisposition().getFileName();
					type = ((FormDataBodyPart) formParams.getField(field))
							.getMediaType().toString();
					
					if(!type.equalsIgnoreCase(MediaType.TEXT_PLAIN)){
					
					fileExtension = fileName.substring(fileName.lastIndexOf(".")+1, fileName.length());
					
					if (field.equalsIgnoreCase("orderFileType"))
							{
						fileContentType = "Order";
					} else {
						fileContentType = "AdditionalData";
					}
					orderFileAttachment= new OrderFileAttachment();
					blob = new SerialBlob(IOUtils.toByteArray(stream));
					orderFileAttachment.setFileData(blob);
					orderFileAttachment.setOrderQueue(orderQueue);
					orderFileAttachment.setPartnerObj(partner);
					orderFileAttachment.setReceivedDate(date);
					orderFileAttachment.setFileName(fileName);
					orderFileAttachment.setFileExtension(fileExtension);
					orderFileAttachment.setFileContentType(fileContentType);
					orderFileAttachment.setCreatedDate(new Date());
					orderFileAttachmentService.create(orderFileAttachment);
					}
				}
			}catch(WebApplicationException wae){
				throw wae;
			} catch (Exception e) {
				e.printStackTrace();
				// file is not available so execute process flow without file.
			}finally{
				if(outstream != null)
					outstream.close();
			}
		}
		if(oldFileIds!=null && !"".equals(oldFileIds)){
		String []ids = oldFileIds.split(",");
		for(String fileId:ids){
			orderFileAttachment=orderFileAttachmentService.read(Long.parseLong(fileId));
			orderFileAttachment.setId(0);
			orderFileAttachment.setOrderQueue(orderQueue);
			orderFileAttachment.setPartnerObj(partner);
			orderFileAttachmentService.create(orderFileAttachment);
		}
		}
		orderQueue = orderQueueService.read(orderqueueid);
		orderQueue.setStatus("1");
		orderQueueService.update(orderQueue);
		return "{\"success\":true}";
	}
	
	@GET
	@Path("/download/dailyreport")
	@Produces(MediaType.MULTIPART_FORM_DATA)
	public Response getDailyReport(@Context UriInfo ui,
	@Context HttpHeaders hh) {
		Response.ResponseBuilder rb = null;
		List<OrderQueue> orderQueue = null;
		try {
			StringWriter writer = new StringWriter();
			MultivaluedMap<String, String> queryParamMap=ui.getQueryParameters() ;
			OrderQueueService orderQueueService = (OrderQueueService) SpringConfig
					.getInstance().getBean("orderQueueService");
			orderQueue = orderQueueService.getAllEntitiesListForDailyReport();
			if (orderQueue == null)
				throw new Exception("Unable to find Orders");
			ByteArrayOutputStream outputStream=ExcelUtils.createOrderQueueExcelFile(orderQueue);
			byte[] bytes = outputStream.toByteArray();
			String fileName = "Daily_Report.xls";
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

	}
	
	
	private static Map<String,String> getOrderQueueSatusMap() throws Exception{
		Map<String,String> codeMap=new HashMap<String,String>();
		CodeService CodeService = (CodeService) SpringConfig
				.getInstance().getBean("codeService");
		List<Code> list=CodeService.readByType("orderfilequeue");
		String code="",value="";
		Iterator<Code> codeIterator = list.iterator();
		while (codeIterator.hasNext()) {
			Code obj=codeIterator.next();
			code=obj.getCode();
			value=obj.getValue();
			codeMap.put(code,value);
		}
		return codeMap;
	}
	@GET
	@Path("/download/openreport")
	@Produces(MediaType.MULTIPART_FORM_DATA)
	public Response getOpenReport(@Context UriInfo ui,
	@Context HttpHeaders hh) {
		List<OrderQueue> orderQueue = null;
		try {
			MultivaluedMap<String, String> queryParamMap=ui.getQueryParameters() ;
			OrderQueueService orderQueueService = (OrderQueueService) SpringConfig
					.getInstance().getBean("orderQueueService");
			orderQueue = orderQueueService.getAllEntitiesListForOpenReport(queryParamMap);
			if (orderQueue == null)
				throw new Exception("Unable to find Orders");
			ByteArrayOutputStream outputStream=ExcelUtils.createOrderQueueExcelFile(orderQueue);
			byte[] bytes = outputStream.toByteArray();
			String fileName = "Detail_Status_Report.xls";
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
	}
	
	public static Map<String,String> getCodeMap(){
		return codeMap;
	}
	
	@GET
	@Path("/download/emailbody/{orderid}")
	@Produces(MediaType.MULTIPART_FORM_DATA)
	public Response getEmailBody(@Context UriInfo ui,
	@Context HttpHeaders hh,@PathParam("orderid") String orderid) {
		Long orderQueueEntityId = Long.parseLong(orderid);
		OrderQueue orderQueue=null;
		try {
			OrderQueueService orderQueueService = (OrderQueueService) SpringConfig
					.getInstance().getBean("orderQueueService");
			orderQueue = orderQueueService.read(orderQueueEntityId);
			if (orderQueue == null)
				throw new Exception("Unable to find Order with the given id");
			InputStream is = new ByteArrayInputStream(orderQueue.getEmailBody().getBytes("UTF-8"));;
			byte[] bytes = IOUtils.toByteArray(is);
			String fileName = "\""+orderid+".html\"";
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
	}
}
