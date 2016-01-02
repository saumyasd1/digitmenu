package com.avery.storage.entities;

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
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.glassfish.jersey.media.multipart.FormDataBodyPart;
import org.glassfish.jersey.media.multipart.FormDataMultiPart;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import com.avery.app.config.SpringConfig;
import com.avery.logging.AppLogger;
import com.avery.storage.MainAbstractEntity;
import com.avery.storage.MixIn.OrderQueueMixIn;
import com.avery.storage.service.CodeService;
import com.avery.storage.service.OrderFileAttachmentService;
import com.avery.storage.service.OrderQueueService;
import com.avery.utils.ApplicationUtils;
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
	
	@Column(name = "PID")
	private String pid;
	
	@NotFound(action=NotFoundAction.IGNORE)
	@ManyToOne
	@JoinColumn(name = "PartnerID")
	private Partner partner;
	
	@Column(name = "RBOName")
	private String rboName;
	
	@NotFound(action=NotFoundAction.IGNORE)
	@ManyToOne
	@JoinColumn(name = "ProductLineId")
	private ProductLine productLine;
	
	@Column(name = "SenderEmailID")
	private String senderEmailID;
	
	@Column(name = "Subject")
	private String subject;
	
	@Column(name = "EmailBody")
	private String emailBody;
	
	@JsonFormat(shape= JsonFormat.Shape.STRING, pattern="yyyy-MM-dd' 'HH:mm:ss", timezone="GMT")
	@Column(name = "ReceivedDate")
	private Date receivedDate;
	
	@Column(name = "OrderSource")
	private String orderSource;
	
	@Column(name = "SubmittedBy")
	private String submittedBy;
	
	@JsonFormat(shape= JsonFormat.Shape.STRING, pattern="yyyy-MM-dd' 'HH:mm:ss", timezone="GMT")
	@Column(name = "SubmittedDate")
	private Date submittedDate;
	
	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public void setProductLine(ProductLine productLine) {
		this.productLine = productLine;
	}


	@Column(name = "Status")
	private String status;
	
	@Column(name = "Error")
	private String error;
	
	@Column(name = "Comment")
	private String comment;
	
	@Column(name = "PONumber")
	private String ponumber;
	
	@Fetch(FetchMode.SELECT)
	@OneToMany(mappedBy = "orderQueue", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	private Set<OrderFileAttachment> orderFileAttachment;
	
	private transient int orderLineCount;
	
	private transient int salesOrderCount;
	
	public int getOrderLineCount() {
		return orderLineCount;
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
		Date date = new Date();
		
		
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
		
		for (Map.Entry<String, List<FormDataBodyPart>> entry : fieldsByName.entrySet()) {
		    String field = entry.getKey();
		    FormDataBodyPart formdata = entry.getValue().get(0);
		    try {
				if (formdata != null) {
					InputStream stream = ((FormDataBodyPart) formParams
							.getField(field)).getEntityAs(InputStream.class);
					String value = ((FormDataBodyPart) formParams
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
					OrderFileAttachment orderFileAttachment = new OrderFileAttachment();
					Blob blob = new SerialBlob(IOUtils.toByteArray(stream));
					orderFileAttachment.setFileData(blob);
					orderFileAttachment.setOrderQueue(orderQueue);
					orderFileAttachment.setPartnerObj(partner);
					orderFileAttachment.setReceivedDate(date);
					orderFileAttachment.setFileName(fileName);
					orderFileAttachment.setFileExtension(fileExtension);
					orderFileAttachment.setFileContentType(fileContentType);
					orderFileAttachment.setCreatedDate(new Date());
					OrderFileAttachmentService orderFileAttachmentService = (OrderFileAttachmentService) SpringConfig
							.getInstance().getBean("orderFileAttachmentService");
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
			ByteArrayOutputStream outputStream=createExcelFile(orderQueue);
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
	private ByteArrayOutputStream createExcelFile(List<OrderQueue> OrderQueueList) throws IOException{
		XSSFWorkbook workbook = new XSSFWorkbook();
        XSSFSheet sheet = workbook.createSheet("Sheet 1");
        getReportHeader(sheet);
        getReportDate(sheet,OrderQueueList);
        try(ByteArrayOutputStream  outputStream = new ByteArrayOutputStream ()) {
            workbook.write(outputStream);
		return outputStream;
        }
	}
	private void getReportDate(XSSFSheet sheet,List<OrderQueue> OrderQueueList){
		int rowIndex=1,columncellCount=0;
		Iterator<OrderQueue> CrunchifyIterator = OrderQueueList.iterator();
		while (CrunchifyIterator.hasNext()) {
			OrderQueue obj=CrunchifyIterator.next();
			Row row = sheet.createRow(rowIndex);
			Cell cell1 = row.createCell(columncellCount);
			cell1.setCellValue(obj.getId());
			Cell cell2 = row.createCell(++columncellCount);
			cell2.setCellValue(obj.getPONumber());
			Cell cell3 = row.createCell(++columncellCount);
			cell3.setCellValue("Order File");
			Cell cell4 = row.createCell(++columncellCount);
			cell4.setCellValue("Additional data");
			Cell cell5 = row.createCell(++columncellCount);
			cell5.setCellValue(obj.getPartner().getPartnerName());
			Cell cell6 = row.createCell(++columncellCount);
			cell6.setCellValue(obj.getRboName());
			Cell cell7 = row.createCell(++columncellCount);
			cell7.setCellValue(obj.getProductLine().getProductLineType());
			Cell cell8 = row.createCell(++columncellCount);
			cell8.setCellValue(codeMap.get(obj.getStatus()));
			Cell cell9 = row.createCell(++columncellCount);
			if(obj.getReceivedDate()!=null)
				cell9.setCellValue(obj.getReceivedDate().toString());
			Cell cell10 = row.createCell(++columncellCount);
			cell10.setCellValue(obj.getSenderEmailID());
			Cell cell11 = row.createCell(++columncellCount);
			cell11.setCellValue(obj.getSubject());
			Cell cell12 = row.createCell(++columncellCount);
			cell12.setCellValue(obj.getEmailBody());
			Cell cell13 = row.createCell(++columncellCount);
			cell13.setCellValue(obj.getSubmittedBy());
			Cell cell14 = row.createCell(++columncellCount);
			if(obj.getSubmittedDate()!=null)
				cell14.setCellValue(obj.getSubmittedDate().toString());
			columncellCount=0;
			rowIndex++;
		}
		sheet.autoSizeColumn(0);
		sheet.autoSizeColumn(1);
		sheet.autoSizeColumn(2);
		sheet.autoSizeColumn(3);
		sheet.autoSizeColumn(4);
		sheet.autoSizeColumn(5);
		sheet.autoSizeColumn(6);
		sheet.autoSizeColumn(7);
		sheet.autoSizeColumn(8);
		sheet.autoSizeColumn(9);
		sheet.autoSizeColumn(10);
		sheet.autoSizeColumn(11);
		sheet.autoSizeColumn(12);
		sheet.autoSizeColumn(13);
	}
	private void getReportHeader(XSSFSheet sheet){
		int columnHeaderCount=0;
		Row row = sheet.createRow(0);
		Cell header1 = row.createCell(columnHeaderCount);
//		header1.setCellStyle(headercellstyle);
		header1.setCellValue("Order track #");
		Cell header2 = row.createCell(++columnHeaderCount);
		header2.setCellValue("PO #");
		Cell header3 = row.createCell(++columnHeaderCount);
		header3.setCellValue("Order File");
		Cell header4 = row.createCell(++columnHeaderCount);
		header4.setCellValue("Additional data");
		Cell header5 = row.createCell(++columnHeaderCount);
		header5.setCellValue("Partner Name");
		Cell header6 = row.createCell(++columnHeaderCount);
		header6.setCellValue("RBO");
		Cell header7 = row.createCell(++columnHeaderCount);
		header7.setCellValue("Product Line");
		Cell header8 = row.createCell(++columnHeaderCount);
		header8.setCellValue("Order Status");
		Cell header9 = row.createCell(++columnHeaderCount);
		header9.setCellValue("Processed Date");
		Cell header10 = row.createCell(++columnHeaderCount);
		header10.setCellValue("Sender Email ID");
		Cell header11 = row.createCell(++columnHeaderCount);
		header11.setCellValue("Subject");
		Cell header12 = row.createCell(++columnHeaderCount);
		header12.setCellValue("Email Body");
		Cell header13 = row.createCell(++columnHeaderCount);
		header13.setCellValue("Submitted By");
		Cell header14 = row.createCell(++columnHeaderCount);
		header14.setCellValue("Submitted Date");
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
			orderQueue = orderQueueService.getAllEntitiesListWithCriteria(queryParamMap);
			if (orderQueue == null)
				throw new Exception("Unable to find Orders");
			ByteArrayOutputStream outputStream=createExcelFile(orderQueue);
			byte[] bytes = outputStream.toByteArray();
			String fileName = "Open_Report.xls";
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
