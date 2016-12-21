package com.avery.storage.entities;

import java.sql.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name="org")
public class Org {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "id")
	long id;
	@Column(name = "name",length=50,unique=true)
	String name;
	@Column(name = "comment",length=250)
	String comment;
	@Column(name = "createdBy",length=50)
	String createdBy;
	@Column(name = "createdDate")
	Date createdDate;
	@Column(name = "lastModifiedBy",length=50)
	String lastModifiedBy;
	@Column(name = "lastModifiedDate")
	Date lastModifiedDate;
	
	
	public Org() {}


	public long getId() {
		return id;
	}


	public void setId(long id) {
		this.id = id;
	}


	String getName() {
		return name;
	}


	void setName(String name) {
		this.name = name;
	}


	String getComment() {
		return comment;
	}


	void setComment(String comment) {
		this.comment = comment;
	}


	String getCreatedBy() {
		return createdBy;
	}


	void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}


	Date getCreatedDate() {
		return createdDate;
	}


	void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}


	String getLastModifiedBy() {
		return lastModifiedBy;
	}


	void setLastModifiedBy(String lastModifiedBy) {
		this.lastModifiedBy = lastModifiedBy;
	}


	Date getLastModifiedDate() {
		return lastModifiedDate;
	}


	void setLastModifiedDate(Date lastModifiedDate) {
		this.lastModifiedDate = lastModifiedDate;
	}
	
	
	
	
	
}
