package com.avery.storage.entities;

import java.sql.Clob;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "audittrail")
public class AuditTrail {
	
private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="id") 
	private Integer id;

	@Column(name = "activityId",length=100)
	private String activityId;

	@Column(name = "category",length=100)
	private String category;

	@Column(name = "code",length=5)
	private Integer code;

	@Column(name = "comment",length=250)
	private String comment;

	@Column(name="content")
	private Clob content;

	@Column(name = "createdBy",length=50)
	private String createdBy;

	@Column(name = "createdDate")
	private Date createdDate;

	@Column(name = "lastModifiedBy",length=50)
	private String lastModifiedBy;

	@Column(name = "lastModifiedDate")
	private Date lastModifiedDate;

	@Column(name = "severityCode",length=100)
	private String severityCode;

	@Column(name = "status",length=50)
	private String status;

	@Column(name = "statusDescription",length=500)
	private String statusDescription;
	
	@Column(name = "user",length=50)
	private String user;

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getActivityId() {
		return activityId;
	}
	public void setActivityId(String activityId) {
		this.activityId = activityId;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public int getCode() {
		return code;
	}
	public void setCode(int code) {
		this.code = code;
	}
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	public Clob getContent() {
		return content;
	}
	public void setContent(Clob content) {
		this.content = content;
	}
	public String getCreatedBy() {
		return createdBy;
	}
	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}
	public Date getCreatedDate() {
		return createdDate;
	}
	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}
	public String getLastModifiedBy() {
		return lastModifiedBy;
	}
	public void setLastModifiedBy(String lastModifiedBy) {
		this.lastModifiedBy = lastModifiedBy;
	}
	public Date getLastModifiedDate() {
		return lastModifiedDate;
	}
	public void setLastModifiedDate(Date lastModifiedDate) {
		this.lastModifiedDate = lastModifiedDate;
	}
	public String getSeverityCode() {
		return severityCode;
	}
	public void setSeverityCode(String severityCode) {
		this.severityCode = severityCode;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getStatusDescription() {
		return statusDescription;
	}
	public void setStatusDescription(String statusDescription) {
		this.statusDescription = statusDescription;
	}
	public String getUser() {
		return user;
	}
	public void setUser(String user) {
		this.user = user;
	}
	

}
