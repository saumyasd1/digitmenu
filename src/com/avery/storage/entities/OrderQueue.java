package com.avery.storage.entities;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.InputStream;
import java.io.StringWriter;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
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
import org.apache.commons.lang.StringEscapeUtils;
import org.apache.commons.lang.exception.ExceptionUtils;
import org.glassfish.jersey.media.multipart.FormDataBodyPart;
import org.glassfish.jersey.media.multipart.FormDataMultiPart;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import com.avery.app.config.SpringConfig;
import com.avery.logging.AppLogger;
import com.avery.storage.MainAbstractEntity;
import com.avery.storage.MixIn.OrderEmailQueueMixin;
import com.avery.storage.MixIn.OrderFileAttachmentMixIn;
import com.avery.storage.MixIn.OrderQueueMixIn;
import com.avery.storage.MixIn.PartnerMixIn;
import com.avery.storage.MixIn.ProductLineMixIn;
import com.avery.storage.service.CodeService;
import com.avery.storage.service.OrderEmailQueueService;
import com.avery.storage.service.OrderFileAttachmentService;
import com.avery.storage.service.OrderQueueService;
import com.avery.storage.service.SiteService;
import com.avery.utils.ApplicationConstants;
import com.avery.utils.ApplicationUtils;
import com.avery.utils.DateUtils;
import com.avery.utils.ExcelUtils;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;
import com.fasterxml.jackson.databind.SerializationFeature;

@Entity
@Table(name = "orderfilequeue")
@Path("orders")
public class OrderQueue extends MainAbstractEntity {

	public OrderQueue() {

	}

	private static Map<String, String> codeMap;
	static {

		try {
			codeMap = getOrderQueueSatusMap();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	private static final long serialVersionUID = -8487156716364715576L;

	@Column(name = "pId", length = 50)
	private String pId;

	@Column(name = "subject", length = 50)
	private String subject;

	@Column(name = "submittedBy", length = 50)
	private String submittedBy;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd' 'HH:mm:ss")
	@Column(name = "submittedDate")
	Date submittedDate;

	@Column(name = "status", length = 100)
	private String status;

	@Column(name = "comment", length = 250)
	private String comment;

	@Column(name = "poNumber", length = 50)
	private String poNumber;

	@Column(name = "prevOrderQueueId")
	Integer prevOrderQueueId;

	@Column(name = "error", length = 1000)
	private String error;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd' 'HH:mm:ss")
	@Column(name = "feedbackAcknowledgementDate")
	Date feedbackAcknowledgementDate;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd' 'HH:mm:ss")
	@Column(name = "acknowledgementDate")
	Date acknowledgementDate;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "productLineId")
	ProductLine varProductLine;

	@LazyCollection(LazyCollectionOption.FALSE)
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "orderFileAttachmentId")
	OrderFileAttachment varOrderFileAttachment;

	@LazyCollection(LazyCollectionOption.FALSE)
	@OneToMany(mappedBy = "varOrderFileQueue", fetch = FetchType.LAZY)
	List<OrderLine> listOrderLine = new ArrayList<OrderLine>();

	@LazyCollection(LazyCollectionOption.FALSE)
	@OneToMany(mappedBy = "varOrderFileQueue", fetch = FetchType.LAZY)
	List<SalesOrder> listSalesOrderLine = new ArrayList<SalesOrder>();

	/*
	 * @LazyCollection(LazyCollectionOption.FALSE)
	 * 
	 * @OneToMany(mappedBy="varOrderFileQueue",cascade=CascadeType.ALL,fetch=
	 * FetchType.LAZY) List<AuditTrail> listAuditTrail=new
	 * ArrayList<AuditTrail>();
	 */

	// Transient variables will not reflect in db
	@Transient
	private String partnerName;

	@Transient
	private String defaultSystem;

	@Transient
	private int siteId;

	@Transient
	private long emailQueueId;

	@Transient
	private String rboName;

	@Transient
	private String productLineType;

	@Transient
	private String senderEmailId;

	@Transient
	private String iconName;

	@Transient
	private String colorCode;

	@Transient
	private int orgCodeId;

	@Transient
	private String mailBody;

	@Transient
	private Boolean orderInMailBody;

	@Transient
	private String codeValue;

	@Transient
	private String orderFileName;

	@Transient
	private long rboId;

	@Transient
	private int additionalFileCount;

