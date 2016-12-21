package com.avery.storage.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Lob;
import javax.persistence.Table;
import javax.ws.rs.Path;

import com.avery.storage.MainAbstractEntity;
import com.mysql.jdbc.Blob;



//@Entity
@Table(name = "errorlog")
@Path("errorLog")
public class ErrorLog extends MainAbstractEntity{
	
	private static final long serialVersionUID = -8487156716364715527L;
	
	@Column(name = "PartnerID")
    private int partnerId; 
	
	@Column(name = "RBOID")
    private int rboId;   
	
	@Column(name = "ProductLineID")
    private int contactPerson; 
	
	@Column(name = "PFID",length = 50)
    private String pfId; 
	
	@Column(name = "PID",length = 50)
    private String pId;  
	
	@Column(name = "ActivityID",columnDefinition = "varchar(1000)")
    private String activityID;  

	@Column(name = "ErrorCode")
    private int errorCode; 
	
	@Column(name = "SeverityCode",length = 100)
    private String severityCode; 
	
	@Column(name = "ErrorCategory",length = 100)
    private String errorCategory; 
	
	@Column(name = "ErrorContent",columnDefinition = "blob")
	@Lob
    private Blob errorContent; 
	
	@Column(name = "USER",length = 50)
    private String user; 
	
	@Column(name = "Status",length = 50)
    private String status; 
	
	public int getPartnerId() {
		return partnerId;
	}

	public void setPartnerId(int partnerId) {
		this.partnerId = partnerId;
	}

	public int getRboId() {
		return rboId;
	}

	public void setRboId(int rboId) {
		this.rboId = rboId;
	}

	public int getContactPerson() {
		return contactPerson;
	}

	public void setContactPerson(int contactPerson) {
		this.contactPerson = contactPerson;
	}

	public String getPfId() {
		return pfId;
	}

	public void setPfId(String pfId) {
		this.pfId = pfId;
	}

	public String getpId() {
		return pId;
	}

	public void setpId(String pId) {
		this.pId = pId;
	}

	public String getActivityID() {
		return activityID;
	}

	public void setActivityID(String activityID) {
		this.activityID = activityID;
	}

	public int getErrorCode() {
		return errorCode;
	}

	public void setErrorCode(int errorCode) {
		this.errorCode = errorCode;
	}

	public String getSeverityCode() {
		return severityCode;
	}

	public void setSeverityCode(String severityCode) {
		this.severityCode = severityCode;
	}

	public String getErrorCategory() {
		return errorCategory;
	}

	public void setErrorCategory(String errorCategory) {
		this.errorCategory = errorCategory;
	}

	public  Blob getErrorContent() {
		return errorContent;
	}

	public void setErrorContent(Blob errorContent) {
		this.errorContent = errorContent;
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}



}
