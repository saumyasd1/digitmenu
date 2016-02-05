package com.avery.storage.entities;

import java.io.StringWriter;
import java.util.Map;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import com.avery.app.config.SpringConfig;
import com.avery.logging.AppLogger;
import com.avery.storage.MainAbstractEntity;
import com.avery.storage.service.OrderFileQueueArchiveService;
import com.avery.utils.ApplicationUtils;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;
import com.fasterxml.jackson.databind.SerializationFeature;


@Entity
@Table(name = "AR_OrderFileQueue")
@Path("ar_orderfilequeue")
public class OrderFileQueueArchive extends MainAbstractEntity {

	private static final long serialVersionUID = 3184476383059789361L;

	@Column(name = "OrderFileQueueID")
    private int orderFileQueueID; 
	
	@NotFound(action = NotFoundAction.IGNORE)
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "PartnerID", nullable = true)
	private Partner partner;
	
	@Column(name = "PID")
    private String PID; 
	
	@Column(name = "RBOID")
    private String RBOID; 
	
	@Column(name = "RBOName")
    private String RBOName;  
	
	@Column(name = "ProductLineId")
    private String productLineId;  
	
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
    private String submittedDate;  
	
	@Column(name = "Status")
    private String status;  
	
	@Column(name = "Error")
    private String error;  
	
	
	/**
	 * @return the orderFileQueueID
	 */
	public int getOrderFileQueueID() {
		return orderFileQueueID;
	}

	/**
	 * @param orderFileQueueID the orderFileQueueID to set
	 */
	public void setOrderFileQueueID(int orderFileQueueID) {
		this.orderFileQueueID = orderFileQueueID;
	}

	/**
	 * @return the partner
	 */
	public Partner getPartner() {
		return partner;
	}

	/**
	 * @param partner the partner to set
	 */
	public void setPartner(Partner partner) {
		this.partner = partner;
	}

	/**
	 * @return the pID
	 */
	public String getPID() {
		return PID;
	}

	/**
	 * @param pID the pID to set
	 */
	public void setPID(String pID) {
		PID = pID;
	}

	/**
	 * @return the rBOID
	 */
	public String getRBOID() {
		return RBOID;
	}

	/**
	 * @param rBOID the rBOID to set
	 */
	public void setRBOID(String rBOID) {
		RBOID = rBOID;
	}

	/**
	 * @return the rBOName
	 */
	public String getRBOName() {
		return RBOName;
	}

	/**
	 * @param rBOName the rBOName to set
	 */
	public void setRBOName(String rBOName) {
		RBOName = rBOName;
	}

	/**
	 * @return the productLineId
	 */
	public String getProductLineId() {
		return productLineId;
	}

	/**
	 * @param productLineId the productLineId to set
	 */
	public void setProductLineId(String productLineId) {
		this.productLineId = productLineId;
	}

	/**
	 * @return the senderEmailID
	 */
	public String getSenderEmailID() {
		return senderEmailID;
	}

	/**
	 * @param senderEmailID the senderEmailID to set
	 */
	public void setSenderEmailID(String senderEmailID) {
		this.senderEmailID = senderEmailID;
	}

	/**
	 * @return the subject
	 */
	public String getSubject() {
		return subject;
	}

	/**
	 * @param subject the subject to set
	 */
	public void setSubject(String subject) {
		this.subject = subject;
	}

	/**
	 * @return the emailBody
	 */
	public String getEmailBody() {
		return emailBody;
	}

	/**
	 * @param emailBody the emailBody to set
	 */
	public void setEmailBody(String emailBody) {
		this.emailBody = emailBody;
	}

	/**
	 * @return the receivedDate
	 */
	public String getReceivedDate() {
		return receivedDate;
	}

	/**
	 * @param receivedDate the receivedDate to set
	 */
	public void setReceivedDate(String receivedDate) {
		this.receivedDate = receivedDate;
	}

	/**
	 * @return the orderSource
	 */
	public String getOrderSource() {
		return orderSource;
	}

	/**
	 * @param orderSource the orderSource to set
	 */
	public void setOrderSource(String orderSource) {
		this.orderSource = orderSource;
	}

	/**
	 * @return the submittedBy
	 */
	public String getSubmittedBy() {
		return submittedBy;
	}

	/**
	 * @param submittedBy the submittedBy to set
	 */
	public void setSubmittedBy(String submittedBy) {
		this.submittedBy = submittedBy;
	}

	/**
	 * @return the submittedDate
	 */
	public String getSubmittedDate() {
		return submittedDate;
	}

	/**
	 * @param submittedDate the submittedDate to set
	 */
	public void setSubmittedDate(String submittedDate) {
		this.submittedDate = submittedDate;
	}

	/**
	 * @return the status
	 */
	public String getStatus() {
		return status;
	}

	/**
	 * @param status the status to set
	 */
	public void setStatus(String status) {
		this.status = status;
	}

	/**
	 * @return the error
	 */
	public String getError() {
		return error;
	}

	/**
	 * @param error the error to set
	 */
	public void setError(String error) {
		this.error = error;
	}

	@Override
	public Response getEntities(UriInfo ui, HttpHeaders hh) {
		Response.ResponseBuilder rb = null;
		@SuppressWarnings("rawtypes")
		Map entitiesMap=null;
		try {
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			MultivaluedMap<String, String> queryParamMap =ui.getQueryParameters();
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
			OrderFileQueueArchiveService orderFileQueueArchiveService = (OrderFileQueueArchiveService) SpringConfig
					.getInstance().getBean("orderFileQueueArchiveService");
			entitiesMap = orderFileQueueArchiveService.readWithCriteria( queryParamMap);
			if (entitiesMap == null || entitiesMap.isEmpty())
				throw new Exception("Unable to find archives");
			mapper.setDateFormat(ApplicationUtils.df);
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
			OrderFileQueueArchive archive = mapper.readValue(data, OrderFileQueueArchive.class);
			OrderFileQueueArchiveService archiveService = (OrderFileQueueArchiveService) SpringConfig
					.getInstance().getBean("orderFileQueueArchiveService");
			
			id = archiveService.create(archive);
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
			OrderFileQueueArchiveService archiveService = (OrderFileQueueArchiveService) SpringConfig
					.getInstance().getBean("orderFileQueueArchiveService");
			// read existing entity from database
			OrderFileQueueArchive archive = archiveService.read(Long.parseLong(id));
			if (archive == null) {
				throw new WebApplicationException(Response
						.status(Status.BAD_REQUEST)
						.entity("archive entity with id \"" + id
								+ "\" doesn't exist")
						.type(MediaType.TEXT_PLAIN_TYPE).build());
			}
			ObjectReader updater = mapper.readerForUpdating(archive);
			// build updated entity object from input data
			archive = updater.readValue(data);
			// update entity in database
			archiveService.update(archive);
			// prepare response
			mapper.writeValue(writer, archive);
			rb = Response.ok(writer.toString());
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error in updating archive entity with id " + id, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error in updating archive entity with id " + id, e);
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
			OrderFileQueueArchiveService archiveService = (OrderFileQueueArchiveService) SpringConfig
					.getInstance().getBean("orderFileQueueArchiveService");
			OrderFileQueueArchive archive = archiveService.read(entityId);
			if (archive == null)
				throw new WebApplicationException(Response
						.status(Status.BAD_REQUEST)
						.entity("Archive entity with id \"" + id
								+ "\" doesn't exist")
						.type(MediaType.TEXT_PLAIN_TYPE).build());
			mapper.writeValue(writer, archive);
			rb = Response.ok(writer.toString());
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error in fetching archive entity with id " + id, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error in fetching archive entity with id " + id, e);
			throw new WebApplicationException(Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e))
					.type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		return rb.build();

	}
	
}
