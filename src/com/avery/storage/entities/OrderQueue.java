package com.avery.storage.entities;

import java.io.StringWriter;
import java.util.Date;
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
import javax.ws.rs.Path;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.UriInfo;

import org.apache.commons.lang.exception.ExceptionUtils;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import com.avery.app.config.SpringConfig;
import com.avery.logging.AppLogger;
import com.avery.storage.MainAbstractEntity;
import com.avery.storage.MixIn.OrderQueueMixIn;
import com.avery.storage.service.OrderQueueService;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;
import com.fasterxml.jackson.databind.SerializationFeature;



@Entity
@Table(name = "OrderFileQueue")
@Path("orders")
public class OrderQueue extends MainAbstractEntity{
	
	private static final long serialVersionUID = -8487156716364715576L;
	
	@Column(name = "PID")
	private String pid;
	
	@NotFound(action=NotFoundAction.IGNORE)
	@ManyToOne
	@JoinColumn(name = "PartnerID")
	private Partner partner;
	

	@Column(name = "RBOID")
	private String rboId;
	
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
	
	@Column(name = "ReceivedDate")
	private String receivedDate;
	
	@Column(name = "OrderSource")
	private String orderSource;
	
	@Column(name = "SubmittedBy")
	private String submittedBy;
	
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
	
	@Fetch(FetchMode.SELECT)
	@OneToMany(mappedBy = "orderQueue", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	private Set<OrderFileAttachment> orderFileAttachment;
	
	
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

	public String getRboId() {
		return rboId;
	}

	public void setRboId(String rboId) {
		this.rboId = rboId;
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

	public String getReceivedDate() {
		return receivedDate;
	}

	public void setReceivedDate(String receivedDate) {
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
	
}