	@Transient
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd' 'HH:mm:ss")
	private Date receivedDate;

	@Transient
	private Long partnerId;

	@Transient
	private Long productLineId;

	@Transient
	private String orderSource;
	
	@Transient
	private String siteName;

	/* Business Logic Starts*/
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

	@SuppressWarnings("rawtypes")
	@Override
	public Response getEntities(UriInfo ui, HttpHeaders hh) {
		Response.ResponseBuilder rb = null;
		Map orderQueue = new HashMap();
		Map responceMap = new HashMap();
		try {
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			MultivaluedMap<String, String> queryParamMap = ui
					.getQueryParameters();
			mapper.addMixIn(OrderQueue.class, OrderQueueMixIn.class);
			mapper.addMixIn(OrderEmailQueue.class, OrderEmailQueueMixin.class);
			mapper.addMixIn(OrderFileAttachment.class,
					OrderFileAttachmentMixIn.class);
			// mapper.addMixIn(MainAbstractEntity.class,
			// OrderQueueMixIn.class);//added mixIn
			mapper.addMixIn(Partner.class, PartnerMixIn.class);// added
			mapper.addMixIn(ProductLine.class, ProductLineMixIn.class);// added
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
			mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
			OrderQueueService orderQueueService = (OrderQueueService) SpringConfig
					.getInstance().getBean("orderQueueService");
			orderQueue = orderQueueService.readWithCriteria(queryParamMap);
			if (orderQueue == null)
				throw new Exception("Unable to find Orders");
			SiteService siteService = (SiteService) SpringConfig.getInstance().getBean("siteService");
			List<Site> siteList = siteService.readAll();
			List listOfTask=(List) orderQueue.get("orders");
			for (int i = 0; i < listOfTask.size(); i++) {
				OrderQueue orderQueue1 = (OrderQueue) listOfTask.get(i);
				if(orderQueue1.getSiteId() > 0)
				{
					int siteId=orderQueue1.getSiteId();
					if(siteId > 0 && siteId <= siteList.size())
					orderQueue1.setSitename(siteList.get(siteId-1).getName());
				}
			}
			responceMap.put("orders", listOfTask);
			responceMap.put("totalCount", orderQueue.get("totalCount"));
			mapper.setDateFormat(ApplicationUtils.df);
			mapper.writeValue(writer, responceMap);
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
	public Response updateEntity(UriInfo ui, HttpHeaders hh, String id,
			String data) {
		Response.ResponseBuilder rb = null;
		try {
			ObjectMapper mapper = new ObjectMapper();
			StringWriter writer = new StringWriter();
			mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,
					false);
			mapper.addMixIn(OrderQueue.class, OrderQueueMixIn.class);
			mapper.addMixIn(OrderFileAttachment.class, OrderQueueMixIn.class);
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
			mapper.addMixIn(OrderQueue.class, OrderQueueMixIn.class);
			mapper.addMixIn(OrderFileAttachment.class, OrderQueueMixIn.class);
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
			@Context HttpHeaders hh, String data,
			@PathParam("orderqueueid") String orderQueueId) {
		Long orderQueueEntityId = Long.parseLong(orderQueueId);
		try {
			OrderQueueService orderQueueService = (OrderQueueService) SpringConfig
					.getInstance().getBean("orderQueueService");
			orderQueueService.submitOrderToSystem(data, orderQueueEntityId);
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

	@GET
	@Path("view/{id:[0-9]+}")
	public Response viewOrders(@Context UriInfo ui, @Context HttpHeaders hh,
			@PathParam("id") int emailQueueId) {
		Response.ResponseBuilder rb = null;
		Map<?, ?> entitiesMap = null;

		try {
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			OrderQueueService orderQueueService = (OrderQueueService) SpringConfig
					.getInstance().getBean("orderQueueService");
			entitiesMap = orderQueueService
					.viewOrdersByEmailQueueId(emailQueueId);
			if (entitiesMap == null || entitiesMap.isEmpty())
				throw new Exception("Unable to find any data");
			mapper.writeValue(writer, entitiesMap);
			rb = Response.ok(writer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return rb.build();
	}

	@PUT
	@Path("cancelorder/{id:[0-9]+}")
	public Response cancelOrder(@Context UriInfo ui, @Context HttpHeaders hh,
			String data, @PathParam("id") String orderQueueId) {
		Long orderQueueEntityId = Long.parseLong(orderQueueId);
		try {
			OrderQueueService orderQueueService = (OrderQueueService) SpringConfig
					.getInstance().getBean("orderQueueService");
			orderQueueService.cancelOrder(data, orderQueueEntityId);
			return Response.ok().build();
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error("Error while cancelling order",
					ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger()
					.error("Error while cancelling order", e);
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
			@Context HttpHeaders hh, @PathParam("orderid") String orderid,
			FormDataMultiPart formParams) {
		try {
			return Response.ok(
					processRequest(uriInfo.getQueryParameters(),
							uriInfo.getPathParameters(), formParams, hh,
							orderid)).build();

		} catch (WebApplicationException wae) {
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
			FormDataMultiPart formParams, HttpHeaders headers, String orderid)
			throws Exception {

		String emailid = formParams.getField("email").getValue();
		String emailBody = formParams.getField("emailBody").getValue();
		String subjectline = StringEscapeUtils.unescapeHtml(formParams
				.getField("subject").getValue());// decoding subject
		String productLineType = formParams.getField("dataStructureName")
				.getValue();
		String oldFileIds = (formParams.getField("oldFileIds") != null) ? formParams
				.getField("oldFileIds").getValue() : null;
		String oldOrderId = (formParams.getField("oldOrderId") != null) ? formParams
				.getField("oldOrderId").getValue() : null;
		Date date = DateUtils.getDefaultCurrentDateTime();
		// oldOrderFileId
		String oldOrderFileId = formParams.getField("oldOrderFileId")
				.getValue();
		String oldOrderFileDeleted = formParams.getField("oldOrderFileDeleted")
				.getValue();
		boolean isOldOrderFileDeleted = Boolean
				.parseBoolean(oldOrderFileDeleted == null
						|| oldOrderFileDeleted.equals("") ? "false"
						: oldOrderFileDeleted);
		OrderFileAttachmentService orderFileAttachmentService = (OrderFileAttachmentService) SpringConfig
				.getInstance().getBean("orderFileAttachmentService");
		String emailQueueId = formParams.getField("oldEmailId").getValue();
		OrderFileAttachment orderfile = null;
		String filePath = null;

		// creating new orderemailqueue object fro new order
		OrderEmailQueueService orderEmailQueueService = (OrderEmailQueueService) SpringConfig
				.getInstance().getBean("orderEmailQueueService");
		OrderEmailQueue orderemailQueue = orderEmailQueueService.read(Long
				.parseLong(emailQueueId));
		// orderemailQueue.setMailBody(emailBody); /*value not required in
		// mailbody column as html file is being created*/
		Date now = new Date();
		orderemailQueue.setReceivedDate(now);
		orderemailQueue.setCreatedDate(now);
		/* added last modified date in the orderemailqueue table */
		orderemailQueue.setLastModifiedDate(now);
		orderemailQueue.setSubject(subjectline);// added subject
		orderemailQueue.setSenderEmailId(emailid);
		/* resubmit order will be treated as a web order */
		orderemailQueue.setOrderSource(ApplicationConstants.EMAIL_ORDER_SOURCE);
		orderemailQueue.setId(0);
		Long orderEmailQueueId = orderEmailQueueService.create(orderemailQueue);
		orderemailQueue.setId(orderEmailQueueId);

		Map<String, List<FormDataBodyPart>> fieldsByName = formParams
				.getFields();
		Long productLineTypeId = Long.parseLong(productLineType);
		OrderQueue orderQueue = new OrderQueue();
		ProductLine productLine = new ProductLine();
		productLine.setId(productLineTypeId);
		if (oldOrderFileId != null && !oldOrderFileId.equals("")) {
			orderfile = orderFileAttachmentService.read(Long
					.parseLong(oldOrderFileId));
			Long orderFileId = 0L;
			if (orderfile != null) {
				filePath = orderfile.getFilePath();
				orderfile
						.setStatus(ApplicationConstants.ORDER_ATTACHMENT_CANCEL_STATUS);
				orderFileAttachmentService.update(orderfile);
				orderFileId = addAttachments(orderemailQueue, productLine,
						fieldsByName, formParams, filePath);
				if (!isOldOrderFileDeleted) {
					orderfile.setId(0);
					orderfile.setCreatedDate(now);
					orderfile
							.setStatus(ApplicationConstants.NEW_ATTACHMENT_STATUS);
					orderfile.setVarOrderEmailQueue(orderemailQueue);
					orderfile.setVarProductLine(productLine);
					orderFileId = orderFileAttachmentService.create(orderfile);
				}
				orderFileAttachmentService.insertEmailBody(orderemailQueue,
						emailBody, productLine, filePath);
				OrderFileAttachment newOrderFileAttachment = new OrderFileAttachment();
				newOrderFileAttachment.setId(orderFileId);
				// orderQueue.setSubject(subjectline);
				orderQueue.setCreatedDate(date);
				orderQueue
						.setStatus(ApplicationConstants.DEFAULT_ORDERQUEUE_STATUS);
				orderQueue.setVarOrderFileAttachment(newOrderFileAttachment);
				orderQueue.setVarProductLine(productLine);
				Long prevOrderId = Long.parseLong(orderid);
				orderQueue.setPrevOrderQueueId(Integer.parseInt(orderid));
				OrderQueueService orderQueueService = (OrderQueueService) SpringConfig
						.getInstance().getBean("orderQueueService");

				Long orderqueueid = orderQueueService.create(orderQueue);
				orderQueue = orderQueueService.read(prevOrderId);
				orderQueue
						.setStatus(ApplicationConstants.ORDER_QUEUE_CANCEL_STATUS);
				orderQueueService.update(orderQueue);
			} else {
				// throw a error
			}
		}
		return "{\"success\":true}";
	}

	@SuppressWarnings("unchecked")
	@GET
	@Path("/download/dailyreport")
	@Produces(MediaType.MULTIPART_FORM_DATA)
	public Response getDailyReport(@Context UriInfo ui, @Context HttpHeaders hh) {
		List<OrderQueue> orderQueue = null;
		try {
			MultivaluedMap<String, String> queryParamMap = ui
					.getQueryParameters();
			/* default value if no values is coming from GUI */
			String timeZone = TimeZone.getDefault().getID();
			if (queryParamMap.getFirst("timezone") != null
					&& !"".equals(queryParamMap.getFirst("timezone")))
				timeZone = queryParamMap.getFirst("timezone");
			OrderQueueService orderQueueService = (OrderQueueService) SpringConfig
					.getInstance().getBean("orderQueueService");
			orderQueue = orderQueueService
					.getAllEntitiesListForDailyReport(queryParamMap);
			if (orderQueue == null)
				throw new Exception("Unable to find Orders");
			ByteArrayOutputStream outputStream = ExcelUtils
					.createOrderQueueExcelFile(orderQueue, timeZone);
			byte[] bytes = outputStream.toByteArray();
			String fileName = "Daily_Report.xls";
			return Response
					.ok(bytes, MediaType.APPLICATION_OCTET_STREAM)
					.header("content-disposition",
							"attachment; filename = " + fileName).build();
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

	private static Map<String, String> getOrderQueueSatusMap() throws Exception {
		Map<String, String> codeMap = new HashMap<String, String>();
		CodeService CodeService = (CodeService) SpringConfig.getInstance()
				.getBean("codeService");
		List<Code> list = CodeService.readByType("orderfilequeue");
		String code = "", value = "";
		Iterator<Code> codeIterator = list.iterator();
		while (codeIterator.hasNext()) {
			Code obj = codeIterator.next();
			code = obj.getCode();
			value = obj.getValue();
			codeMap.put(code, value);
		}
		return codeMap;
	}

	@SuppressWarnings("unchecked")
	@GET
	@Path("/download/openreport")
	@Produces(MediaType.MULTIPART_FORM_DATA)
	public Response getOpenReport(@Context UriInfo ui, @Context HttpHeaders hh) {
		List<OrderQueue> orderQueue = null;
		try {
			MultivaluedMap<String, String> queryParamMap = ui
					.getQueryParameters();
			/* default value if no values is coming from GUI */
			String timeZone = TimeZone.getDefault().getID();
			if (queryParamMap.getFirst("timezone") != null
					&& !"".equals(queryParamMap.getFirst("timezone")))
				timeZone = queryParamMap.getFirst("timezone");
			OrderQueueService orderQueueService = (OrderQueueService) SpringConfig
					.getInstance().getBean("orderQueueService");
			orderQueue = orderQueueService
					.getAllEntitiesListForOpenReport(queryParamMap);
			if (orderQueue == null)
				throw new Exception("Unable to find Orders");
			ByteArrayOutputStream outputStream = ExcelUtils
					.createOrderQueueExcelFile(orderQueue, timeZone);
			byte[] bytes = outputStream.toByteArray();
			String fileName = "Detail_Status_Report.xls";
			return Response
					.ok(bytes, MediaType.APPLICATION_OCTET_STREAM)
					.header("content-disposition",
							"attachment; filename = " + fileName).build();
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

	public static Map<String, String> getCodeMap() {
		return codeMap;
	}

	@GET
	@Path("/download/emailbody/{orderid}")
	@Produces(MediaType.MULTIPART_FORM_DATA)
	public Response getEmailBody(@Context UriInfo ui, @Context HttpHeaders hh,
			@PathParam("orderid") String orderid) {
		Long orderQueueEntityId = Long.parseLong(orderid);
		String mailBodyFilePath = "";
		String fileName = "";
		File file;
		try {
			/*
			 * OrderQueueService orderQueueService = (OrderQueueService)
			 * SpringConfig .getInstance().getBean("orderQueueService");
			 * orderQueue = orderQueueService.read(orderQueueEntityId); if
			 * (orderQueue == null) throw new
			 * Exception("Unable to find Order with the given id"); InputStream
			 * is = new
			 * ByteArrayInputStream(orderQueue.getEmailBody().getBytes("UTF-8"
			 * ));; byte[] bytes = IOUtils.toByteArray(is); String fileName =
			 * "\""+orderid+".html\"";
			 */
			OrderQueueService orderQueueService = (OrderQueueService) SpringConfig
					.getInstance().getBean("orderQueueService");
			mailBodyFilePath = orderQueueService
					.getMailBodyFilePathByTrackId(orderQueueEntityId);
			if (mailBodyFilePath == null)
				throw new Exception(
						"Mail Body not found in the database, returned null");
			System.out.println(orderid + " " + mailBodyFilePath);
			fileName = "CompleteEmail.html";
			file = new File(mailBodyFilePath + File.separatorChar + fileName);
			if (!file.exists()) {
				fileName = "CompleteEmail.pdf";
				file = new File(mailBodyFilePath + File.separatorChar
						+ fileName);
				if (!file.exists()) {
					throw new Exception(
							"The Mail Body file is not available at location:\""
									+ mailBodyFilePath + "\".");
				}
			}
			// String fileName =
			// mailBodyFilePath.substring(mailBodyFilePath.lastIndexOf(File.separatorChar)+1);
			return Response
					.ok(file, MediaType.APPLICATION_OCTET_STREAM)
					.header("content-disposition",
							"attachment; filename = \"" + fileName + "\"")
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

	// method for downloading order file
	@GET
	@Path("/download/orderfile/{orderid}")
	@Produces(MediaType.MULTIPART_FORM_DATA)
	public Response getOrderFile(@Context UriInfo ui, @Context HttpHeaders hh,
			@PathParam("orderid") String orderid) {
		Long orderFileQueueId = Long.parseLong(orderid);
		String orderFilePath = "";
		try {
			OrderQueueService orderQueueService = (OrderQueueService) SpringConfig
					.getInstance().getBean("orderQueueService");
			orderFilePath = orderQueueService
					.getOrderFilePathByOrderFileQueueId(orderFileQueueId);
			if (orderFilePath == null)
				throw new Exception(
						"Order File not found in the database, returned null");
			System.out.println(orderid + " " + orderFilePath);
			File file = new File(orderFilePath);
			if (!file.exists()) {
				throw new Exception(
						"The Order file is not available at location:\""
								+ orderFilePath + "\".");
			}

			String fileName = orderFilePath.substring(orderFilePath
					.lastIndexOf(File.separator) + 1);

			return Response
					.ok(file, MediaType.APPLICATION_OCTET_STREAM)
					.header("content-disposition",
							"attachment; filename = \"" + getEncoded(fileName)
									+ "\"").build();
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

	private Long addAttachments(OrderEmailQueue orderemailQueue,
			ProductLine productLineObj,
			Map<String, List<FormDataBodyPart>> fieldsByName,
			FormDataMultiPart formParams, String filePath) throws Exception {
		String fileExtension = null, fileName, type;
		String fileContentType = null, additionalDataFileKey = null;
		InputStream stream = null;
		OrderFileAttachment orderFileAttachment = null;
		OrderFileAttachmentService orderFileAttachmentService = (OrderFileAttachmentService) SpringConfig
				.getInstance().getBean("orderFileAttachmentService");
		String count = "0";
		Long orderFileId = 0L;
		for (Map.Entry<String, List<FormDataBodyPart>> entry : fieldsByName
				.entrySet()) {
			String field = entry.getKey();
			FormDataBodyPart formdata = entry.getValue().get(0);
			if (formdata != null
					&& (field.equals("orderFileType") || field
							.startsWith("attachment"))) {
				stream = ((FormDataBodyPart) formParams.getField(field))
						.getEntityAs(InputStream.class);
				fileName = ((FormDataBodyPart) formParams.getField(field))
						.getContentDisposition().getFileName();
				type = ((FormDataBodyPart) formParams.getField(field))
						.getMediaType().toString();
				if (fileName != null)
					fileExtension = fileName.substring(
							fileName.lastIndexOf(".") + 1, fileName.length());
				if (!type.equalsIgnoreCase(MediaType.TEXT_PLAIN)
						|| "txt".equalsIgnoreCase(fileExtension)) {

					if (field.equalsIgnoreCase("orderFileType")) {
						fileContentType = ApplicationConstants.DEFAULT_ORDER_CONTENT_TYPE;
						additionalDataFileKey = null;
					} else {
						count = field.replace("attachment", "");
						if (formParams
								.getField("additionalDataFileKey" + count) != null)
							additionalDataFileKey = formParams.getField(
									"additionalDataFileKey" + count).getValue();
						else
							additionalDataFileKey = null;
						fileContentType = ApplicationConstants.DEFAULT_ADDITIONAL_CONTENT_TYPE;
					}
					orderFileAttachment = new OrderFileAttachment();
					File targetFile = new File(filePath + File.separator
							+ fileName);
					FileUtils.copyInputStreamToFile(stream, targetFile);
					orderFileAttachment.setFileName(fileName);
					orderFileAttachment.setFileExtension(fileExtension);
					orderFileAttachment.setFileContentType(fileContentType);
					orderFileAttachment.setCreatedDate(new Date());
					orderFileAttachment
							.setAdditionalDataFileKey(additionalDataFileKey);
					orderFileAttachment.setVarProductLine(productLineObj);
					orderFileAttachment.setVarOrderEmailQueue(orderemailQueue);
					orderFileAttachment.setFilePath(filePath);
					orderFileAttachment
							.setStatus(ApplicationConstants.NEW_ATTACHMENT_STATUS);
					if (field.equalsIgnoreCase("orderFileType"))
						orderFileId = orderFileAttachmentService
								.create(orderFileAttachment);
					else
						orderFileAttachmentService.create(orderFileAttachment);
				}
			}
		}
		String oldAdditionalFileId = formParams.getField("oldAdditionalFileId")
				.getValue();
		if (oldAdditionalFileId != null && !"".equals(oldAdditionalFileId)) {
			String[] oldAdditionalFileIdList = oldAdditionalFileId.split(",");
			for (int i = 0; i < oldAdditionalFileIdList.length; i++) {
				OrderFileAttachment orderFileAttachmentObj = orderFileAttachmentService
						.read(Long.parseLong(oldAdditionalFileIdList[i]));
				orderFileAttachmentObj.setId(0L);
				orderFileAttachmentObj.setVarProductLine(productLineObj);
				orderFileAttachmentObj.setVarOrderEmailQueue(orderemailQueue);
				orderFileAttachmentService.create(orderFileAttachmentObj);
			}
		}
		return orderFileId;
	}

	public String getEncoded(String fileName) throws URISyntaxException {
		URI uri = new URI(null, null, fileName, null);
		return uri.toASCIIString();
	}
	
	/* Business Logic Ends*/

	// ////////////////////////////////////////////Getters & Setters////////////////////////////////////////////////////////////////////////////

	public String getDefaultSystem() {
		return defaultSystem;
	}

	public void setDefaultSystem(String defaultSystem) {
		this.defaultSystem = defaultSystem;
	}

	public int getSiteId() {
		return siteId;
	}

	public void setSiteId(int siteId) {
		this.siteId = siteId;
	}

	public Boolean getOrderInMailBody() {
		return orderInMailBody;
	}

	public void setOrderInMailBody(Boolean orderInMailBody) {
		this.orderInMailBody = orderInMailBody;
	}

	public String getMailBody() {
		return mailBody;
	}

	public void setMailBody(String mailBody) {
		this.mailBody = mailBody;
	}

	public int getOrgCodeId() {
		return orgCodeId;
	}

	public void setOrgCodeId(int orgCodeId) {
		this.orgCodeId = orgCodeId;
	}

	public String getOrderSource() {
		return orderSource;
	}

	public void setOrderSource(String orderSource) {
		this.orderSource = orderSource;
	}

	public Date getReceivedDate() {
		return receivedDate;
	}

	public void setReceivedDate(Date receivedDate) {
		this.receivedDate = receivedDate;
	}

	public int getAdditionalFileCount() {
		return additionalFileCount;
	}

	public void setAdditionalFileCount(int additionalFileCount) {
		this.additionalFileCount = additionalFileCount;
	}

	public long getRboId() {
		return rboId;
	}

	public void setRboId(long rboId) {
		this.rboId = rboId;
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

	public String getOrderFileName() {
		return orderFileName;
	}

	public void setOrderFileName(String orderFileName) {
		this.orderFileName = orderFileName;
	}

	public Long getPartnerId() {
		return partnerId;
	}

	public void setPartnerId(Long partnerId) {
		this.partnerId = partnerId;
	}

	public Long getProductLineId() {
		return productLineId;
	}

	public void setProductLineId(Long productLineId) {
		this.productLineId = productLineId;
	}

	public String getPartnerName() {
		return partnerName;
	}

	public void setPartnerName(String partnerName) {
		this.partnerName = partnerName;
	}

	public long getEmailQueueId() {
		return emailQueueId;
	}

	public void setEmailQueueId(long emailQueueId) {
		this.emailQueueId = emailQueueId;
	}

	public String getRboName() {
		return rboName;
	}

	public void setRboName(String rboName) {
		this.rboName = rboName;
	}

	public String getSenderEmailId() {
		return senderEmailId;
	}

	public void setSenderEmailId(String senderEmailId) {
		this.senderEmailId = senderEmailId;
	}

	public String getProductLineType() {
		return productLineType;
	}

	public void setProductLineType(String productLineType) {
		this.productLineType = productLineType;
	}

	public String getpId() {
		return pId;
	}

	public void setpId(String pId) {
		this.pId = pId;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
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

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public String getPoNumber() {
		return poNumber;
	}

	public void setPoNumber(String poNumber) {
		this.poNumber = poNumber;
	}

	public Integer getPrevOrderQueueId() {
		return prevOrderQueueId;
	}

	public void setPrevOrderQueueId(Integer prevOrderQueueId) {
		this.prevOrderQueueId = prevOrderQueueId;
	}

	public String getError() {
		return error;
	}

	public void setError(String error) {
		this.error = error;
	}

	public Date getFeedbackAcknowledgementDate() {
		return feedbackAcknowledgementDate;
	}

	public void setFeedbackAcknowledgementDate(Date feedbackAcknowledgementDate) {
		this.feedbackAcknowledgementDate = feedbackAcknowledgementDate;
	}

	public Date getAcknowledgementDate() {
		return acknowledgementDate;
	}

	public void setAcknowledgementDate(Date acknowledgementDate) {
		this.acknowledgementDate = acknowledgementDate;
	}

	public ProductLine getVarProductLine() {
		return varProductLine;
	}

	public void setVarProductLine(ProductLine varProductLine) {
		this.varProductLine = varProductLine;
	}

	public OrderFileAttachment getVarOrderFileAttachment() {
		return varOrderFileAttachment;
	}

	public void setVarOrderFileAttachment(
			OrderFileAttachment varOrderFileAttachment) {
		this.varOrderFileAttachment = varOrderFileAttachment;
	}

	public List<OrderLine> getListOrderLine() {
		return listOrderLine;
	}

	public void setListOrderLine(List<OrderLine> listOrderLine) {
		this.listOrderLine = listOrderLine;
	}

	public List<SalesOrder> getListSalesOrderLine() {
		return listSalesOrderLine;
	}

	public void setListSalesOrderLine(List<SalesOrder> listSalesOrderLine) {
		this.listSalesOrderLine = listSalesOrderLine;
	}

	public void setSitename(String siteName) {
		this.siteName = siteName;
	}
	
	public String getSiteName() {
		return siteName;
	}
}
