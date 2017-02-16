package com.avery.storage;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

import org.slf4j.Logger;

import com.avery.logging.AppLogger;
import com.fasterxml.jackson.annotation.JsonFormat;

@MappedSuperclass
public class MainAbstractEntity extends AbstractEntityImpl {

	private static final long serialVersionUID = 1L;

	public static final transient Logger logger = AppLogger.getSystemLogger();

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private long id;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}
	
	@JsonFormat(shape= JsonFormat.Shape.STRING, pattern="yyyy-MM-dd' 'HH:mm:ss")
	@Column(name = "createdDate")
    private Date createdDate;
	
	@Column(name = "createdBy",length = 50)
    private String createdBy;
	
	@JsonFormat(shape= JsonFormat.Shape.STRING, pattern="yyyy-MM-dd' 'HH:mm:ss")
	@Column(name = "lastModifiedDate", updatable=false)
    private Date lastModifiedDate;
	
	public Date getCreatedDate() {
		return createdDate;
	}
	
	@Column(name = "lastModifiedBy",length = 50)
    private String lastModifiedBy;

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public Date getLastModifiedDate() {
		return lastModifiedDate;
	}

	public void setLastModifiedDate(Date lastModifiedDate) {
		this.lastModifiedDate = lastModifiedDate;
	}

	public String getLastModifiedBy() {
		return lastModifiedBy;
	}

	public void setLastModifiedBy(String lastModifiedBy) {
		this.lastModifiedBy = lastModifiedBy;
	}

	

	

	@Override
	public String toString() {
		return this.getClass().getSimpleName() + ":" + getId();
	}

	@Override
	public boolean equals(Object obj) {
		if (obj != null && obj instanceof Entity) {
			Entity e = (Entity) obj;
			if (e.getId() == getId()) {
				return true;
			} else {
				return false;
			}
		} else {
			return super.equals(obj);
		}
	}

	@Override
	public int hashCode() {
		return (int) this.getId();

	}

}
